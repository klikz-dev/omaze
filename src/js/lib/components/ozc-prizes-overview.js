SDG.Component = SDG.Component || {};

SDG.Component.PrizesOverview = class PrizesOverview extends SDG.Component.BaseNode {
    constructor (options) {
        super(options);

        this.options = options || {};

        this.prizes = this.options.prizes;
        this.header = this.options.header;
        this.subHeader = this.options.sub_header;
        this.footerText = this.options.footer_text;
        this.ctaText = this.options.cta_text;

        this.el = this.createEl();
    }

    createEl () {
        if (!this.prizes) {
            return false;
        }

        const el = this.createParentEl();
        el.classList.add('ozc-prizes-overview');

        const headerEl = this.createHeaderEl();
        const subHeaderEl = this.createSubHeaderEl();
        const prizesEl = this.createPrizesEl();
        const footerEl = this.createFooterEl();
        const ctaEl = this.createCtaEl();

        if (headerEl) {
            el.appendChild(headerEl);
        }

        if (subHeaderEl) {
            el.appendChild(subHeaderEl);
        }

        if (prizesEl) {
            el.appendChild(prizesEl);
        }

        if (footerEl) {
            el.appendChild(footerEl);
        }

        if (ctaEl) {
            el.appendChild(ctaEl);
        }

        return el;
    }

    static createPrizeEl (prize) {
        const el = document.createElement('div');
        el.classList = 'ozc-prizes-overview__prize';

        let enterByText;

        const formattedDate = SDG.Utility.Date.format(prize.enter_by_date);

        if (formattedDate) {
            enterByText = `Enter by: ${formattedDate}`;
        }

        if (prize.recurring) {
            enterByText = 'Entry dates vary';
        }

        const body = `
            <img class="ozc-prizes-overview__prize-icon" src="${prize.icon_image.imgix_url}">
            <div class="ozc-prizes-overview__prize-info">
                <span class="ozc-prizes-overview__prize-type">${prize.label}:</span>
                <span class="ozc-prizes-overview__prize-detail">${prize.title_alternative || prize.title}</span>
            </div>
            <div class="ozc-prizes-overview__prize-footnote">${enterByText}</div>
        `;

        el.innerHTML = body;

        return el;
    }

    createPrizesEl () {
        const el = document.createElement('div');
        el.classList = 'ozc-prizes-overview__content';

        this.prizes.forEach((prize) => {
            el.appendChild(this.constructor.createPrizeEl(prize));
        });

        return el;
    }

    createCtaEl () {
        const linkConf = {
            tag: 'a',
            cssClasses: 'oz-btn oz-btn--outline',
            text: this.ctaText,
            attributes: {
                href: '#prizes',
                'data-oa-track': 'click',
                'data-oa-id': 'winWinCTA',
            },
        };

        const node = new SDG.Component.Element(linkConf);

        return node.el;
    }

    createFooterEl () {
        const el = document.createElement('div');
        el.classList = 'ozc-prizes-overview__footer';

        el.innerHTML = this.footerText;

        return el;
    }

    createSubHeaderEl () {
        const el = document.createElement('p');
        el.classList = 'ozc-prizes-overview__sub-header';

        el.innerHTML = this.subHeader;

        return el;
    }

    createHeaderEl () {
        const el = document.createElement('h2');
        el.classList = 'ozc-prizes-overview__header';

        el.innerHTML = this.header;

        return el;
    }

};

export default SDG.Component.PrizesOverview;
