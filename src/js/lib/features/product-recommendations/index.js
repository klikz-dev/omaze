import { default as Carousel } from '../../components/ozc-carousel';
import { default as Element } from '../../components/ozc-element.js';
import { default as ProductRecommendationCard } from '../../components/ozc-product-recommendation-card';
import { getEnvironment } from '../../env/environment';
import { fetchCollections, fetchCollectionProducts } from '../../shopify/api/collections';
import { fetchProductRecommendations } from '../../shopify/api/recommendations';

import { setAnalyticsData } from './modules/analytics';
import { trackProductClickEvent } from './modules/analytics/tracking';
import { validateProductList, getFirstValidProductList } from './modules/validation';

const CSS_CLASS_LIST_EL = 'product-recommendations__list';

function getProductCards (products) {
    return products.map((product, index) => {
        const card = new ProductRecommendationCard({
            title: product.title,
            imageUrl: product.featured_image,
            support: product.vendor,
            url: product.url,
            id: product.id,
            tags: product.tags,
        });

        trackProductClickEvent(product, index, card.el);

        return card.el;
    });
}

function createListEl () {
    const productRecContainerEl = document.querySelector('[data-prod-rec-container]');

    if (!productRecContainerEl) {
        /* eslint-disable-next-line  no-console */
        console.error('[product-recommendation addListEl] productRecContainerEl missing.')

        return false;
    }

    const productRecList = new Element({
        cssClasses: CSS_CLASS_LIST_EL,
    });

    productRecContainerEl.innerHTML = '';
    productRecContainerEl.appendChild(productRecList.el);

    return productRecList.el;
}

function onExit () {
    const LIST_EL = document.getElementsByClassName(CSS_CLASS_LIST_EL)[0];

    if (LIST_EL) {
        LIST_EL.style.display = 'none';
    }
}

function render (products = [], carouselConfig = {}) {
    if (!products.length) {
        return onExit();
    }

    const slickDefaults = {
        infinite: false,
    }

    const productCards = getProductCards(products);
    const headerCopy = carouselConfig.header || getEnvironment().productRecDefaultHeader;
    const slickConfig = {
        ...slickDefaults,
        ...carouselConfig.slickConfig,
    };

    const carousel = new Carousel({
        content: productCards,
        header: headerCopy,
        slickConfig: slickConfig,
        events: {
            'beforeChange': SDG.Analytics.events.slickProductRecommendationsCallback,
        },
    });

    if (!carousel) {
        return onExit();
    }

    const listEl = createListEl();

    if (!listEl) {
        return onExit();
    }

    listEl.appendChild(carousel.el);

    const initialized = carousel.init();

    if (!initialized) {
        return onExit();
    }
}

async function getProducts (productId) {
    const usePriorityCollectionOnly = getEnvironment().productRecUsePriorityCollection;
    const priorityCollectionSlug = getEnvironment().productRecPriorityCollectionSlug;
    const defaultCollectionSlug = getEnvironment().productRecDefaultCollectionSlug;

    let geoLocationData;

    try {
        geoLocationData = await window.ozGeolocation.getData();
        // eslint-disable-next-line no-empty
    } catch(error) {}

    if (usePriorityCollectionOnly) {
        const priorityCollection = await fetchCollectionProducts(priorityCollectionSlug);

        return validateProductList(priorityCollection, geoLocationData, productId);
    }

    // If productId exists, try fetching API recommendations first.
    if (productId) {
        const apiRecommendations = await fetchProductRecommendations(productId);
        const validatedFromAPI = validateProductList(apiRecommendations, geoLocationData, productId);

        if (validatedFromAPI) {
            return validatedFromAPI;
        }
    }

    // As fallback, fetch collections and use the first one that is valid.
    const collectionsToFetch = [
        priorityCollectionSlug,
        defaultCollectionSlug,
    ];

    const collections = await fetchCollections(collectionsToFetch);

    return getFirstValidProductList(collections, geoLocationData, productId);
}

async function initProductRecommendations (options) {
    const {
        productId,
        carouselConfig = {},
    } = options || {};

    let products;

    try {
        products = await getProducts(productId);
    } catch(error) {
        /* eslint-disable-next-line  no-console */
        console.error(error);

        return onExit();
    }

    if (!products) {
        return onExit();
    }

    setAnalyticsData(products);

    render(products, carouselConfig);
}

export {
    initProductRecommendations,
}
