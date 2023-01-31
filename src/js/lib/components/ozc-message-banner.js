/**
 * Class representing a message banner component.
 * Generates a message banner with content and a type, i.e.: success, error...
 *
 * @export
 * @class MessageBanner
 * @extends BaseNode
 *
 * @param {object} options - options for creating a message banner
 * @param {string} options.content - content to display
 * @param {string} [options.type=info] - type of banner (defaults to info)
 * @param {string} [options.url=] - if given, banner will be a link
 * @param {boolean} [options.linkSameWindow=] - whether to open link (if exists) in same window
 * @param {object} [options.analytics=] - config for pre-defined GA analytics events
 *
 * @example
 *
 *     const myBanner = new MessageBanner({
 *         content: 'This is the best exaple ever!',
 *         type: 'success',
 *     });
 */

 import {default as BaseNode} from './ozc-base-node.js';
 import {default as Element} from './ozc-element.js';

SDG.Component = SDG.Component || {};

SDG.Component.MessageBanner = class MessageBanner extends BaseNode {
    constructor (options) {
        options = options || {};

        super(options);

        this.content = options.content;
        this.type = this.constructor.validMessageType(options.type);
        this.url = this.constructor.validateURL(options.url);
        this.linkSameWindow = !!options.linkSameWindow;
        this.analytics = options.analytics;

        this.el = this.createEl();

        this.addAnalyticsEvents();
    }

    addAnalyticsEvents () {
        if (!this.el || !this.analytics) {
            return false;
        }

        if (this.analytics.onClickLink && this.url) {
            this.el.addEventListener('click', () => {
                SDG.Analytics.events.pushDataLayerEvent(this.analytics.onClickLink);
            });
        }
    }

    createEl () {
        if (!this.content) {
            /* eslint-disable-next-line  no-console */
            console.warn('[SDG.Component.MessageBanner] content missing or not valid.');

            return false;
        }

        const CSS_CLASS_BANNER_TYPE = `${this.constructor.cssBaseClass}--${this.type}`;
        const CSS_CLASS_CONTENT = `${this.constructor.cssBaseClass}__content`;

        const content = new Element({
            cssClasses: CSS_CLASS_CONTENT,
            content: this.content,
        });

        let parentElConfig = {
            cssClasses: `${this.constructor.cssBaseClass} ${CSS_CLASS_BANNER_TYPE}`,
            children: [
                content,
            ],
        };

        if (this.url) {
            parentElConfig = this.elementConfigAsLink(parentElConfig)
        }

        const parent = new Element(parentElConfig);

        return parent.el;
    }

    elementConfigAsLink (elementConfig) {
        if (!this.url) {
            return elementConfig;
        }

        elementConfig.tag = 'a';
        elementConfig.attributes = elementConfig.attributes || {};
        elementConfig.attributes.href = this.url;

        if (!this.linkSameWindow) {
            elementConfig.attributes.target = '_blank';
        }

        return elementConfig;
    }

    static validateURL (url) {
        const regex = /^(http|https):\/\/[^ "]+$/;

        if (!url) {
            return false;
        }

        if (!regex.test(url)) {
            /* eslint-disable-next-line  no-console */
            console.warn(`[SDG.Component.MessageBanner.validateURL] invalid url format: [${url}].`);

            return false;
        }

        return url;
    }

    static validMessageType (messageType) {
        const type = messageType && messageType.toUpperCase();

        if (!this.messageTypes[type]) {
            /* eslint-disable-next-line  no-console */
            console.warn(`[SDG.Component.MessageBanner] invalid message type: [${type}]. Defaulting to 'info'.`);

            return this.defaults.type;
        }

        return this.messageTypes[type];
    }

    static get messageTypes () {
        return {
            INFO: 'info',
            WARNING: 'warning',
            ERROR: 'error',
            SUCCESS: 'success',
        };
    }

    static get defaults () {
        return {
            type: this.messageTypes.INFO,
        };
    }

    static get cssBaseClass () {
        return 'ozc-message-banner';
    }
};

export default SDG.Component.MessageBanner;
