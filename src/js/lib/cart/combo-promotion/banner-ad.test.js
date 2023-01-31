import {initAdBanner, getPrimaryComboItems} from './banner-ad';

import {default as FeatureValidation} from '../../features/feature-validation';

describe('Combo Promotion Cart Banner Ad', () => {
    beforeAll(() => {
        window._ = window._ || {};

        jest.spyOn(console, 'info').mockImplementation(jest.fn());
        jest.spyOn(console, 'warn').mockImplementation(jest.fn());
        jest.spyOn(console, 'error').mockImplementation(jest.fn());
    });

    describe('initAdBanner', () => {
        let featureFlagDisabledSpy;

        beforeEach(() => {
            featureFlagDisabledSpy = jest.spyOn(FeatureValidation, 'featureFlagDisabled');
            featureFlagDisabledSpy.mockImplementation(() => {
                return Promise.resolve(true);
            });
        });

        afterEach(() => {
            featureFlagDisabledSpy.mockRestore();
        });

        const testCases = [
            {
                name: 'with all inputs undefined',
                inputs: {},
                expectedCalls: 0,
            },
            {
                name: 'with empty cart',
                inputs: {
                    cartItems: [],
                    featureFlags: {},
                    env: 'development',
                },
                expectedCalls: 0,
            },
            {
                name: 'with invalid cart',
                inputs: {
                    cartItems: 'waat?',
                    featureFlags: {},
                    env: 'development',
                },
                expectedCalls: 0,
            },
            {
                name: 'with undefined featureFlags',
                inputs: {
                    cartItems: [{}],
                    env: 'development',
                },
                expectedCalls: 1,
            },
        ];

        testCases.forEach((testCase) => {
            test(`${testCase.name}`, () => {
                const inputs = testCase.inputs;

                initAdBanner(inputs.cartItems, inputs.featureFlags, inputs.env);

                expect(FeatureValidation.featureFlagDisabled.mock.calls.length).toBe(testCase.expectedCalls);
            });
        });
    });

    describe('getPrimaryComboItems', () => {
        test('primary with secondary in cart', () => {
            const cartItems = [{
                variant_id: 100,
                properties: {
                    combo_primary_variant_id: 100,
                    combo_secondary_variant_id: 300,
                },
            }, {
                variant_id: 300,
                properties: {
                    combo_primary_variant_id: 100,
                    combo_secondary_variant_id: 300,
                },
            }];

            expect(getPrimaryComboItems(cartItems)).toEqual([cartItems[0]]);
        });

        test('2 * primary with secondary in cart', () => {
            const cartItems = [{
                variant_id: 100,
                properties: {
                    combo_primary_variant_id: 100,
                    combo_secondary_variant_id: 300,
                },
            }, {
                variant_id: 300,
                properties: {
                    combo_primary_variant_id: 100,
                    combo_secondary_variant_id: 300,
                },
            }, {
                variant_id: 500,
                properties: {
                    combo_primary_variant_id: 500,
                    combo_secondary_variant_id: 600,
                },
            }, {
                variant_id: 600,
                properties: {
                    combo_primary_variant_id: 500,
                    combo_secondary_variant_id: 600,
                },
            }];

            expect(getPrimaryComboItems(cartItems)).toEqual([
                cartItems[0],
                cartItems[2],
            ]);
        });

        test('primary with no secondary in cart', () => {
            const cartItems = [{
                variant_id: 100,
                properties: {
                    combo_primary_variant_id: 100,
                    combo_secondary_variant_id: 300,
                },
            }];

            expect(getPrimaryComboItems(cartItems)).toEqual([]);
        });

        test('all unrelated', () => {
            const cartItems = [{
                variant_id: 100,
                properties: {
                    combo_primary_variant_id: 200,
                    combo_secondary_variant_id: 300,
                },
            }, {
                variant_id: 400,
                properties: {
                    combo_primary_variant_id: 500,
                    combo_secondary_variant_id: 600,
                },
            }];

            expect(getPrimaryComboItems(cartItems)).toEqual([]);
        });

        test('with no cart properties', () => {
            const cartItems = [{
                variant_id: 100,
            },{
                variant_id: 400,
            }];

            expect(getPrimaryComboItems(cartItems)).toEqual([]);
        });
    });
});
