/**
 * Class representing an 'ozc-link-row' component.
 * Generates a clickable element that that can be used as a link in a list.
 *
 * @export
 * @class LinkRow
 * @extends BaseNode
 *
 * @param {Object} options - options for creating component.
 * @param {string} [options.linkText=] - copy to display in the link.
 * @param {string} [options.imageSrc=] - link image or icon source.
 * @param {string} [options.href=] - href attribute for the link. if present,
 *    will act as a normal link.
 * @param {string} [options.linkIconText=] - text to append to the cta icon, such as 'click here'.
 * @param {function} [options.onClick=] - callback function to execute on click.
 * @param {object} [options.oaAnalytics=] - key/value pairs for analytics data.
 *
 * @example
 *
 *     const myLink = new LinkRow({
 *        linkText: 'See this awesome exprience',
 *        imageSrc: 'http://experience/image.jpg',
 *        onClick: doSomething(),
 *     });
 */

SDG.Component = SDG.Component || {};

SDG.Component.LinkRow = class LinkRow extends SDG.Component.BaseNode {
    constructor (options) {
        options = options || {};

        super(options);

        this.imageSrc = options.imageSrc;
        this.linkText = options.linkText;
        this.href = options.href;
        this.linkIconText = options.linkIconText;
        this.onClick = options.onClick;
        this.oaAnalytics = options.oaAnalytics;

        this.el = this.createEl();

        this.addListener();
    }

    createEl () {
        if (!this.imageSrc && !this.linkText) {
            /* eslint-disable-next-line  no-console */
            console.warn('[SDG.Component.LinkRow] content missing or not valid.');

            return false;
        }

        const CSS_CLASS_BASE = this.constructor.cssBaseClass;
        const CSS_CLASS_IMAGE = `${CSS_CLASS_BASE}__image`;
        const CSS_CLASS_BODY = `${CSS_CLASS_BASE}__body`;
        const CSS_CLASS_ICON = `${CSS_CLASS_BASE}__icon`;
        const CSS_CLASS_ICON_TEXT = `${CSS_CLASS_ICON}-text`;

        let imageEl;
        let bodyEl;
        let iconTextEl;

        if (this.imageSrc) {
            const IMAGE_FORMATTING = '?auto=format&fm=jpg&q=80&fit=crop&crop=entropy&w=150&h=150';
            const IMAGE_SRC = `${this.imageSrc}${IMAGE_FORMATTING}`;

            imageEl = new SDG.Component.Element({
                tag: 'img',
                cssClasses: CSS_CLASS_IMAGE,
                attributes: {
                    src: IMAGE_SRC,
                },
            });
        }

        if (this.linkText) {
            bodyEl = new SDG.Component.Element({
                cssClasses: CSS_CLASS_BODY,
                content: this.linkText,
            });
        }

        if (this.linkIconText) {
            iconTextEl = new SDG.Component.Element({
                cssClasses: CSS_CLASS_ICON_TEXT,
                content: this.linkIconText,
            });
        }

        const iconEl = new SDG.Component.Element({
            cssClasses: CSS_CLASS_ICON,
            children: [
                iconTextEl,
            ],
        });

        const parent = new SDG.Component.Element({
            tag: 'a',
            cssClasses: CSS_CLASS_BASE,
            attributes: {
                href: this.href,
            },
            oaAnalytics: this.oaAnalytics,
            children: [
                imageEl,
                bodyEl,
                iconEl,
            ],
        });

        return parent.el;
    }

    addListener () {
        if (this.href || !this.el) {
            return false;
        }

        this.el.addEventListener('click', this.onElClick.bind(this));
    }

    onElClick (event) {
        if (event) {
            event.preventDefault();
        }

        if (typeof this.onClick === 'function') {
            this.onClick();
        }
    }

    static get cssBaseClass () {
        return 'ozc-link-row';
    }
};

export default SDG.Component.LinkRow;
