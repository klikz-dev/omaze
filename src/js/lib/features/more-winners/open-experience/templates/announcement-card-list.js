SDG.MoreWinners = SDG.MoreWinners || {};
SDG.MoreWinners.Templates = SDG.MoreWinners.Templates || {};

SDG.MoreWinners.Templates.AnnouncementCardList = function(copy, drawingData) {
    drawingData = drawingData || [];

    function getCardsEl () {
        const sortedDrawings = SDG.MoreWinners.PrizeDataUtils.sortDrawingsByDate('announce_date', drawingData);

        const component = new SDG.Component.Element({
            cssClasses: 'ozc-card-container',
        });

        sortedDrawings.forEach((drawing) => {
            const conf = {
                title: drawing.title,
                iconUrl: drawing.icon_image.imgix_url,
                announceDate: drawing.announce_date,
                winner: {
                    name: drawing.winner_name,
                    location: drawing.winner_location,
                },
            };

            const card = new SDG.Component.PrizeCardSimple(conf);

            if (!card || !card.el) {
                return false;
            }

            card.el.classList.add('ozc-card-container__card');

            return component.appendChild(card.el);
        });

        return component.el;
    }

    function run () {
        if (!copy || !drawingData) {
            return false;
        }

        const header = new SDG.Component.Element({
            cssClasses: 'ozf-prizes-panel__announcements-header',
            text: `${copy.header}`,
        });

        const subHeader = new SDG.Component.Element({
            cssClasses: 'ozf-prizes-panel__announcements-subheader',
            text: `${copy.body}`,
        });

        return new SDG.Component.Element({
            cssClasses: 'ozc__panel--emphasis-2 ozf-prizes-panel__announcements ozc__panel--base',
            children: [
                header,
                subHeader,
                getCardsEl(),
            ],
        });
    }

    return run();
};
