/**
 * Class representing an 'ozc-social-share-widget--twitter' component.
 * Generates a facebook social sahre component .
 *
 * @export
 * @class SocialShareTwitter
 * @extends BaseNode
 *
 * @param {object} options - options for creating component.
 * @param {string} [options.shareUrl=window.location.href] - url to share.
 * @param {string} [options.shareText=] - text to share.
 * @param {string} [options.shareVia=] - Twitter via parameter, used to attribute the source of a Tweet to a Twitter username.
 * @param {string} [options.hashTags=] - a comma-separated list of hashtags to add to a Tweet.
 *    Omit a preceding “#” from each hashtag.
 * @param {object} [options.oaAnalytics=] - key/value pairs for analytics data.
 *
 * @example
 *
 *     const myWidget = new SocialShareTwitter({
 *         shareUrl: 'www.hello.com',
 *         shareText: 'shard text goes here',
 *         shareVia: '@someUsername',
 *         hashTags: 'iAmATag, iAmATagAsWell, hashTagThis',
 *         oaAnalytics: {
 *             track: 'click',
 *             id: 'some ID',
 *             details: 'some Details',
 *         },
 *     });
 */

SDG.Component = SDG.Component || {};

SDG.Component.SocialShareTwitter = class SocialShareTwitter extends SDG.Component.BaseNode {
    constructor (options) {
        options = options || {};

        super(options);

        this.shareUrl = options.shareUrl || this.constructor.defaults.tweetUrl;
        this.shareText = options.shareText;
        this.shareVia = options.shareVia;
        this.hashTags = this.constructor.sanitizeHashTags(options.hashTags);
        this.oaAnalytics = options.oaAnalytics;

        this.el = this.createEl();

        this.addListener();

        this.constructor.loadTwitterWidgetJs();
    }

    createEl () {
        const CSS_CLASS_BASE = this.constructor.cssBaseClass;
        const CSS_CLASS_TWITTER = `${CSS_CLASS_BASE}--twitter`;
        const TWEET_BASE_URL = 'https://twitter.com/intent/tweet';

        const encodedUrl = SDG.Utility.Uri.encode(this.shareUrl);
        const optionParams = this.getOptionParams();

        let tweetHref = `${TWEET_BASE_URL}?url=${encodedUrl}`;

        if (optionParams) {
            tweetHref = `${tweetHref}${optionParams}`;
        }

        const component = new SDG.Component.Element({
            tag: 'a',
            cssClasses: `${CSS_CLASS_BASE} ${CSS_CLASS_TWITTER}`,
            attributes: {
                href: tweetHref,
            },
            oaAnalytics: this.oaAnalytics,
        });

        return component.el;
    }

    getOptionParams () {
        let params = '';

        if (this.shareText) {
            const encodedText = encodeURIComponent(this.shareText);

            params = `${params}&text=${encodedText}`;
        }

        if (this.shareVia) {
            params = `${params}&via=${this.shareVia}`;
        }

        if (this.hashTags) {
            params = `${params}&hashtags=${this.hashTags}`;
        }

        return params;
    }

    addListener () {
        if (!this.el) {
            return false;
        }

        this.el.addEventListener('click', this.tweet.bind(this));
    }

    tweet (event) {
        if (event) {
            event.preventDefault();
        }

        if (!SDG.Utility.ScriptLoad.isLoadedTwitterWidgetJs()) {
            /* eslint-disable-next-line  no-console */
            console.error('[SDG.Component.SocialShareTwitter.tweet] twitter library not ready.');

            return false;
        }

        return true;
    }

    static loadTwitterWidgetJs () {
        return SDG.Utility.ScriptLoad.twitterWidgetJs();
    }

    static sanitizeHashTags (tags) {
        if (!tags) {
            return false;
        }

        return tags.replace('#', '');
    }

    static get cssBaseClass () {
        const CSS_CLASS_BASE = 'ozc-social-share-widget';

        return CSS_CLASS_BASE;
    }

    static get defaults () {
        const PAGE_HREF = window.location.href;

        return {
            tweetUrl: PAGE_HREF,
        };
    }
};

export default SDG.Component.SocialShareTwitter;
