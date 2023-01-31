import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import '@testing-library/jest-dom/extend-expect';
import { RenderResult } from '@testing-library/react';
import React from 'react';
import { IModuleStore } from 'redux-dynamic-modules-core/src/Contracts';

import { APP_NAME } from '../../ActiveExperienceApp.namespace';
import { createFetchActiveExperienceFromShopifySuccessAction } from '../../ActiveExperienceModule/actions/FetchActiveExperienceFromShopify/FetchActiveExperienceFromShopifySuccess/FetchActiveExperienceFromShopifySuccess';
import { getActiveExperienceModule } from '../../ActiveExperienceModule/ActiveExperience.module';
import { IVariant } from '../../ActiveExperienceModule/ActiveExperience.state';
import { ITransformedShopify } from '../../ActiveExperienceModule/sagas/FetchActiveExperienceFromShopify/ShopifyActiveExperienceTransformer/ShopifyActiveExperienceTransformer';
import { IMockedComponent } from '../../shared/tests/IMockedComponent';
import { createTransformedShopifyMock } from '../../shared/tests/ShopifyMock';

import { DonationCard, IDonationCardProps } from './DonationCard/DonationCard.component';
import { DonationCardsContainer } from './DonationCardsContainer.component';
import { LAYOUT_DONATION_CARDS_QA } from './LayoutDonationCards/LayoutDonationCards.qa';

jest.mock('./DonationCard/DonationCard.component');

const variants: IVariant[] = [{
    id: 1,
    sku: 'non-standard_sku',
    title: 'title',
    name: 'name',
    price: 10,
    metafields: {
        calloutText: 'hello',
    },
},{
    id: 2,
    sku: 'standard_sku-1',
    title: 'title',
    name: 'name',
    price: 10,
    metafields: {
        calloutText: 'hello',
    },
},{
    id: 3,
    sku: 'standard_sku-2',
    title: 'title',
    name: 'name',
    price: 10,
    metafields: {
        calloutText: 'hello',
    },
}];

describe(DonationCardsContainer.displayName, (): void => {
    it('was created by the app', (): void => {
        expect(DonationCardsContainer.displayName).toContain('DonationCardsContainer');
        expect(DonationCardsContainer.app).toBe(APP_NAME);
    });

    describe('children', (): void => {
        let component: RenderResult;
        let store: IModuleStore<any>;
        let transformedShopifyMock: ITransformedShopify;

        beforeEach((): void => {
            const testComponent: ITestComponent = bootstrapAndRender(
                <DonationCardsContainer />,
                [getActiveExperienceModule()]
            );

            component = testComponent.component;
            store = testComponent.store;
            transformedShopifyMock = createTransformedShopifyMock();
        });

        it('should contain the LayoutDonationCards component', (): void => {
            expect(component.getByTestId(LAYOUT_DONATION_CARDS_QA.CONTAINER)).toBeInTheDocument();
        });

        it('should render DonationCard for each standard variant', (): void => {
            transformedShopifyMock.variants = variants;
            store.dispatch(createFetchActiveExperienceFromShopifySuccessAction(transformedShopifyMock));

            const mockCalls: IDonationCardProps[][] = (DonationCard as IMockedComponent).testingProps.mock.calls;

            expect(mockCalls.length).toEqual(2);

            expect(mockCalls[0][0].variant).toEqual(variants[1]);
            expect(mockCalls[1][0].variant).toEqual(variants[2]);
        });
    });
});
