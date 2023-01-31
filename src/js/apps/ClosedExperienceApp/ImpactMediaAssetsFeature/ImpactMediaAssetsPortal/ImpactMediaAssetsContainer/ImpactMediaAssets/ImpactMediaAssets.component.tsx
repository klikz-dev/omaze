import { IFunctionComponent } from '@omaze/app';
import { OzHighlight } from '@omaze/omaze-ui';
import React, { ReactElement } from 'react';

import { IImpactMediaAsset } from '../../../../ClosedExperienceModule/ClosedExperience.state';
import { impactMediaAssetsFeatureNamespace } from '../../../ImpactMediaAssetsFeature.namespace';

import { displayName, IMPACT_MEDIA_ASSETS_QA } from './ImpactMediaAssets.qa';
import { IImpactMediaAssetsClassNames, ImpactMediaAssetsPresenter } from './ImpactMediaAssetsPresenter/ImpactMediaAssetsPresenter';

export interface IImpactMediaAssetsProps {
    assets: IImpactMediaAsset[];
    headline: string;
}

export const ImpactMediaAssets: IFunctionComponent<IImpactMediaAssetsProps> = impactMediaAssetsFeatureNamespace.createComponent(
    displayName,
    (props: IImpactMediaAssetsProps): ReactElement => {
        const { assets, headline }: IImpactMediaAssetsProps  = props;
        const presenter: ImpactMediaAssetsPresenter = new ImpactMediaAssetsPresenter();
        const classNames: IImpactMediaAssetsClassNames = presenter.getAllClassNames();
        const mediaAssetAlt: string = presenter.getMediaAssetAlt();
        const firstMediaAsset: IImpactMediaAsset = assets[0];
        const secondMediaAsset: IImpactMediaAsset = assets[1];

        return (
            <div data-testid={IMPACT_MEDIA_ASSETS_QA.CONTAINER} className={classNames.container}>
                <div className={classNames.headerContainer}>
                    <OzHighlight>
                        <h4 className={classNames.header}>{headline}</h4>
                    </OzHighlight>
                </div>
                <div className={classNames.mediaAssets}>
                    <div className={classNames.firstMediaAsset} data-testid={IMPACT_MEDIA_ASSETS_QA.FIRST_MEDIA_ASSET}>
                        <div className={classNames.mediaAssetContainer}>
                            {firstMediaAsset.youtubeVideoLink ? (
                                <iframe
                                    data-testid={IMPACT_MEDIA_ASSETS_QA.FIRST_MEDIA_VIDEO}
                                    className={classNames.mediaAssetVideo}
                                    src={firstMediaAsset.youtubeVideoLink}
                                    frameBorder="0"
                                    allowFullScreen
                                />
                            ) : (
                                <img
                                    data-testid={IMPACT_MEDIA_ASSETS_QA.FIRST_MEDIA_IMAGE}
                                    className={classNames.mediaAssetImage}
                                    src={firstMediaAsset.image.imgixUrl || undefined}
                                    alt={mediaAssetAlt}
                                />
                            )}
                        </div>
                        <h3 className={classNames.firstMediaAssetCaption}>{firstMediaAsset.caption}</h3>
                    </div>
                    {secondMediaAsset && (
                        <div className={classNames.secondMediaAsset} data-testid={IMPACT_MEDIA_ASSETS_QA.SECOND_MEDIA_ASSET}>
                            <div className={classNames.mediaAssetContainer}>
                                {secondMediaAsset.youtubeVideoLink ? (
                                    <iframe
                                        data-testid={IMPACT_MEDIA_ASSETS_QA.SECOND_MEDIA_VIDEO}
                                        className={classNames.mediaAssetVideo}
                                        src={secondMediaAsset.youtubeVideoLink}
                                        frameBorder="0"
                                        allowFullScreen
                                    />
                                ) : (
                                    <img
                                        data-testid={IMPACT_MEDIA_ASSETS_QA.SECOND_MEDIA_IMAGE}
                                        className={classNames.mediaAssetImage}
                                        src={secondMediaAsset.image.imgixUrl || undefined}
                                        alt={mediaAssetAlt}
                                    />
                                )}
                            </div>
                            <h3 className={classNames.secondMediaAssetCaption}>{secondMediaAsset.caption}</h3>
                        </div>
                    )}
                </div>
            </div>
        );
    });
