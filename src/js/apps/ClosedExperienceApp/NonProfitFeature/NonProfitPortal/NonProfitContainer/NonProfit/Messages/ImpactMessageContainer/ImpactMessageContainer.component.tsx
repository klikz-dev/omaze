import { IFunctionComponent } from '@omaze/app';
import { useNamespaceSelector } from '@omaze/redux';
import React, { ReactElement } from 'react';

import { selectImpactMessage } from '../../../../../../ClosedExperienceModule/selectors/selectImpactMessage/selectImpactMessage';
import { nonProfitFeatureNamespace } from '../../../../../NonProfitFeature.namespace';

import { ImpactMessage } from './ImpactMessage/ImpactMessage.component';
import { displayName } from './ImpactMessageContainer.qa';

export const ImpactMessageContainer: IFunctionComponent = nonProfitFeatureNamespace.createComponent(
    displayName,
    (): ReactElement | null => {
        const impactMessage: string = useNamespaceSelector(selectImpactMessage);

        if (!impactMessage) {
            return null;
        }

        return (
            <ImpactMessage message={impactMessage} />
        );
    }
);
