window.SDG = window.SDG || {};
SDG.Utility = SDG.Utility || {};

SDG.Utility.ScriptLoad = {
    // FACEBOOK
    isLoadedFacebookSDK (functionName) {
        if (!window.FB) {
            return false;
        }

        // if functionName passed in, check if it exists
        if (functionName && typeof FB[functionName] !== 'function') {
            return false;
        }

        return true;
    },

    facebookSDK () {
        const FACEBOOK_SDK_ELEMENT_ID = 'facebook-jssdk';
        const facebookSdkVersion = window.ozFacebookApiVersion;

        if (!facebookSdkVersion) {
            /* eslint-disable-next-line  no-console */
            console.error('[SDG.Utility.ScriptLoad.facebookSDK]: missing ozFacebookApiVersion. check settings.facebook_api_version?');

            return false;
        }

        const facebookSdkSrc = `https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v${facebookSdkVersion}`;

        if (this.isLoadedFacebookSDK()) {
            return true;
        }

        return this.insertScriptTag(facebookSdkSrc, FACEBOOK_SDK_ELEMENT_ID);
    },

    // TWITTER
    isLoadedTwitterWidgetJs () {
        return window.twttr && window.twttr.init;
    },

    twitterWidgetJs () {
        const TWITTER_JS_ELEMENT_ID = 'twitter-wjs';
        const TWITTER_JS_SRC = 'https://platform.twitter.com/widgets.js';

        if (this.isLoadedTwitterWidgetJs()) {
            return true;
        }

        const insertTag = this.insertScriptTag(TWITTER_JS_SRC, TWITTER_JS_ELEMENT_ID);

        if (!insertTag) {
            return false;
        }

        window.twttr = {};

        window.twttr._e = [];

        window.twttr.ready = function(f) {
            window.twttr._e.push(f);
        };

        return true;
    },

    // YOUTUBE
    isLoadedYouTubeAPI () {
        return window.YT && window.YT.loaded;
    },

    youTubeAPI () {
        const YOUTUBE_API_SRC = 'https://www.youtube.com/iframe_api';
        const YOUTUBE_API_SCRIPT_TAG_ID = 'oz-youtube-api';

        if (this.isLoadedYouTubeAPI()) {
            return true;
        }

        return this.insertScriptTag(YOUTUBE_API_SRC, YOUTUBE_API_SCRIPT_TAG_ID);
    },

    // HELPERS
    insertScriptTag (src, id) {
        if (!src || !id) {
            /* eslint-disable-next-line  no-console */
            console.error(`[SDG.Utility.ScriptLoad.insertScriptTag] missing src: [${src}] or id: [${id}].`);

            return false;
        }

        if (document.getElementById(id)) {
            return true;
        }

        const domScriptTag = document.getElementsByTagName('script')[0];

        const scriptTag = new SDG.Component.Element({
            tag: 'script',
            attributes: {
                id: id,
                src: src,
            },
        })

        const insertTag = domScriptTag.parentNode.insertBefore(scriptTag.el, domScriptTag);

        if (!insertTag) {
            /* eslint-disable-next-line  no-console */
            console.error(`[SDG.Utility.ScriptLoad.insertScriptTag] failed for src: [${src}] or id: [${id}].`);

            return false;
        }

        return true;
    },
};

export default SDG.Utility.ScriptLoad;
