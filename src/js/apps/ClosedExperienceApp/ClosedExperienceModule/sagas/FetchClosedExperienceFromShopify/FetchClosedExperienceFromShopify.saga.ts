import { call, put, takeEvery } from 'redux-saga/effects';

import { IShopify } from '../../../shared/Shopify/IShopify';
import { isFetchClosedExperienceFromShopifyStartAction } from '../../actions/FetchClosedExperienceFromShopify/FetchClosedExperienceFromShopifyStart/FetchClosedExperienceFromShopifyStart';
import { createFetchClosedExperienceFromShopifySuccessAction } from '../../actions/FetchClosedExperienceFromShopify/FetchClosedExperienceFromShopifySuccess/FetchClosedExperienceFromShopifySuccess';

import { ShopifyClosedExperienceTransformer } from './ShopifyClosedExperienceTransformer/ShopifyClosedExperienceTransformer';

export function* fetchClosedExperienceFromShopifySaga (): Iterator<any> {
    const shopify: IShopify = window.ozClosedExperienceApp;
    const shopifyClosedExperienceTransformer: ShopifyClosedExperienceTransformer = new ShopifyClosedExperienceTransformer(shopify);
    const transformedShopify: any = yield call([shopifyClosedExperienceTransformer, shopifyClosedExperienceTransformer.getShopify]);

    yield put(createFetchClosedExperienceFromShopifySuccessAction(transformedShopify));
}

export function* watchFetchClosedExperienceFromShopify (): Iterator<any> {
    yield takeEvery(isFetchClosedExperienceFromShopifyStartAction, fetchClosedExperienceFromShopifySaga);
}
