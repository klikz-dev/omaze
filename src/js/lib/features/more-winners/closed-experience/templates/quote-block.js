SDG.MoreWinners = SDG.MoreWinners || {};
SDG.MoreWinners.Templates = SDG.MoreWinners.Templates || {};


SDG.MoreWinners.Templates.QuoteBlock = function (data) {
    const CSS_CLASS_HEADER = 'oz-more-winners-closed__quote'

    if (!data || !data.quote) {
        /* eslint-disable-next-line  no-console */
        console.error('[SDG.MoreWinners.Templates.QuoteBlock]: cannot run feature. Missing page Data.');

        return false;
    }

    function run () {
        const CSS_CLASS_FIXED_WIDTH = 'ozc-section--fixed-width';

        const quote = new SDG.Component.QuoteBlock({
            content: data.quote,
            sourceName: data.source_name,
            sourceAffiliate: data.source_affiliate,
            logoUrl: data.affiliate_image && data.affiliate_image.imgix_url,
        });

        if (!quote || !quote.el) {
            return false;
        }

        const template = new SDG.Component.Element({
            type: 'Element',
            cssClasses: `${CSS_CLASS_HEADER} ${CSS_CLASS_FIXED_WIDTH}`,
            children: [
                quote,
            ],
        });

        return template.el;
    }

    return run();
};
