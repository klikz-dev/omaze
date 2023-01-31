import { addItem, startLoading } from '../../../lib2/cart-handler';
import { default as CrossSellCard } from '../../components/ozc-cross-sell-product-card';
import { default as Element } from '../../components/ozc-element.js';
import { getEnvironment } from '../../env/environment';
import { fetchCollectionProducts } from '../../shopify/api/collections';
import { fetchProductRecommendations } from '../../shopify/api/recommendations';

import { setAnalyticsData } from './modules/analytics';
import { default as CrossSellComboPromotion } from './modules/combo-promotion';
import pricePointMapping from './modules/price-points';
import {
    getEntriesFromSKU,
    getPrimaryCartItem,
    getVariantByEntries,
    priceInDollars,
 } from './modules/utils';
 import { validateProductList } from './modules/validation';

const crossSellContainerCssClass = 'product-rec__container--cross-sell';

async function fetchAllProducts (productId) {
    const priorityCollectionSlug = getEnvironment().crossSellPriorityCollectionSlug;
    const defaultCollectionSlug = getEnvironment().crossSellDefaultCollectionSlug;
    const limit = 10;

    const promises = [
        fetchCollectionProducts(priorityCollectionSlug, limit),
        fetchProductRecommendations(productId, limit),
        fetchCollectionProducts(defaultCollectionSlug, limit),
    ];

    return Promise.allSettled(promises)
        .then((response) => {
            return response
                .filter((result) => !!result.value)
                .flatMap((result) => result.value);
        });
}

async function getProducts (cartItems, primaryCartItem) {
    const cartProductId = primaryCartItem && primaryCartItem.product_id;
    const usePriorityCollectionOnly =  getEnvironment().crossSellUsePriorityCollection;
    const priorityCollectionSlug =  getEnvironment().crossSellPriorityCollectionSlug;

    if (!cartProductId) {
        return false;
    }

    let geoLocationData;

    try {
        geoLocationData = await window.ozGeolocation.getData();
        // eslint-disable-next-line no-empty
    } catch(error) {}

    if (usePriorityCollectionOnly) {
        const priorityCollection = await fetchCollectionProducts(priorityCollectionSlug);

        return validateProductList(priorityCollection, cartItems, geoLocationData);
    }

    const products = await fetchAllProducts(cartProductId);

    return validateProductList(products, cartItems, geoLocationData);
}

function getCrossSellCard (variant) {
    const price = priceInDollars(variant.price);

    if (!price) {
        return false;
    }

    const card = new CrossSellCard({
        id: variant.id,
        productId: variant.product.id,
        comboId: variant.comboId,
        comboVariantId: variant.comboVariantId,
        title: `Donate $${price} for ${variant.entriesAmount} entries to:`,
        imageUrl: variant.product.featured_image,
        description: variant.product.title,
        supports: variant.product.vendor,
        url: variant.product.url,
        productTags: variant.product.tags || [],
        ctaTextRebrand: `Donate $${price}`,
    });

    return card.el;
}

function render (variants) {
    const RECOMMENDATION_LIST_CLASS = 'product-recommendations__list';
    const crossSellEl = document.getElementsByClassName(crossSellContainerCssClass)[0];
    const recommendationListEl = document.getElementsByClassName(RECOMMENDATION_LIST_CLASS)[0];

    variants.forEach((variant) => {
        const card = getCrossSellCard(variant);

        if (card) {
            recommendationListEl.appendChild(card);
        }
    });

    renderCrossSellHeader();
    crossSellEl.style.display = 'flex';
}

function getCrossSellVariants (products, primaryCartItem) {
    const maxItemsToRender = getEnvironment().crossSellMaxProducts;

    const crossSellVariants = [];
    let crossSellVariant;
    let i;

    for (i = 0; i < products.length; i++) {
        if (crossSellVariants.length === maxItemsToRender) {
            break;
        }

        crossSellVariant = getCrossSellVariant(products[i], primaryCartItem);

        if (crossSellVariant) {
            crossSellVariants.push(crossSellVariant);
        }
   }

   return crossSellVariants;
}

function getCrossSellEntries (entries) {
    const entriesString = String(entries);
    const defaultEntries = '20';

    return pricePointMapping[entriesString] || defaultEntries;
}

function getCrossSellVariant (product, primaryCartItem) {
    if (!product || !primaryCartItem) {
        return false;
    }

    const cartItemEntries = getEntriesFromSKU(primaryCartItem.sku);

    const crossSellEntries = getCrossSellEntries(cartItemEntries);

    const crossSellVariant = getVariantByEntries(product, crossSellEntries);

    if (!crossSellVariant) {
        return false;
    }

    crossSellVariant.entriesAmount = crossSellEntries;
    crossSellVariant.product = product;
    crossSellVariant.footer = true;
    crossSellVariant.ctaText = 'add to cart';

    return crossSellVariant;
}

function addProductClickHandlers(primaryCartItem) {
    document.querySelectorAll('.cross-sell-product-card__add-to-cart').forEach((ctaButton) => {
        ctaButton.addEventListener('click', function () {
            const variantId = ctaButton.getAttribute('data-variant-id');
            const comboId = ctaButton.getAttribute('data-combo-id');
            const comboVariantId = ctaButton.getAttribute('data-combo-variant-id');
            const variantToAdd = {
                id: variantId,
                quantity: 1,
                properties: {
                    cross_sell: true,
                    origin_product_id: primaryCartItem.product_id,
                    origin_variant_id: primaryCartItem.variant_id,
                },
            };

            const payload = {
                items: [variantToAdd],
            };

            if (comboVariantId) {
                payload.items[0].properties.combo_id = comboId;
                payload.items[0].properties.combo_primary_variant_id = parseInt(variantId);
                payload.items[0].properties.combo_secondary_variant_id = parseInt(comboVariantId);

                payload.items.push({
                    id: comboVariantId,
                    quantity: 1,
                    properties: {
                        combo_id: comboId,
                        combo_primary_variant_id: parseInt(variantId),
                        combo_secondary_variant_id: parseInt(comboVariantId),
                    },
                });
            }

            startLoading(ctaButton);
            addItem(payload);
        });
    });
}

function renderCrossSellHeader () {
    const headerCopy = getEnvironment().crossSellDefaultHeader;

    if (!headerCopy) {
        return false;
    }

    const parentEl = document.getElementsByClassName(crossSellContainerCssClass)[0];
    const headerEl = new Element({
        cssClasses: 'product-rec__title',
        content: headerCopy,
    });

    if (parentEl) {
        parentEl.prepend(headerEl.el);
    }
}

async function initCrossSell (cartItems) {
    const primaryCartItem = getPrimaryCartItem(cartItems);
    const minItemsToRender = getEnvironment().crossSellMinProducts || 1;

    if (!primaryCartItem) {
        return false;
    }

    let products;

    try {
        products = await getProducts(cartItems, primaryCartItem);
    } catch(error) {
        /* eslint-disable-next-line  no-console */
        console.error();

        return false;
    }

    if (!products || products.length < minItemsToRender) {
        return false;
    }

    let variants = getCrossSellVariants(products, primaryCartItem);

    if (!variants || variants.length < minItemsToRender) {
        return false;
    }

    variants = await CrossSellComboPromotion.mapComboPromotionData(variants);

    render(variants);
    addProductClickHandlers(primaryCartItem);
    setAnalyticsData(variants);
}

export {
    initCrossSell,
}
