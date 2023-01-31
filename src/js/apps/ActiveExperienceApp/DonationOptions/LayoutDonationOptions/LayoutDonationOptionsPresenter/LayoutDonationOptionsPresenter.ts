import classNames from 'classnames';

import styles from '../LayoutDonationOptions.styles.css';

export interface ILayoutDonationOptionsPresenterClassNames {
    host: string;
    innerWrapper: string;
}

export interface ILayoutDonationOptionsPresenterConfig {
    className?: string;
}

export class LayoutDonationOptionsPresenter {
    protected className: string | undefined;

    public constructor (config: ILayoutDonationOptionsPresenterConfig) {
        this.className = config.className;
    }

    public getAllClassNames (): ILayoutDonationOptionsPresenterClassNames {
        return {
            host: classNames({
                [styles.host]: true,
                [this.className + '']: !!this.className,
            }),
            innerWrapper: styles.innerWrapper,
        };
    }
}
