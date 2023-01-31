import { createStateTestFixture, IGetState, IStateTestFixture } from '@omaze/test';
import { AnyAction, Dispatch } from 'redux';

import { createTransformedShopifyMock } from '../../../../shared/tests/ShopifyMock';
import { CLOSED_EXPERIENCE_ACTION } from '../../../ClosedExperience.actions';
import { CLOSED_EXPERIENCE_NAMESPACE } from '../../../ClosedExperience.factories';
import { getClosedExperienceModule } from '../../../ClosedExperience.module';
import { IClosedExperienceState } from '../../../ClosedExperience.state';
import { ITransformedShopify } from '../../../sagas/FetchClosedExperienceFromShopify/ShopifyClosedExperienceTransformer/ShopifyClosedExperienceTransformer';

import { createFetchClosedExperienceFromShopifySuccessAction } from './FetchClosedExperienceFromShopifySuccess';

const transformedShopifyMock: ITransformedShopify = createTransformedShopifyMock();

describe(CLOSED_EXPERIENCE_ACTION.FETCH_CLOSED_EXPERIENCE_FROM_SHOPIFY_SUCCESS, (): void => {
    describe('createFetchClosedExperienceFromShopifySuccessAction', (): void => {
        it('should be able to create createFetchClosedExperienceFromShopifySuccessAction', (): void => {
            const action: AnyAction = createFetchClosedExperienceFromShopifySuccessAction(transformedShopifyMock);

            expect(action.namespace).toBe(CLOSED_EXPERIENCE_NAMESPACE);
            expect(action.type).toBe(CLOSED_EXPERIENCE_ACTION.FETCH_CLOSED_EXPERIENCE_FROM_SHOPIFY_SUCCESS);
            expect(action.payload.experience.name).toBe(transformedShopifyMock.experience.name);
            expect(action.payload.experience.hasWinner).toBe(transformedShopifyMock.experience.hasWinner);
            expect(action.payload.experience.projectedWinnerAnnounceDate.getDate()).toBe(transformedShopifyMock.experience.projectedWinnerAnnounceDate.getDate());
            expect(action.payload.experience.confirmedWinnerAnnounceDate?.getDate()).toBe(transformedShopifyMock.experience.confirmedWinnerAnnounceDate?.getDate());
            expect(action.payload.winner).toEqual(transformedShopifyMock.winner);
            expect(action.payload.nonProfit).toEqual(transformedShopifyMock.nonProfit);
            expect(action.payload.assets).toEqual(transformedShopifyMock.assets);
        });
    });

    describe('fetchClosedExperienceFromShopifySuccessReducer', (): void => {
        let dispatch: Dispatch;
        let getState: IGetState;

        beforeEach((): void => {
            const testFixture: IStateTestFixture = createStateTestFixture(
                getClosedExperienceModule()
            );

            dispatch = testFixture.dispatch;
            getState = testFixture.getState;
        });

        it('should be able to reduce fetchClosedExperienceFromShopifySuccessReducer', (): void => {
            let state: IClosedExperienceState = getState()[CLOSED_EXPERIENCE_NAMESPACE];

            expect(state.isFetchingCosmic).toBe(false);
            expect(state.fetchingCosmicError).toBe('');
            expect(state.experience.name).toBe('');
            expect(state.experience.hasWinner).toBe(false);
            expect(isNaN(state.experience.projectedWinnerAnnounceDate.getDate())).toBe(true);
            expect(state.experience.confirmedWinnerAnnounceDate).not.toBeDefined();
            expect(state.experience.prizeDetails).toBe('');
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

            dispatch(createFetchClosedExperienceFromShopifySuccessAction(transformedShopifyMock));

            state = getState()[CLOSED_EXPERIENCE_NAMESPACE];

            expect(state.isFetchingCosmic).toBe(false);
            expect(state.fetchingCosmicError).toBe('');
            expect(state.experience.name).toBe(transformedShopifyMock.experience.name);
            expect(state.experience.hasWinner).toBe(transformedShopifyMock.experience.hasWinner);
            expect(state.experience.projectedWinnerAnnounceDate.getDate()).toBe(transformedShopifyMock.experience.projectedWinnerAnnounceDate.getDate());
            expect(state.experience.confirmedWinnerAnnounceDate?.getDate()).toBe(transformedShopifyMock.experience.confirmedWinnerAnnounceDate?.getDate());
            expect(state.experience.prizeDetails).toBe('');
            expect(state.assets).toEqual({
                winnerBackgroundImage: transformedShopifyMock.assets.winnerBackgroundImage,
                winnerPendingBackgroundImage: transformedShopifyMock.assets.winnerPendingBackgroundImage,
                ovalBackgroundDesktop: transformedShopifyMock.assets.ovalBackgroundDesktop,
                ovalBackgroundMobile: transformedShopifyMock.assets.ovalBackgroundMobile,
            });
            expect(state.winner).toEqual({
                name: transformedShopifyMock.winner.name,
                location: transformedShopifyMock.winner.location,
                image: transformedShopifyMock.winner.image,
            });
            expect(state.nonProfit).toEqual({
                messageName: '',
                thankYouName: transformedShopifyMock.nonProfit.thankYouName,
                netRaiseAmount: '',
                thankYouMessage: '',
                impactMessage: '',
                logo: {
                    url: '',
                    imgixUrl: '',
                },
            });
        });
    });
});
