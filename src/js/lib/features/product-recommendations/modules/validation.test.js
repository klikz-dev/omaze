import { getFirstValidProductList, validateProductList } from './validation';
import { getEnvironment } from '../../../env/environment';

jest.mock('../../../env/environment');

describe('product-recommendations/validation', () => {
    const defaultEnv = {
        productRecMinProducts: 1,
    };

    const validOptions = {
        productList: [
            { id: 1, type: 'experience', tags: ['$experience-active'] },
            { id: 2, type: 'experience', tags: ['$experience-active'] },
        ],
        geoLocationData: {
            COUNTRY_CODE: 'US',
        },
        productId: undefined,
    };

    describe('validateProductList', () => {
        const testCases = [
            {
                name: 'should return False with undefined productList',
                options: {
                    productList: undefined,
                },
                expected: false,
            },
            {
                name: 'should return False with empty productList',
                options: {
                    productList: [],
                },
                expected: false,
            },
            {
                name: 'should return valid products',
                options: {
                    productList: [
                        { id: 1, type: 'experience', tags: ['$experience-active'] },
                        { id: 2, type: 'experience', tags: ['$experience-active'] },
                    ],
                },
                expected: [1, 2],
            },
            {
                name: 'should return valid products with undefined geolocation',
                options: {
                    productList: [
                        { id: 1, type: 'experience', tags: ['$experience-active'] },
                        { id: 2, type: 'experience', tags: ['$experience-active'] },
                    ],
                    geoLocationData: undefined,
                },
                expected: [1, 2],
            },
            {
                name: 'should exclude invalid product type',
                options: {
                    productList: [
                        { id: 1, type: 'hello', tags: ['$experience-active'] },
                        { id: 2, type: 'experience', tags: ['$experience-active'] },
                    ],
                },
                expected: [2],
            },
            {
                name: 'should exclude inactive product type',
                options: {
                    productList: [
                        { id: 1, type: 'experience', tags: ['not-active'] },
                        { id: 2, type: 'experience', tags: ['$experience-active'] },
                    ],
                },
                expected: [2],
            },
            {
                name: 'should exclude product matching productId param',
                options: {
                    productList: [
                        { id: 1, type: 'experience', tags: ['$experience-active'] },
                        { id: 2, type: 'experience', tags: ['$experience-active'] },
                    ],
                    productId: 2,
                },
                expected: [1],
            },
            {
                name: 'should return false if productRecMinProducts not met',
                options: {
                    productList: [
                        { id: 1, type: 'experience', tags: ['$experience-active'] },
                        { id: 2, type: 'experience', tags: ['$experience-active'] },
                    ],
                    env: {
                        productRecMinProducts: 3,
                    }
                },
                expected: false,
            },
            {
                name: 'should include products geoEligible by date',
                options: {
                    productList: [
                        { id: 1, type: 'experience', tags: ['$experience-active', '$oz_sweepstake_dates-start:2020-01-01'] },
                        { id: 2, type: 'experience', tags: ['$experience-active', '$oz_sweepstake_dates-start:2020-01-01'] },
                    ],
                    geoLocationData: {
                        COUNTRY_CODE: 'AB',
                    },
                    env: {
                        restrictedCountries: ['AB'],
                        eligibilityDate: new Date('2099-01-01'),
                    }
                },
                expected: [1, 2],
            },
            {
                name: 'should exclude product that is not geoEligible by date',
                options: {
                    productList: [
                        { id: 1, type: 'experience', tags: ['$experience-active'] },
                        { id: 2, type: 'experience', tags: ['$experience-active', '$oz_sweepstake_dates-start:2020-01-01'] },
                    ],
                    geoLocationData: {
                        COUNTRY_CODE: 'AB',
                    },
                    env: {
                        restrictedCountries: ['AB'],
                        eligibilityDate: new Date('1999-01-01'),
                    }
                },
                expected: [1],
            },
        ];

        testCases.forEach((testCase) => {
            const options = Object.assign({}, validOptions, testCase.options);
            const env = Object.assign({}, defaultEnv, testCase.options.env);

            getEnvironment.mockReturnValue(env);

            let result = validateProductList(options.productList, options.geoLocationData, options.productId);

            if (result) {
                result = result.map(product => product.id);
            }

            test(testCase.name, () =>
                expect(result).toEqual(testCase.expected)
            );
        });
    });

    describe('getFirstValidProductList', () => {
        const testCases = [
            {
                name: 'should return the first valid, filtered list',
                options: {
                    productList: [
                        [
                            { id: 1, type: 'invalid', tags: ['$experience-active'] },
                        ],
                        [
                            { id: 2, type: 'invalid', tags: ['$experience-active'] },
                            { id: 3, type: 'experience', tags: ['$experience-active'] },
                        ],
                        [
                            { id: 5, type: 'experience', tags: ['$experience-active'] },
                        ],
                    ],
                    env: {
                        productRecMinProducts: 1,
                    }
                },
                expected: [3],
            },
            {
                name: 'should filter out by product ID',
                options: {
                    productList: [
                        [
                            { id: 1, type: 'invalid', tags: ['$experience-active'] },
                            { id: 2, type: 'experience', tags: ['$experience-active'] },
                            { id: 3, type: 'experience', tags: ['$experience-active'] },
                        ],
                    ],
                    productId: 2,
                    env: {
                        productRecMinProducts: 1,
                    }
                },
                expected: [3],
            },
            {
                name: 'should return False if no valid list',
                options: {
                    productList: [
                        [
                            { id: 1, type: 'invalid', tags: ['$experience-active'] },
                        ],
                    ],
                    env: {
                        productRecMinProducts: 1,
                    }
                },
                expected: false,
            },
        ];

        testCases.forEach((testCase) => {
            const options = Object.assign({}, validOptions, testCase.options);
            const env = Object.assign({}, defaultEnv, testCase.options.env);

            getEnvironment.mockReturnValue(env);

            let result = getFirstValidProductList(options.productList, options.geoLocationData, options.productId);

            if (result) {
                result = result.map(product => product.id);
            }

            test(testCase.name, () =>
                expect(result).toEqual(testCase.expected)
            );
        });
    });
});
