import classNames from 'classnames';

import styles from '../PrizeDetails.styles.css';

export interface IPrizeDetailsClassNames {
    title: string;
    titleContainer: string;
    prizeDetailsCollapse: string;
    prizeDetailsListContainer: string;
    icon: string;
    prizeDetailsContainer: string;
    prizeDetailsButton: string;
}

export interface IPrizeDetailsPresenterConfig {
    expanded: boolean;
}

export class PrizeDetailsPresenter {
    protected expanded: boolean;

    public constructor (config: IPrizeDetailsPresenterConfig) {
        this.expanded = config.expanded;
    }

    public getAllClassNames (): IPrizeDetailsClassNames {
        return {
            title: styles.title,
            titleContainer: styles.titleContainer,
            prizeDetailsCollapse: styles.prizeDetailsCollapse,
            prizeDetailsListContainer: styles.prizeDetailsListContainer,
            icon: this.getIconClassNames(),
            prizeDetailsContainer: styles.prizeDetailsContainer,
            prizeDetailsButton: styles.prizeDetailsButton,
        };
    }

    private getIconClassNames (): string {
        return classNames({
            [styles.icon]: true,
            [styles.expandIcon]: !this.expanded,
        });
    }

    public getIconAlt (): string {
        if (this.expanded) {
            return 'Collapse Icon';
        }

        return 'Expand Icon';
    }
}
