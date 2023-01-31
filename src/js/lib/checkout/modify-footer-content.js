SDG.Checkout = SDG.Checkout || {};
SDG.Checkout.Content = SDG.Checkout.Content || {}
SDG.Checkout.Content.Footer = SDG.Checkout.Content.Footer || {}

SDG.Checkout.Content.Footer.init = function () {
    function run () {
        displayFooterContentIfAppropriate();
    }

    run();

    function displayFooterContentIfAppropriate () {
        const stepsToShowFooter = ['contact_information', 'shipping_method', 'payment_method'];
        const contactInformationStep = stepsToShowFooter[0];
        const DISPLAY_STYLE_NONE = 'none';
        const DISPLAY_STYLE_BLOCK = 'block';
        const MAIN_NOTE_CLASS = '.main__note';
        const MAIN_FOOTER_CLASS = '.main__footer';
        const THANKYOU_FOOTER_CLASS = '.thankyou__footer';
        const CURRENT_STEP = Shopify && Shopify.Checkout && Shopify.Checkout.step;
        if (CURRENT_STEP === contactInformationStep) {
            const mainNote = document.querySelector(MAIN_NOTE_CLASS);
            mainNote.style.display = DISPLAY_STYLE_BLOCK;
        }

        if (!stepsToShowFooter.includes(CURRENT_STEP)) {
            const MAIN_FOOTER_EL = document.querySelector(MAIN_FOOTER_CLASS);
            MAIN_FOOTER_EL.style.display = DISPLAY_STYLE_NONE;
        } else {
            const THANKYOU_FOOTER_EL = document.querySelector(THANKYOU_FOOTER_CLASS);
            if (THANKYOU_FOOTER_EL !== null) {
                THANKYOU_FOOTER_EL.style.display = DISPLAY_STYLE_NONE;
            }
        }
    }
}
