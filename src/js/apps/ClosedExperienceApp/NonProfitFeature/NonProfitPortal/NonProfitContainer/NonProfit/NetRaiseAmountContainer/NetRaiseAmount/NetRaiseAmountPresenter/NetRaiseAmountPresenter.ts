import classNames from 'classnames';

import styles from '../NetRaiseAmount.styles.css';

export interface INetRaiseAmountClassNames {
    container: string;
    textContainer: string;
    amount: string;
    caption: string;
}

export class NetRaiseAmountPresenter {
    protected messageName: string;

    public constructor (messageName: string) {
        this.messageName = messageName;
    }

    public getImageDesktopClassNames (): string {
        return classNames({
            [styles.imageDesktop]: true,
            [styles.image]: true,
        });
    }

    public getImageMobileClassNames (): string {
        return classNames({
            [styles.imageMobile]: true,
            [styles.image]: true,
        });
    }

    public getCaption (): string {
        if (this.messageName) {
            return `was granted by CAF America to ${this.messageName} thanks to the generosity of the Omaze donor community`;
        }

        return 'was granted by CAF America thanks to the generosity of the Omaze donor community';
    }

    public getAllClassNames (): INetRaiseAmountClassNames {
        return {
            container: styles.container,
            textContainer: styles.textContainer,
            amount: styles.amount,
            caption: styles.caption,
        };
    }
}
