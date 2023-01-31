SDG.MoreWinners = SDG.MoreWinners || {};


SDG.MoreWinners.init = function(data, config) {
    const FEATURE_NAME = 'more-winners';
    const productStatus = config && config.productStatus;
    const featureData = data && data.metadata;

    const prizeData = featureData && featureData.prizes;

    if (!prizeData) {
        onFeatureFail();

        /* eslint-disable-next-line  no-console */
        console.error('[SDG.MoreWinners.init]: missing prizeData');

        return false;
    }

    // TODO: refactor MW to used cached setData.
    SDG.MoreWinners.PrizeDataUtils.setData(prizeData);

    const overviewTabData = featureData.overview_tab && featureData.overview_tab.metadata;
    const prizesTabData = featureData.prizes_tab && featureData.prizes_tab.metadata;
    const impactTabData = featureData.impact_tab && featureData.impact_tab.metadata;

    const formattedPrizeData = SDG.MoreWinners.PrizeDataUtils.formatPrizes(prizeData);
    const formattedDrawings = SDG.MoreWinners.PrizeDataUtils.formatDrawings(prizeData);
    const nextDrawing = SDG.MoreWinners.PrizeDataUtils.getNextDrawingByDateKey(formattedDrawings, 'enter_by_date');

    const tabs = new SDG.Component.PageTabs();

    function run () {
        if (productStatus === 'active') {
            return runOpenExperience();
        }

        if (productStatus === 'closed') {
            return runClosedExperience();
        }

        /* eslint-disable-next-line  no-console */
        console.warn(`[SDG.MoreWinners.run] productStatus not applicable: ${productStatus}`);

        onFeatureFail();

        return false;
    }

    function runClosedExperience () {
        const closedCampaignData = featureData.closed_campaign && featureData.closed_campaign.metadata;

        if (!closedCampaignData) {
            onFeatureFail();

            /* eslint-disable-next-line  no-console */
            console.error('[SDG.MoreWinners.runClosedExperience]: missing closedCampaignData.');

            return false;
        }

        return SDG.MoreWinners.closedCampaign(closedCampaignData);
    }

    function runOpenExperience () {
        const parentEl = document.getElementsByTagName('main')[0];

        if (!parentEl || !tabs || !tabs.el) {
            onFeatureFail();

            return false;
        }

        tabs.el.classList.add('oz-more-winners');

        appendOverviewTab();

        parentEl.insertBefore(tabs.el, parentEl.firstChild);

        appendPrizesTab();
        appendImpactTab();

        showTabOnLoad();

        window.addEventListener('hashchange', onHashChange, false);

        return true;
    }

    // PRIVATE
    function appendOverviewTab () {
        const productContent = document.getElementById('product');

        SDG.MoreWinners.overviewTab(overviewTabData, formattedPrizeData, nextDrawing);

        const conf = {
            panel: productContent,
            tabId: 'overview',
            tabLabel: overviewTabData.tab_name,
            tabAttributes: {
                'data-oa-track': 'click',
                'data-oa-id': 'overviewTab',
            },
        };

        tabs.register(conf);
    }

    function appendPrizesTab () {
        const pageEl = SDG.MoreWinners.prizesTab(prizesTabData, formattedPrizeData, formattedDrawings, nextDrawing);

        if (!pageEl) {
            return false;
        }

        const conf = {
            panel: pageEl,
            tabId: 'prizes',
            tabLabel: prizesTabData.tab_name,
            tabAttributes: {
                'data-oa-track': 'click',
                'data-oa-id': 'prizesTab',
            },
        };

        tabs.register(conf);
        tabs.items['#prizes'].panel.classList.add('ozsg');

        return true;
    }

    function appendImpactTab () {
        const pageEl = SDG.MoreWinners.impactTab(impactTabData);

        if (!pageEl) {
            return false;
        }

        const conf = {
            panel: pageEl,
            tabId: 'impact',
            tabLabel: impactTabData.tab_name,
            tabAttributes: {
                'data-oa-track': 'click',
                'data-oa-id': 'impactTab',
            },
        };

        tabs.register(conf);
        tabs.items['#impact'].panel.classList.add('ozsg');

        return true;
    }

    function showTabOnLoad () {
        onHashChange();
    }

    function onHashChange () {
        const hash = getWindowHash();
        const allowedHashes = ['#overview', '#impact', '#prizes'];

        const isTabHash = allowedHashes.includes(hash);

        if (isTabHash) {
            tabs.onHashChange();
        } else {
            tabs.activateTab('#overview');
        }

        return scrollToTop();
    }

    // ScrollTop and do minimal move to force scroll event
    // this is to trigger setExpDetailsPositionOnScroll
    function scrollToTop () {
        window.scrollTo(0, 1);
        window.scrollTo(0, 0);

        return true;
    }

    function getWindowHash () {
        return window.location.hash;
    }

    function onFeatureFail () {
        return SDG.Features.Validation.invalidateFeature(FEATURE_NAME);
    }

    return run();
};
