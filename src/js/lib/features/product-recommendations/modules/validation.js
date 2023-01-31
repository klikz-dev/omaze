import { isIneligibleForDate } from '../../../access-restrictions/country-restrictions';
import { getEnvironment } from '../../../env/environment';

function isNotCurrentProduct (product, productId) {
    if (!productId) {
        return true;
    }

    return product.id !== productId;
}

function isAllowedProductType (product) {
    const allowedType = 'experience';

    const productType = product.type || product.product_type;

    return productType.toLowerCase() === allowedType;
}

function isActiveProduct (product) {
    const activeTag = '$experience-active';

    return product.tags && product.tags.includes(activeTag);
}

function isGeoEligibleByDate (product, geoLocationData) {
    const restrictedCountries = getEnvironment().restrictedCountries;
    const eligibilityDate = getEnvironment().eligibilityDate;

    return !isIneligibleForDate(product.tags, geoLocationData, restrictedCountries, eligibilityDate);
}

function isRecommendationEligible (product, productId, geoLocationData) {
    return isNotCurrentProduct(product, productId) &&
        isAllowedProductType(product) &&
        isActiveProduct(product) &&
        isGeoEligibleByDate(product, geoLocationData);
}

function validateProductList (productList, geoLocationData, productId) {
    if (!Array.isArray(productList)) {
        return false;
    }

    const filteredProducts = productList.filter((product) => {
        return isRecommendationEligible(product, productId, geoLocationData);
    });

    const MIN_PRODUCTS = getEnvironment().productRecMinProducts;

    if (filteredProducts.length < MIN_PRODUCTS) {
        return false;
    }

    return filteredProducts;
}

function getFirstValidProductList(productLists, geoLocationData, productId) {
    if (!Array.isArray(productLists)) {
        return false;
    }

    let result = false;
    let i;

    for (i = 0; i < productLists.length; i++) {
        if (result) {
            break;
        }

        result = validateProductList(productLists[i], geoLocationData, productId);
   }

   return result;
}

export {
    validateProductList,
    getFirstValidProductList,
}
