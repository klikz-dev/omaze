import { default as Image } from '../components/ozc-image.js';
import { default as DaysCounter } from '../days-counter';

SDG.Component = SDG.Component || {};

SDG.Component.ProductRecommendationCard = class ProductRecommendationCard extends SDG.Component.BaseNode {
    constructor (options) {
        options = options || {};

        super(options);

        this.title = options.title;
        this.imageUrl = options.imageUrl;
        this.support = options.support;
        this.url = options.url;
        this.id = options.id;
        this.hasWinner = options.hasWinner;
        this.tags = Array.isArray(options.tags) ? options.tags : [];
        this.config = {
            BASE_CLASS_NAME: 'product',
            WINNER_PENDING_LABEL: 'Winner Pending',
            SEE_WHO_WON_LABEL: 'See who won',
            END_DATE_TAG_PREFIX: '$oz_sweepstake_dates-end:',
            SWEEPSTAKE_ACTIVE_TAG: '$oz_sweepstake_status:active',
            SWEEPSTAKE_CLOSED_TAG: '$oz_sweepstake_status:closed',
        };
        this.el = this.createEl();
    }

    createEl () {
        const productCardAnchor = this.productCardAnchorEl();

        const parentElConfig = {
            tag: 'div',
            cssClasses: 'product-recommendation__card',
            children: [
                productCardAnchor,
            ],
        }

        const parentNode = new SDG.Component.Element(parentElConfig);

        return parentNode.el;
    }

    productCardAnchorEl () {
        const { BASE_CLASS_NAME } = this.config;
        const productImage = this.imageEl();
        const productTag = this.renderProductTag();
        const productDescription = this.productDescriptionEl();

        const linkConfig = {
            tag: 'a',
            cssClasses: `${BASE_CLASS_NAME}__anchor`,
            attributes: {
                'href': this.url,
                'data-oa-id': 'clickProduct',
                'data-oa-details':`product_id:${this.id}`,
            },
            children: [
                productTag,
                productImage,
                productDescription,
            ],
        };

        const node = new SDG.Component.Element(linkConfig);

        return node.el;
    }

    renderProductTag () {
        const { BASE_CLASS_NAME, SEE_WHO_WON_LABEL, WINNER_PENDING_LABEL } = this.config;
        const timeTagLabel = this.getTimeTagLabel();
        const winnerTagLabel = this.getWinnerTagLabel();
        if (!winnerTagLabel && !timeTagLabel) {
            return false;
        }

        let winnerClass = '';
        if (winnerTagLabel === SEE_WHO_WON_LABEL) {
            winnerClass = `${BASE_CLASS_NAME}__product-tag--see-who-won`;
        } else if (winnerTagLabel === WINNER_PENDING_LABEL) {
            winnerClass = `${BASE_CLASS_NAME}__product-tag--winner-pending`;
        }

        return this.productTagEl(winnerTagLabel || timeTagLabel, winnerClass);
    }

    productTagEl (label, className) {
        const { BASE_CLASS_NAME } = this.config;
        const tagConfig = {
            tag: 'div',
            cssClasses: `${BASE_CLASS_NAME}__product-tag ${className}`,
            content: label,
        }

        const node = new SDG.Component.Element(tagConfig);

        return node.el;
    }

    getWinnerTagLabel () {
        const { WINNER_PENDING_LABEL, SEE_WHO_WON_LABEL, SWEEPSTAKE_CLOSED_TAG } = this.config;
        const isSweepstakeClosed = this.tags.find((tag) => tag === SWEEPSTAKE_CLOSED_TAG);

        if (!isSweepstakeClosed) {
            return false;
        }

        if (this.hasWinner == 'true') {
            return SEE_WHO_WON_LABEL;
        }

        return WINNER_PENDING_LABEL;
    }


    getTimeTagLabel () {
        const { END_DATE_TAG_PREFIX, SWEEPSTAKE_ACTIVE_TAG } = this.config;
        const endDateTag = this.tags.find((tag) => tag.startsWith(END_DATE_TAG_PREFIX));
        const isSweepstakeActive = this.tags.find((tag) => tag === SWEEPSTAKE_ACTIVE_TAG);
        if (!isSweepstakeActive || !endDateTag) {
            return false;
        }

        const now = Date.now();
        const endDate = endDateTag.split(END_DATE_TAG_PREFIX)[1];
        if (!SDG.Utility.Date.isValid(endDate) || !SDG.Utility.Date.isInFuture(endDate)) {
            return false;
        }

        const endDateTimeStamp = SDG.Utility.Date.getDateTimestamp(endDate);
        if (!endDateTimeStamp) {
            return false;
        }

        const timeDifference = endDateTimeStamp - now;
        return DaysCounter().getFormattedDaysDiff(timeDifference);
    }

    imageEl () {
        if (!this.imageUrl) {
            return false;
        }
        
        const { BASE_CLASS_NAME } = this.config;
        const imageNode = new Image({
            cssClasses: `${BASE_CLASS_NAME}__img`,
            src: this.imageUrl,
            alt: this.title,
            aspectW: 16,
            aspectH: 9,
        });

        return imageNode && imageNode.el;
    }

    productDescriptionEl () {
        const { BASE_CLASS_NAME } = this.config;
        const productSupportEl = this.supportEl();
        const productTitleEl = this.titleEl();

        const config = {
            tag: 'div',
            cssClasses: `${BASE_CLASS_NAME}__description oz-card__description`,
            children: [
                productSupportEl,
                productTitleEl,
            ],
        };

        const node = new SDG.Component.Element(config);

        return node.el;
    }

    supportEl () {
        const { BASE_CLASS_NAME } = this.config;
        const supportText = `Support ${this.support}`;
        const config = {
            tag: 'h4',
            cssClasses: `${BASE_CLASS_NAME}__charity`,
            content: supportText,
        };

        const node = new SDG.Component.Element(config);

        return node.el;
    }

    titleEl () {
        const { BASE_CLASS_NAME } = this.config;
        const config = {
            tag: 'h3',
            cssClasses: `${BASE_CLASS_NAME}__title`,
            content: this.title,
        };

        const node = new SDG.Component.Element(config);

        return node.el;
    }
};


export default SDG.Component.ProductRecommendationCard;
