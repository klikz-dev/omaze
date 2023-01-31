import { call, put, takeEvery, ForkEffect } from 'redux-saga/effects';

import { createFetchGeolocationErrorAction } from '../../actions/FetchGeolocation/FetchGeolocationError/FetchGeolocationError';
import { isFetchGeolocationStartAction } from '../../actions/FetchGeolocation/FetchGeolocationStart/FetchGeolocationStart';
import { createFetchGeolocationSuccessAction } from '../../actions/FetchGeolocation/FetchGeolocationSuccess/FetchGeolocationSuccess';

import {
    GeolocationTransformer,
    IGeolocationRaw,
    ITransformedGeolocation,
} from './GeolocationTransformer/GeolocationTransformer';

export function* fetchGeolocationSaga (): Iterator<any> {
    try {
        const response: IGeolocationRaw | undefined = yield window.ozGeolocation.getData();

        if (!response) {
            throw new Error('no response.');
        }

        const transformer: GeolocationTransformer = new GeolocationTransformer(response);
        const result: ITransformedGeolocation | undefined = yield call([transformer, transformer.transform]);

        yield put(createFetchGeolocationSuccessAction(result));
    } catch (error) {
        yield put(createFetchGeolocationErrorAction(`[fetchGeolocationSaga]: ${error && error.message}`));
    }
}

export function* watchFetchGeolocation (): Iterator<ForkEffect> {
    yield takeEvery(isFetchGeolocationStartAction, fetchGeolocationSaga);
}
