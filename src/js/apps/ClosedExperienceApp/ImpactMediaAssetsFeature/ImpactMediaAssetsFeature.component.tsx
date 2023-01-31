import { IFunctionComponent } from '@omaze/app';
import React, { ReactElement } from 'react';

import { impactMediaAssetsFeatureNamespace } from './ImpactMediaAssetsFeature.namespace';
import { displayName } from './ImpactMediaAssetsFeature.qa';
import { ImpactMediaAssetsPortal } from './ImpactMediaAssetsPortal/ImpactMediaAssetsPortal.component';

export const ImpactMediaAssetsFeature: IFunctionComponent = impactMediaAssetsFeatureNamespace.createComponent(
    displayName,
    (): ReactElement => {
        return (
            <ImpactMediaAssetsPortal />
        );
    }
);
