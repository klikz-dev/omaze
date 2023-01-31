import { IFunctionComponent } from '@omaze/app';
import React, { ReactElement } from 'react';

import { Portal } from '../../../shared/Portal/Portal.component';
import { prizeDetailsFeatureNamespace } from '../PrizeDetailsFeature.namespace';

import { PrizeDetailsContainer } from './PrizeDetailsContainer/PrizeDetailsContainer.component';
import { displayName } from './PrizeDetailsPortal.qa';

export const PrizeDetailsPortal: IFunctionComponent = prizeDetailsFeatureNamespace.createComponent(displayName, (): ReactElement => {
    return (
        <Portal el='oz-closed-sweepstakes__prize-details'>
            <PrizeDetailsContainer />
        </Portal>
    );
});
