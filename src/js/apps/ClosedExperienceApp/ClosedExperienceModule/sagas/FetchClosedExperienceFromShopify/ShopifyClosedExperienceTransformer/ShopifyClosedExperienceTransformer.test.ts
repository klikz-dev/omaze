import { createShopifyMock, createTransformedShopifyMock } from '../../../../shared/tests/ShopifyMock';

import { ITransformedShopify, ShopifyClosedExperienceTransformer } from './ShopifyClosedExperienceTransformer';

const transformedShopifyMock: ITransformedShopify = createTransformedShopifyMock();

describe('ShopifyClosedExperienceTransformer', (): void => {
    describe('getShopify', (): void => {
        it('should transform the shopify data to be consumed', (): void => {
            const shopifyTransformer: ShopifyClosedExperienceTransformer = new ShopifyClosedExperienceTransformer(createShopifyMock());
            const transformedShopify: ITransformedShopify = shopifyTransformer.getShopify();

            expect(transformedShopify.experience.name).toBe(transformedShopifyMock.experience.name);
            expect(transformedShopify.experience.hasWinner).toBe(transformedShopifyMock.experience.hasWinner);
            expect(transformedShopify.experience.projectedWinnerAnnounceDate.getDate()).toBe(transformedShopifyMock.experience.projectedWinnerAnnounceDate.getDate());
            expect(transformedShopify.experience.confirmedWinnerAnnounceDate?.getDate()).toBe(transformedShopifyMock.experience.confirmedWinnerAnnounceDate?.getDate());
            expect(transformedShopify.winner).toEqual(transformedShopifyMock.winner);
            expect(transformedShopify.nonProfit).toEqual(transformedShopifyMock.nonProfit);
            expect(transformedShopify.assets).toEqual(transformedShopifyMock.assets);
        });
    });
});
