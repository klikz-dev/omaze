import {
    dedupeObjectList,
    getEntriesFromSKU,
    getPrimaryCartItem,
    getVariantByEntries,
} from './utils';

describe('cross-sell/utils', () => {
    describe('dedupeObjectList', () => {
        const testCases = [
            {
                name: 'should dedupe by ID by default',
                inputs: {
                    list: [
                        { id: 1, },
                        { id: 2, },
                        { id: 1, },
                    ],
                },
                expected: [1, 2],
            },
            {
                name: 'should dedupe by key param',
                inputs: {
                    list: [
                        { id: 1, name: 'AA' },
                        { id: 2, name: 'AA' },
                        { id: 3, name: 'B' },
                    ],
                    dedupeBy: 'name',
                },
                expected: [1, 3],
            },
        ];

        testCases.forEach((testCase) => {
            let result;
            result = dedupeObjectList(testCase.inputs.list, testCase.inputs.dedupeBy);

            if (result) {
                result = result.map(product => product.id);
            }

            test(testCase.name, () =>
                expect(result).toEqual(testCase.expected)
            );
        });
    });

    describe('getPrimaryCartItem', () => {
        const testCases = [
            {
                name: 'should return first item with valid product_type',
                cartItems: [
                    { id: 1, product_type: 'invalid' },
                    { id: 2, product_type: 'experience' },
                    { id: 3, product_type: 'experience' },
                ],
                expected: 2,
            },
            {
                name: 'should be case insensitive when checking product_type',
                cartItems: [
                    { id: 1, product_type: 'invalid' },
                    { id: 2, product_type: 'EXPERIENCE' },
                ],
                expected: 2,
            },
            {
                name: 'should return undefined if no valid items',
                cartItems: [
                    { id: 1, product_type: 'invalid' },
                    { id: 2, product_type: 'invalid' },
                ],
                expected: undefined,
            },
            {
                name: 'should return false if no cartItems',
                cartItems: undefined,
                expected: false,
            },
            {
                name: 'should return undefined if empty cartItems',
                cartItems: [],
                expected: false,
            },
        ];

        testCases.forEach((testCase) => {
            let result = getPrimaryCartItem(testCase.cartItems);

            if (result) {
                result = result.id;
            }

            test(testCase.name, () =>
                expect(result).toEqual(testCase.expected)
            );
        });
    });

    describe('getEntriesFromSKU', () => {
        const testCases = [
            {
                input: 'hello_100',
                expected: 100,
            },
            {
                input: 'hello-there_200',
                expected: 200,
            },
            {
                input: 'not_last_100_digit',
                expected: false,
            },
            {
                input: 100,
                expected: false,
            },
            {
                input: false,
                expected: false,
            },
            {
                input: NaN,
                expected: false,
            },
            {
                input: 'no_digits',
                expected: false,
            },
        ];

        testCases.forEach((testCase) => {
            const result = getEntriesFromSKU(testCase.input);

            test(`${testCase.input} returns: ${result}`, () =>
                expect(result).toBe(testCase.expected)
            );
        });
    });

    describe('getVariantByEntries', () => {
        const testCases = [
            {
                name: 'should return first valid variant',
                inputs: {
                    product: {
                        variants: [
                            { id: 1, sku: 'invalid_100,' },
                            { id: 2, sku: 'standard_100,' },
                        ],
                    },
                    entries: 100,
                },
                expected: 2,
            },
            {
                name: 'should accept entries param as an integer',
                inputs: {
                    product: {
                        variants: [
                            { id: 1, sku: 'standard_100,' },
                            { id: 2, sku: 'standard_200,' },
                        ],
                    },
                    entries: 200,
                },
                expected: 2,
            },
            {
                name: 'should accept entries param as a string',
                inputs: {
                    product: {
                        variants: [
                            { id: 1, sku: 'standard_100,' },
                            { id: 2, sku: 'standard_200,' },
                        ],
                    },
                    entries: '200',
                },
                expected: 2,
            },
            {
                name: 'should return false if variants undefined',
                inputs: {
                    product: {
                        variants: undefined,
                    },
                    entries: 100,
                },
                expected: false,
            },
            {
                name: 'should return undefined if no valid variants',
                inputs: {
                    product: {
                        variants: [
                            { id: 1, sku: 'invalid_100,' },
                        ],
                    },
                    entries: 100,
                },
                expected: undefined,
            },
            {
                name: 'should return undefined if no matching entries',
                inputs: {
                    product: {
                        variants: [
                            { id: 1, sku: 'standard_100,' },
                            { id: 2, sku: 'standard_200,' },
                        ],
                    },
                    entries: 999,
                },
                expected: undefined,
            },
        ];

        testCases.forEach((testCase) => {
            let result = getVariantByEntries(testCase.inputs.product, testCase.inputs.entries);

            if (result) {
                result = result.id;
            }

            test(testCase.name, () =>
                expect(result).toEqual(testCase.expected)
            );
        });
    });
});
