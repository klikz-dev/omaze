import classNames from 'classnames';

import styles from '../Title.styles.css';

export interface ITitlePresenterClassNames {
    host: string;
}

export interface ITitlePresenterConfig {
    className?: string;
    dataTestId?: string;
    nonProfitName: string;
}

export class TitlePresenter {
    protected className: string | undefined;
    protected dataTestId: string | undefined;
    protected nonProfitName: string;

    public constructor (config: ITitlePresenterConfig) {
        this.className = config.className;
        this.dataTestId = config.dataTestId;
        this.nonProfitName = config.nonProfitName;
    }

    public getTestId (): string | undefined {
        return this.dataTestId;
    }

    public getTitleCopy (): string {
        return `Support ${this.nonProfitName} today and enter for your chance to win!`;
    }

    public getAllClassNames (): ITitlePresenterClassNames {
        return {
            host: classNames({
                [styles.host]: true,
                [this.className + '']: !!this.className,
            }),
        };
    }
}
