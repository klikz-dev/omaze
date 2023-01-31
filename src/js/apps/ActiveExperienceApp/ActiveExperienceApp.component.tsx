import { App, IFunctionComponent } from '@omaze/app';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import { namespace } from './ActiveExperienceApp.namespace';
import { displayName } from './ActiveExperienceApp.qa';
import { createFetchActiveExperienceFromShopifyStartAction } from './ActiveExperienceModule/actions/FetchActiveExperienceFromShopify/FetchActiveExperienceFromShopifyStart/FetchActiveExperienceFromShopifyStart';
import { createFetchGeolocationStartAction } from './ActiveExperienceModule/actions/FetchGeolocation/FetchGeolocationStart/FetchGeolocationStart';
import { getActiveExperienceModule } from './ActiveExperienceModule/ActiveExperience.module';
import { DonationOptions } from './DonationOptions/DonationOptions.component';
import { DonorCounter } from './DonorCounter/DonorCounter.component';

export const ActiveExperienceApp: IFunctionComponent = namespace.createComponent(
    displayName,
    (): ReactElement => {
        const dispatch: Dispatch = useDispatch();

        useEffect((): void => {
            dispatch(createFetchActiveExperienceFromShopifyStartAction());
            dispatch(createFetchGeolocationStartAction());
        }, []);

        return (
            <App
                featureFlags={{}}
                modules={[
                    getActiveExperienceModule(),
                ]}
            >
                <DonationOptions />
                <DonorCounter />
            </App>
        );
    }
);
