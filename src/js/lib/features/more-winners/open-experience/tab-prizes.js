SDG.MoreWinners = SDG.MoreWinners || {};

SDG.MoreWinners.prizesTab = function(tabData, prizeData, drawingData, nextDrawing) {
    const CSS_CLASS_PANEL = 'ozc__panel--base';

    function getStickyCtaButtonEl () {
        const conf = {
            cssClasses: 'ozc-sticky-button ozc-sticky-button--mobile-only',
            children: [
                {
                    type: 'Element',
                    tag: 'a',
                    attributes: {
                        href: '#cart',
                        'data-oa-track': 'click',
                        'data-oa-id': 'prizesPageCartCTA',
                    },
                    cssClasses: 'oz-btn oz-btn--cta',
                    text: 'enter now',
                },
            ],
        };

        return new SDG.Component.Element(conf);
    }

    function getCtaButtonEl () {
        const conf = {
            'children': [
                {
                    'type': 'Element',
                    'tag': 'a',
                    'attributes': {
                        'href': '#cart',
                        'data-oa-track': 'click',
                        'data-oa-id': 'prizesPageCartCTA',
                    },
                    'cssClasses': 'oz-btn oz-btn--cta',
                    'text': 'enter now',
                },
            ],
        };

        return new SDG.Component.Element(conf);
    }

    function getHowItWorksEl () {
        const howItWorksEl = document.getElementsByClassName('oz-experience-how-it-works')[0];

        if (!howItWorksEl) {
            return false;
        }

        const howItWorksElClone = howItWorksEl.cloneNode(true);

        howItWorksElClone.classList.remove('hide-desktop');
        howItWorksElClone.classList.add('desktop-only');

        return howItWorksElClone;
    }

    function getHeroTemplateEl () {
        const body = new SDG.Component.Element({
            tag: 'p',
            cssClasses: 'text-block',
            text: tabData.hero.body,
        });

        const heroImage = new SDG.Component.Image({
            src: tabData.hero.image.imgix_url,
            aspectW: 16,
            aspectH: 9,
            lqip: true,
        })

        const heroConf = {
            image: heroImage.el,
            header: tabData.hero.header,
            body: body.el,
        };

        const template = new SDG.Component.PageHero(heroConf);

        const howItWorksEl = getHowItWorksEl();

        if (howItWorksEl) {
            template.contentEl.appendChild(howItWorksEl);
        }

        const ctaButtonEl = getCtaButtonEl();

        if (template.contentEl && ctaButtonEl) {
            ctaButtonEl.el.classList = 'desktop-only';

            template.contentEl.appendChild(ctaButtonEl.el);
        }

        return template;
    }

    function getCountdownClock () {
        if (!nextDrawing || !nextDrawing.drawing_date) {
            return false;
        }

        const componentEl = SDG.MoreWinners.Templates.DrawingCountdown(nextDrawing);

        if (!componentEl) {
            return false;
        }

        componentEl.classList.add(CSS_CLASS_PANEL);

        return componentEl;
    }

    function getFeaturedPrizesEl () {
        const sortedContests = SDG.MoreWinners.PrizeDataUtils.sortDrawingsByDate('drawing_date_max', prizeData);
        const contestsByTier = SDG.MoreWinners.PrizeDataUtils.filterByTiers(sortedContests, tabData.featured_prize_tiers);
        const futureContests = contestsByTier.filter(contest => SDG.Utility.Date.isInFuture(contest.announce_date_max));

        if (futureContests.length < 1) {
            return false;
        }

        const component = new SDG.Component.Element({
            cssClasses: 'ozc-card-container',
        });

        futureContests.forEach((contest) => {
            const SINGULAR_CONTEST_HEADER = `Enter by ${SDG.Utility.Date.format(contest.enter_by_date)}:`;
            const RECURRING_CONTEST_HEADER = 'Coming up:';

            const SINGULAR_CONTEST_ANNOUNCE_HEADER = 'Winner announced:';
            const RECURRING_CONTEST_ANNOUNCE_HEADER = 'Winners announced:';
            const SINGULAR_CONTEST_ANNOUNCE_BODY = `On or around ${SDG.Utility.Date.format(contest.announce_date)}.`;
            const RECURRING_CONTEST_ANNOUNCE_BODY = `Between ${SDG.Utility.Date.format(contest.announce_date_min)} and ${SDG.Utility.Date.format(contest.announce_date_max)}.`;
            const SINGULAR_CLOSED_TAG = SDG.Utility.Date.isInFuture(contest.enter_by_date) ? false : 'Closed';

            const conf = {
                header: SINGULAR_CONTEST_HEADER,
                winnerAnnounceHeader: SINGULAR_CONTEST_ANNOUNCE_HEADER,
                winnerAnnounceBody: SINGULAR_CONTEST_ANNOUNCE_BODY,
                title: contest.title,
                description: contest.description,
                imageUrl: contest.hero_image.imgix_url,
                footnote: contest.footnote,
                closedTag: SINGULAR_CLOSED_TAG,
            };

            // overrides for recurring / weekly prizes
            if (contest.recurring) {
                conf.header = RECURRING_CONTEST_HEADER;
                conf.winnerAnnounceHeader = RECURRING_CONTEST_ANNOUNCE_HEADER;
                conf.winnerAnnounceBody = RECURRING_CONTEST_ANNOUNCE_BODY;
                conf.closedTag = false;
            }

            const card = new SDG.Component.PrizeCard(conf);

            component.appendChild(card);
        });

        return component;
    }

    function run () {
        if (!tabData) {
            return false;
        }

        const lastWinnerDrawing = SDG.MoreWinners.PrizeDataUtils.getLastWinnerByDate(drawingData, 'announce_date');

        let featuredWinnerEl;
        if (lastWinnerDrawing) {
            featuredWinnerEl = SDG.MoreWinners.Templates.FeaturedWinner(tabData.winner_quote_block, tabData.winner_announcement_header, lastWinnerDrawing);
        }

        const morePrizesEl = SDG.MoreWinners.Templates.MorePrizes(tabData.more_prizes);
        const announcementCardList = SDG.MoreWinners.Templates.AnnouncementCardList(tabData.winner_announce_cards, drawingData);
        const scrollTopButtonEl = SDG.MoreWinners.Templates.ScrollTopButton();

        const component = new SDG.Component.Element({
            cssClasses: 'ozc__page',
            children: [
                getHeroTemplateEl(),
                featuredWinnerEl,
                getCountdownClock(),
                getFeaturedPrizesEl(),
                morePrizesEl,
                announcementCardList,
                scrollTopButtonEl,
                getStickyCtaButtonEl(),
            ],
        });

        return component.el;
    }

    return run();
};
