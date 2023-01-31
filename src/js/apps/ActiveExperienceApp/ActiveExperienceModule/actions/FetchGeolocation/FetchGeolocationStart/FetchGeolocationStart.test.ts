import { IStateTestFixture, createStateTestFixture, IGetState } from '@omaze/test';
import { AnyAction, Dispatch } from 'redux';

import { ACTIVE_EXPERIENCE_ACTION } from '../../../ActiveExperience.actions';
import { ACTIVE_EXPERIENCE_NAMESPACE } from '../../../ActiveExperience.factories';
import { getActiveExperienceModule } from '../../../ActiveExperience.module';
import { IActiveExperienceState } from '../../../ActiveExperience.state';

import { createFetchGeolocationStartAction } from './FetchGeolocationStart';

jest.mock('../../../sagas/FetchGeolocation/FetchGeolocation.saga');

describe(ACTIVE_EXPERIENCE_ACTION.FETCH_GEOLOCATION_START, (): void => {
    describe('createFetchGeolocationStartAction', (): void => {
        it('should create action', (): void => {
            const action: AnyAction = createFetchGeolocationStartAction();

            expect(action).toEqual({
                namespace: ACTIVE_EXPERIENCE_NAMESPACE,
                type: ACTIVE_EXPERIENCE_ACTION.FETCH_GEOLOCATION_START,
                payload: null,
            });
        });
    });

    describe('fetchGeolocationStartReducer', (): void => {
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

            expect(state.isFetchingGeolocation).toBe(false);

            dispatch(createFetchGeolocationStartAction());

            state = getState()[ACTIVE_EXPERIENCE_NAMESPACE];

            expect(state.isFetchingGeolocation).toBe(true);
        });
    });
});
