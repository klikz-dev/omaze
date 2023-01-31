import { App, IFunctionComponent } from '@omaze/app';
import React, { ReactElement } from 'react';

import { namespace } from './WinnersApp.namespace';
import { displayName } from './WinnersApp.qa';

export const WinnersApp: IFunctionComponent = namespace.createComponent(
    displayName,
    (): ReactElement => {
        return (
            <App
                featureFlags={{}}
                modules={[]}
            >
            </App>
        );
    }
);
