import { ITransformedShopify } from '../../ActiveExperienceModule/sagas/FetchActiveExperienceFromShopify/ShopifyActiveExperienceTransformer/ShopifyActiveExperienceTransformer';
import { IShopifyExperience } from '../Shopify/IShopifyExperience';

export function createRawShopifyMock (): IShopifyExperience {
    return {
        experience: {
            id: '111',
            handle: 'handle',
            name: 'experience name',
        },
        nonProfit: {
            name: 'charity name',
        },
        variants: [{
            id: 222,
            sku: '222-sku',
            title: '222-title',
            name: '222-title',
            price: 22200,
        }, {
            id: 333,
            sku: '333-sku',
            title: '333-title',
            name: '333-title',
            price: 33300,
        }],
        variantMetafieldSets: {
            222: {
                calloutText: 'callout222',
            },
        },
        config: {
            env: 'test',
            fameHostname: 'fame.com',
            fameUpsellVariantSku: 'fame_upsell_20',
            donorCounterBlackList: '["test-handle"]',
            donorCounterMinDonors: 10,
            donorCounterAPIHost: 'myapi.com',
        },
    };
}

export function createTransformedShopifyMock (): ITransformedShopify {
    return {
        experience: {
            id: 111,
            handle: 'handle',
            name: 'experience name',
        },
        nonProfit: {
            name: 'charity name',
        },
        variants: [{
            id: 222,
            sku: '222-sku',
            title: '222-title',
            name: '222-title',
            price: 22200,
            metafields: {
                calloutText: 'callout222',
            },
        }, {
            id: 333,
            sku: '333-sku',
            title: '333-title',
            name: '333-title',
            price: 33300,
            metafields: {},
        }],
        config: {
            env: 'test',
            fameHostname: 'fame.com',
            fameUpsellVariantSku: 'fame_upsell_20',
            donorCounterBlackList: ['test-handle'],
            donorCounterMinDonors: 10,
        },
    };
}
