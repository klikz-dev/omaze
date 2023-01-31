import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import '@testing-library/jest-dom/extend-expect';
import { RenderResult } from '@testing-library/react';
import React from 'react';
import { IModuleStore } from 'redux-dynamic-modules-core/src/Contracts';

import { createFetchClosedExperienceFromCosmicSuccessAction } from '../../../../ClosedExperienceModule/actions/FetchClosedExperienceFromCosmic/FetchClosedExperienceFromCosmicSuccess/FetchClosedExperienceFromCosmicSuccess';
import { createFetchClosedExperienceFromShopifySuccessAction } from '../../../../ClosedExperienceModule/actions/FetchClosedExperienceFromShopify/FetchClosedExperienceFromShopifySuccess/FetchClosedExperienceFromShopifySuccess';
import { getClosedExperienceModule } from '../../../../ClosedExperienceModule/ClosedExperience.module';
import { ITransformedCosmic } from '../../../../ClosedExperienceModule/sagas/FetchClosedExperienceFromCosmic/CosmicClosedExperienceTransformer/CosmicClosedExperienceTransformer';
import { ITransformedShopify } from '../../../../ClosedExperienceModule/sagas/FetchClosedExperienceFromShopify/ShopifyClosedExperienceTransformer/ShopifyClosedExperienceTransformer';
import { createTransformedCosmicMock } from '../../../../shared/tests/CosmicMock';
import { IMockedComponent } from '../../../../shared/tests/IMockedComponent';
import { createTransformedShopifyMock } from '../../../../shared/tests/ShopifyMock';
import { FEATURE_NAME } from '../../TitleFeature.namespace';

import { ITitleProps, Title } from './Title/Title.component';
import { TitleContainer } from './TitleContainer.component';

jest.mock('./Title/Title.component');

const transformedShopifyMock: ITransformedShopify = createTransformedShopifyMock();
const transformedCosmicMock: ITransformedCosmic = createTransformedCosmicMock();

describe(TitleContainer.displayName, (): void => {
    it('was created by the app', (): void => {
        expect(TitleContainer.displayName).toContain('TitleContainer');
        expect(TitleContainer.app).toBe(FEATURE_NAME);
    });

    let component: RenderResult;
    let store: IModuleStore<any>;

    beforeEach((): void => {
        const testComponent: ITestComponent = bootstrapAndRender(
            <TitleContainer />,
            [getClosedExperienceModule()]
        );

        component = testComponent.component;
        store = testComponent.store;
    });

    it('should contain the Title component', (): void => {
        expect(component.getByText(Title.displayName)).toBeInTheDocument();

        const experienceName: string = (Title as IMockedComponent).testingProps.mock.calls[0][0].experienceName;
        const thankYouName: string = (Title as IMockedComponent).testingProps.mock.calls[0][0].thankYouName;

        expect(experienceName).toBe('');
        expect(thankYouName).toBe('');
    });

    it('should fetch the experience from the store', (): void => {
        store.dispatch(createFetchClosedExperienceFromShopifySuccessAction(transformedShopifyMock));
        store.dispatch(createFetchClosedExperienceFromCosmicSuccessAction(transformedCosmicMock));

        const {
            experienceName,
            thankYouName,
        }: ITitleProps = (Title as IMockedComponent).testingProps.mock.calls[2][0];

        expect(experienceName).toBe(transformedShopifyMock.experience.name);
        expect(thankYouName).toBe(transformedShopifyMock.nonProfit.thankYouName);
    });
});
