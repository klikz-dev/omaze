import { IFunctionComponent } from '@omaze/app';
import React, { ReactElement } from 'react';

import { Portal } from '../../shared/Portal/Portal.component';
import { nonProfitFeatureNamespace } from '../NonProfitFeature.namespace';

import { NonProfitContainer } from './NonProfitContainer/NonProfitContainer.component';
import { displayName } from './NonProfitPortal.qa';

export const NonProfitPortal: IFunctionComponent = nonProfitFeatureNamespace.createComponent(
    displayName,
    (): ReactElement | null => {
        return (
            <Portal el="oz-closed-sweepstakes__non-profit">
                <NonProfitContainer />
            </Portal>
        );
    }
);
