import classNames from 'classnames';

import { IExperience, IVariant, IVariantMetafields } from '../../../../ActiveExperienceModule/ActiveExperience.state';
import styles from '../DonationCard.styles.css';

export interface IDonationCardPresenterClassNames {
    host: string;
    entriesBlock: string;
    entriesAmount: string;
    entriesText: string;
    ctaButton: string;
    badge: string;
}

export interface IDonationCardPresenterConfig {
    className?: string;
    variant: IVariant;
    experience: IExperience;
}

export interface IDonationCardAnalytics {
    track: string;
    id: string;
    details: string;
}

export class DonationCardPresenter {
    protected className: string | undefined;
    protected variant: IVariant;
    protected experience: IExperience;

    public constructor (config: IDonationCardPresenterConfig) {
        this.className = config.className;
        this.variant = config.variant;
        this.experience = config.experience;
    }

    public getAnalytics (): IDonationCardAnalytics {
        return {
            id: 'addToCart',
            track: 'click',
            details: `product_id:${this.experience.id};variant_id:${this.variant.id}`,
        };
    }

    public getNumberEntries (): string  {
        const regexArr: any[] | null = this.variant.sku.match(/^standard_(.*)/);
        const totalEntries: number | null = regexArr && parseInt(regexArr[1]);

        if (!totalEntries) {
            return '';
        }

        return totalEntries.toLocaleString();
    }

    public getCardLink (): string {
        return `/cart/add?id=${this.variant.id}&quantity=1`;
    }

    public getPrice (): string {
        return (this.variant.price / 100).toLocaleString();
    }

    public getBadgeText (): string | undefined {
        const metafields: IVariantMetafields = this.variant.metafields;

        return metafields && metafields.calloutText;
    }

    public isEntryMultiplier (): boolean {
        const entryMultipliers: string[] = [
            '5x entries!',
            '6x entries!',
            '7x entries!',
        ];

        const badgeText: string | undefined = this.getBadgeText();

        if (badgeText) {
            return entryMultipliers.map((multiplier: string): string => {
                return multiplier.toLowerCase();
            }).includes(badgeText.toLowerCase());
        }

        return false;
    }

    public isEntryPopular (): boolean {
        const badgeText: string | undefined = this.getBadgeText();

        if (badgeText && badgeText === 'most popular!') {
            return true;
        }

        return false;
    }

    public getButtonText (): string {
        return `Donate $${this.getPrice()}`;
    }

    public getAllClassNames (): IDonationCardPresenterClassNames {
        return {
            host: classNames({
                [styles.host]: true,
                [this.className + '']: !!this.className,
                [styles.hostPopular]: this.isEntryPopular(),
            }),
            entriesBlock: styles.entriesBlock,
            entriesAmount: styles.entriesAmount,
            entriesText: styles.entriesText,
            ctaButton: styles.ctaButton,
            badge: classNames({
                [styles.badge]: true,
                [styles.badgeYellow]: this.isEntryMultiplier(),
            }),
        };
    }
}
