SDG.MoreWinners = SDG.MoreWinners || {};

SDG.MoreWinners.overviewTab = function(tabData, formattedPrizeData, nextDrawing) {
    const CSS_CLASS_STYLE_GUIDE = 'ozsg';
    const CSS_CLASS_PANEL = 'ozc__panel--base';
    const CSS_SELECTOR_INSERT_BEFORE = '.exp-donate-button-wrapper.phone-only';


    function run () {
        if (!tabData) {
            return false;
        }

        appendImpactTabLink();
        appendPrizeOverview();
        appendCountdownClock();

        return true;
    }

    function appendImpactTabLink () {
        if (!tabData.impact_link_cta_text) {
            return false;
        }

        const linkConf = {
            tag: 'a',
            cssClasses: 'oz-btn oz-btn--outline',
            text: tabData.impact_link_cta_text,
            attributes: {
                href: '#impact',
                'data-oa-track': 'click',
                'data-oa-id': 'overviewImpactCTA',
            },
        };

        const node = new SDG.Component.Element(linkConf);

        return node.appendTo('.exp-info.exp-benefit');
    }

    function appendCountdownClock () {
        if (!nextDrawing || !nextDrawing.drawing_date) {
            return false;
        }

        const countdownClockEl = SDG.MoreWinners.Templates.DrawingCountdown(nextDrawing);

        if (!countdownClockEl) {
            return false;
        }

        countdownClockEl.classList.add(CSS_CLASS_STYLE_GUIDE);
        countdownClockEl.classList.add(CSS_CLASS_PANEL);

        return SDG.Utility.HtmlElement.insertBeforeSelector(countdownClockEl, CSS_SELECTOR_INSERT_BEFORE);
    }

    function appendPrizeOverview () {
        if (!tabData.prizes_overview_module || !formattedPrizeData) {
            return false;
        }

        const conf = tabData.prizes_overview_module;
        let sortedPrizes = SDG.MoreWinners.PrizeDataUtils.sortDrawingsByDate('drawing_date_max', formattedPrizeData);
        sortedPrizes = SDG.MoreWinners.PrizeDataUtils.filterByTiers(sortedPrizes, conf.tiers);
        conf.prizes = sortedPrizes;

        const desktopModule = new SDG.Component.PrizesOverview(conf);
        desktopModule.el.classList.add('desktop-only');

        const mobileModule = new SDG.Component.PrizesOverview(conf);
        mobileModule.el.classList.add('mobile-only');

        const desktopParent = document.getElementsByClassName('exp-details')[0];

        if (desktopParent) {
            desktopParent.appendChild(desktopModule.el);
        }

        return SDG.Utility.HtmlElement.insertBeforeSelector(mobileModule.el, '.exp-donate-button-wrapper.phone-only');
    }

    return run();
};
