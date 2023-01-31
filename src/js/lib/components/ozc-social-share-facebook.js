/**
 * Class representing an 'ozc-social-share-widget--facebook' component.
 * Generates a facebook social sahre component .
 *
 * @export
 * @class SocialShareFacebook
 * @extends BaseNode
 *
 * @param {object} options - options for creating component.
 * @param {string} [options.shareUrl=] - url to share.
 * @param {string} [options.shareText=] - text to share.
 * @param {object} [options.oaAnalytics=] - key/value pairs for analytics data.
 *
 * @example
 *
 *     const myWidget = new SocialShareFacebook({
 *         shareUrl: 'www.hello.com',
 *         shareText: 'shard text goes here',
 *         oaAnalytics: {
 *             track: 'click',
 *             id: 'some ID',
 *             details: 'some Details',
 *         },
 *     });
 */

SDG.Component = SDG.Component || {};

SDG.Component.SocialShareFacebook = class SocialShareFacebook extends SDG.Component.BaseNode {
    constructor (options) {
        options = options || {};

        super(options);

        this.shareUrl = options.shareUrl;
        this.shareText = options.shareText;
        this.oaAnalytics = options.oaAnalytics;

        this.el = this.createEl();

        this.addListener();

        this.constructor.loadFacebookSDK();
    }

    createEl () {
        if (!this.shareUrl) {
            /* eslint-disable-next-line  no-console */
            console.error('[SDG.Component.SocialShareFacebook.createEl] shareUrl is required.');

            return false;
        }

        const CSS_CLASS_BASE = this.constructor.cssBaseClass;
        const CSS_CLASS_FACEBOOK = `${CSS_CLASS_BASE}--facebook`;

        const component = new SDG.Component.Element({
            cssClasses: `${CSS_CLASS_BASE} ${CSS_CLASS_FACEBOOK}`,
            oaAnalytics: this.oaAnalytics,
        });


        return component.el;
    }

    share () {
        if (!SDG.Utility.ScriptLoad.isLoadedFacebookSDK('ui')) {
            /* eslint-disable-next-line  no-console */
            console.error('[SDG.Component.SocialShareFacebook.share] FB library not loaded.');

            return false;
        }

        const FB_UI_METHOD = 'share';

        window.FB.ui({
            method: FB_UI_METHOD,
            href: this.shareUrl,
            quote: this.shareText,
        });
    }

    addListener () {
        if (!this.el) {
            return false;
        }

        this.el.addEventListener('click', this.share.bind(this));
    }

    static loadFacebookSDK () {
        return SDG.Utility.ScriptLoad.facebookSDK();
    }

    static get cssBaseClass () {
        const CSS_CLASS_BASE = 'ozc-social-share-widget';

        return CSS_CLASS_BASE;
    }
};

export default SDG.Component.SocialShareFacebook;
