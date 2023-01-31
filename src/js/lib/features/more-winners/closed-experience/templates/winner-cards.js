SDG.MoreWinners = SDG.MoreWinners || {};
SDG.MoreWinners.Templates = SDG.MoreWinners.Templates || {};


SDG.MoreWinners.Templates.WinnerCards = function (prizeTiers) {
    const CSS_CLASS_BASE = 'oz-more-winners-closed__winner-cards'

    if (!Array.isArray(prizeTiers) || !prizeTiers.length) {
        /* eslint-disable-next-line  no-console */
        console.warn('[SDG.MoreWinners.Templates.WinnerCards]: invalid prize tiers.');

        return false;
    }

    function templateHeader () {
        const CSS_CLASS = `${CSS_CLASS_BASE}-header`;
        const HEADER_COPY = 'Congrats to ALL the winners!';

        return new SDG.Component.Element({
            tag: 'h2',
            cssClasses: `${CSS_CLASS}`,
            content: HEADER_COPY,
        });
    }

    function cardHeader (contest) {
        return contest.label;
    }

    function contestWinnerCopy (contest) {
        const winnerCopy = [];

        contest.drawings.forEach((drawing) => {
            let copy = drawing.winner_name;

            if (!copy) {
                return false;
            }

            if (drawing.winner_location) {
                copy = `${copy} from ${drawing.winner_location}`;
            }

            winnerCopy.push(copy);
        });

        return winnerCopy;
    }

    function cardAnnounceHeader (contest) {
        const NO_WINNERS_SINGULAR = 'Winner announced:';
        const NO_WINNERS_RECURRING = 'Winners announced:';
        const YES_WINNERS_SINGULAR = 'The lucky winner:';
        const YES_WINNERS_RECURRING = 'The lucky winners:';

        const winnerCopy = contestWinnerCopy(contest);

        // NO WINNERS
        if (!winnerCopy.length) {
            if (contest.recurring) {

                return NO_WINNERS_RECURRING;
            }

            return NO_WINNERS_SINGULAR;
        }

        // WINNERS EXIST
        if (contest.recurring) {
            return YES_WINNERS_RECURRING;
        }

        return YES_WINNERS_SINGULAR;
    }

    function cardAnnounceBody (contest) {
        const winnerCopyList = contestWinnerCopy(contest);

        // NO WINNERS
        if (!winnerCopyList.length) {
            const NO_WINNERS = `On or around ${SDG.Utility.Date.format(contest.announce_date_max)}.`;

            return NO_WINNERS;
        }

        // WINNERS EXIST
        let winnerCopy = winnerCopyList.shift();

        // 1 WINNER EXISTS
        if (winnerCopyList.length === 0) {
            return winnerCopy;
        }

        // MULTIPLE WINNERS EXIST
        winnerCopyList.forEach((copy) => {
            winnerCopy = winnerCopy.concat(`<br>${copy}`);
        });

        return winnerCopy;
    }

    function grandPrizeWinnerImage (contest) {
        const GRAND_PRIZE_TIER = 1;
        const PLACEHOLDER_SRC = '//images.omaze.com/web/assets/images/static/features/more-winners/icons/user-avatar.png';

        if (contest.tier !== GRAND_PRIZE_TIER) {
            return false;
        }

        const drawing = contest.drawings[0];
        const imageSrc = drawing && drawing.winner_image && drawing.winner_image.imgix_url;

        if (!imageSrc || !drawing.winner_name) {
            return PLACEHOLDER_SRC;
        }

        return imageSrc;
    }

    function getCard (contest) {
        const header = cardHeader(contest);
        const announceHeader = cardAnnounceHeader(contest);
        const announceBody = cardAnnounceBody(contest);
        const winnerImage = grandPrizeWinnerImage(contest);
        const contestTitle = contest.title_alternative || contest.title;

        const conf = {
            header: header,
            winnerAnnounceHeader: announceHeader,
            winnerAnnounceBody: announceBody,
            title: contestTitle,
            imageUrl: contest.hero_image.imgix_url,
            winnerImage: winnerImage,
        };

        return new SDG.Component.PrizeCard(conf);
    }

    function getCardsByTier (contests) {
        return contests.map((contest) => {
            return getCard(contest);
        });
    }

    function cards () {
        const CSS_CLASS = `${CSS_CLASS_BASE}-content`;
        const CSS_CLASS_CONTAINER = 'ozc-card-container';

        let cards = [];

        prizeTiers.forEach((tier) => {
            const contests = SDG.MoreWinners.PrizeDataUtils.getContestByTier(tier);

            cards = cards.concat(getCardsByTier(contests));
        });

        if (!cards.length) {
            return false;
        }

        return new SDG.Component.Element({
            cssClasses: `${CSS_CLASS} ${CSS_CLASS_CONTAINER}`,
            children: cards,
        });
    }

    function run () {
        const CSS_CLASS_FIXED_WIDTH = 'ozc-section--fixed-width';
        const cardsTemplate = cards();

        if (!cardsTemplate) {
            /* eslint-disable-next-line  no-console */
            console.warn('[SDG.MoreWinners.Templates.WinnerCards]: no cars to render.');

            return false;
        }

        const template = new SDG.Component.Element({
            cssClasses: `${CSS_CLASS_BASE} ${CSS_CLASS_FIXED_WIDTH}`,
            children: [
                templateHeader(),
                cardsTemplate,
            ],
        });

        return template.el;
    }

    return run();
};
