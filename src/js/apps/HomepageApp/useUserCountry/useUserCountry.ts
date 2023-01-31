import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IGeolocation {
    COUNTRY_CODE: string;
    REGION_CODE: string;
    CONTINENT_CODE: string;
}

export function useUserCountry (): string | null {
    const [country, setCountry]: [string | null, Dispatch<SetStateAction<string | null>>] = useState<string | null>(null);

    useEffect((): void => {
        window.ozGeolocation.getData().then((geoData: IGeolocation): void => {
            setCountry(geoData.COUNTRY_CODE);
        }).catch((): void => {
            setCountry(null);
        });
    }, []);

    return country;
}
