import { ISelector } from '@omaze/redux';

import { createActiveExperienceSelector } from '../../ActiveExperience.factories';
import {
    IActiveExperienceState,
} from '../../ActiveExperience.state';

export const selectDonorCounterMinDonors: ISelector<IActiveExperienceState, number> =
createActiveExperienceSelector((state: IActiveExperienceState): number => {
    return state.config.donorCounterMinDonors;
});
