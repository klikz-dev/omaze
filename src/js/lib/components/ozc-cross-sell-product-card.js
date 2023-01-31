import {default as Element} from '../components/ozc-element.js';
import {default as Image} from '../components/ozc-image.js';

SDG.Component = SDG.Component || {};

SDG.Component.CrossSellCard = class CrossSellCard extends SDG.Component.BaseNode {
    constructor (options) {
        options = options || {};

        super(options);

        this.id = options.id;
        this.pid = options.productId;
        this.comboId = options.comboId;
        this.comboVariantId = options.comboVariantId;
        this.title = options.title;
        this.imageUrl = options.imageUrl;
        this.description = options.description;
        this.supports = options.supports;
        this.footer = options.footer;
        this.url = options.url;
        this.footer = options.footer || true;
        this.ctaText = options.ctaText || 'add to cart',
        this.ctaTextRebrand = options.ctaTextRebrand || 'add to cart',
        this.baseClassName = 'cross-sell-product-card';
        this.el = this.createEl();
    }

    createEl () {
        const el = this.createParentEl('div');
        el.classList.add(this.baseClassName);
        const title = this.titleEl(this.title, this.url);
        const image = this.imageEl(this.url);
        const description = this.descriptionEl();
        const learnMore = this.learnMoreEl(this.url);
        const learnMoreRebrand = this.learnMoreRebrandEl(this.url);
        const addToCart = this.addToCartEl(this.pid, this.id, this.comboId, this.comboVariantId);
        const addToCartRebrand = this.addToCartRebrandEl(this.pid, this.id, this.comboId, this.comboVariantId);
        const footer = this.footerEl();
        const cardContent = this.cardContentEl();

        if (image) {
            el.appendChild(image);
        }

        if (cardContent) {
            if (title) {
                cardContent.appendChild(title);
            }

            if (description) {
                cardContent.appendChild(description);
            }

            el.appendChild(cardContent);
        }

        if (footer) {
            if (learnMore) {
                footer.appendChild(learnMore);
            }

            if (learnMoreRebrand) {
                footer.appendChild(learnMoreRebrand);
            }

            if (addToCart) {
                footer.appendChild(addToCart);
            }

            if (addToCartRebrand) {
                footer.appendChild(addToCartRebrand);
            }

            el.appendChild(footer);
        }


        return el;
    }

    cardContentEl () {
        const CSS_CLASS = `${this.baseClassName}__content oz-text-fade--7`;
        const el = document.createElement('div');
        el.classList = CSS_CLASS;

        return el;
    }

    titleEl (title) {
        const elementConfig = {
            tag: 'div',
            cssClasses: `${this.baseClassName}__title`,
            text: title,
        };

        const node = new Element(elementConfig);

        return node.el;
    }

    imageEl (url) {
        const CSS_CLASS = `${this.baseClassName}__image`;
        const CONTAINER_CSS_CLASS = `${this.baseClassName}__image-link`;
        if (!this.imageUrl) {
            return false;
        }

        const linkConfig = {
            tag: 'a',
            cssClasses: CONTAINER_CSS_CLASS,
            text: '',
            attributes: {
                'href': `${url}`,
                'data-oa-id': 'clickProduct',
                'data-oa-details':`product_id:${this.id}`,

            },
        };

        const imageNode = new Image({
            cssClasses: CSS_CLASS,
            src: this.imageUrl,
            aspectW: 16,
            aspectH: 9,
        });

        const linkNode = new Element(linkConfig);
        linkNode.el.appendChild(imageNode.el);

        return linkNode.el;
    }


    descriptionEl () {
        const CSS_CLASS = `${this.baseClassName}__description`;

        const elementConfig = {
            tag: 'span',
            cssClasses: CSS_CLASS,
            text: `${this.description}`,
        };

        const node = new Element(elementConfig);

        return node.el;
    }

    supportsEl () {
        const CSS_CLASS = `${this.baseClassName}__supports`;

        if (!this.supports) {
            return false;
        }

        const el = document.createElement('p');
        el.classList = CSS_CLASS;
        el.innerText = `Supporting ${this.supports}`;

        return el;
    }

    learnMoreEl (url) {
        const TEXT = 'learn more';
        const linkConfig = {
            tag: 'a',
            cssClasses: `${this.baseClassName}__learn-more`,
            text: TEXT,
            attributes: {
                'href': `${url}`,
                'data-oa-id': 'clickProduct',
                'data-oa-details':`product_id:${this.id}`,
            },
        };

        const node = new Element(linkConfig);

        return node.el;
    }

    learnMoreRebrandEl (url) {
        const TEXT = 'More entry options';
        const linkConfig = {
            tag: 'a',
            cssClasses: `${this.baseClassName}__learn-more rebrand`,
            text: TEXT,
            attributes: {
                'href': `${url}`,
                'data-oa-id': 'clickProduct',
                'data-oa-details':`product_id:${this.id}`,
            },
        };

        const node = new Element(linkConfig);

        return node.el;
    }

    footerEl () {
        const CSS_CLASS = `${this.baseClassName}__footer`;
        if (!this.footer) {
            return false;
        }
        const el = document.createElement('div');
        el.classList = CSS_CLASS;

        return el;
    }

    addToCartEl (productId, variantId, comboId, comboVariantId) {
        const linkConfig = {
            tag: 'a',
            cssClasses: `oz-btn oz-btn--cta oz-btn--outline ${this.baseClassName}__add-to-cart`,
            text: this.ctaText,
            attributes: {
                'data-variant-id': variantId,
                'data-combo-id': comboId,
                'data-combo-variant-id': comboVariantId,
                'data-oa-track': 'click',
                'data-oa-id': 'addToCart',
                'data-oa-details': `cross_sell:true;product_id:${productId};variant_id:${variantId}`,
            },
        };

        const node = new Element(linkConfig);

        return node.el;
    }

    addToCartRebrandEl (productId, variantId, comboId, comboVariantId) {
        const linkConfig = {
            tag: 'a',
            cssClasses: `oz-btn oz-btn--cta oz-btn--outline ${this.baseClassName}__add-to-cart rebrand`,
            text: this.ctaTextRebrand,
            attributes: {
                'data-variant-id': variantId,
                'data-combo-id': comboId,
                'data-combo-variant-id': comboVariantId,
                'data-oa-track': 'click',
                'data-oa-id': 'addToCart',
                'data-oa-details': `cross_sell:true;product_id:${productId};variant_id:${variantId}`,
            },
        };

        const node = new Element(linkConfig);

        return node.el;
    }
};


export default SDG.Component.CrossSellCard;
