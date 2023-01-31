/* eslint no-console: 0 */
import Sailthru from '../../../sailthru.js';
import { emailValidation } from '../../../validation';

const teaser = {
    init (config) {
        const options = {
            BASE_CLASS: 'oz-section-teaser',
        };

        // add config to options
        options.config = config || {};

        // get base element
        const baseEl = this.getBaseEl(options);
        if (!baseEl) {
            console.error('[SDG.Marketing.teaser.init]: teaser section not found');
            return;
        }

        // add base element to options
        options.baseEl = baseEl;

        const success = this.initEventListeners(options);

        if (success) {
            console.info('[SDG.Marketing.teaser.init]: initialization successful');
        }
    },

    initEventListeners (options) {
        const formEl = this.getSignupFormEl(options);
        const { button: signupFormButton } = this.getButtonEls(formEl);
        if (!signupFormButton) {
            console.error('[SDG.Marketing.teaser.initEventListeners]: signup form button not found');
            return false;
        }

        signupFormButton.addEventListener('click', this.submitHandler(options));
        this.initInputEventListeners(options);

        return true;
    },

    submitHandler (options) {
        return (e) => {
            e.preventDefault();
            this.sailthruHandler(options); 
        };
    },

    sailthruHandler (options) {
        const EMAIL_INPUT_ID = 'ozTeaserOptinCustomerEmail';
        const INVALID_EMAIL_MESSAGE = 'email address is invalid';
        const ERROR_OCCURRED_MESSAGE = 'An error occurred. If the error persists, please contact us at weloveyou@omaze.com';
        const HIDDEN_CLASS = 'hidden';

        const formEl = this.getSignupFormEl(options);
        if (!formEl) {
            console.error('[SDG.Marketing.teaser.sailthruHandler]: signup form not found');
            return false;
        }

        // get Email input
        const emailInputEl = formEl.querySelector(`#${EMAIL_INPUT_ID}`);
        if (!emailInputEl) {
            console.error('[SDG.Marketing.teaser.sailthruHandler]: email input not found');
            return false;
        }

        const emailInputValue = emailInputEl.value;
        // validate email
        if (!emailValidation(emailInputValue)) {
            this.displayEmailError(formEl, INVALID_EMAIL_MESSAGE);
            return false;
        }

        // show loading button
        this.triggerButtonState(formEl, true);

        // convert lists string to array
        const { sailthruEmailLists = '' } = options.config;
        const extractedLists = Sailthru.extractEmailListsFromString(sailthruEmailLists);
        const lists = {};

        extractedLists.forEach((list) => {
            // `1` indicates to add to list
            lists[list] = 1;
        });

        const sailthruConfig = {
            email: emailInputEl.value,
            lists: lists,
            vars : {},
            onSuccess: () => {
                this.triggerButtonState(formEl, false);
                const signupEl = this.getSignupEl(options);
                const confirmationEl = this.getConfirmationEl(options);

                // hide signup view
                if (signupEl) {
                    signupEl.classList.add(HIDDEN_CLASS);
                }

                // show confirmation view
                if (confirmationEl) {
                    confirmationEl.classList.remove(HIDDEN_CLASS);
                }

                this.handleAnalytics();
            },
            onError: () => {
                this.triggerButtonState(formEl, false);
                this.displayEmailError(formEl, ERROR_OCCURRED_MESSAGE);
            },
        };

        const res = Sailthru.signupByEmail(sailthruConfig);
        if (!res) {
            this.triggerButtonState(formEl, false);
            this.displayEmailError(formEl, ERROR_OCCURRED_MESSAGE);
        }
    },

    triggerButtonState (parentEl, isLoading = false) {
        if (!parentEl) {
            return false;
        }

        const BUTTON_LOADING_CLASS = 'btn-loading';
        const HIDDEN_CLASS = 'hidden';

        const { button, buttonLabel, buttonLoader } = this.getButtonEls(parentEl);
        if (!button || !buttonLabel || !buttonLoader) {
            console.error('[SDG.Marketing.teaser.triggerButtonState]: button elements not found');
            return false;
        }

        if (isLoading) {
            button.disabled = true;
            button.classList.add(BUTTON_LOADING_CLASS);
            buttonLabel.classList.add(HIDDEN_CLASS);
            buttonLoader.classList.remove(HIDDEN_CLASS);
        } else {
            button.disabled = false;
            button.classList.remove(BUTTON_LOADING_CLASS);
            buttonLabel.classList.remove(HIDDEN_CLASS);
            buttonLoader.classList.add(HIDDEN_CLASS);
        }
    },

    displayEmailError (parentEl, message) {
        if (!parentEl || !message) {
            return false;
        }

        const INPUT_CONTAINER_CLASS = 'oz-field';
        const EMAIL_ERROR_CLASS = 'email-error-message';
        const HIDDEN_CLASS = 'hidden';
        const ERROR_CLASS = 'error';

        const inputContainerEl = parentEl.getElementsByClassName(INPUT_CONTAINER_CLASS)[0];
        const el = parentEl.getElementsByClassName(EMAIL_ERROR_CLASS)[0];
        if (!el) {
            return false;
        }

        el.innerHTML = message;
        el.classList.remove(HIDDEN_CLASS);
        if (inputContainerEl) {
            inputContainerEl.classList.add(ERROR_CLASS);
        }
    },

    getButtonEls (parentEl) {
        if (!parentEl) {
            return {};
        }

        const BUTTON_CLASS = 'oz-btn oz-btn--block';
        const BUTTON_LOADER_ICON_CLASS = 'button-loader';
        const BUTTON_LABEL_CLASS = 'btn__label';

        const button = parentEl.getElementsByClassName(BUTTON_CLASS)[0];
        const buttonLabel = parentEl.getElementsByClassName(BUTTON_LABEL_CLASS)[0];
        const buttonLoader = parentEl.getElementsByClassName(BUTTON_LOADER_ICON_CLASS)[0];

        return {
            button: button,
            buttonLabel: buttonLabel,
            buttonLoader: buttonLoader,
        };
    },

    getBaseEl (options) {
        const { BASE_CLASS } = options || {};
        const el = document.getElementsByClassName(BASE_CLASS)[0];
        if (!el) {
            return false;
        }

        return el;
    },

    getSignupFormEl (options) {
        const { BASE_CLASS, baseEl } = options || {};

        const SIGNUP_FORM_CLASS = `${BASE_CLASS}__signup-form`;

        const formEl = baseEl.getElementsByClassName(SIGNUP_FORM_CLASS)[0];
        if (!formEl) {
            return false;
        }

        return formEl;
    },

    getSignupEl (options) {
        const { BASE_CLASS, baseEl } = options || {};

        const SIGNUP_CLASS = `${BASE_CLASS}__signup`;

        const el = baseEl.getElementsByClassName(SIGNUP_CLASS)[0]
        if (!el) {
            return false;
        }

        return el;
    },

    getConfirmationEl (options) {
        const { BASE_CLASS, baseEl } = options || {};
        const CONFIRMATION_CLASS = `${BASE_CLASS}__confirmation`;

        const el = baseEl.getElementsByClassName(CONFIRMATION_CLASS)[0];
        if (!el) {
            return false;
        }

        return el;
    },

    initInputEventListeners(options) {
        const { baseEl } = options || {};

        const INPUT_FIELD_SELECTOR = '.oz-field__container > input';
        const CSS_CLASS_HAS_VALUE = 'has-value';

        const inputs = baseEl.querySelectorAll(INPUT_FIELD_SELECTOR);
        inputs.forEach((ele) => {
            if (ele) {
                ele.addEventListener('change', (e) => {
                    e.preventDefault();
                    if (e.target.value) {
                        ele.parentElement.classList.add(CSS_CLASS_HAS_VALUE);
                    } else {
                        ele.parentElement.classList.remove(CSS_CLASS_HAS_VALUE);
                    }
                });
            }
        });
    },

    handleAnalytics() {
        if (window.dataLayer) {
            window.dataLayer.push({
                'event': 'teaser_email_submission',
            });
        }
        
    },
}

export default teaser;
