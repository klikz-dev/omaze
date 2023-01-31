import { BUTTON_SIZE, BUTTON_STYLE } from '@omaze/omaze-ui';
import classNames from 'classnames';

import styles from '../FameLink.styles.css';

export interface IFameLinkPresenterClassNames {
    host: string;
}

export interface IFameLinkType {
    size: BUTTON_SIZE;
    style: BUTTON_STYLE;
}

export interface IFameLinkPresenterConfig {
    className?: string;
    hostName: string;
    productId: number;
    productTitle: string;
    productHandle: string;
    upsellVariantId?: number;
    upsellVariantPrice?: number;
    prominent?: boolean;
}

export class FameLinkPresenter {
    protected className: string | undefined;
    protected hostName: string;
    protected productId: number;
    protected productTitle: string;
    protected productHandle: string;
    protected upsellVariantId: number | undefined;
    protected upsellVariantPrice: number | undefined;
    protected prominent: boolean;

    public constructor (config: IFameLinkPresenterConfig) {
        this.className = config.className;
        this.hostName = config.hostName;
        this.productId = config.productId;
        this.productTitle = config.productTitle;
        this.productHandle = config.productHandle;
        this.upsellVariantId = config.upsellVariantId;
        this.upsellVariantPrice = config.upsellVariantPrice;
        this.prominent = !!config.prominent;
    }

    public getFameHref (): string {
        const root: string = `${this.hostName}/${this.productId}`;

        const queryParams: string[] = [
            `title=${encodeURIComponent(this.productTitle)}`,
            `handle=${encodeURIComponent(this.productHandle)}`,
        ];

        if (this.upsellVariantId && this.upsellVariantPrice) {
            queryParams.push(`variant_id=${encodeURIComponent(this.upsellVariantId)}`);
            queryParams.push(`variant_price=$${encodeURIComponent(this.upsellVariantPrice / 100)}`);
        }

        return `//${root}?${queryParams.join('&')}`;
    }

    public getFameLinkType (): IFameLinkType {
        if (this.prominent) {
            return {
                size: BUTTON_SIZE.SMALL,
                style: BUTTON_STYLE.SECONDARY,
            };
        }

        return {
            size: BUTTON_SIZE.DEFAULT,
            style: BUTTON_STYLE.LINK,
        };
    }

    public getAllClassNames (): IFameLinkPresenterClassNames {
        return {
            host: classNames({
                [styles.host]: true,
                [styles.caHost]: !!this.prominent,
                [this.className + '']: !!this.className,
            }),
        };
    }
}
