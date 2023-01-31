import { expectSaga, RunResult } from 'redux-saga-test-plan';
import { call } from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { createRawGeolocationMock, createTransformedGeolocationMock } from '../../../shared/tests/GeolocationMock';
import { createFetchGeolocationErrorAction } from '../../actions/FetchGeolocation/FetchGeolocationError/FetchGeolocationError';
import { createFetchGeolocationStartAction } from '../../actions/FetchGeolocation/FetchGeolocationStart/FetchGeolocationStart';
import { createFetchGeolocationSuccessAction } from '../../actions/FetchGeolocation/FetchGeolocationSuccess/FetchGeolocationSuccess';

import { watchFetchGeolocation } from './FetchGeolocation.saga';
import {
    GeolocationTransformer,
    IGeolocationRaw,
    ITransformedGeolocation,
} from './GeolocationTransformer/GeolocationTransformer';

const rawGeolocationMock: IGeolocationRaw = createRawGeolocationMock();
const transformedGeolocationMock: ITransformedGeolocation = createTransformedGeolocationMock();

describe('watchFetchGeolocation', (): void => {
    const geolocationTransformer: GeolocationTransformer = new GeolocationTransformer(rawGeolocationMock);

    describe('success', (): void => {
        it('should dispatch success action', (): Promise<RunResult> => {
            window.ozGeolocation = {
                getData: (): Promise<IGeolocationRaw> => { return Promise.resolve(rawGeolocationMock); },
            };

            return expectSaga(watchFetchGeolocation)
                .provide([
                    [call([geolocationTransformer, geolocationTransformer.transform]), transformedGeolocationMock],
                ])
                .call([geolocationTransformer, geolocationTransformer.transform])
                .put(createFetchGeolocationSuccessAction(transformedGeolocationMock))
                .dispatch(createFetchGeolocationStartAction())
                .run();
        });
    });

    describe('failure', (): void => {
        it('should dispatch error action with rejected getData', (): Promise<RunResult> => {
            const error: Error = new Error('error message');

            window.ozGeolocation = {
                getData: (): Promise<Error> => { return Promise.reject(error); },
            };

            return expectSaga(watchFetchGeolocation)
                .provide([
                    [call([geolocationTransformer, geolocationTransformer.transform]), transformedGeolocationMock],
                ])
                .put(createFetchGeolocationErrorAction('[fetchGeolocationSaga]: error message'))
                .dispatch(createFetchGeolocationStartAction())
                .run();
        });

        it('should dispatch error action with no getData response', (): Promise<RunResult> => {
            window.ozGeolocation = {
                getData: (): boolean => { return false; },
            };

            return expectSaga(watchFetchGeolocation)
                .provide([
                    [call([geolocationTransformer, geolocationTransformer.transform]), transformedGeolocationMock],
                ])
                .put(createFetchGeolocationErrorAction('[fetchGeolocationSaga]: no response.'))
                .dispatch(createFetchGeolocationStartAction())
                .run();
        });

        it('should dispatch error action with transformer error', (): Promise<RunResult> => {
            const error: Error = new Error('error message');

            window.ozGeolocation = {
                getData: (): Promise<IGeolocationRaw> => { return Promise.resolve(rawGeolocationMock); },
            };

            return expectSaga(watchFetchGeolocation)
                .provide([
                    [call([geolocationTransformer, geolocationTransformer.transform]), throwError(error)],
                ])
                .call([geolocationTransformer, geolocationTransformer.transform])
                .put(createFetchGeolocationErrorAction('[fetchGeolocationSaga]: error message'))
                .dispatch(createFetchGeolocationStartAction())
                .run();
        });
    });
});
