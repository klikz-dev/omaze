import { INamespaceActionCreator, IReducer } from '@omaze/redux';
import { AnyAction } from 'redux';

import { ACTIVE_EXPERIENCE_ACTION } from '../../../ActiveExperience.actions';
import { createActiveExperienceActionCreatorFactory, createActiveExperienceReducerFactory } from '../../../ActiveExperience.factories';
import { IActiveExperienceState } from '../../../ActiveExperience.state';
import { ITransformedShopify } from '../../../sagas/FetchActiveExperienceFromShopify/ShopifyActiveExperienceTransformer/ShopifyActiveExperienceTransformer';

export const createFetchActiveExperienceFromShopifySuccessAction: INamespaceActionCreator = createActiveExperienceActionCreatorFactory(
    ACTIVE_EXPERIENCE_ACTION.FETCH_ACTIVE_EXPERIENCE_FROM_SHOPIFY_SUCCESS,
    (payload: ITransformedShopify): ITransformedShopify => {
        return payload;
    },
);

export const fetchActiveExperienceFromShopifySuccessReducer: IReducer<IActiveExperienceState> = createActiveExperienceReducerFactory(
    ACTIVE_EXPERIENCE_ACTION.FETCH_ACTIVE_EXPERIENCE_FROM_SHOPIFY_SUCCESS,
    (state: IActiveExperienceState, action: AnyAction): void => {
        const {
            experience,
            nonProfit,
            variants,
            config,
        }: ITransformedShopify = action.payload;

        state.experience.id = experience.id;
        state.experience.handle = experience.handle;
        state.experience.name = experience.name;
        state.nonProfit.name = nonProfit.name;
        state.variants = variants;

        state.config.env = config.env;
        state.config.fameHostname = config.fameHostname;
        state.config.fameUpsellVariantSku = config.fameUpsellVariantSku;
        state.config.donorCounterBlackList = config.donorCounterBlackList;
        state.config.donorCounterMinDonors = config.donorCounterMinDonors;
    }
);
