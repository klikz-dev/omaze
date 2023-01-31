import { createCombinedReducer, createModuleFactory, IModuleFactory } from '@omaze/redux';
import { Reducer } from 'redux';

import { fetchClosedExperienceFromCosmicErrorReducer } from './actions/FetchClosedExperienceFromCosmic/FetchClosedExperienceFromCosmicError/FetchClosedExperienceFromCosmicError';
import { fetchClosedExperienceFromCosmicStartReducer } from './actions/FetchClosedExperienceFromCosmic/FetchClosedExperienceFromCosmicStart/FetchClosedExperienceFromCosmicStart';
import { fetchClosedExperienceFromCosmicSuccessReducer } from './actions/FetchClosedExperienceFromCosmic/FetchClosedExperienceFromCosmicSuccess/FetchClosedExperienceFromCosmicSuccess';
import { fetchClosedExperienceFromShopifySuccessReducer } from './actions/FetchClosedExperienceFromShopify/FetchClosedExperienceFromShopifySuccess/FetchClosedExperienceFromShopifySuccess';
import { CLOSED_EXPERIENCE_NAMESPACE } from './ClosedExperience.factories';
import { IClosedExperienceState } from './ClosedExperience.state';
import { watchFetchClosedExperienceFromCosmic } from './sagas/FetchClosedExperienceFromCosmic/FetchClosedExperienceFromCosmic.saga';
import { watchFetchClosedExperienceFromShopify } from './sagas/FetchClosedExperienceFromShopify/FetchClosedExperienceFromShopify.saga';

const initialState: IClosedExperienceState = {
    isFetchingCosmic: false,
    fetchingCosmicError: '',
    experience: {
        name: '',
        hasWinner: false,
        projectedWinnerAnnounceDate: new Date(''),
        prizeDetails: '',
        additionalWinners: [],
        impactMedia: {
            assets: [],
            headline: '',
        },
    },
    assets: {
        winnerBackgroundImage: '',
        winnerPendingBackgroundImage: '',
        ovalBackgroundDesktop: '',
        ovalBackgroundMobile: '',
    },
    winner: {
        name: '',
        location: '',
        image: '',
    },
    nonProfit: {
        messageName: '',
        thankYouName: '',
        netRaiseAmount: '',
        thankYouMessage: '',
        impactMessage: '',
        logo: {
            url: '',
            imgixUrl: '',
        },
    },
};

const closedExperienceReducer: Reducer<IClosedExperienceState> = createCombinedReducer<IClosedExperienceState>(
    [
        fetchClosedExperienceFromCosmicStartReducer,
        fetchClosedExperienceFromCosmicSuccessReducer,
        fetchClosedExperienceFromCosmicErrorReducer,
        fetchClosedExperienceFromShopifySuccessReducer,
    ],
    initialState,
);

export const getClosedExperienceModule: IModuleFactory = createModuleFactory<IClosedExperienceState>(
    CLOSED_EXPERIENCE_NAMESPACE,
    closedExperienceReducer,
    [
        watchFetchClosedExperienceFromCosmic,
        watchFetchClosedExperienceFromShopify,
    ]
);
