import { IStateTestFixture, createStateTestFixture, IGetState } from '@omaze/test';
import { AnyAction, Dispatch } from 'redux';

import { createTransformedShopifyMock } from '../../../../shared/tests/ShopifyMock';
import { ACTIVE_EXPERIENCE_ACTION } from '../../../ActiveExperience.actions';
import { ACTIVE_EXPERIENCE_NAMESPACE } from '../../../ActiveExperience.factories';
import { getActiveExperienceModule, initialActiveExperienceState } from '../../../ActiveExperience.module';
import { IActiveExperienceState } from '../../../ActiveExperience.state';
import { ITransformedShopify } from '../../../sagas/FetchActiveExperienceFromShopify/ShopifyActiveExperienceTransformer/ShopifyActiveExperienceTransformer';

import { createFetchActiveExperienceFromShopifySuccessAction } from './FetchActiveExperienceFromShopifySuccess';

const transformedShopifyMock: ITransformedShopify = createTransformedShopifyMock();

describe(ACTIVE_EXPERIENCE_ACTION.FETCH_ACTIVE_EXPERIENCE_FROM_SHOPIFY_SUCCESS, (): void => {
    describe('createFetchActiveExperienceFromShopifySuccessAction', (): void => {
        it('should create action', (): void => {
            const action: AnyAction = createFetchActiveExperienceFromShopifySuccessAction(transformedShopifyMock);

            expect(action.namespace).toBe(ACTIVE_EXPERIENCE_NAMESPACE);
            expect(action.type).toBe(ACTIVE_EXPERIENCE_ACTION.FETCH_ACTIVE_EXPERIENCE_FROM_SHOPIFY_SUCCESS);
            expect(action.payload).toEqual(transformedShopifyMock);
        });
    });

    describe('fetchActiveExperienceFromShopifySuccessReducer', (): void => {
        let dispatch: Dispatch;
        let getState: IGetState;

        beforeEach((): void => {
            const testFixture: IStateTestFixture = createStateTestFixture(
                getActiveExperienceModule()
            );

            dispatch = testFixture.dispatch;
            getState = testFixture.getState;
        });

        it('should update state', (): void => {
            let state: IActiveExperienceState = getState()[ACTIVE_EXPERIENCE_NAMESPACE];

            expect(state).toEqual(initialActiveExperienceState);

            dispatch(createFetchActiveExperienceFromShopifySuccessAction(transformedShopifyMock));

            state = getState()[ACTIVE_EXPERIENCE_NAMESPACE];

            expect(state.experience).toEqual(transformedShopifyMock.experience);
            expect(state.nonProfit).toEqual(transformedShopifyMock.nonProfit);
            expect(state.variants).toEqual(transformedShopifyMock.variants);
            expect(state.config).toEqual(transformedShopifyMock.config);
        });
    });
});
