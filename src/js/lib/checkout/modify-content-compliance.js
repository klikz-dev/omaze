SDG.Checkout = SDG.Checkout || {};
SDG.Checkout.Content = SDG.Checkout.Content || {}
SDG.Checkout.Content.Compliance = SDG.Checkout.Content.Compliance || {}

SDG.Checkout.Content.Compliance.init = function () {
    function run () {}

    run();
}

SDG.Checkout.Content.Compliance.changeFreeToBonus = function () {
    watchOrderSummaryToggle();

    triggerBonusTextCheck();

    function changeBonusEntryPriceLabel(changeBonusIntervalCall) {
        const FREE_LABEL = 'free';
        const BONUS_LABEL = 'Bonus';
        const lineItemsNodeList = getLineItemsNodeList();

        lineItemsNodeList.forEach((element) => {
            if (element.innerText === BONUS_LABEL && changeBonusIntervalCall) {
                clearInterval(changeBonusIntervalCall);
            }

            if (
                element.innerText &&
                element.innerText.toLowerCase() === FREE_LABEL
            ) {
                element.innerText = BONUS_LABEL;
            }
        });
    }

    function getLineItemsNodeList() {
        const ITEM_PRICE_ELEMENT_IDENTIFIER = '.product__price > span';
        const ITEM_PRICE_ELEMENTS = document.querySelectorAll(
            ITEM_PRICE_ELEMENT_IDENTIFIER
        );

        return ITEM_PRICE_ELEMENTS;
    }

    function watchOrderSummaryToggle() {
        /*
          NOTE:
            A CSS visibility: unset; call on .js.order-summary--is-collapsed solves the
            problem of changing the Free label to Bonus on mobile devices except iOS.
            This function is explicitly written to handle the label swap on iOS by
            listening for a click on the toggle order summary button.
            There is a setInterval call which is terminated once the label is swapped out and
            this is because the label text doesn't get updated immediately the toggle is clicked,
            hence the need for setInterval.
        */
        const CLICK_EVENT = 'click';
        const ORDER_SUMMARY_TOGGLE_EL = '.order-summary-toggle--show';
        const ORDER_SUMMARY_TOGGLE_CONTAINER = document.querySelector(
            ORDER_SUMMARY_TOGGLE_EL
        );
        const isSafari = /^((?!chrome|android).)*safari/i.test(
            navigator.userAgent
        );
        

        if (!isSafari) {
            return;
        }

        if (!ORDER_SUMMARY_TOGGLE_CONTAINER) {
            return;
        }

        ORDER_SUMMARY_TOGGLE_CONTAINER.addEventListener(CLICK_EVENT, triggerBonusTextCheck);
    }

    function triggerBonusTextCheck() {
        const RETRY_INTERVAL = 50;
        const FREE_LABEL = 'free';
        const lineItemsNodeList = getLineItemsNodeList();
        let hasUpdated = false;
        let isFreeLabel = false;
        let changeBonusIntervalCall;

        lineItemsNodeList
            .forEach((element) => {
                if (element.innerText && element.innerText.toLowerCase() === FREE_LABEL) {
                    isFreeLabel = true;
                }
            });

        if (!isFreeLabel && hasUpdated) {
            return;
        }

        changeBonusIntervalCall = setInterval(() => {
            changeBonusEntryPriceLabel(changeBonusIntervalCall);
            hasUpdated = true;
        }, RETRY_INTERVAL);
    }
}

SDG.Checkout.Content.Compliance.removeMonetaryValueAssociation = function () {
    removeBonusEntryMonetaryValue();

    function removeBonusEntryMonetaryValue() {
        const PRODUCT_WRAPPER_ELEMENT = '.product';
        const CROSSED_ORIGINAL_PRICE_SELECTOR = 'del.total-recap__original-price';
        const CROSSED_ORIGINAL_PRICE_ELEMENT = document.querySelector(CROSSED_ORIGINAL_PRICE_SELECTOR);
        const PRODUCT_WRAPPER = document.querySelectorAll(PRODUCT_WRAPPER_ELEMENT);

        if (CROSSED_ORIGINAL_PRICE_ELEMENT) {
            CROSSED_ORIGINAL_PRICE_ELEMENT.remove();
        }

        PRODUCT_WRAPPER
        .forEach((product) => {
            const CROSSED_PRICE_ELEMENT_SELECTOR = 'del.order-summary__small-text';
            const REDUCTION_CODE_ELEMENT_SELECTOR = '.reduction-code__text';
            const BONUS_TAG = product.querySelector(CROSSED_PRICE_ELEMENT_SELECTOR);

            if (BONUS_TAG) {
                const REDUCTION_CODE = product.querySelector(REDUCTION_CODE_ELEMENT_SELECTOR);
                const priceOfBonusEntry = BONUS_TAG.innerHTML;
                const pricePattern = `(-${priceOfBonusEntry})`;
                const formattedReductionCode = REDUCTION_CODE.innerHTML.replace(pricePattern, '').trim();
        
                BONUS_TAG.remove();

                REDUCTION_CODE.innerHTML = formattedReductionCode;
            }
        });
    }
}
