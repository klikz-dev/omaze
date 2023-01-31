import { ImpactMediaAssetsPresenter } from './ImpactMediaAssetsPresenter';

describe('ImpactMediaAssetsPresenter', (): void => {
    it('should get all classnames', (): void => {
        const presenter: ImpactMediaAssetsPresenter = new ImpactMediaAssetsPresenter();

        expect(presenter.getAllClassNames()).toEqual({
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
    });

    it('should get alt for a media asset image', (): void => {
        const presenter: ImpactMediaAssetsPresenter = new ImpactMediaAssetsPresenter();

        expect(presenter.getMediaAssetAlt()).toBe('Media asset image');
    });
});
