/**
 * Class representing an 'ozc-social-share' component.
 * Generates a social-share component with sub-components per different social channels.
 * Requires a minimum of one of the following to be used:
 *    - facebook
 *    - twitter
 *    - email
 *    - clipboard
 *
 * @export
 * @class SocialShare
 * @extends BaseNode
 *
 * @param {object} options - options for creating component.
 * @param {string} [options.header=] - header text.
 * @param {string} [options.body=] - body text.
 * @param {object} [options.facebook=] - options for SocialShareFacebook component.
 * @param {object} [options.twitter=] - options for SocialShareTwitter component.
 * @param {object} [options.email=] - options for SocialShareEmail component.
 * @param {object} [options.clipboard=] - options for SocialShareClipboard component.
 *
 * @example
 *
 *    const component = new SocialShare({
 *        header: 'Share our stuff!',
 *        body: 'Really. Please share!',
 *        facebook: {
 *            shareUrl: 'www.domain.com',
 *            shareText: 'some text',
 *        },
 *        twitter: {
 *            shareUrl: 'url.com,
 *        },
 *        email: {
 *            subject: 'email subject line copy',
 *        },
 *        clipboard: {
 *            content: 'this will get copied',
 *        },
 *    });
 */

SDG.Component = SDG.Component || {};

SDG.Component.SocialShare = class SocialShare extends SDG.Component.BaseNode {
    constructor (options) {
        options = options || {};

        super(options);

        this.header = options.header;
        this.body = options.body;
        this.facebook = options.facebook;
        this.twitter = options.twitter;
        this.email = options.email;
        this.clipboard = options.clipboard;

        this.el = this.createEl();
    }

    createEl () {
        if (!this.facebook && !this.twitter && !this.email && !this.clipboard) {
            /* eslint-disable-next-line  no-console */
            console.error('[SDG.Component.SocialShare.createEl] invalid data.');

            return false;
        }

        const CSS_CLASS_BASE = this.constructor.cssBaseClass;

        const component = new SDG.Component.Element({
            cssClasses: CSS_CLASS_BASE,
            children: [
                this.headerEl(),
                this.channelEl(),
            ],
        });

        return component.el;
    }

    channelEl () {
        const CSS_CLASS = `${this.constructor.cssBaseClass}__widgets`;

        return new SDG.Component.Element({
            cssClasses: CSS_CLASS,
            children: [
                this.facebookEl(),
                this.twitterEl(),
                this.emailEl(),
                this.clipboardEl(),
            ],
        });
    }

    clipboardEl () {
        if (!this.clipboard) {
            return false;
        }

        return new SDG.Component.SocialShareClipboard({
            content: this.clipboard.content,
            oaAnalytics: this.clipboard.oaAnalytics,
        });
    }

    emailEl () {
        if (!this.email) {
            return false;
        }

        return new SDG.Component.SocialShareEmail({
            email: this.email.email,
            subject: this.email.subject,
            body: this.email.body,
            oaAnalytics: this.email.oaAnalytics,
        });
    }

    twitterEl () {
        if (!this.twitter) {
            return false;
        }

        return new SDG.Component.SocialShareTwitter({
            shareUrl: this.twitter.shareUrl,
            shareText: this.twitter.shareText,
            shareVia: this.twitter.shareVia,
            hashTags: this.twitter.hashTags,
            oaAnalytics: this.twitter.oaAnalytics,
        });
    }

    facebookEl () {
        if (!this.facebook) {
            return false;
        }

        return new SDG.Component.SocialShareFacebook({
            shareUrl: this.facebook.shareUrl,
            shareText: this.facebook.shareText,
            oaAnalytics: this.facebook.oaAnalytics,
        })
    }

    headerEl () {
        const CSS_CLASS_BASE = `${this.constructor.cssBaseClass}__header`;
        const CSS_CLASS_HEADER = `${CSS_CLASS_BASE}-title`;
        const CSS_CLASS_BODY = `${CSS_CLASS_BASE}-body`;

        if (!this.header || !this.body) {
            return false;
        }

        const header = new SDG.Component.Element({
            cssClasses: CSS_CLASS_HEADER,
            content: this.header,
        });

        const body = new SDG.Component.Element({
            cssClasses: CSS_CLASS_BODY,
            content: this.body,
        });

        return new SDG.Component.Element({
            cssClasses: CSS_CLASS_BASE,
            children: [
                header,
                body,
            ],
        });
    }

    static get cssBaseClass () {
        const CSS_CLASS_BASE = 'ozc-social-share';

        return CSS_CLASS_BASE;
    }
};

export default SDG.Component.SocialShare;
