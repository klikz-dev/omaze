SDG.Checkout = SDG.Checkout || {};
SDG.Checkout.Content = SDG.Checkout.Content || {}
SDG.Checkout.Content.ContactInformation = SDG.Checkout.Content.ContactInformation || {}

SDG.Checkout.Content.ContactInformation.init = function (config) {
    function run (data) {
        updateContactInformationContent(data);
    }

    run(config);

    function updateContactInformationContent (data) {
        const CURRENT_STEP = Shopify && Shopify.Checkout && Shopify.Checkout.step;
        const SHIPPING_STEP = 'shipping_method';
        const stepArray = ['contact_information', 'payment_method'];
        const FOOTER_ELEMENT = document.querySelector('.step__footer');
        const NEW_FOOTER_ELEMENT = document.createElement('div');

        NEW_FOOTER_ELEMENT.setAttribute('id', 'opt-in__copy');

        if (stepArray.includes(CURRENT_STEP)) {
            let opt_in_text = data && data.optIn && data.optIn.copy;
            const rules_link = data && data.optIn && data.optIn.rulesLink;
            const disclosure_link = data && data.disclosureLink;

            opt_in_text = opt_in_text
                .replace(
                    /\{% officialRules %}(.+?)\{% end officialRules %}/,
                    `<a href="${rules_link}">$1</a>`
                )
                .replace(
                    /\{% stateDisclosure %}(.+?)\{% end stateDisclosure %}/,
                    `<a href="${disclosure_link}">$1</a>`
                );

            const SPAN_ELEMENT = new SDG.Component.Element({
                tag: 'span',
                content: opt_in_text,
            }).el;

            NEW_FOOTER_ELEMENT.appendChild(SPAN_ELEMENT);
            FOOTER_ELEMENT.after(NEW_FOOTER_ELEMENT);

        } else if (CURRENT_STEP === SHIPPING_STEP) {
            const shipping_copy = data && data.shipping && data.shipping.copy;
            const SPAN_ELEMENT = new SDG.Component.Element({
                tag: 'span',
                content: shipping_copy,
            }).el;

            NEW_FOOTER_ELEMENT.appendChild(SPAN_ELEMENT);
            FOOTER_ELEMENT.after(NEW_FOOTER_ELEMENT);
        }
    }
}
