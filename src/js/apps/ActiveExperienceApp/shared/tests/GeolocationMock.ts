import { IGeolocationRaw, ITransformedGeolocation } from '../../ActiveExperienceModule/sagas/FetchGeolocation/GeolocationTransformer/GeolocationTransformer';

export function createRawGeolocationMock (): IGeolocationRaw {
    return {
        CONTINENT_CODE: 'NA',
        COUNTRY_CODE: 'US',
        REGION_CODE: 'CA',
        IP: '1.1.1.1',
    };
}

export function createTransformedGeolocationMock (): ITransformedGeolocation {
    return {
        continentCode: 'NA',
        countryCode: 'US',
        regionCode: 'CA',
        ip: '1.1.1.1',
    };
}
