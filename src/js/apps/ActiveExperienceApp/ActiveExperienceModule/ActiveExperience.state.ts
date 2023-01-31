export interface IExperience {
    id: number;
    handle: string;
    name: string;
}

export interface INonProfit {
    name: string;
}

export interface IVariantMetafields {
    calloutText?: string;
}

export interface IVariant {
    id: number;
    sku: string;
    title: string;
    name: string;
    price: number;
    metafields: IVariantMetafields;
}

export interface IActiveExperienceConfig {
    env: string;
    fameHostname: string;
    fameUpsellVariantSku: string;
    donorCounterBlackList: string[];
    donorCounterMinDonors: number;
}

export interface IGeolocation {
    continentCode: string;
    countryCode: string;
    regionCode: string;
    ip: string;
}

// State
export interface IActiveExperienceState {
    isFetchingGeolocation: boolean;
    fetchingGeolocationError: string;
    experience: IExperience;
    nonProfit: INonProfit;
    variants: IVariant[];
    config: IActiveExperienceConfig;
    geoLocation: IGeolocation;
}
