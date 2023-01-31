import styles from '../NonProfit.styles.css';

export interface INonProfitPresenterClassNames {
    container: string;
}

export class NonProfitPresenter {
    public static getAllClassNames (): INonProfitPresenterClassNames {
        return {
            container: styles.container,
        };
    }
}
