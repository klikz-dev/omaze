import {default as Image} from '../components/ozc-image.js';

SDG.Checkout = SDG.Checkout || {};
SDG.Checkout.Content = SDG.Checkout.Content || {}
SDG.Checkout.Content.LineItems = SDG.Checkout.Content.LineItems || {}

SDG.Checkout.Content.LineItems.init = function () {
    function run () {}

    run();
}

SDG.Checkout.Content.LineItems.update = function () {
    // NOTE: window.checkout_line_items is getting set via <script> tag in liquid
    //       it loads before this code
    const lineItems = window.checkout_line_items || [];
    // NOTE: remove from global scope as quickly as possible
    delete window.checkout_line_items;

    updateLineItems(lineItems);

    function updateLineItems(lineItems) {
        const EXPERIENCE_PRODUCT_TYPE = 'experience';
        const DONATION_PRODUCT_TYPE = 'donation';

        (lineItems || []).forEach((lineItem, index) => {
            const TYPE = lineItem && lineItem.product && lineItem.product.type && lineItem.product.type.toLowerCase();
            if (TYPE === EXPERIENCE_PRODUCT_TYPE) {
                updateExperienceLineItem(lineItem, index);
            } else if (TYPE === DONATION_PRODUCT_TYPE) {
                updateDonationLineItem(lineItem, index);
            } else {
                // noop
            }
        });
    }

    function updateExperienceLineItem (item, index) {
        const MAIN_CONTENT_CLASS = '.main__content';
        const SIDE_BAR_CLASS = '.sidebar';
        const PRODUCT_THUMBNAIL_WRAPPER = '.product-thumbnail__wrapper';
        const MAIN_CONTENT_PRODUCT_THUMBNAIL_WRAPPER_EL = document.querySelectorAll(`${MAIN_CONTENT_CLASS} ${PRODUCT_THUMBNAIL_WRAPPER}`);

        updateLineItemThumbnail();
        updateLineItemTitle();
        updateShippingInfoThumbnail();

        /*
            NOTE: There's some odd stuff happening here, when the promo entries are removed
                  there's no item at index 1, hence the null checks; however, at that point,
                  the remaining line_item is our original item, but for some reason with a
                  display image / text of our promo entry details, and since we're on this
                  2nd loop of a now 1 length line_items, the null check prevents the style
                  change, so in this case, we're defaulting to the 0 index (as seen below).
        */
        function updateLineItemThumbnail () {
            const PRODUCT_THUMBNAIL_WRAPPER_EL = document.querySelectorAll(`${SIDE_BAR_CLASS} ${PRODUCT_THUMBNAIL_WRAPPER}`);
            const VARIANT_IMAGE_WRAPPER_EL = PRODUCT_THUMBNAIL_WRAPPER_EL[index] || PRODUCT_THUMBNAIL_WRAPPER_EL[0];

            if (!VARIANT_IMAGE_WRAPPER_EL) {
                return;
            }

            const imageOptions = {
                width: 120,
                height: 120,
            };

            const src = Image.getVariantSrc(item.product.featured_image, imageOptions);

            VARIANT_IMAGE_WRAPPER_EL.style.backgroundImage = `url(${src})`;
        }

        function updateLineItemTitle () {
            const PRODUCT_DESCRIPTION_NAME_CLASS = '.product__description__name';
            const PRODUCT_DESCRIPTION_VARIANT_CLASS = '.product__description__variant';
            const PRODUCT_NAMES_EL = document.querySelectorAll(PRODUCT_DESCRIPTION_NAME_CLASS);
            const PRODUCT_VARIANTS_EL = document.querySelectorAll(PRODUCT_DESCRIPTION_VARIANT_CLASS);
            const PRODUCT_NAME_EL = PRODUCT_NAMES_EL[index] || PRODUCT_NAMES_EL[0];
            const PRODUCT_VARIANT_EL = PRODUCT_VARIANTS_EL[index] || PRODUCT_VARIANTS_EL[0];
            // TODO: escape title
            const PRODUCT_TITLE = item.product.title;
            const PRODUCT_VARIANT_SKU = item.variant.sku;
            const { value } = splitSkuIntoKeyValuePair(PRODUCT_VARIANT_SKU);

            if (!PRODUCT_NAME_EL && !PRODUCT_VARIANT_EL) {
                return;
            }

            PRODUCT_NAME_EL.innerHTML = `${value} entries`;
            PRODUCT_VARIANT_EL.innerHTML = PRODUCT_TITLE;
        }

        /*
            NOTE: Handles image swap for shipping information section
                  a little differently because the order in which line items
                  re displayed here is not the same as the order of line_items array
        */
        function updateShippingInfoThumbnail () {
            if (MAIN_CONTENT_PRODUCT_THUMBNAIL_WRAPPER_EL.length <= 0) {
                return;
            }

            const imageOptions = {
                width: 120,
                height: 120,
            }

            const src = Image.getVariantSrc(item.product.featured_image, imageOptions);

            MAIN_CONTENT_PRODUCT_THUMBNAIL_WRAPPER_EL[index].style.backgroundImage = `url(${src})`;
        }
    }

    function updateDonationLineItem (item, index) {
        const MAIN_CONTENT_CLASS = '.main__content';
        const SIDE_BAR_CLASS = '.sidebar';
        const PRODUCT_THUMBNAIL_WRAPPER = '.product-thumbnail__wrapper';
        const MAIN_CONTENT_PRODUCT_THUMBNAIL_WRAPPER_EL = document.querySelectorAll(`${MAIN_CONTENT_CLASS} ${PRODUCT_THUMBNAIL_WRAPPER}`);

        updateLineItemThumbnail();
        updateLineItemTitle();
        updateShippingInfoThumbnail();

        /*
            NOTE: There's some odd stuff happening here, when the promo entries are removed
                  there's no item at index 1, hence the null checks; however, at that point,
                  the remaining line_item is our original item, but for some reason with a
                  display image / text of our promo entry details, and since we're on this
                  2nd loop of a now 1 length line_items, the null check prevents the style
                  change, so in this case, we're defaulting to the 0 index (as seen below).
        */
        function updateLineItemThumbnail () {
            const PRODUCT_THUMBNAIL_WRAPPER_EL = document.querySelectorAll(`${SIDE_BAR_CLASS} ${PRODUCT_THUMBNAIL_WRAPPER}`);
            const VARIANT_IMAGE_WRAPPER_EL = PRODUCT_THUMBNAIL_WRAPPER_EL[index] || PRODUCT_THUMBNAIL_WRAPPER_EL[0];

            if (!VARIANT_IMAGE_WRAPPER_EL) {
                return;
            }

            // NOTE: product.images[3] (the fourth) -- image is assumed to be a square cause logo
            //       used explicitly for this thumbnail
            VARIANT_IMAGE_WRAPPER_EL.style.backgroundImage = `url(${item.product.images[3]})`;
        }

        function updateLineItemTitle () {
            const PRODUCT_DESCRIPTION_VARIANT_CLASS = '.product__description__variant';
            const PRODUCT_VARIANTS_EL = document.querySelectorAll(PRODUCT_DESCRIPTION_VARIANT_CLASS);
            const PRODUCT_VARIANT_EL = PRODUCT_VARIANTS_EL[index] || PRODUCT_VARIANTS_EL[0];

            if (!PRODUCT_VARIANT_EL) {
                return;
            }

            PRODUCT_VARIANT_EL.innerHTML = `Supporting ${item.product.vendor.toUpperCase()} relief efforts`;
        }

        /*
            NOTE: Handles image swap for shipping information section
                  a little differently because the order in which line items
                  re displayed here is not the same as the order of line_items array
        */
        function updateShippingInfoThumbnail () {
            if (MAIN_CONTENT_PRODUCT_THUMBNAIL_WRAPPER_EL.length <= 0) {
                return;
            }

            MAIN_CONTENT_PRODUCT_THUMBNAIL_WRAPPER_EL[index].style.backgroundImage = `url(${item.product.images[3]})`;
        }
    }

    function splitSkuIntoKeyValuePair (sku) {
        const SKU_SEPARATOR = '_';
        const skuParts = sku.split(SKU_SEPARATOR);

        return {
            key: skuParts[0],
            value: skuParts[1],
        }
    }
}
