declare module '*.styles.css' {
    const classes: { [key: string]: string };
    // eslint-disable-next-line import/no-default-export
    export default classes;
}

interface IVariant {
    id: number;
    sku: string;
    title: string;
    name: string;
    price: number;
}

interface IVariantMetafields {
    calloutText?: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
interface Window {
    SDG: any;
    ozGeolocation: any;
    ozActiveExperienceApp: {
        experience: {
            id: string;
            handle: string;
            name: string;
        };
        nonProfit: {
            name: string;
        };
        variants: IVariant[];
        variantMetafieldSets: {
            [key: number]: IVariantMetafields;
        };
        config: {
            env: string;
            fameHostname: string;
            fameUpsellVariantSku: string;
            donorCounterBlackList: string;
            donorCounterMinDonors: number;
            donorCounterAPIHost: string;
        };
    };
}
