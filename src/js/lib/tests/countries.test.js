import loadCountries from '../countries.js';

describe('Countries List', () => {
    const countryList = loadCountries();

    it('countryList should be an array', () => {
        expect(Array.isArray(countryList)).toBe(true);
    });

    it('countryList should contain the US', () => {
        const US = countryList.find(
            country => country.code === 'US'
        );

        expect(US).toEqual({
            code: 'US',
            name: 'United States',
            value: 'United States',
        });
    });
});
