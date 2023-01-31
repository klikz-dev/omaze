import  {default as Validation}  from './feature-validation.js';

describe('Feature Validation', () => {
    beforeAll(() => {
        window._ = window._ || {};

        jest.spyOn(console, 'error').mockImplementation(jest.fn());
        jest.spyOn(console, 'warn').mockImplementation(jest.fn());
    });

    describe('parseBlockedCountries JSON', () => {
        const testCases = [
            {
                input: '["US"]',
                expected: ['US'],
            },
            {
                input: '["US", "GB"]',
                expected: ['US', 'GB'],
            },
            {
                input: '[US]',
                expected: false,
            },
            {
                input: '[]',
                expected: false,
            },
            {
                input: 'invalid',
                expected: false,
            },
            {
                input: undefined,
                expected: false,
            },
        ];

        testCases.forEach((testCase) => {
            test(`${testCase.input}`, () =>
                expect(Validation.parseBlockedCountries(testCase.input)).toEqual(testCase.expected)
            );
        });
    });

    describe('parseBlockedRegions JSON', () => {
        const testCases = [
            {
                input: '{"US": ["CA"]}',
                expected: {
                    'US': ['CA'],
                },
            },
            {
                input: '{"US": ["CA", "NY"], "GB": ["XY", "ZZ"]}',
                expected: {
                    'US': ['CA', 'NY'],
                    'GB': ['XY', 'ZZ'],
                },
            },
            {
                input: '{}',
                expected: false,
            },
            {
                input: '["US": "CA"]',
                expected: false,
            },
            {
                input: 'hello',
                expected: false,
            },
            {
                input: '',
                expected: false,
            },
            {
                input: undefined,
                expected: false,
            },
        ];

        testCases.forEach((testCase) => {
            test(`${testCase.input}`, () =>
                expect(Validation.parseBlockedRegions(testCase.input)).toEqual(testCase.expected)
            );
        });
    });

    describe('isGeoBlockedRegion', () => {
        describe('geolocation match cases', () => {
            const testCases = [
                {
                    name: 'with single state',
                    geoData: { COUNTRY_CODE: 'US',
REGION_CODE: 'CA' },
                    blockedRegions: {
                        'US': ['CA'],
                    },
                    expected: true,
                },
                {
                    name: 'with multiple state',
                    geoData: { COUNTRY_CODE: 'US',
REGION_CODE: 'CA' },
                    blockedRegions: {
                        'US': ['CA', 'NY'],
                    },
                    expected: true,
                },
                {
                    name: 'with multipole country/regions on list',
                    geoData: { COUNTRY_CODE: 'IT',
REGION_CODE: 'LA' },
                    blockedRegions: {
                        'IE': ['HEL', 'LO'],
                        'IT': ['LA', 'AI'],
                        'IX': ['XY', 'OP'],
                    },
                    expected: true,
                },
            ];

            testCases.forEach((testCase) => {
                test(`${testCase.expected}: ${testCase.name}`, () =>
                    expect(Validation.isGeoBlockedRegion(testCase.geoData, testCase.blockedRegions)).toBe(testCase.expected)
                );
            });
        });

        describe('geolocation miss cases', () => {
            const testCases = [
                {
                    name: 'with single state',
                    geoData: { COUNTRY_CODE: 'US',
REGION_CODE: 'CA' },
                    blockedRegions: {
                        'US': ['NY'],
                    },
                    expected: false,
                },
                {
                    name: 'with multiple state',
                    geoData: { COUNTRY_CODE: 'US',
REGION_CODE: 'FL' },
                    blockedRegions: {
                        'US': ['CA', 'NY'],
                    },
                    expected: false,
                },
                {
                    name: 'with multipole country/regions on list',
                    geoData: { COUNTRY_CODE: 'MX',
REGION_CODE: 'CH' },
                    blockedRegions: {
                        'IE': ['HEL', 'LO'],
                        'IT': ['LA', 'AI'],
                        'IX': ['XY', 'OP'],
                    },
                    expected: false,
                },
            ];

            testCases.forEach((testCase) => {
                test(`${testCase.expected}: ${testCase.name}`, () =>
                    expect(Validation.isGeoBlockedRegion(testCase.geoData, testCase.blockedRegions)).toBe(testCase.expected)
                );
            });
        });

        describe('invalid data', () => {
            const testCases = [
                {
                    name: 'with undefined blockedRegions',
                    geoData: { COUNTRY_CODE: 'US',
REGION_CODE: 'CA' },
                    expected: false,
                },
                {
                    name: 'with malformed blockedRegions',
                    geoData: { COUNTRY_CODE: 'US',
REGION_CODE: 'CA' },
                    blockedRegions: ['US'],
                    expected: false,
                },
                {
                    name: 'with undefined geoData',
                    blockedRegions: {
                        'US': ['CA'],
                    },
                    expected: false,
                },
                {
                    name: 'with undefined COUNTRY_CODE',
                    geoData: { REGION_CODE: 'CA' },
                    blockedRegions: {
                        'US': ['CA'],
                    },
                    expected: false,
                },
                {
                    name: 'with undefined REGION_CODE',
                    geoData: { COUNTRY_CODE: 'US' },
                    blockedRegions: {
                        'US': ['CA'],
                    },
                    expected: false,
                },
            ];

            testCases.forEach((testCase) => {
                test(`${testCase.expected}: ${testCase.name}`, () =>
                    expect(Validation.isGeoBlockedRegion(testCase.geoData, testCase.blockedRegions)).toBe(testCase.expected)
                );
            });
        });
    });

    describe('isGeoBlockedCountry', () => {
        describe('geolocation match cases', () => {
            const testCases = [
                {
                    name: 'with single country',
                    geoData: { COUNTRY_CODE: 'US' },
                    blockedCountries: [ 'US' ],
                    expected: true,
                },
                {
                    name: 'with multiple countries',
                    geoData: { COUNTRY_CODE: 'US' },
                    blockedCountries: [ 'US', 'CA', 'GB' ],
                    expected: true,
                },
            ];

            testCases.forEach((testCase) => {
                test(`${testCase.expected}: ${testCase.name}`, () =>
                    expect(Validation.isGeoBlockedCountry(testCase.geoData, testCase.blockedCountries)).toBe(testCase.expected)
                );
            });
        });

        describe('geolocation miss cases', () => {
            const testCases = [
                {
                    name: 'with single country',
                    geoData: { COUNTRY_CODE: 'US' },
                    blockedCountries: [ 'IR' ],
                    expected: false,
                },
                {
                    name: 'with multiple countries',
                    geoData: { COUNTRY_CODE: 'US' },
                    blockedCountries: [ 'AC', 'GX', 'PP' ],
                    expected: false,
                },
            ];

            testCases.forEach((testCase) => {
                test(`${testCase.expected}: ${testCase.name}`, () =>
                    expect(Validation.isGeoBlockedCountry(testCase.geoData, testCase.blockedCountries)).toBe(testCase.expected)
                );
            });
        });

        describe('invalid data', () => {
            const testCases = [
                {
                    name: 'with undefined blockedCountries',
                    geoData: { COUNTRY_CODE: 'US' },
                    expected: false,
                },
                {
                    name: 'with malformed blockedCountries',
                    geoData: { COUNTRY_CODE: 'US' },
                    blockedCountries: 'US',
                    expected: false,
                },
                {
                    name: 'with undefined geoData',
                    blockedCountries: ['US'],
                    expected: false,
                },
                {
                    name: 'with no COUNTRY_CODE',
                    geoData: { HELLO: 'US' },
                    blockedCountries: ['US'],
                    expected: false,
                },
            ];

            testCases.forEach((testCase) => {
                test(`${testCase.expected}: ${testCase.name}`, () =>
                    expect(Validation.isGeoBlockedCountry(testCase.geoData, testCase.blockedCountries)).toBe(testCase.expected)
                );
            });
        });
    });

    describe('featureFlagDisabled', () => {
        const testCases = [
            {
                name: 'with featureFlags undefined',
                featureName: 'hello',
                expected: false,
            },
            {
                name: 'with feature flag value of FALSE',
                featureName: 'hello',
                featureFlags: {
                    hello: false,
                },
                expected: true,
            },
            {
                name: 'with feature flag undefined',
                featureName: 'hello',
                featureFlags: {},
                expected: false,
            },
            {
                name: 'with feature flag invalid format',
                featureName: 'hello',
                featureFlags: {
                    hello: 'im invalid',
                },
                expected: false,
            },
            {
                name: 'with feature flag ON and undefined geolocation flags',
                featureName: 'hello',
                featureFlags: {
                    hello: true,
                },
                expected: false,
            },
            {
                name: 'with feature flag ON and falsy geolocation flags',
                featureName: 'hello',
                featureFlags: {
                    hello: true,
                    'hello-blocked-countries': '',
                    'hello-blocked-regions': '',
                },
                expected: false,
            },
            {
                name: 'with feature flag ON and invalid blocked-countries JSON',
                featureName: 'hello',
                featureFlags: {
                    hello: true,
                    'hello-blocked-countries': 'invalid',
                    'hello-blocked-regions': '{}',
                },
                expected: false,
            },
            {
                name: 'with feature flag ON and invalid blocked-regions JSON',
                featureName: 'hello',
                featureFlags: {
                    hello: true,
                    'hello-blocked-countries': '[]',
                    'hello-blocked-regions': 'invalid',
                },
                expected: false,
            },
            {
                name: 'with feature flag ON and current country blocked',
                featureName: 'hello',
                featureFlags: {
                    hello: true,
                    'hello-blocked-countries': '["US"]',
                    'hello-blocked-regions': '{}',
                },
                expected: true,
            },
            {
                name: 'with feature flag ON and current country not blocked',
                featureName: 'hello',
                featureFlags: {
                    hello: true,
                    'hello-blocked-countries': '["xx"]',
                    'hello-blocked-regions': '{}',
                },
                expected: false,
            },
            {
                name: 'with feature flag ON and current region blocked',
                featureName: 'hello',
                featureFlags: {
                    hello: true,
                    'hello-blocked-countries': '[]',
                    'hello-blocked-regions': '{"US": ["CA"]}',
                },
                expected: true,
            },
            {
                name: 'with feature flag ON and current region not blocked',
                featureName: 'hello',
                featureFlags: {
                    hello: true,
                    'hello-blocked-countries': '[]',
                    'hello-blocked-regions': '{"US": ["xx"]}',
                },
                expected: false,
            },
        ];

        const mockGeoData = {
            COUNTRY_CODE: 'US',
            REGION_CODE: 'CA',
        };

        const ozGeolocationCopy = window.ozGeolocation;

        beforeEach(() => {
            window.ozGeolocation = {
                getData: () => {
                    return Promise.resolve(mockGeoData);
                },
            };
        });

        afterEach(() => {
            window.ozGeolocation = ozGeolocationCopy;
        });

        testCases.forEach((testCase) => {
            test(`${testCase.expected}: ${testCase.name}`, () => {
                return Validation.featureFlagDisabled(testCase.featureName, testCase.featureFlags).then(data => {
                    expect(data).toBe(testCase.expected);
                });
            });
        });

        describe('with ozGeolocation undefined', () => {
            const ozGeolocationCopy = window.ozGeolocation;

            beforeEach(() => {
                window.ozGeolocation = undefined;
            });

            afterEach(() => {
                window.ozGeolocation = ozGeolocationCopy;
            });

            const testCases = [
                {
                    name: 'feature flag ON and current country blocked',
                    featureName: 'hello',
                    featureFlags: {
                        hello: true,
                        'hello-blocked-countries': '["US"]',
                        'hello-blocked-regions': '{}',
                    },
                    expected: true,
                },
                {
                    name: 'feature flag ON and current country not blocked',
                    featureName: 'hello',
                    featureFlags: {
                        hello: true,
                        'hello-blocked-countries': '["GB"]',
                        'hello-blocked-regions': '{}',
                    },
                    expected: true,
                },
            ];

            testCases.forEach((testCase) => {
                test(`${testCase.expected}: ${testCase.name}`, () => {
                    return Validation.featureFlagDisabled(testCase.featureName, testCase.featureFlags).then(data => {
                        expect(data).toBe(testCase.expected);
                    });
                });
            });
        });

        describe('with ozGeolocation.getData() error', () => {
            const ozGeolocationCopy = window.ozGeolocation;

            beforeEach(() => {
                window.ozGeolocation = {
                    getData: () => {
                        return Promise.reject();
                    },
                };
            });

            afterEach(() => {
                window.ozGeolocation = ozGeolocationCopy;
            });

            const testCases = [
                {
                    name: 'feature flag ON and current country blocked',
                    featureName: 'hello',
                    featureFlags: {
                        hello: true,
                        'hello-blocked-countries': '["US"]',
                        'hello-blocked-regions': '{}',
                    },
                    expected: true,
                },
                {
                    name: 'feature flag ON and current country not blocked',
                    featureName: 'hello',
                    featureFlags: {
                        hello: true,
                        'hello-blocked-countries': '["GB"]',
                        'hello-blocked-regions': '{}',
                    },
                    expected: true,
                },
            ];

            testCases.forEach((testCase) => {
                test(`${testCase.expected}: ${testCase.name}`, () => {
                    return Validation.featureFlagDisabled(testCase.featureName, testCase.featureFlags).then(data => {
                        expect(data).toBe(testCase.expected);
                    });
                });
            });
        });
    });
});