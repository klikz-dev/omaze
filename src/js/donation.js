// donation product template js

SDG.Donation = SDG.Donation || {};
SDG.Donation.SelectedOption = undefined;

SDG.Donation.init = function() {
    function run () {
        addEventListeners();
        initSocialShare();
        setDefaultSelectedDonationAmount();
    }

    return run();
};

function addEventListeners () {
    addSelectedDonationAmountEventListeners();
    addDonateButtonOnClick();
    addPricingOptionsOnClick();
}

function addSelectedDonationAmountEventListeners () {
    // SNIPPET FOR DISPLAYING SELECTED DONATION AMOUNT
    const pricingRadioBoxes = document.getElementsByClassName('oz-donation__pricing-option-input');
    const selectedValueDisplay = document.querySelector('.js-selected-donation-amount');
    const firstOptionPrice = pricingRadioBoxes[0].getAttribute('data-price');
    // TODO: Support CAD (rest of the site supports multi-currency)
    const CURRENCY_ABBR = 'USD';

    selectedValueDisplay.innerText = `${firstOptionPrice} ${CURRENCY_ABBR}`;

    Array.from(pricingRadioBoxes).forEach(function(el) {
        el.addEventListener('click', function(ev) {
            const selectedPrice = ev.target.getAttribute('data-price');

            selectedValueDisplay.innerText = `${selectedPrice} ${CURRENCY_ABBR}`;
        });
    });
}

function setDefaultSelectedDonationAmount () {
    const SELECTOR = 'oz-donation__pricing-option-input';
    const DATA_ATTR = 'data-price';
    const DEFAULT_PRICE = '$25';
    const pricingRadioBoxes = document.getElementsByClassName(SELECTOR);
    const foundPricingRadioBoxes = Array.from(pricingRadioBoxes).filter((pricingRadioBox) => {
        const price = pricingRadioBox.getAttribute(DATA_ATTR);
        return price === DEFAULT_PRICE;
    });
    const defaultPricingRadioBox = foundPricingRadioBoxes[0];

    defaultPricingRadioBox.click();
}

function addDonateButtonOnClick () {
    const CLICK_EVENT = 'click';
    const SELECTOR = 'oz-donation-donate-now-btn';
    const DONATE_BTN = document.getElementById(SELECTOR);

    if (DONATE_BTN) {
        DONATE_BTN.addEventListener(CLICK_EVENT, () => {
            add(DONATE_BTN);
        });
    } else {
        // eslint-disable-next-line  no-console
        console.error('Failed to find Donate Now Button element');
    }
}

function addPricingOptionsOnClick () {
    const CLICK_EVENT = 'click';
    const SELECTOR = 'pricing_option';
    const PRICING_OPTIONS = document.getElementsByName(SELECTOR);

    if (PRICING_OPTIONS) {
        PRICING_OPTIONS.forEach((PRICING_OPTION) => {
            PRICING_OPTION.addEventListener(CLICK_EVENT, (event) => {
                const EVENT_VALUE = event && event.srcElement && event.srcElement.value;
                const SELECTED_VARIANT_ID = parseInt(EVENT_VALUE, 10);

                if (Number.isNaN(SELECTED_VARIANT_ID)) {
                    // eslint-disable-next-line no-console
                    console.error('Failed to find correct variant for selected donation option');
                    return;
                }

                SDG.Donation.SelectedOption = SELECTED_VARIANT_ID;
            });
        });
        
    } else {
        // eslint-disable-next-line  no-console
        console.error('Failed to find Pricing Option elements');
    }
}

function add(buttonEl) {
    const SELECTED_OPTION = SDG && SDG.Donation && SDG.Donation.SelectedOption;
    const QUANTITY = 1;

    if (!SELECTED_OPTION) {
        // eslint-disable-next-line  no-console
        console.error('Failed to find Selected Pricing Option');
        return;
    }

    buttonEl.setAttribute('disabled', true);

    return fetch('/cart/add.js', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            quantity: QUANTITY,
            id: SELECTED_OPTION,
        }),
    })
    .then(addToCartSuccess)
    .catch((error) => {
        addToCartFailure(error, buttonEl);
    });
}
 
function addToCartSuccess () {
    redirectToCart();
}

function addToCartFailure (error, buttonEl) {
    // eslint-disable-next-line  no-console
    console.error('Failed to add to Cart:', error);
    buttonEl.removeAttribute('disabled');
}

function redirectToCart () {
    const CART_PATH = '/cart';
    window.location.href = CART_PATH;
}

// SNIPPET FOR SOCIAL SHARING
function initSocialShare() {
    const socialShareContainer = document.querySelector('#js-donation-social-share');

    const FB_ANALYTICS_TRACK_ACTION = 'click';
    const FB_ANALYTICS_ID = 'socialShare';
    const FB_ANALYTICS_DETAILS = 'facebook';

    const TWITTER_ANALYTICS_TRACK_ACTION = 'click';
    const TWITTER_ANALYTICS_ID = 'socialShare';
    const TWITTER_ANALYTICS_DETAILS = 'twitter';

    const charityName = window.__OzDonationData.charityName;
    const causeName = window.__OzDonationData.causeName;
    const shareUrl = window.location && window.location.href;
    const shareText = `I just supported ${charityName} through Omaze and their ${causeName} relief efforts!`;

    delete window.__OzDonationData;

    const socialShare = new SDG.Component.SocialShare({
        facebook: {
            shareUrl: shareUrl,
            shareText: shareText,
            oaAnalytics: {
                track: FB_ANALYTICS_TRACK_ACTION,
                id: FB_ANALYTICS_ID,
                details: FB_ANALYTICS_DETAILS,
            },
        },
        twitter: {
            shareUrl: shareUrl,
            shareText: `I just supported ${charityName} through #Omaze and their ${causeName} relief efforts!`,
            oaAnalytics: {
                track: TWITTER_ANALYTICS_TRACK_ACTION,
                id: TWITTER_ANALYTICS_ID,
                details: TWITTER_ANALYTICS_DETAILS,
            },
        },
        email: {
            subject: `Proud to share that I'm supporting ${causeName} relief efforts`,
            body: `${shareText} \n ${shareUrl}`,
        },
        clipboard: {
            content: shareUrl,
        },
    });

    socialShareContainer.append(socialShare.el);
}

// init
SDG.Donation.init();
