import { ISelector } from '@omaze/redux';

import { createActiveExperienceSelector } from '../../ActiveExperience.factories';
import {
    IActiveExperienceState,
    IExperience,
} from '../../ActiveExperience.state';

export const selectExperience: ISelector<IActiveExperienceState, IExperience> =
createActiveExperienceSelector((state: IActiveExperienceState): IExperience => {
    return state.experience;
});
