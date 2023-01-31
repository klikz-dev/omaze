import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import '@testing-library/jest-dom/extend-expect';
import { RenderResult } from '@testing-library/react';
import React from 'react';
import { IModuleStore } from 'redux-dynamic-modules-core/src/Contracts';

import { APP_NAME } from '../../ActiveExperienceApp.namespace';
import { createFetchActiveExperienceFromShopifySuccessAction } from '../../ActiveExperienceModule/actions/FetchActiveExperienceFromShopify/FetchActiveExperienceFromShopifySuccess/FetchActiveExperienceFromShopifySuccess';
import { getActiveExperienceModule } from '../../ActiveExperienceModule/ActiveExperience.module';
import { ITransformedShopify } from '../../ActiveExperienceModule/sagas/FetchActiveExperienceFromShopify/ShopifyActiveExperienceTransformer/ShopifyActiveExperienceTransformer';
import { IMockedComponent } from '../../shared/tests/IMockedComponent';
import { createTransformedShopifyMock } from '../../shared/tests/ShopifyMock';

import { ITitleProps, Title } from './Title/Title.component';
import { TitleContainer } from './TitleContainer.component';

jest.mock('./Title/Title.component');

describe(TitleContainer.displayName, (): void => {
    it('was created by the app', (): void => {
        expect(TitleContainer.displayName).toContain('TitleContainer');
        expect(TitleContainer.app).toBe(APP_NAME);
    });

    let component: RenderResult;
    let store: IModuleStore<any>;

    beforeEach((): void => {
        const testComponent: ITestComponent = bootstrapAndRender(
            <TitleContainer />,
            [getActiveExperienceModule()]
        );

        component = testComponent.component;
        store = testComponent.store;
    });

    it('should contain the Title component', (): void => {
        expect(component.getByText(Title.displayName)).toBeInTheDocument();
    });

    it('should fetch data for the Title component', (): void => {
        const transformedShopifyMock: ITransformedShopify = createTransformedShopifyMock();

        transformedShopifyMock.nonProfit.name = 'hello charity';

        store.dispatch(createFetchActiveExperienceFromShopifySuccessAction(transformedShopifyMock));

        const mockCalls: ITitleProps[][] = (Title as IMockedComponent).testingProps.mock.calls;
        const nonProfitName: string = mockCalls[mockCalls.length - 1][0].nonProfitName;

        expect(nonProfitName).toBe('hello charity');
    });
});
