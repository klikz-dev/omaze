import {default as FeatureValidation} from '../../features/feature-validation';
import {default as BannerAdFeature} from '../../features/banner-ad';
import {default as ComboPromotionFeature} from '../../features/combo-promotion';
import {cosmicFetchBySlug} from '../../../lib/cosmicjs/api';

export function initAdBanner (cartItems, featureFlags = {}, env) {
    if (!Array.isArray(cartItems) || !cartItems.length) {
        return false;
    }

    const COMBO_FEATURE_NAME = ComboPromotionFeature.featureName();

    return FeatureValidation
        .featureFlagDisabled(COMBO_FEATURE_NAME, featureFlags)
        .then((disabled) => {
            if (disabled) {
                return false;
            }

            return renderAdBanner(cartItems, env);
        })
        .catch((error) => {
            /* eslint-disable-next-line  no-console */
            console.error('[Cart initAdBanner] ', error);

            return false;
        });
}

function renderAdBanner (cartItems, env) {
    const primaryComboItems = getPrimaryComboItems(cartItems);
    const primaryComboSlugs = primaryComboItems.map(combo => combo.handle);

    if (!primaryComboSlugs.length) {
        return false;
    }

    getBannerAds(primaryComboSlugs, env)
        .then((bannerAds) => {
            const shopifyConfig = {
                productStatus: 'active',
            };

            BannerAdFeature.init(bannerAds, shopifyConfig);
        });
}

function getBannerAds (slugs, env) {
    return Promise.allSettled(
        slugs.map((slug) => {
            return fetchComboData(slug, env)
                .then((combo) => {
                    return configureBannerAd(combo);
                });
        })
    )
    .then((allSettled) => {
        return allSettled
            .filter((result) => !!result.value)
            .map((result) => result.value);
    });
}

function configureBannerAd (comboData) {
    const metadata = comboData && comboData.metadata;
    const rawContent = metadata && metadata.banner_ad && metadata.banner_ad.content;
    const bannerContent = typeof(rawContent) === 'string' && rawContent.trim();

    if (!bannerContent) {
        return false;
    }

    return {
        created_at: comboData.created_at,
        title: comboData.title,
        metadata: {
            content: bannerContent,
            url_link: metadata.banner_ad.url_link,
            start_datetime_utc: metadata.start_datetime_utc,
            end_datetime_utc: metadata.end_datetime_utc,
        },
    };
}

function fetchComboData (slug, env) {
    return cosmicFetchBySlug(slug, env)
        .then((features) => {
            return features && features.combo_promotion_feature;
        });
}

export function getPrimaryComboItems (cartItems) {
    function variantInCart (items, id) {
        return items.find((item) => {
            return parseInt(item.variant_id) === parseInt(id);
        });
    }

    return cartItems.filter((item) => {
        const primaryComboID = item.properties && item.properties.combo_primary_variant_id;
        const secondaryComboID = item.properties && item.properties.combo_secondary_variant_id;

        if (!primaryComboID || !secondaryComboID) {
            return false;
        }

        const isPrimary = parseInt(primaryComboID) === parseInt(item.variant_id);
        const isPrimaryWithSecondaryInCart = isPrimary && variantInCart(cartItems, secondaryComboID);

        return isPrimaryWithSecondaryInCart;
    });
}
