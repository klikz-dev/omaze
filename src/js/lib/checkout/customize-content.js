import {default as Element} from '../components/ozc-element.js';
import Sailthru from '../sailthru.js';
import { emailValidation } from '../validation.js';

SDG.Checkout = SDG.Checkout || {};
SDG.Checkout.Content = SDG.Checkout.Content || {};
SDG.Checkout.Content.Customize = SDG.Checkout.Content.Customize || {};

SDG.Checkout.Content.Customize.init = function() {
    function run() {
        hideOrderDetailsIfAppropriate();
        stopLoaderAndShowContent();
        hideShopifyContinueShoppingButton();
        insertOptinContainer();
    }

    run();

    function hideOrderDetailsIfAppropriate() {
        if (!checkIsThankYouPage()) {
            return;
        }

        const SECTION_CLASS = 'section';
        const ORDER_DETAILS_WRAPPER_CLASS = 'section__content';

        const orderDetailsWrapper = document.querySelector(
            `.${SECTION_CLASS} > .${ORDER_DETAILS_WRAPPER_CLASS}`
        );

        if (!orderDetailsWrapper) {
            return;
        }

        const SECTION_TOP_PADDING = '3em';
        const ORDER_DETAILS_CLASS = 'content-box';
        const DISPLAY_STYLE_NONE = 'none';

        const orderDetailsElements = orderDetailsWrapper.getElementsByClassName(
            ORDER_DETAILS_CLASS
        );
        for (let index = 0; index < orderDetailsElements.length; index++) {
            const element = orderDetailsElements[index];
            element.style.display = DISPLAY_STYLE_NONE;
        }
        // compensates for the padding top on the container element
        orderDetailsWrapper.style.marginTop = `-${SECTION_TOP_PADDING}`;
    }

    function stopLoaderAndShowContent() {
        const CHECKOUT_WRAPPER_IDENTIFIER = '.checkout-wrapper';
        const CHECKOUT_SPINNER_IDENTIFIER = '.checkout-spinner';
        const DISPLAY_STYLE_NONE = 'none';
        const DISPLAY_STYLE_BLOCK = 'block';

        const checkoutWrapper = document.querySelector(
            CHECKOUT_WRAPPER_IDENTIFIER
        );
        const checkoutSpinner = document.querySelector(
            CHECKOUT_SPINNER_IDENTIFIER
        );
        if (!checkoutSpinner || !checkoutWrapper) {
            /* eslint-disable-next-line  no-console */
            console.warn(
                '[SDG.Checkout.Content.Customize>stopLoaderAndShowContent] checkout wrapper and spinner elements are required.'
            );
            return;
        }
        checkoutSpinner.style.display = DISPLAY_STYLE_NONE;
        checkoutWrapper.style.display = DISPLAY_STYLE_BLOCK;
    }

    function hideShopifyContinueShoppingButton() {
        if (!checkIsThankYouPage()) {
            return;
        }

        const SHOPIFY_CTA_BUTTON_CONTAINER_IDENTIFIER = '.step__footer';
        const SHOPIFY_CTA_BUTTON_IDENTIFIER = 'a.step__footer__continue-btn';

        const shopifyCTAButtonContainer = document.querySelector(
            SHOPIFY_CTA_BUTTON_CONTAINER_IDENTIFIER
        );

        if (!shopifyCTAButtonContainer) {
            return;
        }

        // Remove the top margin to adjust spacing of the need help text
        shopifyCTAButtonContainer.style.marginTop = 0;

        const shopifyCTAButton = shopifyCTAButtonContainer.querySelector(
            SHOPIFY_CTA_BUTTON_IDENTIFIER
        );

        if (!shopifyCTAButton) {
            return;
        }

        const DISPLAY_STYLE_NONE = 'none';
        shopifyCTAButton.style.display = DISPLAY_STYLE_NONE;
    }

    function checkIsThankYouPage() {
        const THANK_YOU_STEP = 'thank_you';
        const checkout = Shopify && Shopify.Checkout;
        const CURRENT_STEP = checkout && checkout.step;
        const IS_ORDER_STATUS_PAGE = checkout && checkout.isOrderStatusPage;
        const IS_THANK_YOU_PAGE = CURRENT_STEP === THANK_YOU_STEP;

        return IS_THANK_YOU_PAGE || IS_ORDER_STATUS_PAGE;
    }

    function insertOptinContainer() {
        if (!checkIsThankYouPage()) {
            return;
        }

        const topSection = createTopSection();
        const middleSection = createMiddleSection();
        const optinContainer = createOptinContainer(topSection, middleSection);

        const footerElement = document.getElementById('checkout_optin');
        if (footerElement) {
            footerElement.insertAdjacentElement('afterbegin', optinContainer.el)
        }
    }

    function createOptinContainer(topSection, middleSection) {
        const CSS_CLASS_OPTIN_CONTAINER = 'optin-container';
        const optinContainer = new Element({
            cssClasses: CSS_CLASS_OPTIN_CONTAINER,
            children: [
                topSection,
                middleSection,
            ],
        });

        return optinContainer;
    }

    function createTopSection() {
        const CSS_CLASS_TOP_SECTION = 'optin-container__top';
        const CSS_CLASS_TOP_SECTION_TITLE = 'optin-container__top-title';
        const TITLE_CONTENTS = ['GET A DREAMY INBOX']
        const topSectionElement = new Element({
            cssClasses: CSS_CLASS_TOP_SECTION,
            children: [
                new Element({
                    cssClasses: CSS_CLASS_TOP_SECTION_TITLE,
                    tag: 'h2',
                    content: TITLE_CONTENTS[0],
                }),
            ],
        });

        return topSectionElement;
    }

    function createMiddleSection() {
        const CSS_CLASS_MIDDLE_SECTION = 'optin-container__middle';
        const CSS_CLASS_MIDDLE_SECTION_FORM = 'optin-container__middle-form';
        const CSS_CLASS_MIDDLE_SECTION_SUBTEXT = 'optin-container__middle-subtext';
        const SUB_TEXT = 'Want extra entries, winner info, impact updates and more? Sign up for our emails! It\'s not required, you can opt out at any time and we don\'t sell your info to third parties.';

        const emailElement = createEmailElement();
        const buttonElement = createButtonElement();

        const optinFormElement = new Element({
            cssClasses: CSS_CLASS_MIDDLE_SECTION_FORM,
            children: [
                emailElement,
                buttonElement,
            ],
        });

        const subtextElement = new Element({
            cssClasses: CSS_CLASS_MIDDLE_SECTION_SUBTEXT,
            children: [
                new Element({
                    tag: 'span',
                    content: SUB_TEXT,
                }),
            ],
        });

        const middleSectionElement = new Element({
            cssClasses: CSS_CLASS_MIDDLE_SECTION,
            children: [
                optinFormElement,
                subtextElement,
            ],
        });

        return middleSectionElement;
    }

    function createEmailElement() {
        const CSS_CLASS_EMAIL_INPUT = 'input';
        const CSS_CLASS_EMAIL_ELEMENT = 'email oz-field';
        const CSS_CLASS_OZ_FIELD_CONTAINER = 'oz-field__container';
        const CSS_CLASS_EMAIL_ERROR_MESSAGE = 'email-error-message';
        const EMAIL_INPUT_ID = 'ozEmailOptinCustomerEmail';
        const EMAIL_LABEL_CONTENT = 'Enter your email address';

        const emailInput = new Element({
            tag: 'input',
            cssClasses: CSS_CLASS_EMAIL_INPUT,
            attributes: {
                id: EMAIL_INPUT_ID,
                type: 'email',
            },
        });

        emailInput.el.onchange = inputHandler;

        const emailLabel = new Element({
            tag: 'label',
            content: EMAIL_LABEL_CONTENT,
            attributes: {
                for: EMAIL_INPUT_ID,
            },
        });

        const emailError = new Element({
            tag: 'span',
            cssClasses: CSS_CLASS_EMAIL_ERROR_MESSAGE,
            content: 'email address is invalid',
        });

        const emailElement = new Element({
            cssClasses: CSS_CLASS_EMAIL_ELEMENT,
            children: [
                new Element({
                    cssClasses: CSS_CLASS_OZ_FIELD_CONTAINER,
                    children: [
                        emailInput,
                        emailLabel,
                    ],
                }),
                emailError,
            ],
        });

        return emailElement;
    }

    function createButtonElement() {
        const CSS_CLASS_BUTTON_ELEMENT = 'button';
        const CSS_CLASS_BUTTON = 'oz-btn oz-btn--block btn-underline';
        const CSS_CLASS_BUTTON_LABEL = 'btn__label';
        const CSS_CLASS_BUTTON_LOADER = 'button-loader hidden';
        const BUTTON_LABEL_CONTENT = 'Sign up!';
        const LOADER_SRC = '//images.omaze.com/web/assets/images/static/email/loader.svg';
        const ALT_IMAGE_TEXT = 'loader';

        const button = new Element({
            tag: 'button',
            cssClasses: CSS_CLASS_BUTTON,
            attributes: {
                type: 'button',
            },
            children: [
                new Element({
                    tag: 'span',
                    cssClasses: CSS_CLASS_BUTTON_LABEL,
                    content: BUTTON_LABEL_CONTENT,
                }),
                new Element({
                    tag: 'img',
                    cssClasses: CSS_CLASS_BUTTON_LOADER,
                    attributes: {
                        alt: ALT_IMAGE_TEXT,
                        src: LOADER_SRC,
                    },
                }),
            ],
        });

        button.el.onclick = submitHandler;


        const buttonElement = new Element({
            cssClasses: CSS_CLASS_BUTTON_ELEMENT,
            children: [
                button,
            ],
        });

        return buttonElement;
    }

    function submitHandler(e) {
        e.preventDefault();
        const CSS_CLASS_OPTIN_CONTAINER = 'optin-container';
        const CSS_CLASS_SUCCESS_SECTION = 'optin-container-success';
        const CSS_CLASS_TITLE = 'title';
        const CSS_CLASS_MESSAGE = 'message';
        const CSS_CLASS_TITLE_CONTENT = 'You\'re in!';
        const CSS_CLASS_MESSAGE_CONTENT = 'Prepare for awesomeness.';
        const CSS_CLASS_EMAIL_FIELD = 'oz-field';
        const CSS_CLASS_ERROR = 'error';
        const CSS_CLASS_ERROR_MESSAGE = 'email-error-message';
        const BUTTON_CLASS = 'oz-btn oz-btn--block btn-underline';
        const BUTTON_LOADER_ICON_CLASS = 'button-loader';
        const BUTTON_LOADING_CLASS = 'btn-loading';
        const BUTTON_LABEL_CLASS = 'btn__label';
        const HIDDEN_CLASS = 'hidden';
        const EMAIL_INPUT_ID = 'ozEmailOptinCustomerEmail';
        const INVALID_EMAIL_MESSAGE = 'email address is invalid';
        const ERROR_OCCURRED_MESSAGE = 'An error occurred. If the error persists, please contact us at weloveyou@omaze.com';

        const optinRootEl = document.getElementsByClassName(CSS_CLASS_OPTIN_CONTAINER)[0];

        if (!optinRootEl) {
            /* eslint-disable-next-line  no-console */
            console.error(`[SDG.Marketing.Optin submitHandler] cannot find root element by className: ${CSS_CLASS_OPTIN_CONTAINER}`);

            return false;
        }

        const emailInputValue = document.getElementById(EMAIL_INPUT_ID).value;
        const emailField = optinRootEl.getElementsByClassName(CSS_CLASS_EMAIL_FIELD)[0];
        const errorMessageField = optinRootEl.getElementsByClassName(CSS_CLASS_ERROR_MESSAGE)[0];

        // check if Sailthru lib loaded
        if (!Sailthru.getSailthruObject() || typeof(Sailthru.getSailthruObject().integration) !== 'function') {
            if (emailField) {
                emailField.classList.add(CSS_CLASS_ERROR)
            }

            if (errorMessageField) {
                errorMessageField.innerHTML = ERROR_OCCURRED_MESSAGE;
            }

            /* eslint-disable-next-line  no-console */
            console.error('[SDG.Marketing.Optin submitHandler] Sailthru lib not loaded.');

            return false;
        }

        // validate the email
        if (!emailValidation(emailInputValue)) {
            if (emailField) {
                emailField.classList.add(CSS_CLASS_ERROR)
            }

            if (errorMessageField) {
                errorMessageField.innerHTML = INVALID_EMAIL_MESSAGE;
            }
            return;
        }

        const button = optinRootEl.getElementsByClassName(BUTTON_CLASS)[0];
        const buttonLabel = optinRootEl.getElementsByClassName(BUTTON_LABEL_CLASS)[0];
        const buttonLoader = optinRootEl.getElementsByClassName(BUTTON_LOADER_ICON_CLASS)[0];

        if (button && buttonLabel && buttonLoader) {
            button.disabled = true;
            button.classList.add(BUTTON_LOADING_CLASS);
            buttonLabel.classList.add(HIDDEN_CLASS);
            buttonLoader.classList.remove(HIDDEN_CLASS);
        }

        // add user to sailthru list
        // eslint-disable-next-line no-undef
        const sailthruConfig = {
            email: emailInputValue,
            key: 'email',
            lists: {
                [Sailthru.lists.EVERGREEN_LIST] : 1,
                [Sailthru.lists.MASTER_LIST]: 1,
            },
            vars : {},
            onSuccess: function() {
                if (button && buttonLabel && buttonLoader) {
                    button.disabled = false;
                    button.classList.remove(BUTTON_LOADING_CLASS);
                    buttonLabel.classList.remove(HIDDEN_CLASS);
                    buttonLoader.classList.add(HIDDEN_CLASS);
                }

                optinRootEl.classList.add(HIDDEN_CLASS);

                const footerElement = document.getElementsByTagName('footer')[0];

                if (footerElement) {
                    const successSection = new Element({
                        cssClasses: CSS_CLASS_SUCCESS_SECTION,
                        children: [
                            new Element({
                                children: [
                                    new Element({
                                        tag: 'p',
                                        cssClasses: CSS_CLASS_TITLE,
                                        content: CSS_CLASS_TITLE_CONTENT,
                                    }),
                                    new Element({
                                        tag: 'p',
                                        cssClasses: CSS_CLASS_MESSAGE,
                                        content: CSS_CLASS_MESSAGE_CONTENT,
                                    }),
                                ],
                            }),
                        ],
                    });
                    footerElement.insertAdjacentElement('beforebegin', successSection.el)
                }
            },
            onError: function() {
                if (button && buttonLabel && buttonLoader) {
                    button.disabled = false;
                    button.classList.remove(BUTTON_LOADING_CLASS);
                    buttonLabel.classList.remove(HIDDEN_CLASS);
                    buttonLoader.classList.add(HIDDEN_CLASS);
                }

                if (emailField) {
                    emailField.classList.add(CSS_CLASS_ERROR)
                }

                if (errorMessageField) {
                    errorMessageField.innerHTML = ERROR_OCCURRED_MESSAGE;
                }
                return;
            },
        };

        Sailthru.signupByEmail(sailthruConfig);
    }

    function inputHandler(e) {
        const CSS_CLASS_FIELD_CONTAINER = 'oz-field__container';
        const CSS_CLASS_HAS_VALUE = 'has-value';
        e.preventDefault();
        const fieldContainer = document.getElementsByClassName(CSS_CLASS_FIELD_CONTAINER)[0];
        if (fieldContainer && e.target.value) {
            fieldContainer.classList.add(CSS_CLASS_HAS_VALUE);
        } else {
            fieldContainer.classList.remove(CSS_CLASS_HAS_VALUE);
        }
    }
};
