declare module '*.module.css' {
    const classes: { [key: string]: string };
    // eslint-disable-next-line import/no-default-export
    export default classes;
}

declare module '*.styles.css' {
    const classes: { [key: string]: string };
    // eslint-disable-next-line import/no-default-export
    export default classes;
}

interface IShopifyCuratedCollection {
    id: string;
    url: string;
    displayTitle?: string;
}

interface IShopifyDefaultCollection {
    url: string;
    displayTitle: string;
    products: any[];
    id: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
interface Window {
    SDG: any;
    ozEligibilitySettings: {
        restrictedCountries: string[];
        eligibilityDate: Date;
    };
    __OzShopifyCuratedCollectionsData: {
        curated: IShopifyCuratedCollection[];
        default: IShopifyDefaultCollection;
    };
    ozShopifyStorefrontClientToken: string;
    ozSanityConfig: {
        dataset: string;
        projectId: string;
        apiVersion: string;
        tag: string;
        useCDN: string;
        token: string;
        pages: {
            'home_page': string;
        }
    }
}
