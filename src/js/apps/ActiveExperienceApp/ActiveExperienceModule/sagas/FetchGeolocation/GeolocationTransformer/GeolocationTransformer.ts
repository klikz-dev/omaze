export interface IGeolocationRaw {
    CONTINENT_CODE: string;
    COUNTRY_CODE: string;
    REGION_CODE: string;
    IP: string;
}

export interface ITransformedGeolocation {
    continentCode: string;
    countryCode: string;
    regionCode: string;
    ip: string;
}

export class GeolocationTransformer {
    protected rawData: IGeolocationRaw;

    public constructor (rawData: IGeolocationRaw) {
        this.rawData = rawData;
    }

    public transform (): ITransformedGeolocation {
        return {
            continentCode: this.rawData.CONTINENT_CODE,
            countryCode: this.rawData.COUNTRY_CODE,
            regionCode: this.rawData.REGION_CODE,
            ip: this.rawData.IP,
        };
    }
}
