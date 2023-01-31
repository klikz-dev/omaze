import styles from '../ImpactMediaAssets.styles.css';

export interface IImpactMediaAssetsClassNames {
    container: string;
    header: string;
    headerContainer: string;
    mediaAssets: string;
    firstMediaAsset: string;
    secondMediaAsset: string;
    firstMediaAssetCaption: string;
    secondMediaAssetCaption: string;
    mediaAssetImage: string;
    mediaAssetVideo: string;
    mediaAssetContainer: string;
}

export class ImpactMediaAssetsPresenter {
    public getMediaAssetAlt (): string {
        return 'Media asset image';
    }

    public getAllClassNames (): IImpactMediaAssetsClassNames {
        return {
            container: styles.container,
            header: styles.header,
            headerContainer: styles.headerContainer,
            mediaAssets: styles.mediaAssets,
            firstMediaAsset: styles.firstMediaAsset,
            secondMediaAsset: styles.secondMediaAsset,
            firstMediaAssetCaption: styles.firstMediaAssetCaption,
            secondMediaAssetCaption: styles.secondMediaAssetCaption,
            mediaAssetImage: styles.mediaAssetImage,
            mediaAssetVideo: styles.mediaAssetVideo,
            mediaAssetContainer: styles.mediaAssetContainer,
        };
    }
}
