import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import { RenderResult } from '@testing-library/react';
import React from 'react';
import { IModuleStore } from 'redux-dynamic-modules-core/src/Contracts';

import '@testing-library/jest-dom/extend-expect';
import { createFetchClosedExperienceFromCosmicSuccessAction } from '../../../ClosedExperienceModule/actions/FetchClosedExperienceFromCosmic/FetchClosedExperienceFromCosmicSuccess/FetchClosedExperienceFromCosmicSuccess';
import { getClosedExperienceModule } from '../../../ClosedExperienceModule/ClosedExperience.module';
import { IImpactMediaAsset } from '../../../ClosedExperienceModule/ClosedExperience.state';
import { createEmptyTransformedCosmicMock, createTransformedCosmicMock } from '../../../shared/tests/CosmicMock';
import { IMockedComponent } from '../../../shared/tests/IMockedComponent';

import { ImpactMediaAssets } from './ImpactMediaAssets/ImpactMediaAssets.component';
import { IMPACT_MEDIA_ASSETS_QA } from './ImpactMediaAssets/ImpactMediaAssets.qa';
import { ImpactMediaAssetsContainer } from './ImpactMediaAssetsContainer.component';

jest.mock('./ImpactMediaAssets/ImpactMediaAssets.component');

describe(ImpactMediaAssetsContainer.displayName, (): void => {
    let component: RenderResult;
    let store: IModuleStore<any>;

    beforeEach((): void => {
        const testComponent: ITestComponent = bootstrapAndRender(
            <ImpactMediaAssetsContainer />,
            [getClosedExperienceModule()]
        );

        component = testComponent.component;
        store = testComponent.store;
    });

    it('should render the ImpactMediaAssets component', (): void => {
        store.dispatch(createFetchClosedExperienceFromCosmicSuccessAction(createTransformedCosmicMock()));

        expect(component.getByText(ImpactMediaAssets.displayName)).toBeInTheDocument();

        const assets: IImpactMediaAsset[] = (ImpactMediaAssets as IMockedComponent).testingProps.mock.calls[0][0].assets;
        const headline: string = (ImpactMediaAssets as IMockedComponent).testingProps.mock.calls[0][0].headline;

        expect(assets[0].caption).toBe('Sebastian got his Mustang');
        expect(assets[0].youtubeVideoLink).toBe('https://www.youtube.com/embed/5wShHM7cxWU');
        expect(assets[1].caption).toBe('International Medical Corps can keep saving lives');
        expect(assets[1].image.imgixUrl).toBe('https://imgix.cosmicjs.com/8df1f270-31a5-11ea-96a7-8146ec741192-OrientExpressMWQ419ClosedPrizeThumbsHeadphones.png');
        expect(headline).toBe('Win this, fund that.');
    });

    it('should not render the ImpactMediaAssets component if there impactMedia state is empty', (): void => {
        store.dispatch(createFetchClosedExperienceFromCosmicSuccessAction(createEmptyTransformedCosmicMock()));

        expect(component.queryByTestId(IMPACT_MEDIA_ASSETS_QA.CONTAINER)).not.toBeInTheDocument();
    });
});
