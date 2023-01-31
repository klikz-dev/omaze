import { expectSaga, RunResult } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';

import { IShopifyExperience } from '../../../shared/Shopify/IShopifyExperience';
import { createRawShopifyMock, createTransformedShopifyMock } from '../../../shared/tests/ShopifyMock';
import { createFetchActiveExperienceFromShopifyStartAction } from '../../actions/FetchActiveExperienceFromShopify/FetchActiveExperienceFromShopifyStart/FetchActiveExperienceFromShopifyStart';
import { createFetchActiveExperienceFromShopifySuccessAction } from '../../actions/FetchActiveExperienceFromShopify/FetchActiveExperienceFromShopifySuccess/FetchActiveExperienceFromShopifySuccess';

import { watchFetchActiveExperienceFromShopify } from './FetchActiveExperienceFromShopify.saga';
import {
    ITransformedShopify,
    ShopifyActiveExperienceTransformer,
} from './ShopifyActiveExperienceTransformer/ShopifyActiveExperienceTransformer';

const rawShopifyMock: IShopifyExperience = createRawShopifyMock();
const transformedShopifyMock: ITransformedShopify = createTransformedShopifyMock();

describe('watchFetchActiveExperienceFromShopify', (): void => {
    describe('success', (): void => {
        window.ozActiveExperienceApp = rawShopifyMock;

        it('should dispatch success action', (): Promise<RunResult> => {
            const shopifyActiveExperienceTransformer: ShopifyActiveExperienceTransformer = new ShopifyActiveExperienceTransformer(rawShopifyMock);

            return expectSaga(watchFetchActiveExperienceFromShopify)
                .provide([
                    [call([shopifyActiveExperienceTransformer, shopifyActiveExperienceTransformer.transform]), transformedShopifyMock],
                ])
                .call([shopifyActiveExperienceTransformer, shopifyActiveExperienceTransformer.transform])
                .put(createFetchActiveExperienceFromShopifySuccessAction(transformedShopifyMock))
                .dispatch(createFetchActiveExperienceFromShopifyStartAction())
                .run();
        });
    });
});
