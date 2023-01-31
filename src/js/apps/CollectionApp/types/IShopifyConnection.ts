export interface IShopifyEdge<TType> {
    cursor?: string;
    node: TType;
    __typename?: string;
}

export interface IShopifyConnection<TType> {
    pageInfo?: {
        hasNextPage: boolean;
    }
    edges: IShopifyEdge<TType>[];
    __typename?: string;
}
