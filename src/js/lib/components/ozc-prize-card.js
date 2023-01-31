/**
 * Class representing a prize card element.
 *
 * @export
 * @class PrizeCard
 * @extends BaseNode
 *
 * @param {Object} options - options for creating a modal.
 * @param {string} [options.header=] - card header content.
 * @param {string} [options.title=] - card title content.
 * @param {string} [options.imageUrl=] - card image url.
 * @param {string} [options.description=] - card description content.
 * @param {string} [options.winnerAnnounceHeader=] - winner section header content.
 * @param {string} [options.winnerAnnounceBody=] - winner section body content.
 * @param {string} [options.winnerImage=] - winner section winner image url.
 * @param {string} [options.closedTag=] - card closed tag text.
 * @param {string} [options.footnote=] - card footnote text.
 *
 * @example
 *
 *    const card = new SDG.Component.PrizeCard({
 *         header: 'Enter by Jan 1st',
 *         winnerAnnounceHeader: 'Winner Announced:',
 *         winnerAnnounceBody: 'On or around Jan 29th',
 *         title: 'Win a Jaguar',
 *         description: 'A real jaguar. It could be yours...',
 *         imageUrl: 'https://some/path/img.jpg',
 *         footnote: 'void where prohibited',
 *         closedTag: 'sorry, closed',
 *    });
 */

window.SDG = window.SDG || {};
SDG.Component = SDG.Component || {};

import {default as BaseNode} from './ozc-base-node.js';
import {default as Element} from './ozc-element.js';
import {default as Image} from './ozc-image.js';

SDG.Component.PrizeCard = class PrizeCard extends BaseNode {
    constructor (options) {
        options = options || {};

        super(options);

        this.header = options.header;
        this.title = options.title;
        this.imageUrl = options.imageUrl;
        this.description = options.description;
        this.winnerAnnounceHeader = options.winnerAnnounceHeader;
        this.winnerAnnounceBody = options.winnerAnnounceBody;
        this.winnerImage = options.winnerImage;
        this.footnote = options.footnote;
        this.closedTag = options.closedTag;

        this.el = this.createEl();
    }

    createEl () {
        const CSS_CLASS = 'ozc-prize-card';

        const el = this.createParentEl('div');
        el.classList.add(CSS_CLASS);

        const header = this.headerEl();
        const title = this.titleEl();
        const image = this.imageEl();
        const description = this.descriptionEl();
        const announcement = this.announcementEl();
        const footer = this.footerEl();

        if (header) {
            el.appendChild(header);
        }

        if (title) {
            el.appendChild(title);
        }

        if (image) {
            el.appendChild(image);
        }

        if (description) {
            el.appendChild(description);
        }

        if (announcement) {
            el.appendChild(announcement);
        }

        if (footer) {
            el.appendChild(footer);
        }

        return el;
    }

    headerEl () {
        const CSS_CLASS = 'ozc-prize-card__header';

        if (!this.header) {
            return false;
        }

        const el = document.createElement('div');
        el.classList = CSS_CLASS;
        el.innerHTML = this.header;

        return el;
    }

    titleEl () {
        const CSS_CLASS = 'ozc-prize-card__title';

        if (!this.title) {
            return false;
        }

        const el = document.createElement('div');
        el.classList = CSS_CLASS;

        el.innerHTML = `<h3>${this.title}</h3>`;

        return el;
    }

    imageEl () {
        const CSS_CLASS = 'ozc-prize-card__image';

        if (!this.imageUrl) {
            return false;
        }

        const image = new Image({
            cssClasses: CSS_CLASS,
            src: this.imageUrl,
            aspectW: 16,
            aspectH: 9,
        });

        if (this.closedTag) {
            const CSS_CLASS = 'ozc-prize-card__prize--closed';
            const el = document.createElement('div');

            el.classList.add(CSS_CLASS);
            el.innerHTML = this.closedTag;

            image.el.appendChild(el);
        }

        return image.el;
    }

    announcementEl () {
        const CSS_CLASS = 'ozc-prize-card__announcement';
        const CSS_CLASS_HEADER = `${CSS_CLASS}-header`;
        const CSS_CLASS_BODY = `${CSS_CLASS}-content`;
        const CSS_CLASS_HAS_IMAGE = `${CSS_CLASS}--has-image`;

        let componentCss = CSS_CLASS;
        let headerEl;
        let bodyEl;
        let imageEl;

        if (!this.winnerAnnounceHeader && !this.winnerAnnounceBody) {
            return false;
        }

        if (this.winnerAnnounceHeader) {
            headerEl = new Element({
                tag: 'p',
                cssClasses: CSS_CLASS_HEADER,
                text: this.winnerAnnounceHeader,
            });
        }

        if (this.winnerAnnounceBody) {
            bodyEl = new Element({
                tag: 'p',
                cssClasses: CSS_CLASS_BODY,
                text: this.winnerAnnounceBody,
            });
        }

        if (this.winnerImage) {
            const IMAGE_FORMATTING = '?auto=format&fm=jpg&q=80&fit=crop&crop=entropy&w=150&h=150';
            const IMAGE_SRC = `${this.winnerImage}${IMAGE_FORMATTING}`;

            componentCss = `${componentCss} ${CSS_CLASS_HAS_IMAGE}`;

            imageEl = new Element({
                tag: 'img',
                attributes: {
                    src: IMAGE_SRC,
                },
            });
        }

        const component = new Element({
            tag: 'div',
            cssClasses: componentCss,
            children: [
                imageEl,
                headerEl,
                bodyEl,
            ],
        });

        if (!component || !component.el) {
            return false;
        }

        return component.el;
    }

    descriptionEl () {
        const CSS_CLASS = 'ozc-prize-card__description';

        if (!this.description) {
            return false;
        }

        const el = document.createElement('p');
        el.classList = CSS_CLASS;
        el.innerText = `${this.description}`;

        return el;
    }

    footerEl () {
        const CSS_CLASS = 'ozc-prize-card__footer';

        if (!this.footnote) {
            return false;
        }

        const el = document.createElement('div');
        el.classList = CSS_CLASS;
        el.innerHTML = `${this.footnote}`;

        return el;
    }
};


export default SDG.Component.PrizeCard;
