import { createStateTestFixture, IGetState, IStateTestFixture } from '@omaze/test';
import { AnyAction, Dispatch } from 'redux';

import { CLOSED_EXPERIENCE_ACTION } from '../../../ClosedExperience.actions';
import { CLOSED_EXPERIENCE_NAMESPACE } from '../../../ClosedExperience.factories';
import { getClosedExperienceModule } from '../../../ClosedExperience.module';
import { IClosedExperienceState } from '../../../ClosedExperience.state';

import { createFetchClosedExperienceFromCosmicStartAction } from './FetchClosedExperienceFromCosmicStart';

jest.mock('../../../sagas/FetchClosedExperienceFromCosmic/FetchClosedExperienceFromCosmic.saga');

describe(CLOSED_EXPERIENCE_ACTION.FETCH_CLOSED_EXPERIENCE_FROM_COSMIC_START, (): void => {
    describe('createFetchClosedExperienceFromCosmicStartAction', (): void => {
        it('should be able to create createFetchClosedExperienceFromCosmicStartAction start action', (): void => {
            const action: AnyAction = createFetchClosedExperienceFromCosmicStartAction();

            expect(action).toEqual({
                namespace: CLOSED_EXPERIENCE_NAMESPACE,
                type: CLOSED_EXPERIENCE_ACTION.FETCH_CLOSED_EXPERIENCE_FROM_COSMIC_START,
                payload: null,
            });
        });
    });

    describe('fetchClosedExperienceFromCosmicStartReducer', (): void => {
        let dispatch: Dispatch;
        let getState: IGetState;

        beforeEach((): void => {
            const testFixture: IStateTestFixture = createStateTestFixture(
                getClosedExperienceModule()
            );

            dispatch = testFixture.dispatch;
            getState = testFixture.getState;
        });

        it('should be able to reduce fetchClosedExperienceFromCosmicStartReducer', (): void => {
            let state: IClosedExperienceState = getState()[CLOSED_EXPERIENCE_NAMESPACE];

            expect(state.isFetchingCosmic).toBe(false);

            dispatch(createFetchClosedExperienceFromCosmicStartAction());

            state = getState()[CLOSED_EXPERIENCE_NAMESPACE];

            expect(state.isFetchingCosmic).toBe(true);
        });
    });
});
