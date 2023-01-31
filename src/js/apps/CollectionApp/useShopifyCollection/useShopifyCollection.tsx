import { DocumentNode, gql, useQuery } from '@apollo/client';
import { QueryResult } from '@apollo/client/react/types/types';

import { IShopifyCollection } from '../types/IShopifyCollection';
import { IShopifyEdge } from '../types/IShopifyConnection';
import { IShopifyProduct } from '../types/IShopifyProduct';

import { IShopifyGetCollectionResponse } from './IShopifyGetCollectionResponse';

export interface IShopifyPagination {
    hasNextPage: boolean;
    lastCursor: string | undefined;
}

export interface IUseShopifyCollection {
    collection?: IShopifyCollection;
    loading: boolean;
    error: any;
    pagination?: IShopifyPagination;
    fetchMore: () => void;
}

export const GET_COLLECTION_QUERY: DocumentNode = gql`
    query Collection ($handle: String!, $cursor: String) {
        collectionByHandle(handle: $handle) {
            id
            handle
            title
            products(first: 20, after: $cursor) {
                pageInfo {
                    hasNextPage
                }
                edges {
                    cursor
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
    const { data, loading, error, fetchMore }: QueryResult<IShopifyGetCollectionResponse> = useQuery(GET_COLLECTION_QUERY, {
        notifyOnNetworkStatusChange: true,
        variables: {
            handle: handle,
        },
    });

    let pagination: IShopifyPagination | undefined;

    if (data) {
        const lastIndex: number = data.collectionByHandle.products.edges.length - 1;
        const lastEdge: IShopifyEdge<IShopifyProduct> = data.collectionByHandle.products.edges[lastIndex];

        pagination = {
            hasNextPage: data.collectionByHandle.products.pageInfo?.hasNextPage || false,
            lastCursor: lastEdge.cursor,
        };
    }

    return {
        collection: data?.collectionByHandle,
        loading: loading,
        error: error,
        pagination: pagination,
        fetchMore: (): void => {
            fetchMore({
                variables: {
                    handle: handle,
                    cursor: pagination?.lastCursor,
                },
            });
        },
    };
}
