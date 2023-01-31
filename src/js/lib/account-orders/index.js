import { initProductRecommendations } from '../features/product-recommendations';
import { trackProductRecommendationButton } from '../features/product-recommendations/modules/analytics/index';

SDG.AccountOrders = SDG.AccountOrders || {};

SDG.AccountOrders.init = function () {
    initAccountProductRecommendations();
}

function initAccountProductRecommendations () {
    initProductRecommendations();

    trackProductRecommendationButton();
}
