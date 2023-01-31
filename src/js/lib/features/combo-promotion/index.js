/* eslint no-console: 0 */
/**
 * Combo Promotion feature
 * Generates and injects an image carousel
 *
 * @export
 * SDG.ComboPromotion
 *
 * @param {Object} options - options for creating a combo promotion.
 * @param {string} options.secondary_campaign_handle - Product handle of secondary campaign in the promotion.
 * @param {string} options.start_datetime_utc - date and time when promo starts in UTC timezone.
 * @param {string} options.end_datetime_utc - date and time when promo ends in UTC timezone.
 * @param {array} options.variant_combos - list of variant ID pairs to be used in the promo.
 *     Array elements are objects containing:
 *         - {number} primary_variant_sku
 *         - {number} secondary_variant_sku
 * @param {Object} options.banner_ad - options for displaying a banner ad.
 * @param {string} options.banner_ad.content - banner ad content.
 * @param {string} options.banner_ad.url_link - banner ad url link.
 */

import {default as BannerAdFeature} from '../banner-ad';
import {default as DateUtils} from '../../utility/date.js';

window.SDG = window.SDG || {};

SDG.ComboPromotion = {
    featureName () {
        return 'combo-promotion';
    },

    validateOptions (options) {
        if (!options) {
            console.error('[ComboPromotion.validateOptions]: mising options.');

            return false;
        }

        // check for nested metadata object which comes from CosmicJs
        if (options.metadata) {
            const createdAt = options.created_at;
            const title = options.title;

            options = options.metadata;
            options.created_at = createdAt;
            options.title = title;
        }

        const {
            secondary_campaign_handle,
            variant_combos,
            start_datetime_utc,
            end_datetime_utc,
            created_at,
            title,
            banner_ad,
        } = options;

        if (!secondary_campaign_handle) {
            console.error('[ComboPromotion.validateOptions]: mising secondary campaign handle.');

            return false;
        }

        if (!Array.isArray(variant_combos) || !variant_combos.length) {
            console.error('[ComboPromotion.validateOptions]: missing combo variant data.');

            return false;
        }

        const validCombos = variant_combos.every((combo) => {
            return combo.primary_variant_sku && combo.secondary_variant_sku;
        });

        if (!validCombos) {
            console.error('[ComboPromotion.validateOptions]: combos missing sku data.');

            return false;
        }

        if (!start_datetime_utc || !end_datetime_utc) {
            console.error('[ComboPromotion.validateOptions]: missing combo start or end date.');

            return false;
        }

        // this can be very common as combos expire, so fail silently.
        if (!this.isComboActive(start_datetime_utc, end_datetime_utc)) {
            console.info('[ComboPromotion.validateOptions]: combo is not active.');

            return false;
        }

        return {
            secondaryCampaignHandle: secondary_campaign_handle,
            variantCombos: variant_combos,
            startDateUTC: start_datetime_utc,
            endDateUTC: end_datetime_utc,
            comboCreatedAt: created_at,
            comboTitle: title,
            bannerAd: banner_ad,
        };
    },

    init (options, config) {
        const comboData = this.validateOptions(options)

        if (!comboData) {
            return false;
        }

        const {
            productStatus,
            slug,
            fameUpsellVariantSku,
        } = config || {};

        if (productStatus !== 'active') {
            return false;
        }

        comboData.fameUpsellVariantSku = fameUpsellVariantSku;
        comboData.primaryProductHandle = slug;

        return this.initComboFeature(comboData)
            .catch((error) => {
                console.error('[ComboPromotion.init]', error);
            });
    },

    async initComboFeature (comboData) {
        const getPrimaryCampaign = this.getPrimaryCampaign(comboData.primaryProductHandle);
        const getSecondaryCampaign = this.fetchProductByHandle(comboData.secondaryCampaignHandle);

        const campaigns = await Promise.all([getPrimaryCampaign, getSecondaryCampaign]);

        const primaryCampaign = campaigns[0];
        const secondaryCampaign = campaigns[1];

        const variantCombos = this.findComboIDs(comboData.variantCombos, primaryCampaign.variants, secondaryCampaign.variants);

        if (!variantCombos || !variantCombos.length) {
            throw new Error('[ComboPromotion.initComboFeature]: no valid variant combos found.');
        }

        comboData.primaryCampaign = primaryCampaign;
        comboData.secondaryCampaign = secondaryCampaign;
        comboData.variantCombos = variantCombos;

        console.info('[SDG.ComboPromotion.initComboFeature] initializing combo promotion feature.');

        return this.load(comboData);
    },

    getPrimaryCampaign (handle) {
        if (window.productJson && window.productJson.id && window.productJson.title && window.productJson.variants) {
            return Promise.resolve(window.productJson);
        }

        return this.fetchProductByHandle(handle);
    },

    fetchProductByHandle (handle) {
        if (!handle) {
            return Promise.reject(new Error('missing product handle.'));
        }

        const url = `/products/${handle}.json`;

        const requestConfig = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }

        return this.fetchFromShopifyApi(url, requestConfig)
            .then((response) => {
                const { product } = response || {};

                if (!this.isValidProduct(product)) {
                    return Promise.reject(new Error(`[fetchProductByHandle] invalid product with handle: [${handle}].`));
                }

                if (this.isSweepstakeClosed(product.tags)) {
                    return Promise.reject(new Error(`[fetchProductByHandle] closed product with handle: [${handle}].`));
                }

                return product;
            });
    },

    isValidProduct (product) {
        return product &&
            product.id &&
            product.title &&
            product.tags &&
            Array.isArray(product.variants);
    },

    generateFeatureId (startDate, primaryCampaignID, secondaryCampaignID) {
        const timestampStartUTC = DateUtils.stringDateAsTimestampUTC(startDate, 'm/d/yyyy h:mm am');

        if (!timestampStartUTC || !primaryCampaignID || !secondaryCampaignID) {
            console.warn('[SDG.ComboPromotion.generateFeatureId]: failed to generate FeatureID');

            return false;
        }

        return `${primaryCampaignID}-${secondaryCampaignID}-${timestampStartUTC}`;
    },

    load (comboData) {
        // to ensure that the react component have loaded
        const intervalID = setInterval(() => {
            if (!this.getDonationCardsContainerEl()) {
                return;
            }

            clearInterval(intervalID);

            this.initEventListeners(comboData);
            this.initBannerAd(comboData);
            this.addComboDataToFameLink(comboData);
        }, 100);
    },

    initEventListeners (comboData) {
        const donationCardEls = this.getDonationCardEls();

        if (!donationCardEls || !donationCardEls.length) {
            console.error('[SDG.ComboPromotion.initEventListeners]: no donation card found');

            return;
        }

        const {
            startDateUTC,
            variantCombos,
            secondaryCampaign,
            primaryCampaign,
        } = comboData;

        // generate feature ID
        const comboId = this.generateFeatureId(startDateUTC, primaryCampaign.id, secondaryCampaign.id);

        // create comboVariantMap for constant time access
        const variantComboMap = {};

        for (const variantCombo of variantCombos) {
            variantComboMap[variantCombo.primaryVariantId] = variantCombo.secondaryVariantId;
        }

        // this acts a semaphore to signal if the cardHandler should run or not
        // reason: this is need to prevent double calls to cardHandler
        let isAvailable = true;

        donationCardEls.forEach((card) => {
            const cartUrl = card.getAttribute('href') || '';
            // remove href attribute to prevent 'open link in new tab'
            card.setAttribute('href', '');

            card.addEventListener('click', async (e) => {
                e.preventDefault();

                if (!isAvailable) {
                    return;
                }

                isAvailable = false;

                // get primary variant id from href attribute
                if (!cartUrl) {
                    console.error('[SDG.ComboPromotion.initEventListeners]: no cart url');
                    isAvailable = true;
                    return;
                }

                const url = new URL(`${window.location.origin}/${cartUrl}`);
                const params = new URLSearchParams(url.search);

                // check for primary variant id
                const primaryVariantId = params.get('id') || '';

                if (!primaryVariantId) {
                    console.error('[SDG.ComboPromotion.initEventListeners]: no primaryVariantId');

                    return false;
                }

                const secondaryVariantId = variantComboMap[primaryVariantId];

                if (!secondaryVariantId) {
                    console.warn('[SDG.ComboPromotion.initEventListeners]: no secondaryVariantId found.');

                    // secondaryVariantId missing. sending to cart with primary variant only.
                    window.location.href = cartUrl;

                    return;
                }

                const cartUpdated = await this.addComboVariantsToCart(comboId, primaryVariantId, secondaryVariantId);

                if (!cartUpdated) {
                    // TODO: how to handle cart update failure?
                    //     * show user some type of an error (flash message)?
                    //     * send them to original cart url (w/o combo added)?

                    isAvailable = true;

                    return;
                }

                window.location.href = '/cart';
            });
        });
    },

    fetchFromShopifyApi (url, requestConfig) {
        const storeBaseUrl = window.location.origin;
        return fetch(`${storeBaseUrl}${url}`, requestConfig)
            .then((response) => {
                if (!response || !response.ok) {
                    return Promise.reject(new Error('request failed'));
                }

                return response.json();
            })
            .catch((error) => {
                console.error('[SDG.ComboPromotion.fetchFromShopifyApi]: ', error);
                return error;
            });
    },

    isSweepstakeClosed (productTags) {
        const SWEEPSTAKE_CLOSED_TAG = '$oz_sweepstake_status:closed';

        return productTags.includes(SWEEPSTAKE_CLOSED_TAG);
    },

    isComboActive (startDate, endDate) {
        const DATE_PATTERN = 'm/d/yyyy h:mm am';
        const startDateTimestamp = DateUtils.stringDateAsTimestampUTC(startDate, DATE_PATTERN);
        const endDateTimestamp = DateUtils.stringDateAsTimestampUTC(endDate, DATE_PATTERN);
        const nowTimestamp = Date.now();

        if (!startDateTimestamp || !endDateTimestamp) {
            console.error(`[SDG.ComboPromotion.isComboActive]: invalid dates: [start: ${startDate}] [end: ${endDate}].`);

            return false;
        }

        return startDateTimestamp <= nowTimestamp &&
            endDateTimestamp > nowTimestamp;
    },

    findComboIDs (variantCombos, primaryVariants, secondaryVariants) {
        if (!Array.isArray(variantCombos) || !Array.isArray(primaryVariants) || !Array.isArray(secondaryVariants)) {
            console.error(new Error('[SDG.ComboPromotion.findComboIDs]: invalid combo variant data'));

            return false;
        }

        const combos = [];

        for (const combo of variantCombos) {
            // validate secondary variant sku
            if (!this.isValidComboSku(combo.secondary_variant_sku)) {
                console.error(new Error(`[SDG.ComboPromotion.findComboIDs]: invalid secondary variant sku: [${combo.secondary_variant_sku}]`));

                return false;
            }

            // validate primary variant
            const primaryVariant = primaryVariants.find((variant) => variant.sku === combo.primary_variant_sku);

            if (!primaryVariant) {
                console.error(new Error(`[SDG.ComboPromotion.findComboIDs]: missing primary variant with sku: [${combo.primary_variant_sku}]`));

                return false;
            }

            // validate secondary variant
            const secondaryVariant = secondaryVariants.find((variant) => variant.sku === combo.secondary_variant_sku);

            if (!secondaryVariant) {
                console.error(new Error(`[ComboPromotion.findComboIDs]: missing secondary variant with sku: [${combo.secondary_variant_sku}]`));

                return false;
            }

            combos.push({
                primaryVariantId: primaryVariant.id,
                primaryVariantSku: primaryVariant.sku,
                secondaryVariantSku: secondaryVariant.sku,
                secondaryVariantId: secondaryVariant.id,
            });
        }

        return combos;
    },

    isValidComboSku (sku) {
        const COMBO_SKU_PREFIX = 'combo-entries_';

        if (typeof (sku) !== 'string') {
            return false;
        }

        return sku.startsWith(COMBO_SKU_PREFIX);
    },

    getDonationCardsContainerEl () {
        const DONATION_CARDS_CONTAINER_ID = 'active-experience-app__donation-cards';
        return document.getElementById(DONATION_CARDS_CONTAINER_ID) || false;
    },

    getDonationCardEls () {
        const donationCardsContainerEl = this.getDonationCardsContainerEl();
        const DONATION_CARD_SELECTOR = 'DonationCard:DonationCard';

        if (!donationCardsContainerEl) {
            console.error('[SDG.ComboPromotion.getDonationCardEls]: no donation card container found');
            return false;
        }

        const donationCardEls = donationCardsContainerEl.querySelectorAll(`a[data-testid="${DONATION_CARD_SELECTOR}"]`);
        if (!donationCardEls || donationCardEls.length < 1) {
            console.error('[SDG.ComboPromotion.getDonationCardEls]: no donation card elements found');
            return false;
        }

        return donationCardEls;
    },

    addComboVariantsToCart (comboId, primaryVariantId, secondaryVariantId) {
        if (!primaryVariantId || !secondaryVariantId) {
            console.error('[SDG.ComboPromotion.addSecondaryVariantToCart] invalid variant id');

            return false;
        }

        const payload = {
            items: [
                {
                    id: primaryVariantId,
                    quantity: 1,
                    properties: {
                        combo_id: comboId,
                        combo_primary_variant_id: parseInt(primaryVariantId),
                        combo_secondary_variant_id: parseInt(secondaryVariantId),
                    },
                },
                {
                    id: secondaryVariantId,
                    quantity: 1,
                    properties: {
                        combo_id: comboId,
                        combo_primary_variant_id: parseInt(primaryVariantId),
                        combo_secondary_variant_id: parseInt(secondaryVariantId),
                    },
                },
            ],
        }

        const requestConfig = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        };

        return this.fetchFromShopifyApi('/cart/add.js', requestConfig)
            .then(() => {
                return true;
            })
            .catch((error) => {
                console.error('[SDG.ComboPromotion.addComboVariantsToCart]: ', error);
                return false;
            });
    },

    initBannerAd (comboData) {
        const rawContent = comboData && comboData.bannerAd && comboData.bannerAd.content;
        const content = typeof (rawContent) === 'string' && rawContent.trim();

        if (!content) {
            return false;
        }

        const bannerAd = {
            created_at: comboData.comboCreatedAt,
            title: comboData.comboTitle,
            metadata: {
                content: content,
                url_link: comboData.bannerAd.url_link,
                start_datetime_utc: comboData.startDateUTC,
                end_datetime_utc: comboData.endDateUTC,
            },
        }

        const shopifyConfig = {
            productStatus: 'active',
        };

        BannerAdFeature.init([bannerAd], shopifyConfig);
    },

    getFameLinkEl () {
        const donationCardsContainerEl = this.getDonationCardsContainerEl();
        const FAME_LINK_SELECTOR = 'a[data-testid="FameLink:FameLink"]';

        if (!donationCardsContainerEl) {
            console.error('[SDG.ComboPromotion.getFameLinkEl]: no donation card container found.');
            return false;
        }

        const fameLinkEl = donationCardsContainerEl.querySelector(FAME_LINK_SELECTOR);


        if (!fameLinkEl) {
            console.error('[SDG.ComboPromotion.getFameLinkEl]: no fame link element found.');
            return false;
        }

        return fameLinkEl;
    },

    addComboDataToFameLink (options) {
        const {
            secondaryCampaign: { id, title } = {},
        } = options || {};

        if (!title) {
            console.error('[SDG.ComboPromotion.addComboDataToFameLink]: secondaryCampaign title missing.');
            return false;
        }

        const fameLinkEl = this.getFameLinkEl();
        if (!fameLinkEl) {
            return false;
        }

        let fameUrl = fameLinkEl.getAttribute('href');

        const fameUpsellCombo = this.getFameUpsellCombo(options) || {};
        const comboTitleParam = encodeURIComponent(title);
        const comboVariantIdParam = encodeURIComponent(fameUpsellCombo.secondaryVariantId || '');
        const comboCampaignIdParam = encodeURIComponent(id);

        const comboUrlParams = `combo_campaign_id=${comboCampaignIdParam}&combo_title=${comboTitleParam}&combo_variant_id=${comboVariantIdParam}`;
        fameUrl = `${fameUrl}&${comboUrlParams}`;

        fameLinkEl.setAttribute('href', fameUrl);

        return true;
    },

    getFameUpsellCombo (options) {
        const {
            fameUpsellVariantSku,
            variantCombos = [],
            primaryCampaign: { variants: primaryVariants = [] } = {},
        } = options;

        if (!fameUpsellVariantSku) {
            console.warn('[SDG.ComboPromotion.getFameUpsellCombo]: fameUpsellVariantSku missing.');

            return false;
        }

        // find primary fame upsell variant
        const primaryUpsellVariant = primaryVariants.find((variant) => variant.sku === fameUpsellVariantSku);

        if (!primaryUpsellVariant) {
            console.warn('[SDG.ComboPromotion.getFameUpsellCombo]: primaryUpsellVariant missing.');

            return false;
        }

        // get fame upsell combo
        return variantCombos.find((combo) => combo.primaryVariantId == primaryUpsellVariant.id);
    },
};

export default SDG.ComboPromotion;
