import { ISelector } from '@omaze/redux';

import { createActiveExperienceSelector } from '../../ActiveExperience.factories';
import {
    IActiveExperienceState,
    IVariant,
} from '../../ActiveExperience.state';

export const selectStandardVariants: ISelector<IActiveExperienceState, IVariant[]> =
createActiveExperienceSelector((state: IActiveExperienceState): IVariant[] => {
    const STANDARD_SKU_PREFIX: string = 'standard_';
    const variants: IVariant[] = state.variants;

    return variants.filter((variant: IVariant): boolean  => {
        return variant.sku.startsWith(STANDARD_SKU_PREFIX);
    });
});
