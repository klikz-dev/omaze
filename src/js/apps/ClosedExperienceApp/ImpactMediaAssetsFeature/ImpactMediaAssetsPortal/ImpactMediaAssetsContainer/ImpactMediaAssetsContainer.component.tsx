import { IFunctionComponent } from '@omaze/app';
import { useNamespaceSelector } from '@omaze/redux';
import React, { ReactElement } from 'react';

import { IImpactMedia } from '../../../ClosedExperienceModule/ClosedExperience.state';
import { selectImpactMedia } from '../../../ClosedExperienceModule/selectors/selectImpactMedia/selectImpactMedia';
import { impactMediaAssetsFeatureNamespace } from '../../ImpactMediaAssetsFeature.namespace';

import { ImpactMediaAssets } from './ImpactMediaAssets/ImpactMediaAssets.component';
import { displayName } from './ImpactMediaAssetsContainer.qa';

export const ImpactMediaAssetsContainer: IFunctionComponent = impactMediaAssetsFeatureNamespace.createComponent(
    displayName,
    (): ReactElement | null => {
        const impactMedia: IImpactMedia = useNamespaceSelector(selectImpactMedia);

        if (!impactMedia.assets.length) {
            return null;
        }

        return (
            <ImpactMediaAssets assets={impactMedia.assets} headline={impactMedia.headline} />
        );
    }
);
