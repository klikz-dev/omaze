import { IFunctionComponent } from '@omaze/app';
import { OzHighlight } from '@omaze/omaze-ui';
import React, { ReactElement } from 'react';

import { winnerFeatureNamespace } from '../../../WinnerFeature.namespace';

import { AdditionalWinnersContainer } from './AdditionalWinnersContainer/AdditionalWinnersContainer.component';
import { displayName, WINNER_QA } from './Winner.qa';
import { IWinnerPresenterClassNames, IWinnerPresenterConfig, WinnerPresenter } from './WinnerPresenter/WinnerPresenter';

export interface IWinnerProps {
    name: string;
    location: string;
    image: string;
    projectedWinnerAnnounceDate: Date;
    confirmedWinnerAnnounceDate: Date | undefined;
    backgroundImage: string;
}

export const Winner: IFunctionComponent<IWinnerProps> = winnerFeatureNamespace.createComponent(
    displayName,
    (props: IWinnerProps): ReactElement => {
        const {
            name,
            location,
            image,
            projectedWinnerAnnounceDate,
            confirmedWinnerAnnounceDate,
            backgroundImage,
        }: IWinnerProps = props;

        const winnerPresenterConfig: IWinnerPresenterConfig = {
            projectedWinnerAnnounceDate: projectedWinnerAnnounceDate,
            confirmedWinnerAnnounceDate: confirmedWinnerAnnounceDate,
            backgroundImage: backgroundImage,
            image: image,
        };

        const presenter: WinnerPresenter = new WinnerPresenter(winnerPresenterConfig);
        const classNames: IWinnerPresenterClassNames = presenter.getAllClassNames();

        return (
            <div data-testid={WINNER_QA.WINNER} style={presenter.getWinnerContainerStyles()}>
                <div
                    className={classNames.backgroundImage}
                    style={presenter.getBackgroundImageStyles()}
                >
                    <div className={classNames.winnerContent}>
                        <OzHighlight>
                            <h4 className={classNames.header}>Congrats!</h4>
                        </OzHighlight>
                        <h3 className={classNames.winnerName}>{name}</h3>
                        <h5 className={classNames.winnerLocation}>{location}</h5>
                        <h5 className={classNames.winnerDate}>{presenter.getAnnouncedText()}</h5>
                    </div>
                    <div className={classNames.winnerImageContainer}>
                        <div
                            data-testid={WINNER_QA.WINNER_IMAGE}
                            className={classNames.winnerImage}
                            style={presenter.getWinnerImageStyles()}
                        />
                    </div>
                    <AdditionalWinnersContainer />
                </div>
            </div>
        );
    }
);
