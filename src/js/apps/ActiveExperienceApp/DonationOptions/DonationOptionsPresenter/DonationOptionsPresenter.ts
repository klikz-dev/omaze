import classNames from 'classnames';

import styles from '../DonationOptions.styles.css';

export interface IDonationOptionsPresenterClassNames {
    host: string;
}

export interface IDonationOptionsPresenterConfig {
    className?: string;
    dataTestId?: string;
}

export class DonationOptionsPresenter {
    protected className: string | undefined;
    protected dataTestId: string | undefined;

    public constructor (config: IDonationOptionsPresenterConfig) {
        this.className = config.className;
        this.dataTestId = config.dataTestId;
    }

    public getTestId (): string | undefined {
        return this.dataTestId;
    }

    public getAllClassNames (): IDonationOptionsPresenterClassNames {
        return {
            host: classNames({
                [styles.host]: true,
                [this.className + '']: !!this.className,
            }),
        };
    }
}
