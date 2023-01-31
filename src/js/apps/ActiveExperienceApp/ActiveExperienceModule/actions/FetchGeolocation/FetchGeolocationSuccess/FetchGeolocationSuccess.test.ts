import { IStateTestFixture, createStateTestFixture, IGetState } from '@omaze/test';
import { AnyAction, Dispatch } from 'redux';

import { createTransformedGeolocationMock } from '../../../../shared/tests/GeolocationMock';
import { ACTIVE_EXPERIENCE_ACTION } from '../../../ActiveExperience.actions';
import { ACTIVE_EXPERIENCE_NAMESPACE } from '../../../ActiveExperience.factories';
import { getActiveExperienceModule, initialActiveExperienceState } from '../../../ActiveExperience.module';
import { IActiveExperienceState } from '../../../ActiveExperience.state';
import { ITransformedGeolocation } from '../../../sagas/FetchGeolocation/GeolocationTransformer/GeolocationTransformer';

import { createFetchGeolocationSuccessAction } from './FetchGeolocationSuccess';

const transformedGeolocationMock: ITransformedGeolocation = createTransformedGeolocationMock();

jest.mock('../../../sagas/FetchGeolocation/FetchGeolocation.saga');

describe(ACTIVE_EXPERIENCE_ACTION.FETCH_GEOLOCATION_SUCCESS, (): void => {
    describe('createFetchGeolocationSuccessAction', (): void => {
        it('should create action', (): void => {
            const action: AnyAction = createFetchGeolocationSuccessAction(transformedGeolocationMock);

            expect(action).toEqual({
                namespace: ACTIVE_EXPERIENCE_NAMESPACE,
                type: ACTIVE_EXPERIENCE_ACTION.FETCH_GEOLOCATION_SUCCESS,
                payload: transformedGeolocationMock,
            });
        });
    });

    describe('fetchGeolocationSuccessReducer', (): void => {
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

            expect(state.geoLocation).toEqual(initialActiveExperienceState.geoLocation);

            dispatch(createFetchGeolocationSuccessAction(transformedGeolocationMock));

            state = getState()[ACTIVE_EXPERIENCE_NAMESPACE];

            expect(state.geoLocation).toEqual(transformedGeolocationMock);
            expect(state.isFetchingGeolocation).toBe(false);
        });
    });
});
