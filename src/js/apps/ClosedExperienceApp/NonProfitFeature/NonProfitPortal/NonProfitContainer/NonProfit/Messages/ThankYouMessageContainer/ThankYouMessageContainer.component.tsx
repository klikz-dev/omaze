import { IFunctionComponent } from '@omaze/app';
import { useNamespaceSelector } from '@omaze/redux';
import React, { ReactElement } from 'react';

import { selectImpactMessage } from '../../../../../../ClosedExperienceModule/selectors/selectImpactMessage/selectImpactMessage';
import {
    IThankYouMessageContent,
    selectThankYouMessageContent,
} from '../../../../../../ClosedExperienceModule/selectors/selectThankYouMessageContent/selectThankYouMessageContent';
import { nonProfitFeatureNamespace } from '../../../../../NonProfitFeature.namespace';

import { ThankYouMessage } from './ThankYouMessage/ThankYouMessage.component';
import { displayName } from './ThankYouMessageContainer.qa';

export const ThankYouMessageContainer: IFunctionComponent = nonProfitFeatureNamespace.createComponent(
    displayName,
    (): ReactElement | null => {
        const {
            message,
            imgixUrl,
        }: IThankYouMessageContent = useNamespaceSelector(selectThankYouMessageContent);

        const impactMessage: string = useNamespaceSelector(selectImpactMessage);

        if (!message) {
            return null;
        }

        return (
            <ThankYouMessage thankYouMessage={message} imgixUrl={imgixUrl} impactMessage={impactMessage} />
        );
    }
);
