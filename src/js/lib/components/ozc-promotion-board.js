/**
 * Class representing a promotion board component.
 * Generates a promotion board with content and image
 *
 * @export
 * @class PromotionBoardComponent
 * @extends BaseNode
 *
 * @param {object} options - options for creating a promotion board
 * @param {string} options.content - content to display
 * @param {string} [options.id=] - id of board
 * @param {string} [options.url=] - if given, board will be a link
 * @param {string} [options.imageUrl=] - url of image to display
 * @param {string} [options.imgixUrl=] - imgixUrl of image to display (preferred to imageUrl)
 * @param {object} [options.analytics=] - config for pre-defined GA analytics events
 *
 * @example
 *
 *     const promoBoard = new PromotionBoardComponent({
 *         content: 'This is the best example ever!',
 *         url: 'omaze.com',
 *         imageUrl: 'image.com'
 *     });
 */

import {default as Element} from './ozc-element.js';
import {default as Image} from './ozc-image.js';

class PromotionBoardComponent extends SDG.Component.BaseNode {
    constructor (options) {
        options = options || {}

        super(options);

        this.id = options.id;
        this.content = options.content;
        this.imageUrl = PromotionBoardComponent.validateURL(options.imgixUrl || options.imageUrl);
        this.url = PromotionBoardComponent.validateURL(options.url);
        this.baseClassName = 'ozc-promotion-board';
        this.analytics = options.analytics;
        
        this.el = this.createEl();
        this.addAnalyticsEvents();
    }

    createEl () {
        const nodeConfig = {
            tag: 'div',
            cssClasses: this.baseClassName,
        };

        const node = new Element(nodeConfig);
        node.el.appendChild(this.boardContainerEl());

        if (!this.url) {
            return node.el;
        }

        const linkConfig = {
            tag: 'a',
            cssClasses: `${this.baseClassName}__wrapper`,
            attributes: {
                'href': `${this.url}`,
                'target': '_blank',
            },
        };

        const linkWrapper = new Element(linkConfig);
        linkWrapper.el.appendChild(node.el);

        return linkWrapper.el;
    }

    addAnalyticsEvents () {
        if (!this.el || !this.analytics) {
            return false;
        }

        if (this.analytics.onClickLink && this.url) {
            this.el.addEventListener('click', () => {
                SDG.Analytics.events.pushDataLayerEvent(this.analytics.onClickLink);
            });
        }
    }

    boardContainerEl () {
        const CSS_CLASS = `${this.baseClassName}__container`;
        const el = document.createElement('div');
        el.classList.add(CSS_CLASS);
        let imageEl = this.imageEl(this.imageUrl);

        if (imageEl) {
            el.appendChild(imageEl);
        }

        const contentEl = this.contentEl();
        el.appendChild(contentEl);

        return el;
    }

    imageEl (imageUrl) {
        if (!imageUrl) {
            return false;
        }

        const CSS_CLASS = `${this.baseClassName}__image`;
        const CONTAINER_CSS_CLASS = `${this.baseClassName}__image-container`;

        const imageContainerConfig = {
            tag: 'div',
            cssClasses: CONTAINER_CSS_CLASS,
            text: '',
        };

        const container = new Element(imageContainerConfig);

        const imageNode = new Image({
            cssClasses: CSS_CLASS,
            src: imageUrl,
            aspectW: 1,
            aspectH: 1,
        });

        container.appendChild(imageNode.el);

        return container.el;
    }

    static validateURL (url) {
        const regex = /^(http|https):\/\/[^ "]+$/;

        if (!url) {
            return false;
        }

        if (!regex.test(url)) {
            /* eslint-disable-next-line  no-console */
            console.warn(`[SDG.Component.PromotionBoardComponent.validateURL] invalid url format: [${url}].`);

            return false;
        }

        return url;
    }

    contentEl () {
        const CSS_CLASS = `${this.baseClassName}__content`;

        const elementConfig = {
            tag: 'span',
            cssClasses: CSS_CLASS,
            text: `${this.content}`,
        };

        const node = new Element(elementConfig);

        return node.el;
    }
}

export default PromotionBoardComponent;
