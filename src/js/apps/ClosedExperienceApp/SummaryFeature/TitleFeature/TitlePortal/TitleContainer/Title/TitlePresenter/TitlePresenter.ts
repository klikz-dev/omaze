import styles from '../Title.styles.css';

export interface ITitlePresenterClassNames {
    container: string;
    thankYouTitle: string;
    caption: string;
    experienceTitle: string;
}

export class TitlePresenter {
    protected experienceName: string;
    protected nonProfitShopifyName: string;

    public constructor (experienceName: string, nonProfitShopifyName: string) {
        this.experienceName = experienceName;
        this.nonProfitShopifyName = nonProfitShopifyName;
    }

    public getThankYouTitle (): string {
        return `Thanks to everyone who supported ${this.nonProfitShopifyName}`;
    }

    public getCaption (): string {
        return 'for a chance to';
    }

    public getExperienceTitle (): string {
        return this.experienceName;
    }

    public getAllClassNames (): ITitlePresenterClassNames {
        return {
            container: styles.container,
            thankYouTitle: styles.thankYouTitle,
            caption: styles.caption,
            experienceTitle: styles.experienceTitle,
        };
    }
}
