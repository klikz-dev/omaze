SDG.Component = SDG.Component || {};

SDG.Component.WinnerCard = class WinnerCard extends SDG.Component.BaseNode {
    constructor (options) {
        options = options || {};

        super(options);

        this.header = options.header;
        this.winner = options.winner;
        this.prizeTitle = options.prizeTitle;
        this.heroUrl = options.heroUrl;
        this.announceDate = options.announceDate;

        this.el = this.createEl();
    }

    createEl () {
        if (!SDG.Utility.Date.isValid(this.announceDate)) {

            return false;
        }

        const el = this.createParentEl('div');
        el.classList.add('ozc-winner-card');

        const header = this.headerEl();
        const prizeAnnouncement = this.prizeAnnouncementEl();
        const image = this.imageEl();
        const announceDate = this.announceDateEl();

        if (header) {
            el.appendChild(header);
        }

        if (prizeAnnouncement) {
            el.appendChild(prizeAnnouncement);
        }

        if (image) {
            el.appendChild(image);
        }

        if (announceDate) {
            el.appendChild(announceDate);
        }

        return el;
    }

    announceDateEl () {
        const formattedDate = SDG.Utility.Date.format(this.announceDate);

        const el = document.createElement('p');
        el.classList = 'ozc-winner-card__announce-date caption';
        el.innerHTML = `Announced ${formattedDate}`;

        return el;

    }

    imageEl () {
        if (!this.heroUrl) {
            return false;
        }

        const image = new SDG.Component.Image({
            cssClasses: 'ozc-winner-card__image',
            src: this.heroUrl,
            aspectW: 16,
            aspectH: 9,
        });

        return image.el;
    }

    prizeAnnouncementEl () {
        const el = document.createElement('div');
        el.classList = 'ozc-winner-card__prize-announcement';

        el.innerHTML = `
            <div class="ozc-winner-card__prize-announcement-winner">
                ${this.winner.name} from ${this.winner.location} won a
            </div>
            <div class='ozc-winner-card__prize-announcement-prize'>
                ${this.prizeTitle}
            </div>
         `;

        return el;
    }

    headerEl () {
        const el = document.createElement('div');
        el.classList = 'ozc-winner-card__header';
        el.innerHTML = `<h2>${this.header}</h2>`;

        return el;
    }
};


export default SDG.Component.WinnerCard;
