SDG.Checkout = SDG.Checkout || {};
SDG.Checkout.Marketing = SDG.Checkout.Marketing || {};
SDG.Checkout.Marketing.OptIn = SDG.Checkout.Marketing.OptIn || {};

SDG.Checkout.Marketing.OptIn.init = function () {
    function run () {
        if (!window.ozGeolocation) {
            /* eslint-disable-next-line  no-console */
            console.error('[SDG.Checkout.Marketing.OptIn.init] ozGeolocation missing');

            return false;
        }

        window.ozGeolocation
            .getData()
            .then(setMarketingOptInCheckboxDefault)
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.error(`[SDG.Checkout.Marketing.OptIn.init] ozGeolocation:  ${error}`);
            });
    }

    run();

    function setMarketingOptInCheckboxDefault (geoData) {
        const COUNTRY_CODE = geoData && geoData.COUNTRY_CODE;

        if (!COUNTRY_CODE) {
            /* eslint-disable-next-line  no-console */
            console.debug('[SDG.Checkout.Marketing.OptIn setMarketingOptInCheckboxDefault] ozGeolocation COUNTRY_CODE missing');
        }

        const US_COUNTRY_CODE = 'us';
        const CHECKBOX_INPUT = 'checkout_buyer_accepts_marketing';
        const USERS_COUNTRY_CODE = (COUNTRY_CODE || '').toLowerCase();
        const marketingOptInCheckboxElement = document.getElementById(CHECKBOX_INPUT);

        if (!marketingOptInCheckboxElement) {
            return;
        }

        if (USERS_COUNTRY_CODE === US_COUNTRY_CODE) {
            marketingOptInCheckboxElement.checked = true;
        } else {
            marketingOptInCheckboxElement.checked = false;
        }
    }
}
