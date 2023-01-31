import { IFunctionComponent } from '@omaze/app';
import { useNamespaceSelector } from '@omaze/redux';
import React, { ReactElement } from 'react';

import { selectPrizeDetails } from '../../../../ClosedExperienceModule/selectors/selectPrizeDetails/selectPrizeDetails';
import { prizeDetailsFeatureNamespace } from '../../PrizeDetailsFeature.namespace';

import { PrizeDetails } from './PrizeDetails/PrizeDetails.component';
import { displayName } from './PrizeDetailsContainer.qa';

export const PrizeDetailsContainer: IFunctionComponent = prizeDetailsFeatureNamespace.createComponent(
    displayName,

    (): ReactElement | null=> {
        const prizeDetails: string = useNamespaceSelector(selectPrizeDetails);

        if (!prizeDetails) {
            return null;
        }

        return (
            <PrizeDetails prizeDetails={prizeDetails} />
        );
    }
);
