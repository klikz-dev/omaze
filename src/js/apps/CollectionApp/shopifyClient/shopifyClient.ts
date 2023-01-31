import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import fetch from 'cross-fetch';

import { IShopifyConnection, IShopifyEdge } from '../types/IShopifyConnection';
import { IShopifyProduct } from '../types/IShopifyProduct';

const API_VERSION: string = '2021-07';
const STOREFRONT_URL: string = `/api/${API_VERSION}/graphql.json`;
const STOREFRONT_ACCESS_TOKEN: string = window.ozShopifyStorefrontClientToken;

function offsetFromCursor (items: IShopifyEdge<any>[], cursor: string): number {
    for (let i: number = items.length - 1; i >= 0; --i) {
        const item: IShopifyEdge<any> = items[i];

        if (item.cursor === cursor) {
            return i + 1;
        }
    }

    return -1;
}

export const cache: InMemoryCache = new InMemoryCache({
    typePolicies: {
        Collection: {
            fields: {
                products: {
                    keyArgs: false,
                    merge: (existing: IShopifyConnection<IShopifyProduct>, incoming: IShopifyConnection<IShopifyProduct>, options: any): IShopifyConnection<IShopifyProduct> => {
                        const { args }: any = options;
                        const { cursor }: any = args;
                        const merged: any = existing ? existing.edges.slice(0) : [];
                        let offset: number = offsetFromCursor(merged, cursor);

                        if (offset < 0) {
                            offset = merged.length;
                        }

                        for (let i: number = 0; i < incoming.edges.length; ++i) {
                            merged[offset + i] = incoming.edges[i];
                        }

                        return {
                            ...incoming,
                            edges: merged,
                        };
                    },
                },
            },
        },
    },
});

export const shopifyClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    link: new HttpLink({
        uri: STOREFRONT_URL,
        fetch: fetch,
        headers: {
            'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
        },
    }),
    cache: cache,
});
