import { App, IFunctionComponent } from '@omaze/app';
import React, { ReactElement } from 'react';

import { PrizeDetailsFeature } from './PrizeDetailsFeature/PrizeDetailsFeature.component';
import { summaryFeatureNamespace } from './SummaryFeature.namespace';
import { displayName } from './SummaryFeature.qa';
import { TitleFeature } from './TitleFeature/TitleFeature.component';
import { WinnerFeature } from './WinnerFeature/WinnerFeature.component';

export const SummaryFeature: IFunctionComponent = summaryFeatureNamespace.createComponent(
    displayName,
    (): ReactElement => {
        return (
            <App
                featureFlags={{}}
                modules={[]}
            >
                <TitleFeature />
                <PrizeDetailsFeature />
                <WinnerFeature />
            </App>
        );
    }
);
