import classNames from 'classnames';

import styles from '../LayoutDonationCards.styles.css';

export interface ILayoutDonationCardsPresenterClassNames {
    host: string;
}

export interface ILayoutDonationCardsPresenterConfig {
    className?: string;
    childrenCount?: number;
}

export class LayoutDonationCardsPresenter {
    protected className: string | undefined;
    protected childrenCount: number | undefined;

    public constructor (config: ILayoutDonationCardsPresenterConfig) {
        this.className = config.className;
        this.childrenCount = config.childrenCount;
    }

    public static cardsPerRowDesktop (totalItems: number | undefined): number {
        totalItems = totalItems || 0;

        const THREE_PER_ROW: number[] = [5, 6];
        const FOUR_PER_ROW: number[] = [7, 8];

        if (THREE_PER_ROW.includes(totalItems)) {
            return 3;
        }

        if (FOUR_PER_ROW.includes(totalItems)) {
            return 4;
        }

        return 0;
    }

    public static cardsPerRowTablet (totalItems: number | undefined): number {
        totalItems = totalItems || 0;

        const THREE_PER_ROW: number[] = [5, 6, 9];

        if (THREE_PER_ROW.includes(totalItems)) {
            return 3;
        }

        return 0;
    }

    public getAllClassNames (): ILayoutDonationCardsPresenterClassNames {
        const cardsPerRowTablet: number = LayoutDonationCardsPresenter.cardsPerRowTablet(this.childrenCount);
        const cardsPerRowDesktop: number = LayoutDonationCardsPresenter.cardsPerRowDesktop(this.childrenCount);

        return {
            host: classNames({
                [styles.host]: true,
                [this.className + '']: !!this.className,
                [styles[`cardsPerRow-${cardsPerRowTablet}--tablet`]]: !!cardsPerRowTablet,
                [styles[`cardsPerRow-${cardsPerRowDesktop}--desktop`]]: !!cardsPerRowDesktop,
            }),
        };
    }
}
