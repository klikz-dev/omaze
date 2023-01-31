import { IFunctionComponent } from '@omaze/app';
import React, { ReactElement } from 'react';

import { Portal } from '../../../shared/Portal/Portal.component';
import { titleFeatureNamespace } from '../TitleFeature.namespace';

import { TitleContainer } from './TitleContainer/TitleContainer.component';
import { displayName } from './TitlePortal.qa';

export const TitlePortal: IFunctionComponent = titleFeatureNamespace.createComponent(
    displayName,
    (): ReactElement => {
        return (
            <Portal el='oz-closed-sweepstakes__title'>
                <TitleContainer />
            </Portal>
        );
    },
);
