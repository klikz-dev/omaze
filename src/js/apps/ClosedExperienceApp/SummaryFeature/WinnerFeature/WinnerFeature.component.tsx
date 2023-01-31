import { App, IFunctionComponent } from '@omaze/app';
import React, { ReactElement } from 'react';

import { winnerFeatureNamespace } from './WinnerFeature.namespace';
import { displayName } from './WinnerFeature.qa';
import { WinnerPortal } from './WinnerPortal/WinnerPortal.component';

export const WinnerFeature: IFunctionComponent = winnerFeatureNamespace.createComponent(
    displayName,
    (): ReactElement => {
        return (
            <App
                featureFlags={{}}
                modules={[]}
            >
                <WinnerPortal />;
            </App>
        );
    }
);
