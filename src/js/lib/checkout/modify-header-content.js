import { default as Element } from '../components/ozc-element.js';

window.SDG = window.SDG || {};
SDG.Checkout = SDG.Checkout || {};
SDG.Checkout.Content = SDG.Checkout.Content || {};
SDG.Checkout.Content.Header = SDG.Checkout.Content.Header || {};

SDG.Checkout.Content.Header.init = function () {
    updateBreadcrumbs();

    function updateBreadcrumbs() {
        const CURRENT_STEP = Shopify && Shopify.Checkout && Shopify.Checkout.step;

        const DISPLAY_STYLE_NONE = 'none';

        const HEADER_CLASS = '.checkout__header_rebrand';
        const STEP_INFORMATION_CLASS = '.breadcrumb__step--information';
        const STEP_PAYMENT_BREADCRUMB_CLASS = '.breadcrumb__step--payment .breadcrumb__step';

        const BREADCRUMB_CURRENT_CLASS = 'breadcrumb__step breadcrumb__step--current';
        const BREADCRUMB_COMPLETED_CLASS = 'breadcrumb__step breadcrumb__step--completed';

        const CHECKOUT_URL = window.location.protocol + '//' + window.location.host + window.location.pathname;
        const STEP_INFORMATION_QUERY = '?step=contact_information';
        const STEP_INFORMATION_TEXT = 'Information';

        if (CURRENT_STEP === 'shipping_method' || CURRENT_STEP === 'payment_method') {
            // Information Step -- Completed
            const STEP_INFORMATION_EL = document.querySelector(STEP_INFORMATION_CLASS);

            if (!STEP_INFORMATION_EL) {
                // rebranding is not enabled, so we can't find this element
                return;
            }

            const informationElement = new Element({
                tag: 'a',
                cssClasses: BREADCRUMB_COMPLETED_CLASS,
                attributes: {
                    href: CHECKOUT_URL + STEP_INFORMATION_QUERY,
                },
                content: STEP_INFORMATION_TEXT,
            });

            STEP_INFORMATION_EL.innerHTML = '';
            STEP_INFORMATION_EL.appendChild(informationElement.el)

            // Payment Step -- Current
            const STEP_PAYMENT_BREADCRUMB_EL = document.querySelector(STEP_PAYMENT_BREADCRUMB_CLASS);
            STEP_PAYMENT_BREADCRUMB_EL.className = BREADCRUMB_CURRENT_CLASS;
        } else {
            if (CURRENT_STEP !== 'contact_information') {
                const HEADER_EL = document.querySelector(HEADER_CLASS);

                if (!HEADER_EL) {
                    return;
                }

                HEADER_EL.style.display = DISPLAY_STYLE_NONE;
            }
        }
    }
};
