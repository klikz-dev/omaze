/* eslint-disable no-console */
window.SDG = { ...window.SDG || {} };
window.SDG.CartHandler = window.SDG.CartHandler || {};

const CLICK_EVENT = 'click';
const CHECKOUT_OPTIONS = {
    GUEST: 'guest',
    MEMBER: 'member',
};
const RADIO_LABEL = 'radio-label';
const RADIO_INPUT_NAME = 'checkout';

let data;

function addEntriesToCart(e) {
    e.stopImmediatePropagation();
    const { id } = this.dataset;
    const data = {
        quantity: 1,
        id: id,
    };

    startLoading(this);
    addItem(data, this);
}

function addItem(data, element) {
    return fetch('/cart/add.js', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(() => {
            window.location.href = '/cart';
        })
        .catch((err) => {
            console.error('[CART][ADD ITEM] Error:', err);
            stopLoading(element);
        });
}

function startLoading(element) {
    if (_.hasClass(element, 'oz-btn--cta')) {
        // add loading / disable button
        element.disabled = true;
        element.style.pointerEvents = 'none';
        _.addClass(element, 'is-loading');
        _.addClass(element, 'is-loading--white');
    }
}

function stopLoading(element) {
    if (_.hasClass(element, 'oz-btn--cta')) {
        // remove loading / disabled flag
        element.disabled = false;
        element.style.pointerEvents = 'all';
        _.removeClass(element, 'is-loading');
        _.removeClass(element, 'is-loading--white');
    }
}

function addToCartHandler() {
    _.addEvent({
        event: 'click',
        id: 'pvExperience',
        className: 'js-add-entries',
        fn: addEntriesToCart,
    });
}

function initConfig(config) {
    data = config;
}

function handleClick(myRadio) {
    data.checked = myRadio.value;

    renderCheckoutOptions();
}

function continueToCheckoutButton() {
    const divConfig = {
        classStyles: 'display-flex centered-v checkout-button',
    };
    const buttonParent = SDG.Utility.HtmlElement.createDiv(divConfig);

    const linkConfig = {
        tag: 'a',
        cssClasses: 'standard-button display-flex centered-h centered-v',
        text: 'Continue to checkout',
        attributes: {
            href: '/checkout',
            'data-oa-id': 'checkoutCTA',
        },
    };

    const checkoutLink = new SDG.Component.Element(linkConfig);

    buttonParent.appendChild(checkoutLink.el);

    return buttonParent;
}

function createAccountButton() {
    const divConfig = {
        classStyles: 'login-buttons display-flex centered-v',
    };
    const createAccountContainer = SDG.Utility.HtmlElement.createDiv(divConfig);

    const linkConfig = {
            tag: 'a',
            attributes: {
            href: `/account/register?checkout_url=${encodeURIComponent(
                window.location.origin
            )}/checkout`,
        },
        cssClasses: 'ghost-button display-flex centered-h centered-v',
        content: 'Create Account',
    }
    const createAccountLink = new SDG.Component.Element(linkConfig);

    createAccountLink && createAccountContainer.appendChild(createAccountLink.el);

    return createAccountContainer;
}

function loginButton() {
    const divConfig = {
        classStyles: 'login-buttons display-flex centered-v',
    };
    const loginContainer = SDG.Utility.HtmlElement.createDiv(divConfig);

    const linkConfig = {
        tag: 'a',
        attributes: {
            href: `/account/login?checkout_url=${encodeURIComponent(
                window.location.origin
            )}/checkout`,
        },
        cssClasses: 'standard-button display-flex centered-h centered-v',
        content: 'Log in',
    }
    const loginLink = new SDG.Component.Element(linkConfig);

    loginContainer.appendChild(loginLink.el);

    return loginContainer;
}

function combineAuthButtons() {
    const divConfig = {
        classStyles: 'display-flex guest-or-user centered-h centered-v',
    };
    const authParentContainer = SDG.Utility.HtmlElement.createDiv(divConfig);
    const createAccountLink = createAccountButton();
    const loginLink = loginButton();

    authParentContainer.appendChild(createAccountLink);
    authParentContainer.appendChild(loginLink);

    return authParentContainer;
}

function guestRadioOption() {
    const divConfig = {
        classStyles: 'radio',
    };
    const guestRadioParent = SDG.Utility.HtmlElement.createDiv(divConfig);

    const inputConfig = {
        id: CHECKOUT_OPTIONS.GUEST,
        name: RADIO_INPUT_NAME,
        value: CHECKOUT_OPTIONS.GUEST,
        isChecked: data.checked === CHECKOUT_OPTIONS.GUEST,
    }
    const radioInput = SDG.Utility.HtmlElement.createRadioInput(inputConfig);
    radioInput.addEventListener(CLICK_EVENT, function() {
        handleClick(this);
    });

    const labelConfig = {
        labelFor: CHECKOUT_OPTIONS.GUEST,
        classStyles: RADIO_LABEL,
        label: 'Checkout as Guest',
    };
    const radioLabel = SDG.Utility.HtmlElement.createLabel(labelConfig);

    guestRadioParent.appendChild(radioInput);
    guestRadioParent.appendChild(radioLabel);

    return guestRadioParent;
}

function memberRadioOption() {
    const DONATION_LABEL = data.donationLabel;
    const LINE_BREAK_EL = 'br';

    const divConfig = {
        classStyles: 'radio',
    };
    const memberRadioParent = SDG.Utility.HtmlElement.createDiv(divConfig);

    const inputConfig = {
        id: CHECKOUT_OPTIONS.MEMBER,
        name: RADIO_INPUT_NAME,
        value: CHECKOUT_OPTIONS.MEMBER,
        isChecked: data.checked === CHECKOUT_OPTIONS.MEMBER,
    }
    const radioInput = SDG.Utility.HtmlElement.createRadioInput(inputConfig);
    radioInput.addEventListener(CLICK_EVENT, function() {
        handleClick(this);
    });

    const labelConfig = {
        labelFor: CHECKOUT_OPTIONS.MEMBER,
        classStyles: RADIO_LABEL,
        label: 'Checkout with Omaze account',
    };
    const radioLabel = SDG.Utility.HtmlElement.createLabel(labelConfig);

    memberRadioParent.appendChild(radioInput);
    memberRadioParent.appendChild(radioLabel);

    const lineBreak = document.createElement(LINE_BREAK_EL);
    memberRadioParent.appendChild(lineBreak);

    const donationLabelConfig = {
        classStyles: 'small-italic track-donation-label radio-equalize',
    };
    const donationLabelContainer = SDG.Utility.HtmlElement.createDiv(donationLabelConfig);
    donationLabelContainer.innerHTML = DONATION_LABEL;

    memberRadioParent.appendChild(donationLabelContainer);

    return memberRadioParent;
}

function renderCheckoutOptions() {
    const ELEMENT_INSERT_POSITION = 'afterbegin';
    const CHECKOUT_OPTIONS_EL = '#pre-checkout';

    const checkoutOptionsContainer = document.querySelector(CHECKOUT_OPTIONS_EL);
    if (!checkoutOptionsContainer) {
        return;
    }

    const continueToCheckoutOption = continueToCheckoutButton();
    if (data.customerExists) {
        checkoutOptionsContainer.insertAdjacentElement(ELEMENT_INSERT_POSITION, continueToCheckoutOption);

        return;
    }

    const guestRadio = guestRadioOption();
    const memberRadio = memberRadioOption();
    const authElements = combineAuthButtons();
    if (data.checked === CHECKOUT_OPTIONS.MEMBER) {
        const CHECKOUT_BUTTON_EL = '.checkout-button';
        const checkoutButton = document.querySelector(CHECKOUT_BUTTON_EL);
        const ELEMENT_INSERT_POSITION = 'afterend';

        if (checkoutButton) {
            checkoutButton.insertAdjacentElement(ELEMENT_INSERT_POSITION, authElements);
            checkoutButton.remove();
        }

        return;
    }

    const RADIO_EL = '.radio';
    const radioElements = document.querySelectorAll(RADIO_EL);
    if (radioElements.length) {
        const ELEMENT_INSERT_POSITION = 'afterend';
        const AUTH_BUTTON_EL = '.guest-or-user';
        const authButtons = document.querySelector(AUTH_BUTTON_EL);

        if (authButtons) {
            authButtons.insertAdjacentElement(ELEMENT_INSERT_POSITION, continueToCheckoutOption);
            authButtons.remove();
        }

        return;
    }

    checkoutOptionsContainer.insertAdjacentElement(ELEMENT_INSERT_POSITION, continueToCheckoutOption);
    checkoutOptionsContainer.insertAdjacentElement(ELEMENT_INSERT_POSITION, memberRadio);
    checkoutOptionsContainer.insertAdjacentElement(ELEMENT_INSERT_POSITION, guestRadio);
}

SDG.CartHandler = {
    AddToCartHandler: addToCartHandler,
    InitConfig: initConfig,
    RenderCheckoutOptions: renderCheckoutOptions,
};

export {
    addItem,
    startLoading,
}
