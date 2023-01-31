import { ITransformedShopify } from '../../ClosedExperienceModule/sagas/FetchClosedExperienceFromShopify/ShopifyClosedExperienceTransformer/ShopifyClosedExperienceTransformer';
import { OzDate } from '../OzDate/OzDate';
import { IShopify } from '../Shopify/IShopify';

export const projectedWinnerAnnounceDateMock: Date = OzDate.getDateFromDateString('2019-11-06T08:00:00.000Z');
export const confirmedWinnerAnnounceDateMock: Date = OzDate.getDateFromDateString('2019-12-06T08:00:00.000Z');

export function createShopifyMock (): IShopify {
    return {
        experience: {
            name: 'Win A Pound Of Beats And Carrots',
            hasWinner: 'true',
            projectedWinnerAnnounceDate: '2019-11-06T08:00:00.000Z',
            confirmedWinnerAnnounceDate: '2019-12-06T08:00:00.000Z',
        },
        winner: {
            name: 'Dwight',
            location: 'Schrute',
            image: 'headshot.png',
        },
        nonProfit: {
            name: 'Schrute Farms',
        },
        assets: {
            winnerBackgroundImage: 'bubble.png',
            winnerPendingBackgroundImage: 'bubblePending.png',
            ovalBackgroundDesktop: 'ovalDesktop.png',
            ovalBackgroundMobile: 'ovalMobile.png',
        },
        config: {
            slug: 'slug',
            env: 'stg',
        },
    };
}

export function createTransformedShopifyMock (): ITransformedShopify {
    return {
        experience: {
            name: 'Win A Pound Of Beats And Carrots',
            hasWinner: true,
            projectedWinnerAnnounceDate: projectedWinnerAnnounceDateMock,
            confirmedWinnerAnnounceDate: confirmedWinnerAnnounceDateMock,
        },
        winner: {
            name: 'Dwight',
            location: 'Schrute',
            image: 'headshot.png',
        },
        nonProfit: {
            thankYouName: 'Schrute Farms',
        },
        assets: {
            winnerBackgroundImage: 'bubble.png',
            winnerPendingBackgroundImage: 'bubblePending.png',
            ovalBackgroundDesktop: 'ovalDesktop.png',
            ovalBackgroundMobile: 'ovalMobile.png',
        },
    };
}
