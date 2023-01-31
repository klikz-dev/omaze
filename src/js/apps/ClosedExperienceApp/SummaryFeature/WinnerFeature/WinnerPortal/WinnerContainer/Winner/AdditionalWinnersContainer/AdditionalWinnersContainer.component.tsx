import { IFunctionComponent } from '@omaze/app';
import { useNamespaceSelector } from '@omaze/redux';
import React, { ReactElement } from 'react';

import { IAdditionalWinner } from '../../../../../../ClosedExperienceModule/ClosedExperience.state';
import { selectAdditionalWinners } from '../../../../../../ClosedExperienceModule/selectors/selectAdditionalWinners/selectAdditionalWinners';
import { winnerFeatureNamespace } from '../../../../WinnerFeature.namespace';

import { AdditionalWinners } from './AdditionalWinners/AdditionalWinners.component';
import { displayName } from './AdditionalWinnersContainer.qa';

export const AdditionalWinnersContainer: IFunctionComponent = winnerFeatureNamespace.createComponent(
    displayName,
    (): ReactElement | null => {

        const additionalWinners: IAdditionalWinner[] = useNamespaceSelector(selectAdditionalWinners);

        if (additionalWinners.length <= 0) {
            return null;
        }

        return (
            <AdditionalWinners additionalWinners={additionalWinners} />
        );
    }
);
