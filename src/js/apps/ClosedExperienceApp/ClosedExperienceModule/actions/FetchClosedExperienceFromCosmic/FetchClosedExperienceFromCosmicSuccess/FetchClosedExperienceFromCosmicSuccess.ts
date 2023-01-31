import { INamespaceActionCreator, IReducer } from '@omaze/redux';
import { AnyAction } from 'redux';

import { CLOSED_EXPERIENCE_ACTION } from '../../../ClosedExperience.actions';
import {
    createClosedExperienceActionCreatorFactory,
    createClosedExperienceReducerFactory,
} from '../../../ClosedExperience.factories';
import { IClosedExperienceState } from '../../../ClosedExperience.state';
import { ITransformedCosmic } from '../../../sagas/FetchClosedExperienceFromCosmic/CosmicClosedExperienceTransformer/CosmicClosedExperienceTransformer';

export const createFetchClosedExperienceFromCosmicSuccessAction: INamespaceActionCreator = createClosedExperienceActionCreatorFactory(
    CLOSED_EXPERIENCE_ACTION.FETCH_CLOSED_EXPERIENCE_FROM_COSMIC_SUCCESS,
    (payload: ITransformedCosmic): ITransformedCosmic => {
        return payload;
    },
);

export const fetchClosedExperienceFromCosmicSuccessReducer: IReducer<IClosedExperienceState> = createClosedExperienceReducerFactory(
    CLOSED_EXPERIENCE_ACTION.FETCH_CLOSED_EXPERIENCE_FROM_COSMIC_SUCCESS,
    (state: IClosedExperienceState, action: AnyAction): void => {
        const {
            nonProfit,
            experience,
        }: ITransformedCosmic = action.payload;

        state.isFetchingCosmic = false;

        state.experience.prizeDetails = experience.prizeDetails;
        state.experience.impactMedia = experience.impactMedia;
        state.experience.additionalWinners = experience.additionalWinners;

        state.nonProfit.messageName = nonProfit.messageName;
        state.nonProfit.netRaiseAmount = nonProfit.netRaiseAmount;
        state.nonProfit.thankYouMessage = nonProfit.thankYouMessage;
        state.nonProfit.impactMessage = nonProfit.impactMessage;
        state.nonProfit.logo = nonProfit.logo;
    }
);
