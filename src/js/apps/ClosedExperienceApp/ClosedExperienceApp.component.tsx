import { App, IFunctionComponent } from '@omaze/app';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import { closedExperienceAppNamespace } from './ClosedExperienceApp.namespace';
import { displayName } from './ClosedExperienceApp.qa';
import { createFetchClosedExperienceFromCosmicStartAction } from './ClosedExperienceModule/actions/FetchClosedExperienceFromCosmic/FetchClosedExperienceFromCosmicStart/FetchClosedExperienceFromCosmicStart';
import { createFetchClosedExperienceFromShopifyStartAction } from './ClosedExperienceModule/actions/FetchClosedExperienceFromShopify/FetchClosedExperienceFromShopifyStart/FetchClosedExperienceFromShopifyStart';
import { getClosedExperienceModule } from './ClosedExperienceModule/ClosedExperience.module';
import { ImpactMediaAssetsFeature } from './ImpactMediaAssetsFeature/ImpactMediaAssetsFeature.component';
import { NonProfitFeature } from './NonProfitFeature/NonProfitFeature.component';
import { SummaryFeature } from './SummaryFeature/SummaryFeature.component';

export const ClosedExperienceApp: IFunctionComponent = closedExperienceAppNamespace.createComponent(
    displayName,
    (): ReactElement => {
        const dispatch: Dispatch = useDispatch();

        useEffect((): void => {
            dispatch(createFetchClosedExperienceFromCosmicStartAction());
            dispatch(createFetchClosedExperienceFromShopifyStartAction());
        }, []);

        return (
            <App
                featureFlags={{}}
                modules={[
                    getClosedExperienceModule(),
                ]}
            >
                <SummaryFeature />
                <NonProfitFeature />
                <ImpactMediaAssetsFeature />
            </App>
        );
    }
);
