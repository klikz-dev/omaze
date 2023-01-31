import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import '@testing-library/jest-dom/extend-expect';
import { RenderResult } from '@testing-library/react';
import React from 'react';
import { IModuleStore } from 'redux-dynamic-modules-core/src/Contracts';

import { APP_NAME } from '../../ActiveExperienceApp.namespace';
import { createFetchActiveExperienceFromShopifySuccessAction } from '../../ActiveExperienceModule/actions/FetchActiveExperienceFromShopify/FetchActiveExperienceFromShopifySuccess/FetchActiveExperienceFromShopifySuccess';
import { createFetchGeolocationSuccessAction } from '../../ActiveExperienceModule/actions/FetchGeolocation/FetchGeolocationSuccess/FetchGeolocationSuccess';
import { getActiveExperienceModule } from '../../ActiveExperienceModule/ActiveExperience.module';
import { ITransformedShopify } from '../../ActiveExperienceModule/sagas/FetchActiveExperienceFromShopify/ShopifyActiveExperienceTransformer/ShopifyActiveExperienceTransformer';
import { ITransformedGeolocation } from '../../ActiveExperienceModule/sagas/FetchGeolocation/GeolocationTransformer/GeolocationTransformer';
import { createTransformedGeolocationMock } from '../../shared/tests/GeolocationMock';
import { IMockedComponent } from '../../shared/tests/IMockedComponent';
import { createTransformedShopifyMock } from '../../shared/tests/ShopifyMock';

import { FameLink, IFameLinkProps } from './FameLink/FameLink.component';
import { FameLinkContainer } from './FameLinkContainer.component';

jest.mock('./FameLink/FameLink.component');

describe(FameLinkContainer.displayName, (): void => {
    it('was created by the app', (): void => {
        expect(FameLinkContainer.displayName).toContain('FameLinkContainer');
        expect(FameLinkContainer.app).toBe(APP_NAME);
    });

    let component: RenderResult;
    let store: IModuleStore<any>;
    let transformedShopifyMock: ITransformedShopify;
    let transformedGeolocationMock: ITransformedGeolocation;

    beforeEach((): void => {
        const testComponent: ITestComponent = bootstrapAndRender(
            <FameLinkContainer />,
            [getActiveExperienceModule()]
        );

        component = testComponent.component;
        store = testComponent.store;
        transformedShopifyMock = createTransformedShopifyMock();
        transformedGeolocationMock = createTransformedGeolocationMock();
    });

    it('should contain the FameLink component', (): void => {
        store.dispatch(createFetchActiveExperienceFromShopifySuccessAction(transformedShopifyMock));

        expect(component.baseElement).toContainHTML(FameLink.displayName);
    });

    describe('with California geolocation', (): void => {
        it('should contain a prominent FameLink', (): void => {
            store.dispatch(createFetchActiveExperienceFromShopifySuccessAction(transformedShopifyMock));

            transformedGeolocationMock.regionCode = 'CA';
            transformedGeolocationMock.countryCode = 'US';
            store.dispatch(createFetchGeolocationSuccessAction(transformedGeolocationMock));

            const mockCalls: IFameLinkProps[][] = (FameLink as IMockedComponent).testingProps.mock.calls;
            const lastMockCall: IFameLinkProps = mockCalls[mockCalls.length - 1][0];

            expect(lastMockCall).toEqual({
                hostName: 'fame.com',
                productId: 111,
                productTitle: 'experience name',
                productHandle: 'handle',
                prominent: true,
            });
        });
    });

    describe('with non-California geolocation', (): void => {
        it('should contain a standard FameLink', (): void => {
            store.dispatch(createFetchActiveExperienceFromShopifySuccessAction(transformedShopifyMock));

            expect(component.getByText(FameLink.displayName)).toBeInTheDocument();

            transformedGeolocationMock.regionCode = 'NY';
            transformedGeolocationMock.countryCode = 'US';
            store.dispatch(createFetchGeolocationSuccessAction(transformedGeolocationMock));

            const mockCalls: IFameLinkProps[][] = (FameLink as IMockedComponent).testingProps.mock.calls;
            const lastMockCall: IFameLinkProps = mockCalls[mockCalls.length - 1][0];

            expect(lastMockCall).toEqual({
                hostName: 'fame.com',
                productId: 111,
                productTitle: 'experience name',
                productHandle: 'handle',
                prominent: false,
            });
        });
    });
});
