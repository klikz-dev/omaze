export const setAnalyticsData = function (crossSellVariants) {
    setGlobalData(crossSellVariants);
    pushAnalyticsImpressions(crossSellVariants);
}

function setGlobalData (crossSellVariants) {
    if (!SDG.Analytics || !SDG.Analytics.data || !crossSellVariants) {
        return false;
    }

    SDG.Analytics.data = {
        ...SDG.Analytics.data,
        productRecommendations: [
            ...crossSellVariants,
        ],
    };
}

function pushAnalyticsImpressions (crossSellVariants) {
    if (!SDG.Analytics || !SDG.Analytics.events || !crossSellVariants) {
        return false;
    }

    const LIST_NAME = 'Cross Sell Products';

    const impressionsData = crossSellVariants.map((variant) => {
        return {
            id : variant.id,
            name: variant.product.title,
        }
    });

    SDG.Analytics.events.pushImpressions(impressionsData, LIST_NAME);
}
