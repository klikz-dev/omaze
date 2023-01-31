import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import React from 'react';
import { mocked } from 'ts-jest/utils';

import '@testing-library/jest-dom/extend-expect';

import { IImpactMediaAsset } from '../../../../ClosedExperienceModule/ClosedExperience.state';
import { ITransformedCosmic } from '../../../../ClosedExperienceModule/sagas/FetchClosedExperienceFromCosmic/CosmicClosedExperienceTransformer/CosmicClosedExperienceTransformer';
import { createTransformedCosmicMock } from '../../../../shared/tests/CosmicMock';

import { ImpactMediaAssets } from './ImpactMediaAssets.component';
import { IMPACT_MEDIA_ASSETS_QA } from './ImpactMediaAssets.qa';
import { ImpactMediaAssetsPresenter } from './ImpactMediaAssetsPresenter/ImpactMediaAssetsPresenter';

jest.mock('./ImpactMediaAssetsPresenter/ImpactMediaAssetsPresenter');

describe(ImpactMediaAssets.displayName, (): void => {
    beforeEach((): void => {
        mocked(ImpactMediaAssetsPresenter).mockClear();
        mocked(ImpactMediaAssetsPresenter.prototype.getAllClassNames).mockReturnValue({
            container: 'container',
            header: 'header',
            headerContainer: 'headerContainer',
            mediaAssets: 'mediaAssets',
            firstMediaAsset: 'firstMediaAsset',
            secondMediaAsset: 'secondMediaAsset',
            firstMediaAssetCaption: 'firstMediaAssetCaption',
            secondMediaAssetCaption: 'secondMediaAssetCaption',
            mediaAssetImage: 'mediaAssetImage',
            mediaAssetVideo: 'mediaAssetVideo',
            mediaAssetContainer: 'mediaAssetContainer',
        });
        mocked(ImpactMediaAssetsPresenter.prototype.getMediaAssetAlt).mockReturnValue('mediaAssetImage');
    });

    it('should render only one media asset', (): void => {
        const transformedCosmicMock: ITransformedCosmic = createTransformedCosmicMock();
        const mockMediaAssets: IImpactMediaAsset[] = [transformedCosmicMock.experience.impactMedia.assets[0]];

        const { component }: ITestComponent = bootstrapAndRender(<ImpactMediaAssets assets={mockMediaAssets}
            headline='Headline'
        />);

        expect(component.queryByTestId(IMPACT_MEDIA_ASSETS_QA.FIRST_MEDIA_ASSET)).toBeInTheDocument();
        expect(component.queryByTestId(IMPACT_MEDIA_ASSETS_QA.SECOND_MEDIA_ASSET)).not.toBeInTheDocument();

        expect(component.container.querySelector('.container')).toBeInTheDocument();
        expect(component.container.querySelector('.header')).toBeInTheDocument();
        expect(component.container.querySelector('.headerContainer')).toBeInTheDocument();
        expect(component.container.querySelector('.mediaAssets')).toBeInTheDocument();
        expect(component.container.querySelector('.firstMediaAsset')).toBeInTheDocument();
        expect(component.container.querySelector('.secondMediaAsset')).not.toBeInTheDocument();
        expect(component.container.querySelector('.firstMediaAssetCaption')).toBeInTheDocument();
        expect(component.container.querySelector('.secondMediaAssetCaption')).not.toBeInTheDocument();
        expect(component.container.querySelector('.mediaAssetVideo')).toBeInTheDocument();
        expect(component.container.querySelector('.mediaAssetContainer')).toBeInTheDocument();
        expect(component.container.querySelector('.mediaAssetImage')).not.toBeInTheDocument();
    });

    it('should render two media assets', (): void => {
        const transformedCosmicMock: ITransformedCosmic = createTransformedCosmicMock();
        const mockMediaAssets: IImpactMediaAsset[] = transformedCosmicMock.experience.impactMedia.assets;

        const { component }: ITestComponent = bootstrapAndRender(<ImpactMediaAssets assets={mockMediaAssets}
            headline='Headline'
        />);

        expect(component.queryByTestId(IMPACT_MEDIA_ASSETS_QA.FIRST_MEDIA_ASSET)).toBeInTheDocument();
        expect(component.queryByTestId(IMPACT_MEDIA_ASSETS_QA.SECOND_MEDIA_ASSET)).toBeInTheDocument();

        expect(component.container.querySelector('.container')).toBeInTheDocument();
        expect(component.container.querySelector('.header')).toBeInTheDocument();
        expect(component.container.querySelector('.headerContainer')).toBeInTheDocument();
        expect(component.container.querySelector('.mediaAssets')).toBeInTheDocument();
        expect(component.container.querySelector('.firstMediaAsset')).toBeInTheDocument();
        expect(component.container.querySelector('.secondMediaAsset')).toBeInTheDocument();
        expect(component.container.querySelector('.firstMediaAssetCaption')).toBeInTheDocument();
        expect(component.container.querySelector('.secondMediaAssetCaption')).toBeInTheDocument();
        expect(component.container.querySelector('.mediaAssetVideo')).toBeInTheDocument();
        expect(component.container.querySelector('.mediaAssetContainer')).toBeInTheDocument();
        expect(component.container.querySelector('.mediaAssetImage')).toBeInTheDocument();
    });

    it('should render two media of video type', (): void => {
        const transformedCosmicMock: ITransformedCosmic = createTransformedCosmicMock();

        const mockMediaAssets: IImpactMediaAsset[] = [
            transformedCosmicMock.experience.impactMedia.assets[0],
            transformedCosmicMock.experience.impactMedia.assets[0],
        ];

        const { component }: ITestComponent = bootstrapAndRender(<ImpactMediaAssets assets={mockMediaAssets}
            headline='Headline'
        />);

        expect(component.queryByTestId(IMPACT_MEDIA_ASSETS_QA.FIRST_MEDIA_VIDEO)).toBeInTheDocument();
        expect(component.queryByTestId(IMPACT_MEDIA_ASSETS_QA.SECOND_MEDIA_VIDEO)).toBeInTheDocument();
    });

    it('should render two media of image type', (): void => {
        const transformedCosmicMock: ITransformedCosmic = createTransformedCosmicMock();

        const mockMediaAssets: IImpactMediaAsset[] = [
            transformedCosmicMock.experience.impactMedia.assets[1],
            transformedCosmicMock.experience.impactMedia.assets[1],
        ];

        const { component }: ITestComponent = bootstrapAndRender(<ImpactMediaAssets assets={mockMediaAssets}
            headline='Headline'
        />);

        const firstMediaImage: HTMLElement | null = component.queryByTestId(IMPACT_MEDIA_ASSETS_QA.FIRST_MEDIA_IMAGE);
        const secondMediaImage: HTMLElement | null = component.queryByTestId(IMPACT_MEDIA_ASSETS_QA.SECOND_MEDIA_IMAGE);

        expect(firstMediaImage).toBeInTheDocument();
        expect(firstMediaImage).toHaveAttribute('alt', 'mediaAssetImage');
        expect(secondMediaImage).toBeInTheDocument();
        expect(secondMediaImage).toHaveAttribute('alt', 'mediaAssetImage');
    });
});
