export const setAnalyticsData = function (recommendedProducts) {
    if (!SDG.Analytics || !SDG.Analytics.data || !recommendedProducts) {
        return false;
    }

    SDG.Analytics.data = {
        ...SDG.Analytics.data,
        productRecommendations: [
            ...recommendedProducts,
        ],
    };
}

export const trackProductRecommendationButton = function () {
    const BROWSE_ALL_SELECTOR = '.js-product-recommendations__button';
    const browseAllBtn = document.querySelector(BROWSE_ALL_SELECTOR);

    if (!browseAllBtn) {
        /* eslint-disable-next-line  no-console */
        console.warn('[ProductRecommendations.analytics trackProductRecommendationButton] button not found in DOM');

        return false;
    }

    const data = {
        event: 'click',
        ga_category: 'Product Recs',
        ga_action: 'Button Click',
        ga_label: 'See all Experiences',
    };

    SDG.Analytics.utils.trackAnalyticsEvent('click', browseAllBtn, data)
}
