import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import { createFetchClosedExperienceFromShopifySuccessAction } from '../../../../ClosedExperienceModule/actions/FetchClosedExperienceFromShopify/FetchClosedExperienceFromShopifySuccess/FetchClosedExperienceFromShopifySuccess';
import { getClosedExperienceModule } from '../../../../ClosedExperienceModule/ClosedExperience.module';
import { ITransformedShopify } from '../../../../ClosedExperienceModule/sagas/FetchClosedExperienceFromShopify/ShopifyClosedExperienceTransformer/ShopifyClosedExperienceTransformer';
import { createTransformedShopifyMock } from '../../../../shared/tests/ShopifyMock';

import { WINNER_QA } from './Winner/Winner.qa';
import { WinnerContainer } from './WinnerContainer.component';
import { WINNER_PENDING_QA } from './WinnerPending/WinnerPending.qa';

describe('WinnerContainer', (): void => {
    describe('when we have a winner', (): void => {
        it('should render Winner component', (): void => {
            const { component, store }: ITestComponent = bootstrapAndRender(
                <WinnerContainer />,
                [getClosedExperienceModule()]
            );

            store.dispatch(createFetchClosedExperienceFromShopifySuccessAction(createTransformedShopifyMock()));

            expect(component.getByTestId(WINNER_QA.WINNER)).toBeInTheDocument();
        });
    });

    describe('when we don\'t have a a winner', (): void => {
        it('should render WinnerPending component', (): void => {
            const { component, store }: ITestComponent = bootstrapAndRender(
                <WinnerContainer />,
                [getClosedExperienceModule()]
            );

            const transformedShopifyMock: ITransformedShopify = createTransformedShopifyMock();

            transformedShopifyMock.experience.hasWinner = false;

            store.dispatch(createFetchClosedExperienceFromShopifySuccessAction(transformedShopifyMock));

            expect(component.getByTestId(WINNER_PENDING_QA.WINNER_PENDING)).toBeInTheDocument();
        });
    });
});
