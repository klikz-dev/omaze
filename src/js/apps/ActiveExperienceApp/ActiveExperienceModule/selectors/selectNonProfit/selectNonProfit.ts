import { ISelector } from '@omaze/redux';

import { createActiveExperienceSelector } from '../../ActiveExperience.factories';
import {
    IActiveExperienceState,
    INonProfit,
} from '../../ActiveExperience.state';

export const selectNonProfit: ISelector<IActiveExperienceState, INonProfit> =
createActiveExperienceSelector((state: IActiveExperienceState): INonProfit => {
    return state.nonProfit;
});
