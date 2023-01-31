SDG.MoreWinners = SDG.MoreWinners || {};
SDG.MoreWinners.Templates = SDG.MoreWinners.Templates || {};

SDG.MoreWinners.Templates.ExtraPrizes = function (data) {
    const CSS_CLASS_BASE = 'oz-more-winners-closed__extra-prizes'
    const CSS_CLASS_PRIZE_VIEW = 'oz-additional-prize-view';

    if (!data) {
        /* eslint-disable-next-line  no-console */
        console.error('[SDG.MoreWinners.Templates.ExtraPrizes]: cannot run feature. Invalid page Data.');

        return false;
    }

    const winnerDrawings = getDrawingsWithWinners();

    function getDrawingsWithWinners () {
        const prizeTiers = data.prize_tiers;
        const drawingsWithWinners = [];
        let drawings = [];

        if (!Array.isArray(prizeTiers) || !prizeTiers.length) {
            return false;
        }

        prizeTiers.forEach((tier) => {
            const contests = SDG.MoreWinners.PrizeDataUtils.getContestByTier(tier);

            contests.forEach((contest) => {
                drawings = drawings.concat(contest.drawings);
            });
        });

        drawings.forEach((drawing) => {
            const winnerList = drawing.winner_list && drawing.winner_list.trim();

            if (winnerList) {
                drawing.winnerList = winnerList.split(/\n/);

                drawingsWithWinners.push(drawing);
            }
        });

        return drawingsWithWinners;
    }

    function header () {
        const CSS_CLASS = `${CSS_CLASS_BASE}-header`;

        if (!data.header_after_announce) {
            return false;
        }

        return new SDG.Component.Element({
            tag: 'h2',
            cssClasses: CSS_CLASS,
            content: data.header_after_announce,
        });
    }

    function modalContentBody (winnerList) {
        const CSS_CLASS_LIST = `${CSS_CLASS_PRIZE_VIEW}__winners`;
        const CSS_CLASS_WINNER = `${CSS_CLASS_PRIZE_VIEW}__winner`;

        const list = [];

        winnerList.forEach((winner) => {
            const winnerText = winner && winner.trim();

            if (!winnerText) {
                return false;
            }

            const winnerLine = new SDG.Component.Element({
                cssClasses: CSS_CLASS_WINNER,
                content: winnerText,
            });

            list.push(winnerLine);
        });

        return new SDG.Component.Element({
            cssClasses: CSS_CLASS_LIST,
            children: list,
        });
    }

    function modalContentHeader (drawing) {
        const CSS_CLASS_HEADER = `${CSS_CLASS_PRIZE_VIEW}__header`;
        const CSS_CLASS_IMAGE = `${CSS_CLASS_PRIZE_VIEW}__image`;
        const CSS_CLASS_TITLE = `${CSS_CLASS_PRIZE_VIEW}__title`;
        const CSS_CLASS_SUB_TITLE = `${CSS_CLASS_PRIZE_VIEW}__subtitle`;
        const SUBTITLE_TEXT = 'Congratulations to...';
        const TITLE_TEXT = drawing.prize_title;

        const imageSrc = drawing.prize_image && drawing.prize_image.imgix_url;

        let imageEl;

        if (imageSrc) {
            const IMAGE_FORMATTING = '?auto=format&fm=jpg&q=80&fit=crop&crop=entropy&w=160&h=160';
            const IMAGE_SRC = `${imageSrc}${IMAGE_FORMATTING}`;

            imageEl = new SDG.Component.Element({
                tag: 'img',
                cssClasses: CSS_CLASS_IMAGE,
                attributes: {
                    src: IMAGE_SRC,
                },
            });
        }

        const title = new SDG.Component.Element({
            tag: 'h3',
            cssClasses: CSS_CLASS_TITLE,
            content: TITLE_TEXT,
        });

        const subTitle = new SDG.Component.Element({
            cssClasses: CSS_CLASS_SUB_TITLE,
            content: SUBTITLE_TEXT,
        });

        const parent = new SDG.Component.Element({
            cssClasses: CSS_CLASS_HEADER,
            children: [
                imageEl,
                title,
                subTitle,
            ],
        });

        return parent.el;
    }

    function createModalContent (drawing) {
        const header = modalContentHeader(drawing);
        const body = modalContentBody(drawing.winnerList);

        const parent = new SDG.Component.Element({
            children: [
                header,
                body,
            ],
        });

        return parent.el;
    }

    function createModal (drawing) {
        const LINK_CLOSE_TEXT = 'Back';
        const content = createModalContent(drawing);

        return new SDG.Component.Modal({
            cssClasses: CSS_CLASS_PRIZE_VIEW,
            panelHtml: content,
            closeLinkText: LINK_CLOSE_TEXT,
            fullScreen: true,
        });
    }

    function getLink (drawing) {
        const LINK_ICON_TEXT = 'see who won';
        const image = drawing.prize_image && drawing.prize_image.imgix_url;

        const modal = createModal(drawing);
        const ON_CLICK = modal.show.bind(modal);

        const ANALYTICS_TRACK_ACTION = 'click';
        const ANALYTICS_ID = 'prizeListItem';
        const ANALYTICS_DETAILS = drawing.prize_title;

        return new SDG.Component.LinkRow({
            imageSrc: image,
            linkText: drawing.prize_title,
            linkIconText: LINK_ICON_TEXT,
            onClick: ON_CLICK,
            oaAnalytics: {
                track: ANALYTICS_TRACK_ACTION,
                id: ANALYTICS_ID,
                details: ANALYTICS_DETAILS,
            },
        });
    }

    function linkList () {
        const CSS_CLASS = `${CSS_CLASS_BASE}-link-list`;

        const links = [];

        winnerDrawings.forEach((drawing) => {
            const link = getLink(drawing);

            links.push(link.el);
        });

        return new SDG.Component.Element({
            cssClasses: `${CSS_CLASS}`,
            children: links,
        });
    }

    function run () {
        if (!winnerDrawings || !winnerDrawings.length) {
            return SDG.MoreWinners.Templates.ExtraPrizesNoWinners(data);
        }

        const CSS_CLASS_FIXED_WIDTH_DESKTOP = 'ozc-section--fixed-width';
        const CSS_CLASS = `${CSS_CLASS_BASE} ${CSS_CLASS_FIXED_WIDTH_DESKTOP}`;

        return new SDG.Component.Element({
            cssClasses: CSS_CLASS,
            children: [
                header(),
                linkList(),
            ],
        });
    }

    return run();
};
