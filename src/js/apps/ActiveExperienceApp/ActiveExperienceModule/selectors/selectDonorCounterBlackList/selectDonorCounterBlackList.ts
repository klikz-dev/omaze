import { ISelector } from '@omaze/redux';

import { createActiveExperienceSelector } from '../../ActiveExperience.factories';
import {
    IActiveExperienceState,
} from '../../ActiveExperience.state';

export const selectDonorCounterBlackList: ISelector<IActiveExperienceState, string[]> =
createActiveExperienceSelector((state: IActiveExperienceState): string[] => {
    return state.config.donorCounterBlackList;
});
