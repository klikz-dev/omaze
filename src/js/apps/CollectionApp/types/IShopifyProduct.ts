import { IShopifyConnection } from './IShopifyConnection';

interface IShopifyImage {
    originalSrc: string,
}

export interface IShopifyMetafield {
    value: string;
}

export interface IShopifyProduct {
    id: string;
    handle: string;
    title: string;
    tags: string[];
    vendor: string;
    onlineStoreUrl: string | null;
    images: IShopifyConnection<IShopifyImage>
    metafield: IShopifyMetafield | null;
    __typename?: string;
}
