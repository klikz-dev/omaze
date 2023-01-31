import { createStateTestFixture, IGetState, IStateTestFixture } from '@omaze/test';
import { AnyAction, Dispatch } from 'redux';

import { createTransformedCosmicMock } from '../../../../shared/tests/CosmicMock';
import { CLOSED_EXPERIENCE_ACTION } from '../../../ClosedExperience.actions';
import { CLOSED_EXPERIENCE_NAMESPACE } from '../../../ClosedExperience.factories';
import { getClosedExperienceModule } from '../../../ClosedExperience.module';
import { IClosedExperienceState } from '../../../ClosedExperience.state';
import { ITransformedCosmic } from '../../../sagas/FetchClosedExperienceFromCosmic/CosmicClosedExperienceTransformer/CosmicClosedExperienceTransformer';

import { createFetchClosedExperienceFromCosmicSuccessAction } from './FetchClosedExperienceFromCosmicSuccess';

const transformedCosmicMock: ITransformedCosmic = createTransformedCosmicMock();

describe(CLOSED_EXPERIENCE_ACTION.FETCH_CLOSED_EXPERIENCE_FROM_COSMIC_SUCCESS, (): void => {
    describe('createFetchClosedExperienceFromCosmicSuccessAction', (): void => {
        it('should be able to create createFetchClosedExperienceFromCosmicSuccessAction', (): void => {
            const action: AnyAction = createFetchClosedExperienceFromCosmicSuccessAction(transformedCosmicMock);

            expect(action).toEqual({
                namespace: CLOSED_EXPERIENCE_NAMESPACE,
                type: CLOSED_EXPERIENCE_ACTION.FETCH_CLOSED_EXPERIENCE_FROM_COSMIC_SUCCESS,
                payload: transformedCosmicMock,
            });
        });
    });

    describe('fetchClosedExperienceFromCosmicSuccessReducer', (): void => {
        let dispatch: Dispatch;
        let getState: IGetState;

        beforeEach((): void => {
            const testFixture: IStateTestFixture = createStateTestFixture(
                getClosedExperienceModule()
            );

            dispatch = testFixture.dispatch;
            getState = testFixture.getState;
        });

        it('should be able to reduce fetchClosedExperienceFromCosmicSuccessReducer success action', (): void => {
            let state: IClosedExperienceState = getState()[CLOSED_EXPERIENCE_NAMESPACE];

            expect(state.isFetchingCosmic).toBe(false);
            expect(state.fetchingCosmicError).toBe('');
            expect(state.experience.name).toBe('');
            expect(state.experience.hasWinner).toBe(false);
            expect(isNaN(state.experience.projectedWinnerAnnounceDate.getDate())).toBe(true);
            expect(state.experience.prizeDetails).toBe('');
            expect(state.experience.additionalWinners.length).toBe(0);
            expect(state.experience.impactMedia).toEqual({
                assets: [],
                headline: '',
            });
            expect(state.assets).toEqual({
                winnerBackgroundImage: '',
                winnerPendingBackgroundImage: '',
                ovalBackgroundDesktop: '',
                ovalBackgroundMobile: '',
            });
            expect(state.winner).toEqual({
                name: '',
                location: '',
                image: '',
            });
            expect(state.nonProfit).toEqual({
                messageName: '',
                thankYouName: '',
                netRaiseAmount: '',
                thankYouMessage: '',
                impactMessage: '',
                logo: {
                    url: '',
                    imgixUrl: '',
                },
            });

            dispatch(createFetchClosedExperienceFromCosmicSuccessAction(transformedCosmicMock));

            state = getState()[CLOSED_EXPERIENCE_NAMESPACE];

            expect(state.isFetchingCosmic).toBe(false);
            expect(state.fetchingCosmicError).toBe('');
            expect(state.experience.name).toBe('');
            expect(state.experience.hasWinner).toBe(false);
            expect(isNaN(state.experience.projectedWinnerAnnounceDate.getDate())).toBe(true);
            expect(state.experience.prizeDetails).toBe(transformedCosmicMock.experience.prizeDetails);
            expect(state.experience.additionalWinners.length).toBe(transformedCosmicMock.experience.additionalWinners.length);
            expect(state.experience.impactMedia).toEqual(transformedCosmicMock.experience.impactMedia);
            expect(state.assets).toEqual({
                winnerBackgroundImage: '',
                winnerPendingBackgroundImage: '',
                ovalBackgroundDesktop: '',
                ovalBackgroundMobile: '',
            });
            expect(state.winner).toEqual({
                name: '',
                location: '',
                image: '',
            });
            expect(state.nonProfit).toEqual({
                messageName: transformedCosmicMock.nonProfit.messageName,
                thankYouName: '',
                netRaiseAmount: transformedCosmicMock.nonProfit.netRaiseAmount,
                thankYouMessage: transformedCosmicMock.nonProfit.thankYouMessage,
                impactMessage: transformedCosmicMock.nonProfit.impactMessage,
                logo: {
                    url: transformedCosmicMock.nonProfit.logo.url,
                    imgixUrl: transformedCosmicMock.nonProfit.logo.imgixUrl,
                },
            });
        });
    });
});
