import { createCombinedReducer, createModuleFactory, IModuleFactory } from '@omaze/redux';
import { Reducer } from 'redux';

import { fetchActiveExperienceFromShopifySuccessReducer } from './actions/FetchActiveExperienceFromShopify/FetchActiveExperienceFromShopifySuccess/FetchActiveExperienceFromShopifySuccess';
import { fetchGeolocationErrorReducer } from './actions/FetchGeolocation/FetchGeolocationError/FetchGeolocationError';
import { fetchGeolocationStartReducer } from './actions/FetchGeolocation/FetchGeolocationStart/FetchGeolocationStart';
import { fetchGeolocationSuccessReducer } from './actions/FetchGeolocation/FetchGeolocationSuccess/FetchGeolocationSuccess';
import { ACTIVE_EXPERIENCE_NAMESPACE } from './ActiveExperience.factories';
import { IActiveExperienceState } from './ActiveExperience.state';
import { watchFetchActiveExperienceFromShopify } from './sagas/FetchActiveExperienceFromShopify/FetchActiveExperienceFromShopify.saga';
import { watchFetchGeolocation } from './sagas/FetchGeolocation/FetchGeolocation.saga';

export const initialActiveExperienceState: IActiveExperienceState = {
    isFetchingGeolocation: false,
    fetchingGeolocationError: '',
    experience: {
        id: NaN,
        name: '',
        handle: '',
    },
    nonProfit: {
        name: '',
    },
    variants: [],
    config: {
        env: '',
        fameHostname: '',
        fameUpsellVariantSku: '',
        donorCounterBlackList: [],
        donorCounterMinDonors: 0,
    },
    geoLocation: {
        continentCode: '',
        countryCode: '',
        regionCode: '',
        ip: '',
    },
};

const activeExperienceReducer: Reducer<IActiveExperienceState> = createCombinedReducer<IActiveExperienceState>(
    [
        fetchActiveExperienceFromShopifySuccessReducer,
        fetchGeolocationStartReducer,
        fetchGeolocationSuccessReducer,
        fetchGeolocationErrorReducer,
    ],
    initialActiveExperienceState,
);

export const getActiveExperienceModule: IModuleFactory = createModuleFactory<IActiveExperienceState>(
    ACTIVE_EXPERIENCE_NAMESPACE,
    activeExperienceReducer,
    [
        watchFetchActiveExperienceFromShopify,
        watchFetchGeolocation,
    ]
);
