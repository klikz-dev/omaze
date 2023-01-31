import { INamespaceActionCreator, IReducer } from '@omaze/redux';
import { AnyAction } from 'redux';

import { ACTIVE_EXPERIENCE_ACTION } from '../../../ActiveExperience.actions';
import {
    createActiveExperienceActionCreatorFactory,
    createActiveExperienceReducerFactory,
} from '../../../ActiveExperience.factories';
import { IActiveExperienceState } from '../../../ActiveExperience.state';

export const createFetchGeolocationErrorAction: INamespaceActionCreator = createActiveExperienceActionCreatorFactory(
    ACTIVE_EXPERIENCE_ACTION.FETCH_GEOLOCATION_ERROR,
    (payload: string): string => {
        return payload;
    },
);

export const fetchGeolocationErrorReducer: IReducer<IActiveExperienceState> = createActiveExperienceReducerFactory(
    ACTIVE_EXPERIENCE_ACTION.FETCH_GEOLOCATION_ERROR,
    (state: IActiveExperienceState, action: AnyAction): void => {
        state.isFetchingGeolocation = false;
        state.fetchingGeolocationError = action.payload;
    }
);
