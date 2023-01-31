import {getComboVariantIdToDelete} from './combo-variant-to-delete';

describe('Cart combo promotion', () => {
    describe('getComboVariantIdToDelete', () => {
        beforeAll(() => {
            window._ = window._ || {};

            jest.spyOn(console, 'info').mockImplementation(jest.fn());
            jest.spyOn(console, 'warn').mockImplementation(jest.fn());
            jest.spyOn(console, 'error').mockImplementation(jest.fn());
        });

        const testCases = [
            {
                name: 'with primary combo variant selected',
                expected: 222,
                inputs: {
                    selectedVariantId: 111,
                    cartItems: [{
                        variant_id: 111,
                        properties: {
                            combo_primary_variant_id: 111,
                            combo_secondary_variant_id: 222,
                        },
                    }, {
                        variant_id: 222,
                        properties: {
                            combo_primary_variant_id: 111,
                            combo_secondary_variant_id: 222,
                        },
                    }],
                },
            },
            {
                name: 'with primary combo variant id as string',
                expected: 222,
                inputs: {
                    selectedVariantId: '111',
                    cartItems: [{
                        variant_id: 111,
                        properties: {
                            combo_primary_variant_id: 111,
                            combo_secondary_variant_id: 222,
                        },
                    }, {
                        variant_id: 222,
                        properties: {
                            combo_primary_variant_id: 111,
                            combo_secondary_variant_id: 222,
                        },
                    }],
                },
            },
            {
                name: 'with secondary combo variant selected',
                expected: 111,
                inputs: {
                    selectedVariantId: 222,
                    cartItems: [{
                        variant_id: 111,
                        properties: {
                            combo_primary_variant_id: 111,
                            combo_secondary_variant_id: 222,
                        },
                    }, {
                        variant_id: 222,
                        properties: {
                            combo_primary_variant_id: 111,
                            combo_secondary_variant_id: 222,
                        },
                    }],
                },
            },
            {
                name: 'with selected variant not in cart',
                expected: false,
                inputs: {
                    selectedVariantId: 999,
                    cartItems: [{
                        variant_id: 111,
                        properties: {
                            combo_primary_variant_id: 111,
                            combo_secondary_variant_id: 222,
                        },
                    }],
                },
            },
            {
                name: 'with all inputs undefined',
                expected: false,
                inputs: {},
            },
            {
                name: 'with empty cart',
                expected: false,
                inputs: {
                    cartItems: {},
                    selectedVariantId: 111,
                },
            },
        ];

        testCases.forEach((testCase) => {
            test(`${testCase.name}`, () => {
                const idToDelete = getComboVariantIdToDelete(testCase.inputs.cartItems, testCase.inputs.selectedVariantId);

                expect(idToDelete).toBe(testCase.expected);
            });
        });
    });
});
