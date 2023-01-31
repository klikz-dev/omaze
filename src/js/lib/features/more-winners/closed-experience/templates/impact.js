SDG.MoreWinners = SDG.MoreWinners || {};
SDG.MoreWinners.Templates = SDG.MoreWinners.Templates || {};


SDG.MoreWinners.Templates.Impact = function (data) {
    const CSS_CLASS_IMPACT = 'oz-more-winners-closed__impact'

    if (!data) {
        /* eslint-disable-next-line  no-console */
        console.error('[SDG.MoreWinners.Templates.Impact]: cannot run feature. Missing page Data.');

        return false;
    }

    function share () {
        const CSS_CLASS = `${CSS_CLASS_IMPACT}-share`;

        const FB_ANALYTICS_TRACK_ACTION = 'click';
        const FB_ANALYTICS_ID = 'socialShare';
        const FB_ANALYTICS_DETAILS = 'facebook';

        const TWITTER_ANALYTICS_TRACK_ACTION = 'click';
        const TWITTER_ANALYTICS_ID = 'socialShare';
        const TWITTER_ANALYTICS_DETAILS = 'twitter';

        if (!data.social_share) {
            return false;
        }

        const share = new SDG.Component.SocialShare({
            header: data.social_share.header,
            body: data.social_share.body_text,
            facebook: {
                shareUrl: data.social_share.share_url,
                shareText: data.social_share.share_text,
                oaAnalytics: {
                    track: FB_ANALYTICS_TRACK_ACTION,
                    id: FB_ANALYTICS_ID,
                    details: FB_ANALYTICS_DETAILS,
                },
            },
            twitter: {
                shareUrl: data.social_share.share_url,
                shareText: data.social_share.share_text,
                shareVia: data.social_share.share_via,
                hashTags: data.social_share.share_hashtags,
                oaAnalytics: {
                    track: TWITTER_ANALYTICS_TRACK_ACTION,
                    id: TWITTER_ANALYTICS_ID,
                    details: TWITTER_ANALYTICS_DETAILS,
                },
            },
            email: {
                subject: data.social_share.email_subject,
                body: data.social_share.email_body,
            },
            clipboard: {
                content: data.social_share.copy_to_clipboard_text,
            },
        });

        return new SDG.Component.Element({
            cssClasses: `${CSS_CLASS}`,
            children: [
                share,
            ],
        });
    }

    function header () {
        const CSS_CLASS = `${CSS_CLASS_IMPACT}-header`;

        if (!data.header) {
            return false;
        }

        const title = new SDG.Component.Element({
            tag: 'h1',
            content: data.header.header_title,
        });

        const subTitle = new SDG.Component.Element({
            tag: 'h3',
            content: data.header.subtitle,
        });

        const content = new SDG.Component.Element({
            cssClasses: `${CSS_CLASS}-wrapper`,
            children: [
                subTitle,
                title,
            ],
        });

        return new SDG.Component.Element({
            cssClasses: `${CSS_CLASS}`,
            children: [
                content,
            ],
        });
    }

    function body () {
        const CSS_CLASS = `${CSS_CLASS_IMPACT}-body`;

        const content = new SDG.Component.Element({
            tag: 'p',
            content: data.body_text,
        });

        return new SDG.Component.Element({
            cssClasses: `${CSS_CLASS}`,
            children: [
                content,
            ],
        });
    }

    function mediaVideo () {
        return new SDG.Component.VideoPlayer({
            youTubeVideoId: data.media.youtube_video_id,
            width: data.media.width,
            height: data.media.height,
        });
    }

    function mediaImage () {
        const IMAGE_SRC = data.media.image.imgix_url;

        return new SDG.Component.Image({
            src: IMAGE_SRC,
            aspectW: data.media.width,
            aspectH: data.media.height,
        });
    }

    function media () {
        const CSS_CLASS = `${CSS_CLASS_IMPACT}-media`;

        if (!data.media) {
            return false;
        }

        let mediaEl;

        if (data.media.youtube_video_id) {
            mediaEl = mediaVideo();
        }

        if (!mediaEl && data.media.image && data.media.image.imgix_url) {
            mediaEl = mediaImage();
        }

        return new SDG.Component.Element({
            cssClasses: `${CSS_CLASS}`,
            children: [
                mediaEl,
            ],
        });
    }

    function run () {
        const CSS_CLASS_FIXED_WIDTH_DESKTOP = 'ozc-section--fixed-width-desktop';

        const parent = new SDG.Component.Element({
            cssClasses: `${CSS_CLASS_IMPACT} ${CSS_CLASS_FIXED_WIDTH_DESKTOP}`,
            children: [
                header(),
                body(),
                media(),
                share(),
            ],
        });

        return parent.el;
    }

    return run();
};
