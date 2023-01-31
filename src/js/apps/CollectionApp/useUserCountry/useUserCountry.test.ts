import { renderHook } from '@testing-library/react-hooks';
import { RenderHookResult } from '@testing-library/react-hooks/src/types/index';

import { useUserCountry } from './useUserCountry';

describe('useUserCountry', (): void => {
    beforeEach((): void => {
        window.ozGeolocation = {
            getData: jest.fn(),
        };
    });

    it('should return null when the geolocation service is loading', async (): Promise<void> => {
        window.ozGeolocation.getData.mockReturnValue(Promise.resolve({
            COUNTRY_CODE: 'UK',
            REGION_CODE: '',
            CONTINENT_CODE: 'EU',
        }));

        const { result, waitForNextUpdate }: RenderHookResult<void, string | null> = renderHook((): string | null => {
            return useUserCountry();
        });

        expect(result.current).toBeNull();

        await waitForNextUpdate();
    });

    it('should return a country when a country is known', async (): Promise<void> => {
        window.ozGeolocation.getData.mockReturnValue(Promise.resolve({
            COUNTRY_CODE: 'US',
            REGION_CODE: 'CA',
            CONTINENT_CODE: 'NA',
        }));

        const { result, waitForNextUpdate }: RenderHookResult<void, string | null> = renderHook((): string | null => {
            return useUserCountry();
        });

        await waitForNextUpdate();

        expect(result.current).toBe('US');
    });

    it('should retrieve the country from the geolocation service', async (): Promise<void> => {
        window.ozGeolocation.getData.mockReturnValue(Promise.resolve({
            COUNTRY_CODE: 'UK',
            REGION_CODE: '',
            CONTINENT_CODE: 'EU',
        }));

        const { result, waitForNextUpdate }: RenderHookResult<void, string | null> = renderHook((): string | null => {
            return useUserCountry();
        });

        await waitForNextUpdate();

        expect(result.current).toBe('UK');
    });

    it('should return null when the country is not found from the geolocation service', async (): Promise<void> => {
        window.ozGeolocation.getData.mockReturnValue(Promise.reject());

        const { result }: RenderHookResult<void, string | null> = renderHook((): string | null => {
            return useUserCountry();
        });

        expect(result.current).toBeNull();
    });
});
