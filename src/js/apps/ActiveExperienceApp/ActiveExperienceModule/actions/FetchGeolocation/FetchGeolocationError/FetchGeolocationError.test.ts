import { IStateTestFixture, createStateTestFixture, IGetState } from '@omaze/test';
import { AnyAction, Dispatch } from 'redux';

import { ACTIVE_EXPERIENCE_ACTION } from '../../../ActiveExperience.actions';
import { ACTIVE_EXPERIENCE_NAMESPACE } from '../../../ActiveExperience.factories';
import { getActiveExperienceModule } from '../../../ActiveExperience.module';
import { IActiveExperienceState } from '../../../ActiveExperience.state';
import { createFetchGeolocationStartAction } from '../FetchGeolocationStart/FetchGeolocationStart';

import { createFetchGeolocationErrorAction } from './FetchGeolocationError';

jest.mock('../../../sagas/FetchGeolocation/FetchGeolocation.saga');

describe(ACTIVE_EXPERIENCE_ACTION.FETCH_GEOLOCATION_ERROR, (): void => {
    describe('createFetchGeolocationErrorAction', (): void => {
        it('should create action', (): void => {
            const action: AnyAction = createFetchGeolocationErrorAction('hello');

            expect(action).toEqual({
                namespace: ACTIVE_EXPERIENCE_NAMESPACE,
                type: ACTIVE_EXPERIENCE_ACTION.FETCH_GEOLOCATION_ERROR,
                payload: 'hello',
            });
        });
    });

    describe('fetchGeolocationErrorReducer', (): void => {
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
            dispatch(createFetchGeolocationStartAction());

            let state: IActiveExperienceState = getState()[ACTIVE_EXPERIENCE_NAMESPACE];

            expect(state.isFetchingGeolocation).toBe(true);
            expect(state.fetchingGeolocationError).toBe('');

            dispatch(createFetchGeolocationErrorAction('hello'));

            state = getState()[ACTIVE_EXPERIENCE_NAMESPACE];

            expect(state.isFetchingGeolocation).toBe(false);
            expect(state.fetchingGeolocationError).toBe('hello');
        });
    });
});
