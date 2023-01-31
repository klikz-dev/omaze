export interface IShopifyEdge<TType> {
    node: TType;
}

export interface IShopifyConnection<TType> {
    edges: IShopifyEdge<TType>[];
}
