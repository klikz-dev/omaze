/* eslint no-console: 0 */
/**
* Promotion Board feature
* Generates and injects a promotion board on targeted page
*
* @export
* SDG.PromotionBoard
*
* @param {array} options - array of board options.
* @param {object} config - config object.
* @param {string} config.productStatus - product status (active or inactive).
*
* Each board object should consit of:
* @param {string} created_at - create date for the object.
* @param {object} metadata - metadata
* @param {string} metadata.start_datetime_utc - date and time when board starts in UTC timezone.
* @param {string} metadata.end_datetime_utc - date and time when board ends in UTC timezone.
* @param {string} metadata.content - message content to display.
* @param {string} [metadata.url_link] - URL to link to on board click.
* @param {string} metadata.image_asset.url - promo product image url
* @param {string} metadata.image_asset.imgix_url - promo product imgix url
*
*/
import {default as FeatureValidation} from '../../features/feature-validation.js';
import {default as PromotionBoardComponent} from '../../components/ozc-promotion-board.js';
import  {default as DateUtils}  from '../../utility/date.js';
import {default as HtmlElement} from '../../utility/html-element';

window.SDG = window.SDG || {};

SDG.PromotionBoard = {
    featureName () {
        return 'promotion-board';
    },

    init (options, config) {
        options = options || [];
        config = config || {};

        if (config.productStatus !== 'active') {
            this.onFeatureFail();

            return false;
        }

        // check for nested metadata object which comes from CosmicJs
        if (options.metadata) {
            options = options.metadata;
        }

        const boards = this.validateBoards(options);

        if (!boards || !boards.length) {
            this.onFeatureFail();

            return false;
        }

        const primaryBoard = this.getPrimaryBoard(boards);

        this.loadBoard(primaryBoard);
        console.info('[SDG.PromotionalBoard.init] initialization successful.');
    },

    validateBoards (boards) {
        if (!Array.isArray(boards)) {
            /* eslint-disable-next-line  no-console */
            console.warn('[SDG.PromotionBoard.validateBoards] board list must be of Array type.');

            return false;
        }

        const validBoards = [];

        boards.forEach((board) => {
            const validBoard = this.transformBoard(board);

            if (validBoard) {
                validBoards.push(validBoard);
            }
        });

        return validBoards;
    },

    transformBoard (board) {
        const {
            title,
            created_at: createdAt,
            metadata: {
                start_datetime_utc: startDate,
                end_datetime_utc: endDate,
                url_link: url,
                content: content,
                image_asset: {
                    url: imageUrl,
                    imgix_url: imgixUrl,
                },
            },
        } = board;

        const startTs = DateUtils.stringDateAsTimestampUTC(startDate,  'm/d/yyyy h:mm am');
        const endTs = DateUtils.stringDateAsTimestampUTC(endDate,  'm/d/yyyy h:mm am');

        if (!content || !startTs || !endTs) {
            /* eslint-disable-next-line  no-console */
            console.warn('[SDG.PromotionBoard.transformBoard] invalid board data}');

            return false;
        }

        if (!this.validTimeFrame(startTs, endTs)) {
            return false;
        }

        return {
            content,
            startTs,
            endTs,
            url,
            imageUrl,
            imgixUrl,
            createdAt,
            title,
        };
    },

    validTimeFrame (startTs, endTs) {
        const nowTs = Date.now();

        return startTs <= nowTs && nowTs < endTs;
    },

    getPrimaryBoard (boards) {
        const sorted = this.sortBoards(boards);

        return sorted[0];
    },

    sortBoards (boards) {
        function createdMoreRecently (a, b) {
            const createdA = DateUtils.getDateTimestamp(a.createdAt);
            const createdB = DateUtils.getDateTimestamp(b.createdAt);

            if (!createdA || !createdB) {
                return 0;
            }

            // more recently created (larger date) wins
            if (createdA < createdB) {
                return 1;
            }

            return -1;
        }

        return boards.sort((a, b) => {
            if (a.endTs === b.endTs) {
                return createdMoreRecently(a, b);
            }

            // ending sooner wins
            if (a.endTs < b.endTs) {
                return -1;
            }

            return 0;
        });
    },

    renderBoard (board, placementSelector) {
        const PLACEMENT_TYPE = 'bottom';

        const analyticsConf = {
            onClickLink: {
                event: 'click',
                ga_action: 'click',
                ga_category: 'On-site Ads',
                ga_label: `Promo Board: ${board.title}`,
            },
        };

        const component = new PromotionBoardComponent({
            content: board.content,
            url: board.url,
            imageUrl: board.imageUrl,
            imgixUrl: board.imgixUrl,
            createdAt: board.createdAt,
            analytics: analyticsConf,
        });

        if (!component || !component.el) {
            this.onFeatureFail();

            return false;
        }


        HtmlElement.placeElement(component.el, placementSelector, PLACEMENT_TYPE);
    },

    loadBoard (board) {
        const PLACEMENT_SELECTOR = 'div[data-testid=\'TitleContainer:Title\']';

        // to ensure that the react component have loaded
        const intervalID = setInterval(() => {
            const placeHolderElement = document.querySelector(PLACEMENT_SELECTOR);
            if (!placeHolderElement) {                
                return;
            }
            
            this.renderBoard(board, PLACEMENT_SELECTOR);
            clearInterval(intervalID);
        }, 100);
    },

    onFeatureFail () {
        return FeatureValidation.invalidateFeature(this.featureName());
    },
}

export default SDG.PromotionBoard;
