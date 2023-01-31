import classNames from 'classnames';

import { IAdditionalWinner } from '../../../../../../../../ClosedExperienceModule/ClosedExperience.state';
import styles from '../AdditionalWinners.styles.css';

export interface IAdditionalWinnersClassNames {
    container: string;
    buttonContainer: string;
    title: string;
    icon: string;
    lineBreak: string;
}

export class AdditionalWinnersPresenter {
    protected expanded: boolean;
    protected additionalWinners: IAdditionalWinner[];

    public constructor (expanded: boolean, additionalWinners: IAdditionalWinner[]) {
        this.expanded = expanded;
        this.additionalWinners = additionalWinners;
    }

    public getAllClassNames (): IAdditionalWinnersClassNames {
        return {
            container: styles.container,
            title: styles.title,
            buttonContainer: styles.buttonContainer,
            icon: this.getIconClassNames(),
            lineBreak: styles.lineBreak,
        };
    }

    public getTitle (): string {
        return 'Additional Winners';
    }

    public getIconAlt (): string {
        if (this.expanded) {
            return 'Collapsed Icon';
        }

        return 'Expanded Icon';
    }

    public getAdditionalWinnerText (index: number): string {
        const {
            name,
            location,
            prize,
        }: IAdditionalWinner = this.additionalWinners[index];

        return `${name} from ${location} won ${prize}!`;
    }

    public getAdditionalWinnerClassNames (index: number): string {
        const additionalWinnersLength: number = this.additionalWinners.length;

        return classNames({
            [styles.additionalWinner]: true,
            [styles.lastAdditionalWinner]: index === additionalWinnersLength - 1,
        });
    }

    private getIconClassNames (): string {
        return classNames({
            [styles.icon]: true,
            [styles.expandIcon]: this.expanded,
        });
    }}
