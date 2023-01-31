import { DocumentNode, gql, useQuery } from '@apollo/client';
import { QueryResult } from '@apollo/client/react/types/types';

import { IShopifyCollection } from './IShopifyCollection';
import { IShopifyGetCollectionResponse } from './IShopifyGetCollectionResponse';

export interface IUseShopifyCollection {
    collection?: IShopifyCollection;
    loading: boolean;
    error: any;
}

export const GET_COLLECTION_QUERY: DocumentNode = gql`
    query Collection ($handle: String!) {
        collectionByHandle(handle: $handle) {
            id
            handle
            title
            products(first: 20) {
                edges {
                    node {
                        handle
                        id
                        title
                        tags
                        vendor
                        onlineStoreUrl
                        images(first: 1) {
                            edges {
                                node {
                                    originalSrc
                                }
                            }
                        }
                        metafield(namespace: "experience", key: "has_winner") {
                            value
                        }
                    }
                }
            }
        }
    }
`;

export function useShopifyCollection (handle: string): IUseShopifyCollection {
    const { data, loading, error }: QueryResult<IShopifyGetCollectionResponse> = useQuery(GET_COLLECTION_QUERY, {
        variables: {
            handle: handle,
        },
    });

    return {
        collection: data?.collectionByHandle,
        loading: loading,
        error: error,
    };
}
