import { IFunctionComponent } from '@omaze/app';
import { OzHighlight } from '@omaze/omaze-ui';
import React, { ReactElement } from 'react';

import { winnerFeatureNamespace } from '../../../WinnerFeature.namespace';

import { displayName, WINNER_PENDING_QA } from './WinnerPending.qa';
import {
    IWinnerPendingPresenterClassNames,
    IWinnerPendingPresenterConfig,
    WinnerPendingPresenter,
} from './WinnerPendingPresenter/WinnerPendingPresenter';

export interface IWinnerPendingProps {
    projectedWinnerAnnounceDate: Date;
    confirmedWinnerAnnounceDate: Date | undefined;
    backgroundImage: string;
}

export const WinnerPending: IFunctionComponent<IWinnerPendingProps> = winnerFeatureNamespace.createComponent(
    displayName,
    (props: IWinnerPendingProps): ReactElement => {
        const {
            projectedWinnerAnnounceDate,
            confirmedWinnerAnnounceDate,
            backgroundImage,
        }: IWinnerPendingProps = props;

        const winnerPendingPresenterConfig: IWinnerPendingPresenterConfig = {
            projectedWinnerAnnounceDate: projectedWinnerAnnounceDate,
            confirmedWinnerAnnounceDate: confirmedWinnerAnnounceDate,
            backgroundImage: backgroundImage,
        };

        const presenter: WinnerPendingPresenter = new WinnerPendingPresenter(winnerPendingPresenterConfig);
        const classNames: IWinnerPendingPresenterClassNames = presenter.getAllClassNames();

        return (
            <div
                data-testid={WINNER_PENDING_QA.WINNER_PENDING}
                className={classNames.winnerPendingContainer}
                style={presenter.getWinnerPendingContainerStyles()}
            >
                <div className={classNames.winnerPendingContent}>
                    <OzHighlight>
                        <h2 className={classNames.header}>
                            Winner pending!
                        </h2>
                    </OzHighlight>
                    <div className={classNames.pendingDate}>
                        {presenter.getAnnouncedText()}
                    </div>
                </div>
            </div>
        );
    }
);

