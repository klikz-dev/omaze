SDG.MoreWinners = SDG.MoreWinners || {};
SDG.MoreWinners.Templates = SDG.MoreWinners.Templates || {};

SDG.MoreWinners.Templates.ExtraPrizesNoWinners = function (data) {
    const CSS_CLASS_BASE = 'oz-more-winners-closed__extra-prizes-no-winners'

    if (!data) {
        /* eslint-disable-next-line  no-console */
        console.error('[SDG.MoreWinners.Templates.ExtraPrizesNoWinners]: cannot run feature. Invalid page Data.');

        return false;
    }

    function header () {
        const CSS_CLASS = `${CSS_CLASS_BASE}-header`;
        if (!data.header_before_announce) {
            return false;
        }

        return new SDG.Component.Element({
            cssClasses: `${CSS_CLASS}`,
            content: data.header_before_announce,
        });
    }

    function body () {
        const CSS_CLASS = `${CSS_CLASS_BASE}-body`;

        if (!data.body_before_announce) {
            return false;
        }

        return new SDG.Component.Element({
            cssClasses: `${CSS_CLASS}`,
            content: data.body_before_announce,
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

    function run () {
        const CSS_CLASS_FIXED_WIDTH_DESKTOP = 'ozc-section--fixed-width';
        const CSS_CLASS = `${CSS_CLASS_BASE} ${CSS_CLASS_FIXED_WIDTH_DESKTOP}`;

        return new SDG.Component.Element({
            cssClasses: CSS_CLASS,
            children: [
                header(),
                body(),
                image(),
            ],
        });
    }

    return run();
};
