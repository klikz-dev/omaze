import { IFunctionComponent } from '@omaze/app';
import { useNamespaceSelector } from '@omaze/redux';
import React, { ReactElement } from 'react';

import {
    INetRaiseAmountAssets,
    selectNetRaiseAmountAssets,
} from '../../../../../ClosedExperienceModule/selectors/selectNetRaiseAmountAssets/selectNetRaiseAmountAssets';
import {
    INetRaiseContent,
    selectNetRaiseContent,
} from '../../../../../ClosedExperienceModule/selectors/selectNetRaiseContent/selectNetRaiseContent';
import { nonProfitFeatureNamespace } from '../../../../NonProfitFeature.namespace';

import { NetRaiseAmount } from './NetRaiseAmount/NetRaiseAmount.component';
import { displayName } from './NetRaiseAmountContainer.qa';

export const NetRaiseAmountContainer: IFunctionComponent = nonProfitFeatureNamespace.createComponent(
    displayName,
    (): ReactElement | null => {
        const {
            messageName,
            amount,
        }: INetRaiseContent = useNamespaceSelector(selectNetRaiseContent);

        const {
            ovalBackgroundDesktop,
            ovalBackgroundMobile,
        }: INetRaiseAmountAssets = useNamespaceSelector(selectNetRaiseAmountAssets);

        if (!amount) {
            return null;
        }

        return (
            <NetRaiseAmount
                messageName={messageName}
                netRaiseAmount={amount}
                ovalBackgroundDesktop={ovalBackgroundDesktop}
                ovalBackgroundMobile={ovalBackgroundMobile}
            />
        );
    }
);
