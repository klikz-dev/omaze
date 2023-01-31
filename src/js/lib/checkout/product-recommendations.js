import { default as Element } from '../components/ozc-element.js';
import { initProductRecommendations } from '../../lib/features/product-recommendations';
import { getEnvironment } from '../env/environment';

window.SDG = window.SDG || {};
SDG.Checkout = SDG.Checkout || {};
SDG.Checkout.ProductRecommendations = SDG.Checkout.ProductRecommendations || {};

function createRecommendationCTAButton () {
    let ctaLabel = 'Continue shopping';
    let ctaLink = '/collections/experiences';

    if (getEnvironment().featureHouseFocusOn) {
        ctaLabel = 'Enter now';
        ctaLink = '/';
    }

    const link = new Element({
        tag: 'a',
        cssClasses: 'btn',
        children: [
            new SDG.Component.Element({
                tag: 'span',
                cssClasses: 'btn__content',
                content: ctaLabel,
            }),
        ],
        attributes: {
            href: ctaLink,
        },
    });

    return new Element({
        cssClasses: 'product-rec__button-container',
        children: [
            link,
        ],
    });
}

function createCheckoutRecommendationsEl () {
    const recommendationsContainer = new Element({
        cssClasses: 'product-rec__container',
        attributes: {
            'data-prod-rec-container': 'PLACEHOLDER',
        },
    });

    return new Element({
        children: [
            recommendationsContainer,
            createRecommendationCTAButton(),
        ],
    });
}

function injectProductRecommendationsTemplate () {
    const newbox = createCheckoutRecommendationsEl();
    const CONTENT_BOXES = document.getElementsByClassName('content-box');
    const lastBox = CONTENT_BOXES && CONTENT_BOXES[CONTENT_BOXES.length - 1];

    if (!lastBox || !newbox || !newbox.el) {
        return false;
    }

    lastBox.after(newbox.el);
}

function getFirstNonDonationLineItemId () {
    const lineItems = Shopify && Shopify.checkout && Shopify.checkout.line_items;

    if (lineItems.length < 1) {
        return null;
    }

    const EXCLUDED_PRODUCT_TYPE = 'donation';
    const firstValidLineItem = lineItems.find(item => {
        return (
            (item.product_type || '').toLowerCase() !==
            EXCLUDED_PRODUCT_TYPE
        );
    });

    if (firstValidLineItem) {
        return firstValidLineItem.product_id;
    }

    return null;
}

function shouldLoadRecommendations () {
    const ALLOWED_CHECKOUT_STEPS = ['thank_you'];
    const productRecommendationsEl = document.querySelector('[data-prod-rec-container]');

    const SHOPIFY_CHECKOUT_DATA = Shopify && Shopify.Checkout;
    const CURRENT_CHECKOUT_STEP =
        SHOPIFY_CHECKOUT_DATA && SHOPIFY_CHECKOUT_DATA.step;
    const isThankyouPage =
        !productRecommendationsEl &&
        ALLOWED_CHECKOUT_STEPS.includes(CURRENT_CHECKOUT_STEP);
    const isOrderStatusPage =
        !(SHOPIFY_CHECKOUT_DATA.page || SHOPIFY_CHECKOUT_DATA.step) &&
        SHOPIFY_CHECKOUT_DATA.isOrderStatusPage;
    return isThankyouPage || isOrderStatusPage;
}

function getRecommendationsCarouselConfig () {
    const SLIDER_BREAKPOINTS = {
        PHONE_LARGE: 480 - 1,
        TABLET: 720 - 1,
    };

    return {
        header: 'Explore more chances to win-win!',
        slickConfig: {
            responsive: [
                {
                    breakpoint: SLIDER_BREAKPOINTS.PHONE_LARGE,
                    settings: {
                        variableWidth: false,
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        arrows: false,
                        infinite: false,
                    },
                },
                {
                    breakpoint: SLIDER_BREAKPOINTS.TABLET,
                    settings: {
                        variableWidth: false,
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        arrows: true,
                        infinite: false,
                    },
                },
            ],
        },
    };
}

function initCheckoutRecommendations () {
    if (!shouldLoadRecommendations()) {
        return false;
    }

    injectProductRecommendationsTemplate();

    const productId = getFirstNonDonationLineItemId();
    const carouselConfig = getRecommendationsCarouselConfig();

    if (getEnvironment().featureHouseFocusOn) {
        // use default header from config
        carouselConfig.header = false;
    }

    initProductRecommendations({
        productId: productId,
        carouselConfig: carouselConfig,
    });
}

SDG.Checkout.ProductRecommendations.init = initCheckoutRecommendations;

export {
    initCheckoutRecommendations,
}
