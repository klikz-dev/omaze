import { IFunctionComponent } from '@omaze/app';
import { useNamespaceSelector } from '@omaze/redux';
import React, { ReactElement } from 'react';

import { selectHasWinner } from '../../../../ClosedExperienceModule/selectors/selectHasWinner/selectHasWinner';
import {
    IWinnerAssets,
    selectWinnerAssets,
} from '../../../../ClosedExperienceModule/selectors/selectWinnerAssets/selectWinnerAssets';
import {
    IWinnerContent,
    selectWinnerContent,
} from '../../../../ClosedExperienceModule/selectors/selectWinnerContent/selectWinnerContent';
import { winnerFeatureNamespace } from '../../WinnerFeature.namespace';

import { Winner } from './Winner/Winner.component';
import { displayName } from './WinnerContainer.qa';
import { WinnerPending } from './WinnerPending/WinnerPending.component';

export const WinnerContainer: IFunctionComponent = winnerFeatureNamespace.createComponent(
    displayName,
    (): ReactElement => {
        const {
            winnerName,
            winnerLocation,
            projectedWinnerAnnounceDate,
            confirmedWinnerAnnounceDate,
        }: IWinnerContent = useNamespaceSelector(selectWinnerContent);

        const {
            winnerImage,
            winnerBackgroundImage,
            winnerPendingBackgroundImage,
        }: IWinnerAssets = useNamespaceSelector(selectWinnerAssets);

        const hasWinner: boolean = useNamespaceSelector(selectHasWinner);

        if (hasWinner) {
            return (
                <Winner
                    name={winnerName}
                    location={winnerLocation}
                    image={winnerImage}
                    projectedWinnerAnnounceDate={projectedWinnerAnnounceDate}
                    confirmedWinnerAnnounceDate={confirmedWinnerAnnounceDate}
                    backgroundImage={winnerBackgroundImage}
                />);
        }

        return (
            <WinnerPending
                projectedWinnerAnnounceDate={projectedWinnerAnnounceDate}
                confirmedWinnerAnnounceDate={confirmedWinnerAnnounceDate}
                backgroundImage={winnerPendingBackgroundImage}
            />
        );
    }
);
