import { INamespaceActionCreator, IReducer } from '@omaze/redux';
import { AnyAction } from 'redux';

import { ACTIVE_EXPERIENCE_ACTION } from '../../../ActiveExperience.actions';
import { createActiveExperienceActionCreatorFactory, createActiveExperienceReducerFactory } from '../../../ActiveExperience.factories';
import { IActiveExperienceState } from '../../../ActiveExperience.state';
import { ITransformedGeolocation } from '../../../sagas/FetchGeolocation/GeolocationTransformer/GeolocationTransformer';

export const createFetchGeolocationSuccessAction: INamespaceActionCreator = createActiveExperienceActionCreatorFactory(
    ACTIVE_EXPERIENCE_ACTION.FETCH_GEOLOCATION_SUCCESS,
    (payload: ITransformedGeolocation): ITransformedGeolocation => {
        return payload;
    },
);

export const fetchGeolocationSuccessReducer: IReducer<IActiveExperienceState> = createActiveExperienceReducerFactory(
    ACTIVE_EXPERIENCE_ACTION.FETCH_GEOLOCATION_SUCCESS,
    (state: IActiveExperienceState, action: AnyAction): void => {
        const geoLocation: ITransformedGeolocation = action.payload;

        state.isFetchingGeolocation = false;
        state.geoLocation.continentCode = geoLocation.continentCode;
        state.geoLocation.countryCode = geoLocation.countryCode;
        state.geoLocation.regionCode = geoLocation.regionCode;
        state.geoLocation.ip = geoLocation.ip;
    }
);
