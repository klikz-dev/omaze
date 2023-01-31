SDG.MoreWinners = SDG.MoreWinners || {};
SDG.MoreWinners.Templates = SDG.MoreWinners.Templates || {};


SDG.MoreWinners.Templates.ClosedHeader = function (charityName, prizeTitle) {
    const CSS_CLASS_HEADER = 'oz-more-winners-closed__header'

    if (!charityName || !prizeTitle) {
        /* eslint-disable-next-line  no-console */
        console.error('[SDG.MoreWinners.Templates.ClosedHeader]: cannot run feature. Missing page Data.');

        return false;
    }

    function run () {
        const CSS_CLASS_FIXED_WIDTH = 'ozc-section--fixed-width';
        const LINE_1_TEXT = `Thanks to everyone who supported ${charityName}`;
        const LINE_2_TEXT = 'for a chance to';
        const LINE_3_TEXT = prizeTitle;

        const line1 = new SDG.Component.Element({
            tag: 'h2',
            content: LINE_1_TEXT,
        });

        const line2 = new SDG.Component.Element({
            tag: 'p',
            content: LINE_2_TEXT,
        });

        const line3 = new SDG.Component.Element({
            tag: 'h4',
            content: LINE_3_TEXT,
        });

        const header = new SDG.Component.Element({
            type: 'Element',
            cssClasses: `${CSS_CLASS_HEADER} ${CSS_CLASS_FIXED_WIDTH}`,
            children: [
                line1,
                line2,
                line3,
            ],
        });


        return header.el;
    }

    return run();
};
