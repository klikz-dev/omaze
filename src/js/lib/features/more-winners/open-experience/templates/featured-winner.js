SDG.MoreWinners = SDG.MoreWinners || {};
SDG.MoreWinners.Templates = SDG.MoreWinners.Templates || {};

SDG.MoreWinners.Templates.FeaturedWinner = function(calloutText, headerText, drawing) {

    function run () {
        if (!headerText || !drawing || !drawing.winner_name || !drawing.winner_location) {
            return false;
        }

        const cardConf = {
            cssClasses: 'ozc__panel-width-desktop--medium',
            header: headerText,
            prizeTitle: drawing.title,
            heroUrl: drawing.hero_image.imgix_url,
            announceDate: drawing.announce_date,
            winner: {
                name: drawing.winner_name,
                location: drawing.winner_location,
            },
        };

        const winnerCard = new SDG.Component.WinnerCard(cardConf);
        let calloutBlock;

        if (calloutText) {
            calloutBlock = new SDG.Component.CalloutBlock({
                text: calloutText,
            });
        }

        const component = new SDG.Component.Element({
            cssClasses: 'ozc__panel--base',
            children: [
                winnerCard,
                calloutBlock,
            ],
        });

        return component.el;
    }

    return run();
};
