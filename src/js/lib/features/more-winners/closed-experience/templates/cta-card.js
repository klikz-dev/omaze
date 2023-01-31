SDG.MoreWinners = SDG.MoreWinners || {};
SDG.MoreWinners.Templates = SDG.MoreWinners.Templates || {};


SDG.MoreWinners.Templates.CtaCard = function (data) {
    const CSS_CLASS_BASE = 'oz-more-winners-closed__cta-card'

    if (!data) {
        /* eslint-disable-next-line  no-console */
        console.error('[SDG.MoreWinners.Templates.CtaCard]: cannot run feature. Invalid page Data.');

        return false;
    }

    if (isExpired()) {
        /* eslint-disable-next-line  no-console */
        console.info('[SDG.MoreWinners.Templates.CtaCard]: will not render. Date expired.');

        return false;
    }

    function isExpired () {
        if (!data.expiration_date) {
            return false;
        }

        const date = new Date(data.expiration_date).getTime();

        if (!date) {
            return false;
        }

        return date < Date.now();
    }

    function header () {
        const CSS_CLASS = `${CSS_CLASS_BASE}-header`;

        if (!data.header) {
            return false;
        }

        return new SDG.Component.Element({
            cssClasses: `${CSS_CLASS}`,
            content: data.header,
        });
    }

    function body () {
        const CSS_CLASS = `${CSS_CLASS_BASE}-body`;

        if (!data.body) {
            return false;
        }

        return new SDG.Component.Element({
            cssClasses: `${CSS_CLASS}`,
            content: data.body,
        });
    }

    function image () {
        const CSS_CLASS = `${CSS_CLASS_BASE}-image`;

        if (!data.image || !data.image.imgix_url) {
            return false;
        }

        const IMAGE_SRC = data.image.imgix_url;
        const ASPECT_W = 16;
        const ASPECT_H = 9;

        return new SDG.Component.Image({
            cssClasses: CSS_CLASS,
            src: IMAGE_SRC,
            aspectW: ASPECT_W,
            aspectH: ASPECT_H,
        });
    }

    function button () {
        const CSS_CLASS = `${CSS_CLASS_BASE}-button`;
        const CTA_TEXT = data.cta_button_text || 'check it out';
        const ANALYTICS_TRACK_ACTION = 'click';
        const ANALYTICS_ID = 'discoveryCTA';
        const ANALYTICS_DETAILS = data.cta_url;

        if (!data.cta_url) {
            return false;
        }

        return new SDG.Component.Element({
            tag: 'a',
            cssClasses: `${CSS_CLASS} oz-btn oz-btn--cta`,
            content: CTA_TEXT,
            attributes: {
                href: data.cta_url,
            },
            oaAnalytics: {
                track: ANALYTICS_TRACK_ACTION,
                id: ANALYTICS_ID,
                details: ANALYTICS_DETAILS,
            },
        });
    }

    function imageMobile () {
        const CSS_CLASS_MOBILE = 'mobile-only';
        const imageMobile = image();

        imageMobile.el.classList.add(CSS_CLASS_MOBILE);

        return imageMobile;

    }

    function imageDesktop () {
        const CSS_CLASS_DESKTOP = 'desktop-only';
        const imageDesktop = image();

        imageDesktop.el.classList.add(CSS_CLASS_DESKTOP);

        return imageDesktop;

    }

    function run () {
        const CSS_CLASS_WRAPPER = `${CSS_CLASS_BASE}-wrapper`;
        const CSS_CLASS_CONTENT = `${CSS_CLASS_BASE}-content`;

        const content = new SDG.Component.Element({
            cssClasses: CSS_CLASS_CONTENT,
            children: [
                header(),
                body(),
                imageMobile(),
                button(),
            ],
        });

        const wrapper = new SDG.Component.Element({
            cssClasses: CSS_CLASS_WRAPPER,
            children: [
                content,
                imageDesktop(),
            ],
        })

        return new SDG.Component.Element({
            cssClasses: `${CSS_CLASS_BASE}`,
            children: [
                wrapper,
            ],
        });
    }

    return run();
};
