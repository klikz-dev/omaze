import { isCrossSellableVariant, validateProductList } from './validation';
import { getEnvironment } from '../../../env/environment';

jest.mock('../../../env/environment');

describe('cross-sell/validation', () => {
    const validOptions = {
        productList: [
            { id: 1, type: 'experience', tags: ['$experience-active'] },
            { id: 2, type: 'experience', tags: ['$experience-active'] },
        ],
        cartItems: [
            {
                product_id: 12345,
            }
        ],
        geoLocationData: {
            COUNTRY_CODE: 'US',
        },
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
                name: 'should return empty array with empty productList',
                options: {
                    productList: [],
                },
                expected: [],
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
                name: 'should exclude items in cart',
                options: {
                    productList: [
                        { id: 1, type: 'experience', tags: ['$experience-active'] },
                        { id: 2, type: 'experience', tags: ['$experience-active'] },
                    ],
                    cartItems: [
                        {
                            product_id: 1,
                        }
                    ],
                },
                expected: [2],
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
                name: 'should exclude inactive product',
                options: {
                    productList: [
                        { id: 1, type: 'experience', tags: ['not-active'] },
                        { id: 2, type: 'experience', tags: ['$experience-active'] },
                    ],
                },
                expected: [2],
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

            const env = Object.assign({}, testCase.options.env);
            getEnvironment.mockReturnValue(env);

            let result = validateProductList(options.productList, options.cartItems, options.geoLocationData);

            if (result) {
                result = result.map(product => product.id);
            }

            test(testCase.name, () =>
                expect(result).toEqual(testCase.expected)
            );
        });
    });

    describe('isCrossSellableVariant', () => {
        const testCases = [
            {
                name: 'should return false no variant',
                input: undefined,
                expected: false,
            },
            {
                name: 'should return false no sku',
                input: { id: 1 },
                expected: false,
            },
            {
                name: 'should return false sku is an integer',
                input: { sku: 100 },
                expected: false,
            },
            {
                name: 'should return false sku not allowed',
                input: { sku: 'invalid' },
                expected: false,
            },
            {
                name: 'should return true standard sku',
                input: { sku: 'standard_123' },
                expected: true,
            },
            {
                name: 'should return true cross-sell sku',
                input: { sku: 'cross-sell_123' },
                expected: true,
            },
        ];

        testCases.forEach((testCase) => {
            const result = isCrossSellableVariant(testCase.input);

            test(testCase.name, () =>
                expect(result).toBe(testCase.expected)
            );
        });
    });
});
