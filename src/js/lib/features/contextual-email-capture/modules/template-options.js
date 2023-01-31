import { default as Modal } from '../../../components/ozc-modal.js';
import { default as Config } from '../config.js';
import { default as Element } from '../../../components/ozc-element.js';
import { default as Image } from '../../../components/ozc-image.js';
import { default as EmailCapture } from './email-capture';
import {
    trackAnalyticsEvent,
    ANALYTICS_EVENTS,
} from './analytics';

const templateOptions = {
    getBaseCssClass() {
        return 'oz-contextual-email-capture';
    },

    createTemplateHeader(template) {
        const CSS_CLASS_HEADER = 'template-preferences__header';
        const CSS_CLASS_HEADER_TITLE = `${CSS_CLASS_HEADER}--title`;
        const CSS_CLASS_HEADER_MESSAGE = `${CSS_CLASS_HEADER}--message`;

        const header = new Element({
            cssClasses: CSS_CLASS_HEADER,
            children: [
                new Element({
                    cssClasses: CSS_CLASS_HEADER_TITLE,
                    content: template.intro.title,
                }),
                new Element({
                    tag: 'h2',
                    cssClasses: CSS_CLASS_HEADER_MESSAGE,
                    content: template.intro.message,
                }),
            ],
        });

        return header;
    },

    createTemplateOption(optionConfig, template) {
        const CSS_CLASS_OPTION = 'template-preferences__options--option';
        const CSS_CLASS_OPTION_IMAGE = `${CSS_CLASS_OPTION}-image`;
        const CSS_CLASS_OPTION_CAPTION = `${CSS_CLASS_OPTION}-caption`;
        const DEFAULT_IMG_ASPECT_W = 1;
        const DEFAULT_IMG_ASPECT_H = 1;

        const optionImage = new Image({
            cssClasses: CSS_CLASS_OPTION_IMAGE,
            src: optionConfig.image.src,
            alt: optionConfig.image.alt,
            aspectW: optionConfig.image.aspectW || DEFAULT_IMG_ASPECT_W,
            aspectH: optionConfig.image.aspectH || DEFAULT_IMG_ASPECT_H,
        });

        const option = new Element({
            cssClasses: CSS_CLASS_OPTION,
            children: [
                optionImage,
                new Element({
                    cssClasses: CSS_CLASS_OPTION_CAPTION,
                    content: optionConfig.image.caption,
                }),
            ],
        })

        const analyticsConf = {
            event: ANALYTICS_EVENTS.CEC_OPTION_SELECTED,
            ga_label: `${template.tag}-${template.templateId}`,
            ga_value: optionConfig.optionId,
            list: optionConfig.listName,
        };

        option.el.addEventListener('click', () => {
            trackAnalyticsEvent(analyticsConf);

            this.navigateToOption(optionConfig, template);
        });

        return option;
    },

    combineTemplateOptions(template) {
        const templateOptions = template.options;
        if (!templateOptions.length) {
            return false;
        }

        const CSS_CLASS_OPTIONS = 'template-preferences__options';

        const optionsChildren = [];

        templateOptions.forEach(option => {
            optionsChildren.push(this.createTemplateOption(option, template));
        });

        const separator = new Element({
            cssClasses: `${CSS_CLASS_OPTIONS}--separator`,
            content: 'or',
        });

        const options = new Element({
            cssClasses: CSS_CLASS_OPTIONS,
            children: [
                ...optionsChildren,
                separator,
            ],
        });

        return options;
    },

    createModal(template) {
        const CSS_CLASS_TEMPLATE_OPTIONS = 'template-preferences';

        const header = this.createTemplateHeader(template);
        const templateOptions = this.combineTemplateOptions(template);

        const body = new Element({
            cssClasses: CSS_CLASS_TEMPLATE_OPTIONS,
            children: [
                header,
                templateOptions,
            ],
        });

        const content = new Element({
            children: [
                body,
            ],
        });

        const modal = new Modal({
            cssClasses: this.getBaseCssClass(),
            panelHtml: content,
            animation: 'slideUp',
        });

        return modal;
    },

    findTemplatesWithSweepstakeTagAndState(config, templates) {
        const foundTemplates = templates
            .filter((template) => this.hasSweepstakeTagAndState(config, template));

        return foundTemplates;
    },

    hasSweepstakeTagAndState(config, template) {
        const { target, tags } = config;
        const SEPARATOR = ':';
        const SWEEPSTAKE_STATUS_PREFIX = '$oz_sweepstake_status';
        const THANK_YOU_TARGET = 'Thank You';

        let sweepstakePrimaryTag = '';
        let sweepstakeStatusTag = '';

        tags.forEach(tag => {
            if (tag.startsWith(template.sweepstakeTagType)) {
                sweepstakePrimaryTag = tag;
            }

            if (tag.startsWith(SWEEPSTAKE_STATUS_PREFIX)) {
                sweepstakeStatusTag = tag;
            }
        });

        const statusTagValue = sweepstakeStatusTag.split(SEPARATOR)[1] || '';
        const primaryTagValue = sweepstakePrimaryTag.split(SEPARATOR)[1] || '';
        if (
            target.toLowerCase() !== THANK_YOU_TARGET.toLowerCase() &&
            statusTagValue.toLowerCase() !== template.sweepstakeState.toLowerCase() ||
            primaryTagValue.toLowerCase() !== template.tag.toLowerCase()
        ) {
            return false;
        }

        if (
            target.toLowerCase() === THANK_YOU_TARGET.toLowerCase() &&
            primaryTagValue.toLowerCase() !== template.tag.toLowerCase()
        ) {
            return false;
        }

        return true;
    },

    isDateRangeValid(template) {
        const currentTimestamp = Date.now();
        const startDateTimestamp = SDG.Utility.Date.getDateTimestamp(template.startDate);
        const endDateTimestamp = SDG.Utility.Date.getDateTimestamp(template.endDate);

        if (startDateTimestamp <= currentTimestamp && endDateTimestamp >= currentTimestamp) {
            return true;
        }

        return false;
    },

    getAvailableTemplatesByDate(templates) {
        const availableTemplates = templates.filter((template) => this.isDateRangeValid(template));

        return availableTemplates;
    },

    findMatchingTemplates(config) {
        const { target } = config;

        if (!target) {
            return [];
        }

        let templates = Config.templates
            .filter((template) => template.targetPage.toLowerCase() === target.toLowerCase());

        if (!templates.length) {
            return [];
        }

        templates = this.findTemplatesWithSweepstakeTagAndState(config, templates);

        if (!templates.length) {
            return [];
        }

        templates = this.getAvailableTemplatesByDate(templates);

        if (!templates.length) {
            return [];
        }

        return templates;
    },

    showModal(config) {
        const SECOND_IN_MILLISECONDS = 1000;
        const templates = this.findMatchingTemplates(config);

        if (!templates.length) {
            return false;
        }
        const template = templates[0];
        const modal = this.createModal(template);

        if (!modal || !modal.el) {
            return false;
        }

        const timeDelayInSeconds = template.timeDelayInSeconds || 0;

        const analyticsConf = {
            event: ANALYTICS_EVENTS.CEC_MODAL_VISIBLE,
            ga_label: `${template.tag}-${template.templateId}`,
        };

        setTimeout(() => {
            modal.show();
            trackAnalyticsEvent(analyticsConf);
            this.saveUserSession();
        }, timeDelayInSeconds * SECOND_IN_MILLISECONDS);
    },

    unmountTemplatePreferences() {
        const PREFERENCES_CLASS = '.template-preferences';

        const templatePreferences = document.querySelector(PREFERENCES_CLASS);

        if (!templatePreferences) {
            return;
        }

        templatePreferences.style.display = 'none';
    },

    navigateToOption(option, template) {
        const content = EmailCapture.getContent(option, template);
        // get the modal
        const modalBody = document.getElementsByClassName('ozc-modal__body')[0];
        if (!modalBody) {
            return;
        }
        const modalDiv = modalBody.children[0];
        if (!modalDiv) {
            return;
        }

        this.unmountTemplatePreferences();

        // append email capture content to modal body
        modalDiv.appendChild(content.el);
    },

    doesSessionExist() {
        const contextualEmailSession = SDG.getCookie(Config.contextualEmailSessionCookieName);

        return !!contextualEmailSession;
    },

    saveUserSession(value) {
        const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
        let expiration;
        let cookieString;

        const cookieName = Config.contextualEmailSessionCookieName;

        if (!window.ozCookiePermitted(cookieName)) {
            return false;
        }

        const cookieValue = value || 1
        const cookieExpirationDays = parseFloat(Config.cookieExpirationInDays);
        const cookie_ttl_in_ms = cookieExpirationDays && cookieExpirationDays * DAY_IN_MILLISECONDS;

        if (cookie_ttl_in_ms) {
            expiration = new Date();
            expiration.setTime(expiration.getTime() + cookie_ttl_in_ms)
            expiration = expiration.toUTCString();
        }

        cookieString = encodeURI(cookieValue);

        if (expiration) {
            cookieString = `${cookieString}; expires=${expiration}`;
        }

        document.cookie = `${cookieName} = ${cookieString}; path=/`;
    },

    init(config) {
        if (!this.doesSessionExist()) {
            return this.showModal(config);
        }
    },
}

export default templateOptions;
