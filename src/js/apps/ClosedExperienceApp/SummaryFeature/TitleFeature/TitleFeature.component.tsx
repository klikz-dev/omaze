import { IFunctionComponent } from '@omaze/app';
import React, { ReactElement } from 'react';

import { titleFeatureNamespace } from './TitleFeature.namespace';
import { displayName } from './TitleFeature.qa';
import { TitlePortal } from './TitlePortal/TitlePortal.component';

export const TitleFeature: IFunctionComponent = titleFeatureNamespace.createComponent(
    displayName,
    (): ReactElement => {
        return (
            <TitlePortal />
        );
    },
);
