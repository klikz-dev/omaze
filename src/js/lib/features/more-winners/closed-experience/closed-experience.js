SDG.MoreWinners = SDG.MoreWinners || {};

SDG.MoreWinners.closedCampaign = function(pageData) {
    const FEATURE_NAME = 'more-winners';
    const CSS_CLASS_BASE = 'oz-more-winners-closed';
    const CSS_CLASS_STYLE_GUIDE = 'ozsg';
    const grandPrize = SDG.MoreWinners.PrizeDataUtils.getGrandPrize();

    if (!pageData) {
        /* eslint-disable-next-line  no-console */
        console.error('[SDG.MoreWinners.closedCampaign]: cannot run feature. Invalid page data.');

        onFeatureFail();

        return false;
    }

    function initClosedBanner () {
        const PLACEMENT_CSS_SELECTOR = '.exp-leader';
        const PLACEMENT_TYPE = 'top';
        const BANNER_TYPE = 'info';

        if (!grandPrize || !grandPrize.enter_by_date) {
            return false;
        }

        const date = SDG.Utility.Date.format(grandPrize.enter_by_date);
        const BANNER_TEXT = `This experience closed on ${date}`;

        return SDG.MessageBanner.init({
            content: BANNER_TEXT,
            type: BANNER_TYPE,
            placement_type: PLACEMENT_TYPE,
            placement_selector: PLACEMENT_CSS_SELECTOR,
        });
    }

    function run () {
        initClosedBanner();

        const PLACEMENT_SELECTOR = '.oz-experience-leader';
        const headerTemplate = SDG.MoreWinners.Templates.ClosedHeader(pageData.charity_name, grandPrize.title);
        const impactTemplate = SDG.MoreWinners.Templates.Impact(pageData.impact_section);
        const quoteTemplate = SDG.MoreWinners.Templates.QuoteBlock(pageData.quote_block);
        const ctaTemplate = SDG.MoreWinners.Templates.CtaCard(pageData.mid_page_cta);
        const winnerCardTemplate = SDG.MoreWinners.Templates.WinnerCards(pageData.prize_card_tiers);
        const extraPrizes = SDG.MoreWinners.Templates.ExtraPrizes(pageData.extra_prizes);

        const page = new SDG.Component.Element({
            cssClasses: `${CSS_CLASS_BASE} ${CSS_CLASS_STYLE_GUIDE}`,
            children: [
                headerTemplate,
                impactTemplate,
                quoteTemplate,
                ctaTemplate,
                winnerCardTemplate,
                extraPrizes,
            ],
        });

        SDG.Utility.HtmlElement.insertAfterSelector(page.el, PLACEMENT_SELECTOR);

        // Retry init video after player placed in the DOM
        return SDG.Component.VideoPlayer.init();
    }

    function onFeatureFail () {
        return SDG.Features.Validation.invalidateFeature(FEATURE_NAME);
    }

    return run();
};
