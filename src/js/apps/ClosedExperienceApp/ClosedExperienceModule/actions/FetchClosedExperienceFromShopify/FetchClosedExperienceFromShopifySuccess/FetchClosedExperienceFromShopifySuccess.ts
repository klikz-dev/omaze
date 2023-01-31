import { INamespaceActionCreator, IReducer } from '@omaze/redux';
import { AnyAction } from 'redux';

import { CLOSED_EXPERIENCE_ACTION } from '../../../ClosedExperience.actions';
import {
    createClosedExperienceActionCreatorFactory,
    createClosedExperienceReducerFactory,
} from '../../../ClosedExperience.factories';
import { IClosedExperienceState } from '../../../ClosedExperience.state';
import { ITransformedShopify } from '../../../sagas/FetchClosedExperienceFromShopify/ShopifyClosedExperienceTransformer/ShopifyClosedExperienceTransformer';

export const createFetchClosedExperienceFromShopifySuccessAction: INamespaceActionCreator = createClosedExperienceActionCreatorFactory(
    CLOSED_EXPERIENCE_ACTION.FETCH_CLOSED_EXPERIENCE_FROM_SHOPIFY_SUCCESS,
    (payload: ITransformedShopify): ITransformedShopify => {
        return payload;
    },
);

export const fetchClosedExperienceFromShopifySuccessReducer: IReducer<IClosedExperienceState> = createClosedExperienceReducerFactory(
    CLOSED_EXPERIENCE_ACTION.FETCH_CLOSED_EXPERIENCE_FROM_SHOPIFY_SUCCESS,
    (state: IClosedExperienceState, action: AnyAction): void => {
        const {
            experience,
            assets,
            winner,
            nonProfit,
        }: ITransformedShopify = action.payload;

        state.experience.name = experience.name;
        state.experience.hasWinner = experience.hasWinner;
        state.experience.projectedWinnerAnnounceDate = experience.projectedWinnerAnnounceDate;
        state.experience.confirmedWinnerAnnounceDate = experience.confirmedWinnerAnnounceDate;
        state.nonProfit.thankYouName = nonProfit.thankYouName;
        state.assets.winnerBackgroundImage = assets.winnerBackgroundImage;
        state.assets.ovalBackgroundDesktop = assets.ovalBackgroundDesktop;
        state.assets.ovalBackgroundMobile = assets.ovalBackgroundMobile;
        state.assets.winnerPendingBackgroundImage = assets.winnerPendingBackgroundImage;
        state.winner.name = winner.name;
        state.winner.location = winner.location;
        state.winner.image = winner.image;
    }
);
