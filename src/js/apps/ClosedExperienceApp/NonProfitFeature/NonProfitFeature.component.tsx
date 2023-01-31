import { App, IFunctionComponent } from '@omaze/app';
import React, { ReactElement } from 'react';

import { nonProfitFeatureNamespace } from './NonProfitFeature.namespace';
import { displayName } from './NonProfitFeature.qa';
import { NonProfitPortal } from './NonProfitPortal/NonProfitPortal.component';

export const NonProfitFeature: IFunctionComponent = nonProfitFeatureNamespace.createComponent(
    displayName,
    (): ReactElement => {
        return (
            <App
                featureFlags={{}}
                modules={[]}
            >
                <NonProfitPortal />
            </App>
        );
    }
);
