import { IFunctionComponent } from '@omaze/app';
import { useNamespaceSelector } from '@omaze/redux';
import React, { ReactElement } from 'react';

import { selectShouldRenderNonProfit } from '../../../ClosedExperienceModule/selectors/selectShouldRenderNonProfit/selectShouldRenderNonProfit';
import { nonProfitFeatureNamespace } from '../../NonProfitFeature.namespace';

import { NonProfit } from './NonProfit/NonProfit.component';
import { displayName } from './NonProfitContainer.qa';

export const NonProfitContainer: IFunctionComponent = nonProfitFeatureNamespace.createComponent(
    displayName,
    (): ReactElement | null => {
        const shouldRenderNonProfit: boolean = useNamespaceSelector(selectShouldRenderNonProfit);

        if (!shouldRenderNonProfit) {
            return null;
        }

        return (
            <NonProfit />
        );
    }
);
