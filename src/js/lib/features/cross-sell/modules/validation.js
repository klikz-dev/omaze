import { isIneligibleForDate } from '../../../access-restrictions/country-restrictions';
import { getEnvironment } from '../../../env/environment';

import { dedupeObjectList } from './utils';

export const ALLOWED_PRODUCT_TYPE = 'experience';

const ALLOWED_SKU_PREFIXES = [
    'standard',
    'cross-sell',
];

function productIsInCart (product, cartItems) {
    if (!product || !Array.isArray(cartItems)) {
        return false;
    }

    return cartItems.some((cartItem) => {
        return cartItem.product_id === product.id;
    });
}

function isAllowedProductType (product) {
    const productType = product.type || product.product_type;

    return productType.toLowerCase() === ALLOWED_PRODUCT_TYPE;
}

function isActiveProduct (product) {
    const activeTag = '$experience-active';

    return product.tags && product.tags.includes(activeTag);
}

function productIsGeoEligible (product, geoLocationData) {
    const restrictedCountries = getEnvironment().restrictedCountries;
    const eligibilityDate = getEnvironment().eligibilityDate;

    return !isIneligibleForDate(product.tags, geoLocationData, restrictedCountries, eligibilityDate);
}

function isAllowedSku (sku) {
    const skuSeparator = '_';

    if (typeof(sku) !== 'string') {
        return false;
    }

    const skuParts = sku.split(skuSeparator);
    const prefix = skuParts[0];

    return ALLOWED_SKU_PREFIXES.includes(prefix);
}

const isCrossSellableProduct = function (product, cartItems, geoLocationData) {
    return !productIsInCart(product, cartItems) &&
        isAllowedProductType(product) &&
        isActiveProduct(product) &&
        productIsGeoEligible(product, geoLocationData);
}

export function validateProductList (productList, cartItems, geoLocationData) {
    if (!Array.isArray(productList)) {
        return false;
    }

    let products = productList.filter((product) => {
        return isCrossSellableProduct(product, cartItems, geoLocationData);
    });

    return dedupeObjectList(products);
}

export function isCrossSellableVariant (variant) {
    if (!variant) {
        return false;
    }

    return isAllowedSku(variant.sku);
}
