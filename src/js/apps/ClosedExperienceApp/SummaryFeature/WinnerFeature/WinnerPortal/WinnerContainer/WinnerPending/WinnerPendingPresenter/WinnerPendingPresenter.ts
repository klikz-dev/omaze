import { CSSProperties } from 'react';

import { OzDate } from '../../../../../../shared/OzDate/OzDate';
import styles from '../WinnerPending.styles.css';

export interface IWinnerPendingPresenterConfig {
    projectedWinnerAnnounceDate: Date;
    confirmedWinnerAnnounceDate: Date | undefined;
    backgroundImage: string;
}

export interface IWinnerPendingPresenterClassNames {
    header: string;
    pendingDate: string;
    winnerPendingContainer: string;
    winnerPendingContent: string;
}

export class WinnerPendingPresenter {
    protected projectedWinnerAnnounceDate: Date;
    protected confirmedWinnerAnnounceDate: Date | undefined;
    protected backgroundImage: string;

    public constructor (winnerPendingPresenterConfig: IWinnerPendingPresenterConfig) {
        this.projectedWinnerAnnounceDate = winnerPendingPresenterConfig.projectedWinnerAnnounceDate;
        this.confirmedWinnerAnnounceDate = winnerPendingPresenterConfig.confirmedWinnerAnnounceDate;
        this.backgroundImage = winnerPendingPresenterConfig.backgroundImage;
    }

    public getAllClassNames (): IWinnerPendingPresenterClassNames {
        return {
            header: styles.header,
            pendingDate: styles.pendingDate,
            winnerPendingContainer: styles.winnerPendingContainer,
            winnerPendingContent: styles.winnerPendingContent,
        };
    }

    public getWinnerPendingContainerStyles (): CSSProperties {
        return {
            background: `url('${this.backgroundImage}'), linear-gradient(269.88deg, #FFF3F2 0.1%, #FFFCF8 99.9%)`,
        };
    }

    public getAnnouncedText (): string {
        if (this.confirmedWinnerAnnounceDate !== undefined) {
            return `Winner will be announced ${OzDate.formatTimestamp(this.confirmedWinnerAnnounceDate)}`;
        }

        if (OzDate.isDateValid(this.projectedWinnerAnnounceDate)) {
            return `Winner will be announced on or around ${OzDate.formatTimestamp(this.projectedWinnerAnnounceDate)}`;
        }

        return '';
    }
}
