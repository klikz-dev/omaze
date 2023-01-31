import { IFunctionComponent } from '@omaze/app';
import React, { ReactElement } from 'react';

import { prizeDetailsFeatureNamespace } from './PrizeDetailsFeature.namespace';
import { displayName } from './PrizeDetailsFeature.qa';
import { PrizeDetailsPortal } from './PrizeDetailsPortal/PrizeDetailsPortal.component';

export const PrizeDetailsFeature: IFunctionComponent = prizeDetailsFeatureNamespace.createComponent(
    displayName,
    (): ReactElement => {
        return (
            <PrizeDetailsPortal />
        );
    }
);
