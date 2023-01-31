import {
    IActionComparator,
    INamespaceActionCreator,
    IReducer,
} from '@omaze/redux';

import { ACTIVE_EXPERIENCE_ACTION } from '../../../ActiveExperience.actions';
import {
    createActiveExperienceActionComparator,
    createActiveExperienceActionCreatorFactory,
    createActiveExperienceReducerFactory,
} from '../../../ActiveExperience.factories';
import { IActiveExperienceState } from '../../../ActiveExperience.state';

export const createFetchGeolocationStartAction: INamespaceActionCreator = createActiveExperienceActionCreatorFactory(
    ACTIVE_EXPERIENCE_ACTION.FETCH_GEOLOCATION_START,
);

export const fetchGeolocationStartReducer: IReducer<IActiveExperienceState> = createActiveExperienceReducerFactory(
    ACTIVE_EXPERIENCE_ACTION.FETCH_GEOLOCATION_START,
    (state: IActiveExperienceState): void => {
        state.isFetchingGeolocation = true;
    }
);

export const isFetchGeolocationStartAction: IActionComparator = createActiveExperienceActionComparator(
    ACTIVE_EXPERIENCE_ACTION.FETCH_GEOLOCATION_START,
);
