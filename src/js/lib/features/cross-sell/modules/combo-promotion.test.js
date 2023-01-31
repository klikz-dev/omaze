import { default as CrossSellComboPromotion } from './combo-promotion';
import { default as ComboPromotionFeature } from '../../combo-promotion/index';

describe('cross-sell/combo-promotion', () => {
    let consoleInfoSpy, consoleWarnSpy, consoleErrorSpy;

    beforeAll(() => {
        consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation(jest.fn());
        consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(jest.fn());
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(jest.fn());
    });

    afterAll(() => {
        consoleInfoSpy.mockRestore();
        consoleWarnSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });

    describe('getProductComboPromotion', () => {
        let featureFlagsDisabledSpy;
        let loadComboDataSpy;
        let fetchProductByHandleSpy;
        let findComboIDsSpy;
        let primaryVariantId;
        let generateFeatureIdSpy;
        let getComboByPrimaryVariantIdSpy;
        let primaryProduct;
        let config;

        beforeEach(() => {
            featureFlagsDisabledSpy = jest.spyOn(CrossSellComboPromotion, 'featureFlagsDisabled');
            featureFlagsDisabledSpy.mockImplementation(() => {
                return Promise.resolve(false)
            });

            loadComboDataSpy = jest.spyOn(CrossSellComboPromotion, 'loadComboData');
            loadComboDataSpy.mockImplementation(() => {
                return Promise.resolve({})
            });

            fetchProductByHandleSpy = jest.spyOn(ComboPromotionFeature, 'fetchProductByHandle');
            fetchProductByHandleSpy.mockImplementation(() => {
                return Promise.resolve({})
            });

            findComboIDsSpy = jest.spyOn(ComboPromotionFeature, 'findComboIDs');
            findComboIDsSpy.mockImplementation(() => {
                return [{}, {}]
            });

            generateFeatureIdSpy = jest.spyOn(ComboPromotionFeature, 'generateFeatureId');
            generateFeatureIdSpy.mockImplementation(() => 'feature-id' );

            getComboByPrimaryVariantIdSpy = jest.spyOn(CrossSellComboPromotion, 'getComboByPrimaryVariantId');
            getComboByPrimaryVariantIdSpy.mockImplementation(() => 'feature-id' );

            primaryVariantId = 999;
            primaryProduct = {
                id: 1,
                handle: 'primary-product-handle',
            };
            config = {
                featureFlags: {},
                env: 'prod',
            }
        });

        afterEach(() => {
            featureFlagsDisabledSpy.mockRestore();
            loadComboDataSpy.mockRestore();
            fetchProductByHandleSpy.mockRestore();
            findComboIDsSpy.mockRestore();
            generateFeatureIdSpy.mockRestore();
            getComboByPrimaryVariantIdSpy.mockRestore();
        });

        test('should return false if invalid imputs', async () => {
            primaryProduct = {};

            const response = await CrossSellComboPromotion.getProductComboPromotion(primaryVariantId, primaryProduct, config);

            expect(response).toBe(false);
        });

        test('should return false if featureFlagsDisabled', async () => {
            featureFlagsDisabledSpy.mockImplementation(() => {
                return Promise.resolve(true)
            });

            const response = await CrossSellComboPromotion.getProductComboPromotion(primaryVariantId, primaryProduct, config);

            expect(featureFlagsDisabledSpy).toHaveBeenCalled();
            expect(response).toBe(false);
        });

        test('should return false if there is no comboData', async () => {
            loadComboDataSpy.mockImplementation(() => {
                return Promise.resolve(false)
            });

            const response = await CrossSellComboPromotion.getProductComboPromotion(primaryVariantId, primaryProduct, config);

            expect(loadComboDataSpy).toHaveBeenCalled();
            expect(response).toBe(false);
        });

        test('should return false and log an error if fetchProductByHandle throws an error', async () => {
            fetchProductByHandleSpy.mockImplementation(() => {
                throw new Error();
            });

            const response = await CrossSellComboPromotion.getProductComboPromotion(primaryVariantId, primaryProduct, config);

            expect(fetchProductByHandleSpy).toHaveBeenCalled();
            expect(response).toBe(false);

            expect(consoleErrorSpy).toHaveBeenCalled();
        });

        test('should return combo and comboID', async () => {
            generateFeatureIdSpy.mockImplementation(() => 'hello ID' );
            getComboByPrimaryVariantIdSpy.mockImplementation(() => 'hello Combo' );

            const response = await CrossSellComboPromotion.getProductComboPromotion(primaryVariantId, primaryProduct, config);

            expect(response).toEqual({
                combo: 'hello Combo',
                comboId: 'hello ID',
            });
        });
    });

    describe('getComboByPrimaryVariantId', () => {
        const variantCombos = [{
            primaryVariantId: 1,
            secondaryVariantId: 2,
        }, {
            primaryVariantId: 2,
            secondaryVariantId: 1,
        }];

        test('should return correct combo', () => {
            const primaryVariantId = 2;
            const combo = CrossSellComboPromotion.getComboByPrimaryVariantId(variantCombos, primaryVariantId);

            expect(combo).toEqual({
                primaryVariantId: 2,
                secondaryVariantId: 1,
            });
        });

        test('should return false if no combos found', () => {
            const primaryVariantId = 2;
            const combo = CrossSellComboPromotion.getComboByPrimaryVariantId([], primaryVariantId);

            expect(combo).toEqual(false);
        });

        test('should return false if combos is invalid', () => {
            const primaryVariantId = 2;
            const combo = CrossSellComboPromotion.getComboByPrimaryVariantId('not an array', primaryVariantId);

            expect(combo).toEqual(false);
        });
    });
});
