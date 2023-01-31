import { ISelector } from '@omaze/redux';

import { createActiveExperienceSelector } from '../../ActiveExperience.factories';
import {
    IActiveExperienceState,
    IVariant,
} from '../../ActiveExperience.state';

export const selectFameUpsellVariant: ISelector<IActiveExperienceState, IVariant | undefined> =
createActiveExperienceSelector((state: IActiveExperienceState): IVariant | undefined => {
    const FAME_UPSELL_SKU: string = state.config.fameUpsellVariantSku;

    if (!FAME_UPSELL_SKU) {
        return undefined;
    }

    const variants: IVariant[] = state.variants;

    return variants.find((variant: IVariant): boolean => {
        return variant.sku === FAME_UPSELL_SKU;
    });
});
