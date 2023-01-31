import { App, IFunctionComponent } from '@omaze/app';
import React, { ReactElement } from 'react';

import { namespace } from './Auth0UnknownErrorApp.namespace';
import { displayName } from './Auth0UnknownErrorApp.qa';
import { UnknownErrorMessage } from './UnknownErrorMessage/UnknownErrorMessage.component';

export const Auth0UnknownErrorApp: IFunctionComponent = namespace.createComponent(
    displayName,
    (): ReactElement => {
        return (
            <App
                featureFlags={{}}
                modules={[]}
            >
                <UnknownErrorMessage />
            </App>
        );
    }
);
