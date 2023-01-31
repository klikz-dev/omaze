/**
 * Class representing a block quote component.
 * Generates a block quote element with a pre-defined `.ozc-quote-block` style.
 *
 * @export
 * @class QuoteBlock
 * @extends BaseNode
 *
 * @param {Object} options - options for creating an image component.
 * @param {string} options.content - text representing the quote.
 * @param {string} [options.sourceName=] - text representing the source of the quote.
 * @param {string} [options.sourceAffiliate=] - text representing the source affiliate (company name etc...).
 * @param {string} [options.logoUrl=] - src url of an image to use in the component.

 * @example
 *
 *     const myQuote = new SDG.Component.QuoteBlock({
 *        content: 'Something very profound',
 *        sourceName: 'Ian - probably',
 *        sourceAffiliate: 'Bongo Industries',
 *        logoUrl: 'https://files.slack.com/files-pri/T040XHTK1-FRM85PQE7/ian.gif',
 *     });
 */

SDG.Component = SDG.Component || {};

SDG.Component.QuoteBlock = class QuoteBlock extends SDG.Component.BaseNode {
    constructor (options) {
        options = options || {};

        super(options);

        this.content = options.content;
        this.sourceName = options.sourceName;
        this.sourceAffiliate = options.sourceAffiliate;
        this.logoUrl = options.logoUrl;

        this.el = this.createEl();
    }

    static get cssBaseClass () {
        return 'ozc-quote-block';
    }

    createEl () {
        if (!this.content) {
            /* eslint-disable-next-line  no-console */
            console.warn('[SDG.Component.QuoteBlock] content missing or not valid.');

            return false;
        }

        const CSS_CLASS_BASE = this.constructor.cssBaseClass;
        const CSS_CLASS_WRAPPER = `${CSS_CLASS_BASE}__wrapper`;
        let CSS_CLASS_HAS_LOGO = '';

        const logoEl = this.logoEl();

        const innerWrapper = new SDG.Component.Element({
            cssClasses: CSS_CLASS_WRAPPER,
            children: [
                logoEl,
                this.quoteEl(),
                this.sourceEl(),
            ],
        });

        if (logoEl) {
            CSS_CLASS_HAS_LOGO = `${CSS_CLASS_BASE}--has-logo`;
        }

        const component = new SDG.Component.Element({
            cssClasses: `${CSS_CLASS_BASE} ${CSS_CLASS_HAS_LOGO}`,
            children: [
                innerWrapper,
            ],
        });

        return component.el;
    }

    quoteEl () {
        const CSS_CLASS_QUOTE = `${this.constructor.cssBaseClass}__quote`;

        return new SDG.Component.Element({
            cssClasses: CSS_CLASS_QUOTE,
            content: this.content,
        });
    }

    sourceEl () {
        if (!this.sourceName && !this.sourceAffiliate) {
            return false;
        }

        const CSS_CLASS_SOURCE = `${this.constructor.cssBaseClass}__source`;

        return new SDG.Component.Element({
            cssClasses: CSS_CLASS_SOURCE,
            children: [
                this.sourceNameEl(),
                this.sourceAffiliateEl(),
            ],
        });
    }

    sourceNameEl () {
        if (!this.sourceName) {
            return false;
        }

        const CSS_CLASS_SOURCE_NAME = `${this.constructor.cssBaseClass}__source-name`;

        return new SDG.Component.Element({
            cssClasses: CSS_CLASS_SOURCE_NAME,
            content: this.sourceName,
        });
    }

    sourceAffiliateEl () {
        if (!this.sourceAffiliate) {
            return false;
        }

        const CSS_CLASS_SOURCE_ENTITY = `${this.constructor.cssBaseClass}__source-affiliate`;

        return new SDG.Component.Element({
            cssClasses: CSS_CLASS_SOURCE_ENTITY,
            content: this.sourceAffiliate,
        });
    }

    logoEl () {
        if (!this.logoUrl) {
            return false;
        }

        const CSS_CLASS_LOGO = `${this.constructor.cssBaseClass}__logo`;

        const image = new SDG.Component.Element({
            tag: 'img',
            attributes: {
                src: this.logoUrl,
            },
        });

        return new SDG.Component.Element({
            cssClasses: CSS_CLASS_LOGO,
            children: [
                image,
            ],
        });
    }
};

export default SDG.Component.QuoteBlock;
