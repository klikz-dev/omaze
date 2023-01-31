import { expectSaga, RunResult } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';

import { createShopifyMock, createTransformedShopifyMock } from '../../../shared/tests/ShopifyMock';
import { createFetchClosedExperienceFromShopifyStartAction } from '../../actions/FetchClosedExperienceFromShopify/FetchClosedExperienceFromShopifyStart/FetchClosedExperienceFromShopifyStart';
import { createFetchClosedExperienceFromShopifySuccessAction } from '../../actions/FetchClosedExperienceFromShopify/FetchClosedExperienceFromShopifySuccess/FetchClosedExperienceFromShopifySuccess';

import { watchFetchClosedExperienceFromShopify } from './FetchClosedExperienceFromShopify.saga';
import {
    ITransformedShopify,
    ShopifyClosedExperienceTransformer,
} from './ShopifyClosedExperienceTransformer/ShopifyClosedExperienceTransformer';

const transformedShopifyMock: ITransformedShopify = createTransformedShopifyMock();

describe('watchFetchClosedExperienceFromShopify', (): void => {
    window.ozClosedExperienceApp = createShopifyMock();

    it('should dispatch the createFetchClosedExperienceFromShopifySuccessAction with payload', (): Promise<RunResult> => {
        const shopifyClosedExperienceTransformer: ShopifyClosedExperienceTransformer = new ShopifyClosedExperienceTransformer(createShopifyMock());

        return expectSaga(watchFetchClosedExperienceFromShopify)
            .provide([
                [call([shopifyClosedExperienceTransformer, shopifyClosedExperienceTransformer.getShopify]), transformedShopifyMock],
            ])
            .call([shopifyClosedExperienceTransformer, shopifyClosedExperienceTransformer.getShopify])
            .put(createFetchClosedExperienceFromShopifySuccessAction(transformedShopifyMock))
            .dispatch(createFetchClosedExperienceFromShopifyStartAction())
            .run();
    });
});
