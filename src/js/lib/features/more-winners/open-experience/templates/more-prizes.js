SDG.MoreWinners = SDG.MoreWinners || {};
SDG.MoreWinners.Templates = SDG.MoreWinners.Templates || {};

SDG.MoreWinners.Templates.MorePrizes = function(copy) {
    function getHeaderEl () {
        if (!copy.header) {
            return false;
        }

        return new SDG.Component.Element({
            tag: 'h2',
            cssClasses: 'ozc-more-winners-more-prizes__header',
            text: `${copy.header}`,
        });
    }

    function getBodyEl () {
        if (!copy.body) {
            return false;
        }

        return new SDG.Component.Element({
            tag: 'p',
            cssClasses: 'ozc-more-winners-more-prizes__body',
            text: `${copy.body}`,
        });
    }

    function getImageEl () {
        if (!copy.image || !copy.image.imgix_url) {
            return false;
        }

        return new SDG.Component.Image({
            cssClasses: 'ozc-more-winners-more-prizes__image',
            src: copy.image.imgix_url,
            aspectW: 16,
            aspectH: 9,
        });
    }

    function getFooterEl () {
        if (!copy.footer_title || !copy.footer_body) {
            return false;
        }

        let titleEl;
        let bodyEl;

        if (copy.footer_title) {
            titleEl = new SDG.Component.Element({
                cssClasses: 'ozc-more-winners-more-prizes__footer-title',
                text: `${copy.footer_title}`,
            });
        }

        if (copy.footer_body) {
            bodyEl = new SDG.Component.Element({
                cssClasses: 'ozc-more-winners-more-prizes__footer-body',
                text: `${copy.footer_body}`,
            });
        }

        return new SDG.Component.Element({
            cssClasses: 'ozc-more-winners-more-prizes__footer',
            children: [
                titleEl,
                bodyEl,
            ],
        });
    }

    function run () {
        if (!copy) {
            return false;
        }

        const header = getHeaderEl();
        const body = getBodyEl();
        const image = getImageEl();
        const footer = getFooterEl();

        const component = new SDG.Component.Element({
            cssClasses: 'ozc-more-winners-more-prizes ozc__panel-width-desktop--medium ozc__panel--base',
            children: [
                header,
                body,
                image,
                footer,
            ],
        });

        return component.el;
    }

    return run();
};
