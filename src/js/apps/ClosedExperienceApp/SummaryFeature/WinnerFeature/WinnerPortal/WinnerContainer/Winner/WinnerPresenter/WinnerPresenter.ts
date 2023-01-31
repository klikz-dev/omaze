import { CSSProperties } from 'react';

import { OzDate } from '../../../../../../shared/OzDate/OzDate';
import styles from '../Winner.styles.css';

export interface IWinnerPresenterConfig {
    projectedWinnerAnnounceDate: Date;
    confirmedWinnerAnnounceDate: Date | undefined;
    backgroundImage: string;
    image: string;
}

export interface IWinnerPresenterClassNames {
    backgroundImage: string;
    winnerContent: string;
    header: string;
    winnerName: string;
    winnerLocation: string;
    winnerDate: string;
    winnerImageContainer: string;
    winnerImage: string;
}

export class WinnerPresenter {
    protected projectedWinnerAnnounceDate: Date;
    protected confirmedWinnerAnnounceDate: Date | undefined;
    protected backgroundImage: string;
    protected winnerImage: string;

    public constructor (winnerPresenterConfig: IWinnerPresenterConfig) {
        this.projectedWinnerAnnounceDate = winnerPresenterConfig.projectedWinnerAnnounceDate;
        this.confirmedWinnerAnnounceDate = winnerPresenterConfig.confirmedWinnerAnnounceDate;
        this.backgroundImage = winnerPresenterConfig.backgroundImage;
        this.winnerImage = winnerPresenterConfig.image;
    }

    public getAllClassNames (): IWinnerPresenterClassNames {
        return {
            backgroundImage: styles.backgroundImage,
            winnerContent: styles.winnerContent,
            header: styles.header,
            winnerName: styles.winnerName,
            winnerLocation: styles.winnerLocation,
            winnerDate: styles.winnerDate,
            winnerImageContainer: styles.winnerImageContainer,
            winnerImage: styles.winnerImage,
        };
    }

    public getAnnouncedText (): string {
        // TODO: Utilize strictly the confirmedWinnerAnnounceDate when all campaigns, that don't have this field, have
        //  expired or have been back-filled to have a confirmedWinnerAnnounceDate.
        if (this.confirmedWinnerAnnounceDate !== undefined) {
            return `Announced ${OzDate.formatTimestamp(this.confirmedWinnerAnnounceDate)}`;
        }

        if (OzDate.isDateValid(this.projectedWinnerAnnounceDate)) {
            return `Announced ${OzDate.formatTimestamp(this.projectedWinnerAnnounceDate)}`;
        }

        return '';
    }

    public getWinnerContainerStyles (): CSSProperties {
        return {
            background: 'linear-gradient(269.88deg, #FFF3F2 0.1%, #FFFCF8 99.9%)',
        };
    }

    public getBackgroundImageStyles (): CSSProperties {
        return {
            background: `url('${this.backgroundImage}')`,
        };
    }

    public getWinnerImageStyles (): CSSProperties {
        return {
            background: `url('${this.winnerImage}')`,
        };
    }
}
