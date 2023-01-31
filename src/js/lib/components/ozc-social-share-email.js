/**
 * Class representing an 'ozc-social-share-widget--email' component.
 * Generates a link component with a mailto href, incuding email subject and body params.
 *
 * @export
 * @class SocialShareEmail
 * @extends BaseNode
 *
 * @param {object} options - options for creating component.
 * @param {string} [options.email=] - email address.
 * @param {string} [options.subject=] - text for email subject line.
 * @param {string} [options.body=] - text for email body content.
 * @param {object} [options.oaAnalytics=] - key/value pairs for analytics data.
 *
 * @example
 *
 *     const myWidget = new SocialShareEmail({
 *         email: 'brian@omaze.com',
 *         subject: 'Your lucky day',
 *         body: 'I have a legal business preposition for you worth $45,275,000.00...',
 *         oaAnalytics: {
 *             track: 'click',
 *             id: 'some ID',
 *             details: 'some Details',
 *         },
 *     });
 */

SDG.Component = SDG.Component || {};

SDG.Component.SocialShareEmail = class SocialShareEmail extends SDG.Component.BaseNode {
    constructor (options) {
        options = options || {};

        super(options);

        this.email = options.email;
        this.subject = options.subject;
        this.body = options.body;
        this.oaAnalytics = options.oaAnalytics;

        this.el = this.createEl();
    }

    createEl () {
        const CSS_CLASS_BASE = this.constructor.cssBaseClass;
        const CSS_CLASS_EMAIL = `${CSS_CLASS_BASE}--email`;
        const href = this.getHref();

        const component = new SDG.Component.Element({
            tag: 'a',
            cssClasses: `${CSS_CLASS_BASE} ${CSS_CLASS_EMAIL}`,
            attributes: {
                href: href,
            },
            oaAnalytics: this.oaAnalytics,
        });

        return component.el;
    }

    getHref () {
        const options = [];
        let href = 'mailto:';

        if (this.email) {
            href = `${href}${this.email}`;
        }

        if (this.subject) {
            const SUBJECT_PARAM = `subject=${encodeURIComponent(this.subject)}`;

            options.push(SUBJECT_PARAM);
        }

        if (this.body) {
            const BODY_PARAM = `body=${encodeURIComponent(this.body)}`;

            options.push(BODY_PARAM);
        }

        options.forEach((option, index) => {
            let separator = '?';

            if (index > 0) {
                separator = '&';
            }

            href = `${href}${separator}${option}`;
        });

        return href;
    }

    static get cssBaseClass () {
        const CSS_CLASS_BASE = 'ozc-social-share-widget';

        return CSS_CLASS_BASE;
    }
};

export default SDG.Component.SocialShareEmail;
