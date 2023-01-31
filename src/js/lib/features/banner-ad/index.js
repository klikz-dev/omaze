/* eslint no-console: 0 */
/**
* Banner Ad feature
* Generates and injects a message banner inside the header
*
* @export
* SDG.BannerAd
*
* @param {array} options - array of banner options.
* @param {object} config - config object.
* @param {string} config.productStatus - product status (active or inactive).
*
* Each banner object should consit of:
* @param {string} created_at - create date for the object.
* @param {object} metadata - metadata
* @param {string} metadata.start_datetime_utc - date and time when banner starts in UTC timezone.
* @param {string} metadata.end_datetime_utc - date and time when banner ends in UTC timezone.
* @param {string} metadata.content - message content to display.
* @param {string} [metadata.url_link] - URL to link to on banner click.
*
*/

import {default as BannerComponent} from '../../components/ozc-message-banner.js';
import {default as FeatureValidation} from '../../features/feature-validation.js';
import {default as Header} from '../../header.js';
import {default as DateUtils} from '../../utility/date.js';
import {default as HtmlElement} from '../../utility/html-element';

window.SDG = window.SDG || {};
SDG.BannerAd = SDG.BannerAd || {};

SDG.BannerAd = {
    featureName () {
        return 'banner-ad';
    },

    init (options, config) {
        options = options || [];
        config = config || {};

        if (this.bannerAdsExist()) {
            /* eslint-disable-next-line  no-console */
            console.warn('[SDG.BannerAd.init] not allowed to render more than 1 bannerAd in header.');

            return false;
        }

        if (config.productStatus !== 'active') {
            this.onFeatureFail();

            return false;
        }

        // check for nested metadata object which comes from CosmicJs
        if (options.metadata) {
            options = options.metadata;
        }

        const banners = this.validateBanners(options);

        if (!banners || !banners.length) {
            this.onFeatureFail();

            return false;
        }

        const primaryBanner = this.getPrimaryBanner(banners);

        this.renderBanner(primaryBanner);
    },

    bannerAdsExist () {
        const HEADER_ID = 'hdr';

        const headerEl = document.getElementById(HEADER_ID);

        if (!headerEl) {
            /* eslint-disable-next-line  no-console */
            console.warn(`[SDG.BannerAd.bannerAdsExist] cannot find page banner by ID: [${HEADER_ID}].`);

            return false;
        }

        const banners = headerEl.getElementsByClassName(BannerComponent.cssBaseClass);

        return banners && !!banners.length;
    },

    validateBanners (banners) {
        if (!Array.isArray(banners)) {
            /* eslint-disable-next-line  no-console */
            console.warn('[SDG.BannerAd.validateBanners] banner list must be of Array type.');

            return false;
        }

        const validBanners = [];

        banners.forEach((banner) => {
            const validBanner = this.transformBanner(banner);

            if (validBanner) {
                validBanners.push(validBanner);
            }
        });

        return validBanners;
    },

    transformBanner (banner) {
        const {
            title: title,
            created_at: createdAt,
            metadata: {
                content: rawContent,
                start_datetime_utc: startDate,
                end_datetime_utc: endDate,
                url_link: url,
                link_same_window: linkSameWindow,
            } = {},
        } = banner;

        const content = typeof(rawContent) === 'string' && rawContent.trim();
        const startTs = DateUtils.stringDateAsTimestampUTC(startDate,  'm/d/yyyy h:mm am');
        const endTs = DateUtils.stringDateAsTimestampUTC(endDate,  'm/d/yyyy h:mm am');

        if (!content || !startTs || !endTs) {
            /* eslint-disable-next-line  no-console */
            console.warn(`[SDG.BannerAd.transformBanner] invalid banner data: ${JSON.stringify(banner)}`);

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
            linkSameWindow,
            createdAt,
            title,
        };
    },

    validTimeFrame (startTs, endTs) {
        const nowTs = Date.now();

        return startTs <= nowTs && nowTs < endTs;
    },

    getPrimaryBanner (banners) {
        const sorted = this.sortBanners(banners);

        return sorted[0];
    },

    sortBanners (banners) {
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

        return banners.sort((a, b) => {
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

    renderBanner (banner) {
        const BANNER_TYPE = 'info';
        const PLACEMENT_SELECTOR = '#hdr';
        const PLACEMENT_TYPE = 'top';

        const analyticsConf = {
            onClickLink: {
                event: 'click',
                ga_action: 'click',
                ga_category: 'On-site Ads',
                ga_label: `Banner Ad: ${banner.title}`,
            },
        };

        const component = new BannerComponent({
            type: BANNER_TYPE,
            content: banner.content,
            url: banner.url,
            linkSameWindow: banner.linkSameWindow,
            analytics: analyticsConf,
        });

        if (!component || !component.el) {
            this.onFeatureFail();

            return false;
        }

        HtmlElement.placeElement(component.el, PLACEMENT_SELECTOR, PLACEMENT_TYPE);

        Header.onResize();
    },

    onFeatureFail () {
        return FeatureValidation.invalidateFeature(this.featureName());
    },
};

export default SDG.BannerAd;
