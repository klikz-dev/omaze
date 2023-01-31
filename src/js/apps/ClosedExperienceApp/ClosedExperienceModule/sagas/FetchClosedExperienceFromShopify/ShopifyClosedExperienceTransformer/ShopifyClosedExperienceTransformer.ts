import { OzDate } from '../../../../shared/OzDate/OzDate';
import { IShopify } from '../../../../shared/Shopify/IShopify';

export interface ITransformedShopify {
    experience: {
        name: string;
        hasWinner: boolean;
        projectedWinnerAnnounceDate: Date;
        confirmedWinnerAnnounceDate: Date | undefined;
    };
    winner: {
        name: string;
        location: string;
        image: string;
    };
    nonProfit: {
        thankYouName: string;
    };
    assets: {
        winnerBackgroundImage: string;
        winnerPendingBackgroundImage: string;
        ovalBackgroundDesktop: string;
        ovalBackgroundMobile: string;
    };
}

export class ShopifyClosedExperienceTransformer {
    protected shopify: IShopify;

    public constructor (shopify: IShopify) {
        this.shopify = shopify;
    }

    public getShopify (): ITransformedShopify {
        return {
            experience: {
                name: this.shopify.experience.name,
                hasWinner: this.transformedHasWinner(),
                projectedWinnerAnnounceDate: this.transformedProjectedWinnerAnnounceDate(),
                confirmedWinnerAnnounceDate: this.transformedConfirmedWinnerAnnounceDate(),
            },
            winner: {
                name: this.shopify.winner.name,
                location: this.shopify.winner.location,
                image: this.shopify.winner.image,
            },
            nonProfit: {
                thankYouName: this.shopify.nonProfit.name,
            },
            assets: {
                winnerBackgroundImage: this.shopify.assets.winnerBackgroundImage,
                winnerPendingBackgroundImage: this.shopify.assets.winnerPendingBackgroundImage,
                ovalBackgroundDesktop: this.shopify.assets.ovalBackgroundDesktop,
                ovalBackgroundMobile: this.shopify.assets.ovalBackgroundMobile,
            },
        };
    }

    protected transformedHasWinner (): boolean {
        return this.shopify.experience.hasWinner === 'true';
    }

    protected transformedProjectedWinnerAnnounceDate (): Date {
        return OzDate.getDateFromDateString(this.shopify.experience.projectedWinnerAnnounceDate);
    }

    protected transformedConfirmedWinnerAnnounceDate (): Date | undefined {
        const confirmedWinnerAnnounceDate: string = this.shopify.experience.confirmedWinnerAnnounceDate;

        if (OzDate.isTimestampValid(confirmedWinnerAnnounceDate)) {
            return OzDate.getDateFromDateString(confirmedWinnerAnnounceDate);
        }

        return undefined;
    }
}
