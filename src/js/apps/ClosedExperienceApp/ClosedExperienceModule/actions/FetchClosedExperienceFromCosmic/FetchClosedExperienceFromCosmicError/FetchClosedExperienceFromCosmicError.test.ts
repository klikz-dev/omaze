import { createStateTestFixture, IGetState, IStateTestFixture } from '@omaze/test';
import { AnyAction, Dispatch } from 'redux';

import { CLOSED_EXPERIENCE_ACTION } from '../../../ClosedExperience.actions';
import { CLOSED_EXPERIENCE_NAMESPACE } from '../../../ClosedExperience.factories';
import { getClosedExperienceModule } from '../../../ClosedExperience.module';
import { IClosedExperienceState } from '../../../ClosedExperience.state';
import { createFetchClosedExperienceFromCosmicStartAction } from '../FetchClosedExperienceFromCosmicStart/FetchClosedExperienceFromCosmicStart';

import { createFetchClosedExperienceFromCosmicErrorAction } from './FetchClosedExperienceFromCosmicError';

jest.mock('../../../sagas/FetchClosedExperienceFromCosmic/FetchClosedExperienceFromCosmic.saga');

describe(CLOSED_EXPERIENCE_ACTION.FETCH_CLOSED_EXPERIENCE_FROM_COSMIC_ERROR, (): void => {
    describe('createFetchClosedExperienceFromCosmicErrorAction', (): void => {
        it('should be able to create createFetchClosedExperienceFromCosmicErrorAction', (): void => {
            const action: AnyAction = createFetchClosedExperienceFromCosmicErrorAction('Error message');

            expect(action).toEqual({
                namespace: CLOSED_EXPERIENCE_NAMESPACE,
                type: CLOSED_EXPERIENCE_ACTION.FETCH_CLOSED_EXPERIENCE_FROM_COSMIC_ERROR,
                payload: 'Error message',
            });
        });
    });

    describe('fetchClosedExperienceFromCosmicErrorReducer', (): void => {
        let dispatch: Dispatch;
        let getState: IGetState;

        beforeEach((): void => {
            const testFixture: IStateTestFixture = createStateTestFixture(
                getClosedExperienceModule()
            );

            dispatch = testFixture.dispatch;
            getState = testFixture.getState;
        });

        it('should be able to reduce createFetchClosedExperienceFromCosmicErrorAction', (): void => {
            dispatch(createFetchClosedExperienceFromCosmicStartAction());

            let state: IClosedExperienceState = getState()[CLOSED_EXPERIENCE_NAMESPACE];

            expect(state.isFetchingCosmic).toBe(true);
            expect(state.fetchingCosmicError).toBe('');

            dispatch(createFetchClosedExperienceFromCosmicErrorAction('Error message'));

            state = getState()[CLOSED_EXPERIENCE_NAMESPACE];

            expect(state.isFetchingCosmic).toBe(false);
            expect(state.fetchingCosmicError).toBe('Error message');
        });
    });
});
