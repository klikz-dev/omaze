import { trackArrowClickEvent } from '../product-recommendations/modules/analytics/tracking';

window.SDG = window.SDG || {};

const activeCurrency = Shopify && Shopify.currency && Shopify.currency.active;
const defaultCurrency = 'USD';

SDG.Analytics = {
    data: {
        curatedCollections: [],
        productRecommendations : [],
        productCollections : [],
        brand : 'Omaze',
        currency : activeCurrency || defaultCurrency,
        collectionPageSize: 4,
        recommendedPageSize: 3,
    },
    events : {},
    utils: {},
};

// On before load the collection pagination
SDG.Analytics.events.ajaxinateBeforeLoadCallback = function(nextPageUrl) {
    let url = new URL(nextPageUrl);
    let page = url.searchParams.get('page');
    let pageNumber = parseInt(page, 10);

    if (SDG.Analytics.events.notValidPageNumber(pageNumber)) {
        return;
    }

    let range = SDG.Analytics.events.calculateProductRange(pageNumber, SDG.Analytics.data.collectionPageSize);
    let slices = (SDG.Analytics.data.productCollections || []).slice(range.start, range.end);
    SDG.Analytics.events.pushImpressions(slices);

};

// On before Product Recommendations slide change
SDG.Analytics.events.slickProductRecommendationsCallback = function(event, slick, currentSlide, nextSlide) {

    if (SDG.Analytics.events.notValidPageNumber(currentSlide)) {
        return;
    }

    let range = SDG.Analytics.events.calculateProductRange(currentSlide, SDG.Analytics.data.recommendedPageSize);
    let slices = (SDG.Analytics.data.productRecommendations || []).slice(range.start, range.end);
    SDG.Analytics.events.pushImpressions(slices);

    trackArrowClickEvent(currentSlide, nextSlide, slick.slideCount);
};

// On before Curated Collections slide change
SDG.Analytics.events.slickCuratedCollectionsCallback = function(event, slick, currentSlide) {

    if (SDG.Analytics.events.notValidPageNumber(currentSlide)) {
        return;
    }

    let range = SDG.Analytics.events.calculateProductRange(currentSlide, SDG.Analytics.data.recommendedPageSize);
    let slices = (SDG.Analytics.data.curatedCollections || []).slice(range.start, range.end);
    SDG.Analytics.events.pushImpressions(slices);

};

SDG.Analytics.events.pushImpressions = function(products, list = 'Recommended Products') {
    let impressions = (products || []).map((product) => {
        return {
            id : product.id,
            name: product.name || product.title,
            brand: SDG.Analytics.data.brand,
            currency: SDG.Analytics.data.currency,
            list: list,
        };
    });

    if (impressions) {
        const dataObj = {
            'ecommerce': {
                'currencyCode': SDG.Analytics.data.currency,
                'impressions': impressions ,
            },
        };

        SDG.Analytics.events.pushDataLayerEvent(dataObj);
    }
};

// Calculate page range
SDG.Analytics.events.calculateProductRange = function(page, size) {
    let end = page * size;
    if(page === 0){
        end = size;
    }

    let start = end - size;
    return {
        start,
        end,
    }
};

// Validate page number
SDG.Analytics.events.notValidPageNumber = function(page) {
    return (isNaN(page) || !SDG.Analytics.data);
};

/**
 * Generic gtm event, typically given an gtm event object in the following format:
 * {
 *   event: 'click',
 *   ga_category: string,
 *   ga_action: string,
 *   ga_label: string,
 *   ga_value: string or number (optional),
 * }
 */
SDG.Analytics.events.pushDataLayerEvent = function(eventObj) {
    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push(eventObj);
};

/**
 * Utility function to track a dom event.
 * Pushes data to be tracked to the dataLayer.
 *
 * @param {String} event dom event to trigger
 * @param {element} element dom element to track
 * @param {Object} data analytics data passed to dataLayer
 */
SDG.Analytics.utils.trackAnalyticsEvent = function(event, element, data) {
    if (!element) {
        /* eslint-disable-next-line  no-console */
        console.error(new Error('[SDG.Analytics.utils trackAnalyticsEvent] element does not exist in DOM'));

        return;
    }

    element.addEventListener(event, () => {
        SDG.Analytics.events.pushDataLayerEvent(data);
    });
};
