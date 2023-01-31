/**
 * Class representing a page hero component with image, header and body text.
 *
 * @export
 * @class PageHero
 * @extends BaseNode

 * @example
 *
 *     const myBlock = new PageHero({
 *        image: '<img .../>',
 *        header: 'I am a Header',
 *        body 'I am hero body text',
 *     });
 */

SDG.Component = SDG.Component || {};

SDG.Component.PageHero = class PageHero extends SDG.Component.BaseNode {
    constructor (options) {
        options = options || {};
        super(options);

        this.image = options.image;
        this.header = options.header;
        this.body = options.body;

        this.el = this.createEl();
    }

    createEl () {
        const el = this.createParentEl('div');
        el.classList.add('ozsg-page-header');

        const imageEl = this.createImageEl();
        const bodyEl = this.createBodyEl();

        if (imageEl) {
            el.appendChild(imageEl);
        }

        if (bodyEl) {
            el.appendChild(bodyEl);
        }

        return el;
    }

    createBodyEl () {
        if (!this.header && !this.body) {
            return false;
        }

        const el = document.createElement('div');
        el.classList = 'ozsg-page-header__body';

        if (this.header) {
            const headerEl = document.createElement('h2');
            headerEl.classList = 'ozsg-page-header__body-title';
            headerEl.innerHTML = this.header;

            el.appendChild(headerEl);
        }

        if (this.body) {
            const contentEl = document.createElement('div');
            contentEl.classList = 'ozsg-page-header__body-content';

            this.contentEl = contentEl;

            if (typeof this.body === 'object') {
                contentEl.appendChild(this.body);
            } else {
                contentEl.innerHTML = this.body;
            }

            el.appendChild(contentEl);
        }

        return el;
    }


    createImageEl () {
        if (!this.image) {
            return false;
        }

        const PARENT_CSS_CLASS = 'ozsg-page-header__hero';
        const IMAGE_CSS_CLASS = 'ozsg-page-header__hero-img';

        const el = document.createElement('div');
        el.classList = PARENT_CSS_CLASS;

        if (this.image instanceof HTMLElement) {
            this.image.classList.add(IMAGE_CSS_CLASS);

            el.appendChild(this.image)

            return el;
        }

        el.innerHTML = `<img class="${IMAGE_CSS_CLASS}" src=${this.heroUrl}>`;

        return el;
    }
};


export default SDG.Component.PageHero;
