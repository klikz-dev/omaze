import { IFunctionComponent } from '@omaze/app';
import React, { ReactElement } from 'react';

import { Portal } from '../../shared/Portal/Portal.component';
import { impactMediaAssetsFeatureNamespace } from '../ImpactMediaAssetsFeature.namespace';

import { ImpactMediaAssetsContainer } from './ImpactMediaAssetsContainer/ImpactMediaAssetsContainer.component';
import { displayName } from './ImpactMediaAssetsPortal.qa';

export const ImpactMediaAssetsPortal: IFunctionComponent = impactMediaAssetsFeatureNamespace.createComponent(displayName, (): ReactElement => {
    return (
        <Portal el='oz-closed-sweepstakes__impact-media-assets'>
            <ImpactMediaAssetsContainer />
        </Portal>
    );
});
