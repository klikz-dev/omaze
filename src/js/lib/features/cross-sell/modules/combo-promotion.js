import ComboPromotion from '../../combo-promotion/index';
import { default as FeatureValidation } from '../../feature-validation';
import { cosmicFetchBySlug } from '../../../cosmicjs/api';
import { getEnvironment } from '../../../env/environment';
import { SilentError } from '../../../errors/silent-error';

const crossSellComboPromotion = {
    loadComboData (productHandle, env) {
        return cosmicFetchBySlug(productHandle, env)
            .then((features) => {
                const data = features && features.combo_promotion_feature;

                if (!data) {
                    return Promise.reject(new SilentError());
                }

                return ComboPromotion.validateOptions(data);
            });
    },

    getComboByPrimaryVariantId (variantCombos, primaryVariantId) {
        if (!primaryVariantId || !Array.isArray(variantCombos)) {
            return false;
        }

        for (const combo of variantCombos) {
            if (combo.primaryVariantId == primaryVariantId) {
                return combo;
            }
        }

        return false;
    },

    featureFlagsDisabled (featureFlags) {
        const FEATURE_NAME = ComboPromotion.featureName();

        return FeatureValidation.featureFlagDisabled(FEATURE_NAME, featureFlags)
            .then((isDisabled) => {
                return isDisabled;
            });
    },

    async getProductComboPromotion (primaryVariantId, primaryCampaign, shopifyConfig) {
        const {
            featureFlags = {},
            env,
        } = shopifyConfig || {};

        if (!primaryVariantId || !primaryCampaign || !primaryCampaign.id || !primaryCampaign.handle) {
            // eslint-disable-next-line no-console
            console.error(new Error('invalid primary variant or product data'));

            return false;
        }

        try {
            const featureDisabled = await this.featureFlagsDisabled(featureFlags);

            if (featureDisabled) {
                return false;
            }

            const comboData = await this.loadComboData(primaryCampaign.handle, env);

            if (!comboData) {
                return false;
            }

            const secondaryCampaign = await ComboPromotion.fetchProductByHandle(comboData.secondaryCampaignHandle);
            const variantCombos = await ComboPromotion.findComboIDs(comboData.variantCombos, primaryCampaign.variants, secondaryCampaign.variants);

            const comboId = ComboPromotion.generateFeatureId(comboData.startDateUTC, primaryCampaign.id, secondaryCampaign.id);
            const combo = this.getComboByPrimaryVariantId(variantCombos, primaryVariantId);

            return {
                combo,
                comboId,
            };
        } catch (error) {
            if (error instanceof SilentError) {
                return false;
            }

            // eslint-disable-next-line no-console
            console.error('[CrossSell.getProductComboPromotion]', error);

            return false;
        }
    },

    async mapComboPromotionData (variants) {
        const comboFeatureFlags = {
            'combo-promotion': getEnvironment().comboPromotion,
            'combo-promotion-blocked-countries': getEnvironment().comboPromotionBlockedCountries,
            'combo-promotion-blocked-regions': getEnvironment().comboPromotionBlockedRegions,
        };

        const shopifyConfig = {
            env: getEnvironment().env,
            featureFlags: comboFeatureFlags,
        };

        return Promise.allSettled(
            variants.map((variant) => {
                return this.getProductComboPromotion(variant.id, variant.product, shopifyConfig)
                    .then(({ combo, comboId }) => {
                        if (!combo) {
                            return false;
                        }

                        variant.comboId = comboId;
                        variant.comboVariantId = combo.secondaryVariantId;
                    });
            })
        )
        .then(() => {
            return variants;
        });
    },
}

export default crossSellComboPromotion;
