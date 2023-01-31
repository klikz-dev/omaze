import { IShopifyConnection } from './IShopifyConnection';
import { IShopifyProduct } from './IShopifyProduct';

export interface IShopifyCollection {
    id: string;
    handle: string;
    title: string;
    products: IShopifyConnection<IShopifyProduct>;
}
