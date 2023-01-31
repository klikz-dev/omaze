import  {default as Element} from '../../../components/ozc-element.js';
import { default as Image } from '../../../components/ozc-image.js';
import success from './success';
import config from '../config';
import {
    trackAnalyticsEvent,
    ANALYTICS_EVENTS,
} from './analytics';

const emailCapture = {
    getBaseCssClass() {
        return 'email_capture_container';
    },

    getContent(option, template) {
        const CSS_CLASS_EMAIL_CAPTURE = this.getBaseCssClass();
        const CSS_CLASS_TITLE = `${CSS_CLASS_EMAIL_CAPTURE}__title`;
        const CSS_CLASS_MESSAGE = `${CSS_CLASS_EMAIL_CAPTURE}__message`;
        const CSS_CLASS_IMAGE = `${CSS_CLASS_EMAIL_CAPTURE}__image`;
        const CSS_CLASS_LEGAL_COPY = `${CSS_CLASS_EMAIL_CAPTURE}__legal`;
        const CSS_CLASS_LINK = 'link';
        const DEFAULT_IMG_ASPECT_W = 1;
        const DEFAULT_IMG_ASPECT_H = 1;

        const title = new Element({
            cssClasses: CSS_CLASS_TITLE,
            tag: 'p',
            content: option.formTitle,
        });

        const message = new Element({
            cssClasses: CSS_CLASS_MESSAGE,
            tag: 'p',
            content: option.formMessage,
        });

        const image = new Element({
            cssClasses: CSS_CLASS_IMAGE,
            children: [
                new Image({
                    src: option.image.src,
                    alt: option.image.alt,
                    aspectW: option.image.aspectW || DEFAULT_IMG_ASPECT_W,
                    aspectH: option.image.aspectH || DEFAULT_IMG_ASPECT_H,
                }),
            ],
        });

        const emailElement = this.createEmailElement();

        const buttonElement = this.createButtonElement(option, template);

        let legalCopy = {};
        if (option.legalUrl) {
            legalCopy = new Element({
                attributes: {
                    href: option.legalUrl,
                },
                cssClasses: `${CSS_CLASS_LEGAL_COPY} ${CSS_CLASS_LINK}`,
                tag: 'a',
                content: option.legalCopy,
            });
        } else {
            legalCopy = new Element({
                cssClasses: CSS_CLASS_LEGAL_COPY,
                tag: 'p',
                content: option.legalCopy,
            });
        }


        const content = new Element({
            cssClasses: CSS_CLASS_EMAIL_CAPTURE,
            children: [
                title,
                message,
                image,
                emailElement,
                buttonElement,
                legalCopy,
            ],
        })

        return content;
    },

    createEmailElement() {
        const CSS_CLASS_EMAIL_INPUT = 'input';
        const CSS_CLASS_EMAIL_ELEMENT = 'email oz-field cec';
        const CSS_CLASS_OZ_FIELD_CONTAINER = 'oz-field__container cec';
        const EMAIL_INPUT_ID = 'customerEmailCapture';
        const EMAIL_LABEL_CONTENT = 'Enter email address';
        const EMAIL_ERROR_CONTENT = 'Please enter a valid email address';
        const CSS_CLASS_EMAIL_ERROR_MESSAGE = 'email-error-message';

        const emailInput = new Element({
            tag: 'input',
            cssClasses: CSS_CLASS_EMAIL_INPUT,
            attributes: {
                id: EMAIL_INPUT_ID,
                type: 'email',
            },
        });

        emailInput.el.onchange = this.inputHandler;

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
            content: EMAIL_ERROR_CONTENT,
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
    },

    createButtonElement(option, template) {
        const CSS_CLASS_BUTTON_ELEMENT = 'button';
        const CSS_CLASS_BUTTON = 'oz-btn oz-btn--block cec';
        const CSS_CLASS_BUTTON_LABEL = 'btn__label cec';
        const CSS_CLASS_BUTTON_LOADER = 'button-loader cec hidden';
        const BUTTON_LABEL_CONTENT = option.ctaLabel;
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

        button.el.addEventListener('click', () => {
            this.submitHandler(option, template);
        });

        const buttonElement = new Element({
            cssClasses: CSS_CLASS_BUTTON_ELEMENT,
            children: [
                button,
            ],
        });


        return buttonElement;
    },

    inputHandler(e) {
        const CSS_CLASS_FIELD_CONTAINER = 'oz-field__container cec';
        const CSS_CLASS_HAS_VALUE = 'has-value';
        e.preventDefault();
        const fieldContainer = document.getElementsByClassName(CSS_CLASS_FIELD_CONTAINER)[0];
        if (fieldContainer && e.target.value) {
            fieldContainer.classList.add(CSS_CLASS_HAS_VALUE);
        } else {
            fieldContainer.classList.remove(CSS_CLASS_HAS_VALUE);
        }
    },

    submitHandler(option, template) {
        const CSS_CLASS_MODAL_BODY = 'ozc-modal__body';
        const CSS_CLASS_ERROR = 'error';
        const CSS_CLASS_EMAIL_FIELD = 'cec';
        const CSS_CLASS_ERROR_MESSAGE = 'email-error-message';
        const INVALID_EMAIL_MESSAGE = 'Please enter a valid email address';
        const EMAIL_INPUT_ID = 'customerEmailCapture';
        const ERROR_OCCURRED_MESSAGE = 'an error occurred, please try again!.';
        const BUTTON_CLASS = 'oz-btn oz-btn--block cec';
        const BUTTON_LOADER_ICON_CLASS = 'button-loader cec';
        const BUTTON_LOADING_CLASS = 'btn-loading';
        const BUTTON_LABEL_CLASS = 'btn__label cec';
        const HIDDEN_CLASS = 'hidden';
        const BASE_CLASS = this.getBaseCssClass();

        const emailInputValue = document.getElementById(EMAIL_INPUT_ID).value;

        // eslint-disable-next-line no-useless-escape
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const emailField = document.getElementsByClassName(CSS_CLASS_EMAIL_FIELD)[0];
        const errorMessageField = document.getElementsByClassName(CSS_CLASS_ERROR_MESSAGE)[0];

        // validate the email
        if (!regex.test(emailInputValue)) {

            if (emailField) {
                emailField.classList.add(CSS_CLASS_ERROR)
            }

            if (errorMessageField) {
                errorMessageField.innerHTML = INVALID_EMAIL_MESSAGE;
            }
            return;
        } else {
            emailField.classList.remove(CSS_CLASS_ERROR)
            errorMessageField.innerHTML = '';
        }

        const button = document.getElementsByClassName(BUTTON_CLASS)[0];
        const buttonLabel = document.getElementsByClassName(BUTTON_LABEL_CLASS)[0];
        const buttonLoader = document.getElementsByClassName(BUTTON_LOADER_ICON_CLASS)[0];

        if (button && buttonLabel && buttonLoader) {
            button.disabled = true;
            button.classList.add(BUTTON_LOADING_CLASS);
            buttonLabel.classList.add(HIDDEN_CLASS);
            buttonLoader.classList.remove(HIDDEN_CLASS);
        }

        const optinLists = this.emailOptinLists(option);

        const analyticsConf = {
            event: ANALYTICS_EVENTS.CEC_EMAIL_SUBMITTED,
            ga_label: `${template.tag}-${template.templateId}`,
            ga_value: option.optionId,
            list: option.listName,
        };

        trackAnalyticsEvent(analyticsConf);

        // add user to sailthru list
        // eslint-disable-next-line no-undef
        Sailthru.integration('userSignUp',
            {
                email: emailInputValue,
                key: 'email',
                lists: optinLists,
                vars: {},
                onSuccess: function () {

                    if (button && buttonLabel && buttonLoader) {
                        button.disabled = false;
                        button.classList.remove(BUTTON_LOADING_CLASS);
                        buttonLabel.classList.remove(HIDDEN_CLASS);
                        buttonLoader.classList.add(HIDDEN_CLASS);
                    }

                    const modalBody = document.getElementsByClassName(CSS_CLASS_MODAL_BODY)[0];
                    if (!modalBody) {
                        return;
                    }
                    const modalDiv = modalBody.children[0];
                    if (!modalDiv) {
                        return;
                    }

                    const emailCapture = document.getElementsByClassName(BASE_CLASS)[0];
                    if (emailCapture) {
                        emailCapture.style.display = 'none';
                    }

                    const successContent = success.getContent(option);

                    modalDiv.appendChild(successContent.el);
                },
                onError: function () {
                    if (button && buttonLabel && buttonLoader) {
                        button.disabled = false;
                        button.classList.remove(BUTTON_LOADING_CLASS);
                        buttonLabel.classList.remove(HIDDEN_CLASS);
                        buttonLoader.classList.add(HIDDEN_CLASS);
                    }
                    const errorMessageField = document.getElementsByClassName(CSS_CLASS_ERROR_MESSAGE)[0];
                    if (errorMessageField) {
                        errorMessageField.innerHTML = ERROR_OCCURRED_MESSAGE;
                    }
                    return;
                },
            });
    },

    emailOptinLists (options) {
        const optinLists = {};
        let configLists = config && config.listName;

        if (options && options.listName) {
            optinLists[options.listName] = 1;
        }

        if (typeof(configLists) === 'string') {
            optinLists[configLists] = 1;
        }

        if (Array.isArray(configLists)) {
            configLists.forEach((list) => {
                optinLists[list] = 1;
            });
        }

        return optinLists;
    },
}

export default emailCapture;
