import {setCartAttributes} from './attributes';
import {initAdBanner} from './combo-promotion/banner-ad';
import {initDeleteFromCartListeners} from './delete-variants';

import { initProductRecommendations } from '../../lib/features/product-recommendations';
import { trackProductRecommendationButton } from '../../lib/features/product-recommendations/modules/analytics/index';
import { initCrossSell } from '../../lib/features/cross-sell';

import { getEnvironment } from '../env/environment';

SDG.Cart = SDG.Cart || {};

const comboPromotionFeatureFlags = {
    'combo-promotion': getEnvironment().comboPromotion,
    'combo-promotion-blocked-countries': getEnvironment().comboPromotionBlockedCountries,
    'combo-promotion-blocked-regions': getEnvironment().comboPromotionBlockedRegions,
};

SDG.Cart.init = function(config) {
    const {
        cartItems,
    } = config || {};

    setCartAttributes();

    if (!cartItems || !cartItems.length) {
        initEmptyCart();

        return true;
    }

    initCartWithItems(cartItems);
};

function initCartWithItems (cartItems) {
    const env = getEnvironment().env;

    initDeleteFromCartListeners(cartItems);
    initAdBanner(cartItems, comboPromotionFeatureFlags, env);
    initCrossSell(cartItems);
}

function initEmptyCart () {
    initCartProductRecommendations();
}

function initCartProductRecommendations () {
    const options = {
        productId: false,
        carouselConfig: {
            header: 'Nothing to see here… yet. <br>Enter for a chance to win-win!',
        },
    };

    if (getEnvironment().featureHouseFocusOn) {
        options.carouselConfig.header = getEnvironment().productRecDefaultHeader;
    }

    initProductRecommendations(options);

    trackProductRecommendationButton();
}
