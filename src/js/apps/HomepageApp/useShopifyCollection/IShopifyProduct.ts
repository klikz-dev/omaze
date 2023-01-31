import { IShopifyConnection } from './IShopifyConnection';

export interface IShopifyProduct {
    id: string;
    handle: string;
    title: string;
    tags: string[];
    vendor: string;
    onlineStoreUrl: string | null;
    images: IShopifyConnection<IShopifyImage>;
    metafield: IShopifyMetafield | null;
}

export interface IShopifyMetafield {
    value: string;
}

export interface IShopifyImage {
    originalSrc: string;
}
