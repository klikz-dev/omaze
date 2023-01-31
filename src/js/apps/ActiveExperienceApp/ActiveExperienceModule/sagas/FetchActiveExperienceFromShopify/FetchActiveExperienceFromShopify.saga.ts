import { call, put, takeEvery, PutEffect, CallEffect, ForkEffect } from 'redux-saga/effects';

import { IShopifyExperience } from '../../../shared/Shopify/IShopifyExperience';
import { isFetchActiveExperienceFromShopifyStartAction } from '../../actions/FetchActiveExperienceFromShopify/FetchActiveExperienceFromShopifyStart/FetchActiveExperienceFromShopifyStart';
import { createFetchActiveExperienceFromShopifySuccessAction } from '../../actions/FetchActiveExperienceFromShopify/FetchActiveExperienceFromShopifySuccess/FetchActiveExperienceFromShopifySuccess';

import { ITransformedShopify, ShopifyActiveExperienceTransformer } from './ShopifyActiveExperienceTransformer/ShopifyActiveExperienceTransformer';

export function* fetchActiveExperienceFromShopifySaga (): Iterator<PutEffect> | CallEffect<ITransformedShopify> {
    const shopifyData: IShopifyExperience = window.ozActiveExperienceApp;
    const transformer: ShopifyActiveExperienceTransformer = new ShopifyActiveExperienceTransformer(shopifyData);
    const result: ITransformedShopify = yield call([transformer, transformer.transform]);

    yield put(createFetchActiveExperienceFromShopifySuccessAction(result));
}

export function* watchFetchActiveExperienceFromShopify (): Iterator<ForkEffect> {
    yield takeEvery(isFetchActiveExperienceFromShopifyStartAction, fetchActiveExperienceFromShopifySaga);
}
