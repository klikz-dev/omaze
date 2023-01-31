window.ozAppConfig = window.ozAppConfig || {}
window.ozEligibilitySettings = window.ozEligibilitySettings || {};

export function getEnvironment () {
    return {
        env: window.ozAppConfig.env,

        featureHouseFocusOn: window.ozAppConfig.featureHouseFocusOn,

        productRecMinProducts: window.ozAppConfig.productRecMinProducts,
        productRecPriorityCollectionSlug: window.ozAppConfig.productRecPriorityCollectionSlug,
        productRecDefaultCollectionSlug: window.ozAppConfig.productRecDefaultCollectionSlug,
        productRecDefaultHeader: window.ozAppConfig.productRecDefaultHeader,
        productRecUsePriorityCollection: window.ozAppConfig.productRecUsePriorityCollection,

        crossSellMinProducts: window.ozAppConfig.crossSellMinProducts,
        crossSellMaxProducts: window.ozAppConfig.crossSellMaxProducts,
        crossSellPriorityCollectionSlug: window.ozAppConfig.crossSellPriorityCollectionSlug,
        crossSellDefaultCollectionSlug: window.ozAppConfig.crossSellDefaultCollectionSlug,
        crossSellDefaultHeader: window.ozAppConfig.crossSellDefaultHeader,
        crossSellUsePriorityCollection: window.ozAppConfig.crossSellUsePriorityCollection,

        comboPromotion: window.ozAppConfig.comboPromotion,
        comboPromotionBlockedCountries: window.ozAppConfig.comboPromotionBlockedCountries,
        comboPromotionBlockedRegions: window.ozAppConfig.comboPromotionBlockedRegions,

        restrictedCountries: window.ozEligibilitySettings.restrictedCountries,
        eligibilityDate: window.ozEligibilitySettings.eligibilityDate,
    };
}
