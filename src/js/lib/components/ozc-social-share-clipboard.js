/**
 * Class representing an 'ozc-social-share-widget--copy-link' component.
 * Generates a component which, upon clicking it, will copy predefined content to computer clipboard.
 *
 * @export
 * @class SocialShareClipboard
 * @extends BaseNode
 *
 * @param {object} options - options for creating component.
 * @param {string} [options.content=window.location.href] - text representing text to copy to clipboard.
 * @param {object} [options.oaAnalytics=] - key/value pairs for analytics data.
 *
 * @example
 *
 *     const myWidget = new SocialShareClipboard({
 *         content: 'this will get copied',
 *         oaAnalytics: {
 *             track: 'click',
 *             id: 'some ID',
 *             details: 'some Details',
 *         },
 *     });
 */

SDG.Component = SDG.Component || {};

SDG.Component.SocialShareClipboard = class SocialShareClipboard extends SDG.Component.BaseNode {
    constructor (options) {
        options = options || {};

        super(options);

        this.content = options.content || this.constructor.defaults.content;
        this.inputId = this.constructor.generateUniqueId();
        this.oaAnalytics = options.oaAnalytics;

        this.el = this.createEl();

        this.addListener();
    }

    createEl () {
        const CSS_CLASS_BASE = this.constructor.cssBaseClass;
        const CSS_CLASS_COPY = `${CSS_CLASS_BASE}--copy-link`;
        const INTPUT_TYPE = 'text';
        const READONLY_VALUE = true;

        const copyInput = new SDG.Component.Element({
            tag: 'input',
            attributes: {
                value: this.content,
                id: this.inputId,
                type: INTPUT_TYPE,
                readonly: READONLY_VALUE,
            },
        })

        const component = new SDG.Component.Element({
            cssClasses: `${CSS_CLASS_BASE} ${CSS_CLASS_COPY}`,
            oaAnalytics: this.oaAnalytics,
            children: [
                copyInput,
            ],
        });

        return component.el;
    }

    copy () {
        // confirm the element is in the DOM
        const target = document.getElementById(this.inputId);

        if (!target) {
            /* eslint-disable-next-line  no-console */
            console.error('[SDG.Component.SocialShareClipboard.copy] element not found in DOM');

            return false;
        }

        target.select();

        const success = document.execCommand('copy');

        if (!success) {
            /* eslint-disable-next-line  no-console */
            console.error('[SDG.Component.SocialShareClipboard] failed to copy.');

            return false;
        }

        return this.onCopySuccess();
    }

    onCopySuccess () {
        const CSS_CLASS_BASE = this.constructor.cssBaseClass;
        const CSS_CLASS_COPY_SUCCCESS = `${CSS_CLASS_BASE}--copy-link-success`;

        this.el.classList.add(CSS_CLASS_COPY_SUCCCESS);
    }

    addListener () {
        if (!this.el) {
            return false;
        }

        this.el.addEventListener('click', this.copy.bind(this));
    }

    static generateUniqueId () {
        const UNIQUE_ID = `oz-copy-el-${Date.now()}`;

        return UNIQUE_ID;
    }

    static get defaults () {
        const CONTENT = window.location.href;

        return {
            content: CONTENT,
        };
    }

    static get cssBaseClass () {
        const CSS_CLASS_BASE = 'ozc-social-share-widget';

        return CSS_CLASS_BASE;
    }
};

export default SDG.Component.SocialShareClipboard;
