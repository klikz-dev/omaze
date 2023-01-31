import { ISelector } from '@omaze/redux';

import { createActiveExperienceSelector } from '../../ActiveExperience.factories';
import {
    IActiveExperienceState,
} from '../../ActiveExperience.state';

export const selectRequiresProminentFame: ISelector<IActiveExperienceState, boolean> =
createActiveExperienceSelector((state: IActiveExperienceState): boolean => {
    const CALIFORNIA_COUNTRY: string = 'US';
    const CALIFORNIA_STATE: string = 'CA';

    return state.geoLocation.countryCode === CALIFORNIA_COUNTRY &&
        state.geoLocation.regionCode === CALIFORNIA_STATE;
});
