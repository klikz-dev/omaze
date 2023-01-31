export interface IShopifyVariant {
    id: number;
    sku: string;
    title: string;
    name: string;
    price: number;
}

export interface IShopifyVariantMetafields {
    calloutText?: string;
}

export interface IShopifyExperience {
    experience: {
        id: string;
        handle: string;
        name: string;
    };
    nonProfit: {
        name: string;
    };
    variants: IShopifyVariant[];
    variantMetafieldSets: {
        [key: number]: IShopifyVariantMetafields;
    };
    config: {
        env: string;
        fameHostname: string;
        fameUpsellVariantSku: string;
        donorCounterBlackList: string;
        donorCounterMinDonors: number;
        donorCounterAPIHost: string;
    };
}

export interface IShopifyDonorCounterConfig {
    donorCounterBlackList: string;
    donorCounterMinDonors: number;
}
