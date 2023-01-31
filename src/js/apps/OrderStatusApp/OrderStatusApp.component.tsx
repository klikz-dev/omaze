import { App, IFunctionComponent } from '@omaze/app';
import React, { ReactElement } from 'react';

import { namespace } from './OrderStatusApp.namespace';
import { displayName } from './OrderStatusApp.qa';

export const OrderStatusApp: IFunctionComponent = namespace.createComponent(
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
