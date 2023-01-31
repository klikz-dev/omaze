import { ALLOWED_PRODUCT_TYPE, isCrossSellableVariant } from './validation';

export function dedupeObjectList (list = [], key = 'id')  {
    const uniqueMap = {};

    for (const item of list) {
        const value = item[key];

        // eslint-disable-next-line no-prototype-builtins
        if (uniqueMap.hasOwnProperty(value)) {
            continue;
        }

        uniqueMap[value] = item;
    }

    return Object.values(uniqueMap);
}

export function getPrimaryCartItem (cartItems) {
    if (!cartItems || !cartItems.length) {
        return false;
    }

    return cartItems.find(item => {
        const productType = item.product_type || '';

        return productType.toLowerCase() === ALLOWED_PRODUCT_TYPE;
    });
}

export function getEntriesFromSKU (sku) {
    const skuSeparator = '_';

    if (typeof(sku) !== 'string') {
        return false;
    }

    const skuParts = sku.split(skuSeparator);

    const entries = skuParts[skuParts.length - 1];
    const entriesInt = parseInt(entries);

    if (isNaN(entriesInt)) {
        return false;
    }

    return entriesInt;
}

export function priceInDollars (price) {
    // Shopify returns strings with collection product variants,
    // so a price will typically look like this => price: "10.00"
    if (typeof(price) === 'string') {
        return price/1;
    }

    return price / 100;
}

export function getVariantByEntries (product, entries) {
    if (!product || !product.variants || !entries) {
        return false;
    }

    return product.variants.find((variant) => {
        if (!isCrossSellableVariant(variant)) {
            return false;
        }

        return getEntriesFromSKU(variant.sku) === parseInt(entries);
    });
}
