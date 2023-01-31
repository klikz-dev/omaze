SDG.Component = SDG.Component || {};

SDG.Component.PrizeCardSimple = class PrizeCardSimple extends SDG.Component.BaseNode {
    constructor (options) {
        options = options || {};

        super(options);

        this.title = options.title;
        this.iconUrl = options.iconUrl;
        this.announceDate = options.announceDate;
        this.winner = this.constructor.validateWinner(options.winner);

        this.el = this.createEl();
    }

    static validateWinner (winner) {
        if (winner && winner.name && winner.location) {
            return winner;
        }

        return false;
    }

    isValid () {
        if (!this.title || !SDG.Utility.Date.isValid(this.announceDate)) {
            return false;
        }

        return true;
    }

    createEl () {
        if (!this.isValid()) {
            return false;
        }

        const el = this.createParentEl('div');
        el.classList = 'ozc-prize-card-simple';

        if (this.winner) {
            el.classList.add('ozc-prize-card-simple--has-winner');
        }

        const icon = this.iconEl();
        const title = this.titleEl();
        const announcement = this.announcementEl();

        if (icon) {
            el.appendChild(icon);
        }

        if (title) {
            el.appendChild(title);
        }

        if (announcement) {
            el.appendChild(announcement);
        }

        return el;
    }

    iconEl () {
        if (!this.iconUrl) {
            return false;
        }

        const el = document.createElement('img');
        el.classList = 'ozc-prize-card-simple__icon';
        el.src = `${this.iconUrl}`;

        return el;
    }

    titleEl () {
        const el = document.createElement('h4');
        el.classList = 'ozc-prize-card-simple__title';
        el.innerText = `${this.title}`;

        return el;
    }

    announcementEl () {
        const ANNOUNCEMENT_COPY = 'On or around';
        let announceHeader = 'Winner announced:';
        let announceDate = `${ANNOUNCEMENT_COPY} ${SDG.Utility.Date.format(this.announceDate)}`;
        let announceWinner;

        let template = `
            <div class="ozc-prize-card-simple__announcement-header">${announceHeader}</div>
            <div class="ozc-prize-card-simple__announcement-date">${announceDate}</div>
        `;

        if (this.winner) {
            announceHeader = 'Congrats to the lucky winner!';
            announceDate = `Announced ${SDG.Utility.Date.format(this.announceDate)}`;
            announceWinner = `${this.winner.name} from ${this.winner.location}`;

            template = `
                <div class="ozc-prize-card-simple__announcement-header">${announceHeader}</div>
                <div class="ozc-prize-card-simple__announcement-winner">${announceWinner}</div>
                <div class="ozc-prize-card-simple__announcement-date">${announceDate}</div>
            `;
        }

        const el = document.createElement('div');
        el.classList = 'ozc-prize-card-simple__announcement';
        el.innerHTML = template;

        return el;
    }
};


export default SDG.Component.PrizeCardSimple;
