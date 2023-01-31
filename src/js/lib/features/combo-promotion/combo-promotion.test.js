/* eslint no-console: 0 */
import { default as ComboPromotionFeature } from './index';
import { default as BannerAdFeature } from '../banner-ad';
import { default as DateUtils } from '../../utility/date.js';

const fameVariant = {
    id: 12345,
    sku: 'combo-entries_20',
}

const fameUpsellVariantSku = 'standard-fame_20';

const secondaryProduct = {
    id: 6557118038091,
    title: 'secondary product',
    tags: '$oz_sweepstake_status:active',
    variants: [
        {
            id: 39350198337611,
            sku: 'combo-entries_100',
        },
        fameVariant,
    ],
}

const fameCombo = {
    'primary_variant_id': '34567',
    'secondary_variant_id': fameVariant.id,
}

const options = {
    'id': '609aefadaaac2100085ea302',
    'bucket': '609573c477edf90007879256',
    'slug': 'combo-james-bond-782f1a80-b29b-11eb-a7ab-7fbfe57a9279',
    'title': 'combo - mfm-nnnnnnnnnnnnnnn (QA)',
    'content': '',
    'created': '2021-05-11T20:57:17.024Z',
    'created_at': '2021-05-11T20:57:17.024Z',
    'modified_at': '2021-05-18T18:05:52.979Z',
    'status': 'published',
    'modified_by': '609426b9fae0310008707413',
    'publish_at': null,
    'unpublish_at': null,
    'created_by': '609426b9fae0310008707413',
    'published_at': '2021-05-18T18:05:52.979Z',
    'type': 'feature-combo-promotions',
    'metadata': {
        'start_datetime_utc': '05/06/2021 11:25 pm',
        'end_datetime_utc': '06/06/2222 11:25 pm',
        'variant_combos': [
            {
                'primary_variant_id': '39342474985547',
                'secondary_variant_id': '39350198337611',
            },
            fameCombo,
        ],
        'secondary_campaign_handle': 'm-lk-1',
    },
};

describe('features/combo-promotion', () => {
    let consoleInfoSpy;
    let consoleWarnSpy;
    let consoleErrorSpy;

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

    describe('featureName', () => {
        test('should return feature name', () => {
            expect(ComboPromotionFeature.featureName()).toEqual('combo-promotion');
        });
    });

    describe('validateOptions', () => {
        let validOptions;
        let validDataResponse;

        beforeEach(() => {
            validOptions = {
                created_at: '2021-05-20',
                title: 'combo feature title',
                metadata: {
                    variant_combos: [{
                        primary_variant_sku: 'standard_100',
                        secondary_variant_sku: 'combo-entries_100',
                    }],
                    secondary_campaign_handle: 'secondary-handle',
                    start_datetime_utc: '1/1/2000 1:25pm',
                    end_datetime_utc: '1/1/3000 1:25pm',
                    banner_ad: {},
                },
            };

            validDataResponse = {
                secondaryCampaignHandle: 'secondary-handle',
                variantCombos: [{
                    primary_variant_sku: 'standard_100',
                    secondary_variant_sku: 'combo-entries_100',
                }],
                startDateUTC: '1/1/2000 1:25pm',
                endDateUTC: '1/1/3000 1:25pm',
                comboCreatedAt: '2021-05-20',
                comboTitle: 'combo feature title',
                bannerAd: {},
            };
        });

        test('returns valid options', () => {
            const response = ComboPromotionFeature.validateOptions(validOptions);

            expect(response).toEqual(validDataResponse);
        });

        test('returns false if missing: secondary_campaign_handle', () => {
            validOptions.metadata.secondary_campaign_handle = undefined;
            expect(ComboPromotionFeature.validateOptions(validOptions)).toBe(false);
        });

        test('returns false if missing: variant_combos', () => {
            validOptions.metadata.variant_combos = undefined;
            expect(ComboPromotionFeature.validateOptions(validOptions)).toBe(false);
        });

        test('returns false if invalid: variant_combos', () => {
            validOptions.metadata.variant_combos[0] = {};
            expect(ComboPromotionFeature.validateOptions(validOptions)).toBe(false);
        });

        test('returns false if missing: start_datetime_utc', () => {
            validOptions.metadata.start_datetime_utc = undefined;
            expect(ComboPromotionFeature.validateOptions(validOptions)).toBe(false);
        });

        test('returns false if missing: end_datetime_utc', () => {
            validOptions.metadata.end_datetime_utc = undefined;
            expect(ComboPromotionFeature.validateOptions(validOptions)).toBe(false);
        });

        test('returns false if combo is inactive', () => {
            validOptions.metadata.end_datetime_utc = '1/1/2000 1:25pm';
            expect(ComboPromotionFeature.validateOptions(validOptions)).toBe(false);
        });
    });

    describe('findComboIDs', () => {
        let variantCombos;
        let primaryVariants;
        let secondaryVariants;

        beforeEach(() => {
            variantCombos = [{
                primary_variant_sku: 'standard_101',
                secondary_variant_sku: 'combo-entries_100',
            }, {
                primary_variant_sku: 'standard_102',
                secondary_variant_sku: 'combo-entries_200',
            }];

            primaryVariants = [{
                id: 101,
                sku: 'standard_101',
            }, {
                id: 102,
                sku: 'standard_102',
            }, {
                id: 103,
                sku: 'standard_103',
            }];

            secondaryVariants = [{
                id: 201,
                sku: 'combo-entries_100',
            }, {
                id: 202,
                sku: 'combo-entries_200',
            }, {
                id: 203,
                sku: 'combo-entries_300',
            }];
        });

        test('returns combos witih valid IDs', () => {
            const response = ComboPromotionFeature.findComboIDs(variantCombos, primaryVariants, secondaryVariants);

            expect(response).toEqual([
                {
                    primaryVariantId: 101,
                    primaryVariantSku: 'standard_101',
                    secondaryVariantId: 201,
                    secondaryVariantSku: 'combo-entries_100',
                },
                {
                    primaryVariantId: 102,
                    primaryVariantSku: 'standard_102',
                    secondaryVariantId: 202,
                    secondaryVariantSku: 'combo-entries_200',
                },
            ]);
        });

        test('returns false with invalid secondary SKU', () => {
            variantCombos[0].secondary_variant_sku = 'invalid';

            const response = ComboPromotionFeature.findComboIDs(variantCombos, primaryVariants, secondaryVariants);

            expect(response).toBe(false);
        });

        test('returns false with missing primary variant', () => {
            primaryVariants = [];

            const response = ComboPromotionFeature.findComboIDs(variantCombos, primaryVariants, secondaryVariants);

            expect(response).toBe(false);
        });

        test('returns false with missing secondary variant', () => {
            secondaryVariants = [];

            const response = ComboPromotionFeature.findComboIDs(variantCombos, primaryVariants, secondaryVariants);

            expect(response).toBe(false);
        });
    });

    describe('init', () => {
        let validateOptionsSpy;
        let initComboFeatureSpy;
        let validConfig;
        let mockOptions;

        beforeEach(() => {
            validateOptionsSpy = jest.spyOn(ComboPromotionFeature, 'validateOptions');
            validateOptionsSpy.mockImplementation(() => true );

            initComboFeatureSpy = jest.spyOn(ComboPromotionFeature, 'initComboFeature');
            initComboFeatureSpy.mockImplementation(() => {
                return Promise.resolve({})
            });

            mockOptions = {};

            validConfig = {
                productStatus: 'active',
                slug: 'prod-handle',
                fameUpsellVariantSku: 'fame-upsell-sku',
            };
        });

        afterEach(() => {
            validateOptionsSpy.mockRestore()
            initComboFeatureSpy.mockRestore();
        });

        test('should call initComboFeature with valid options', () => {
            validateOptionsSpy.mockImplementation(() => { return {}; });

            ComboPromotionFeature.init(mockOptions, validConfig);

            expect(initComboFeatureSpy).toHaveBeenCalledWith({
                fameUpsellVariantSku: 'fame-upsell-sku',
                primaryProductHandle: 'prod-handle',
            });
        });

        test('should not call initComboFeature with closed product', () => {
            validateOptionsSpy.mockImplementation(() => { return {}; });

            validConfig.productStatus = 'closed';

            ComboPromotionFeature.init(mockOptions, validConfig);

            expect(initComboFeatureSpy).not.toHaveBeenCalled();
        });

        test('should not call initComboFeature with invalid options', () => {
            validateOptionsSpy.mockImplementation(() => { return false; });

            ComboPromotionFeature.init(mockOptions, validConfig);

            expect(initComboFeatureSpy).not.toHaveBeenCalled();
        });
    });

    describe('initComboFeature', () => {
        let loadSpy;
        let getPrimaryCampaignSpy;
        let fetchProductByHandleSpy;
        let findComboIDsSpy;
        let validComboData;

        beforeEach(() => {
            loadSpy = jest.spyOn(ComboPromotionFeature, 'load');
            loadSpy.mockImplementation(() => true);

            getPrimaryCampaignSpy = jest.spyOn(ComboPromotionFeature, 'getPrimaryCampaign');
            getPrimaryCampaignSpy.mockImplementation(() => {
                return Promise.resolve({})
            });

            fetchProductByHandleSpy = jest.spyOn(ComboPromotionFeature, 'fetchProductByHandle');
            fetchProductByHandleSpy.mockImplementation(() => {
                return Promise.resolve({})
            });

            findComboIDsSpy = jest.spyOn(ComboPromotionFeature, 'findComboIDs');
            findComboIDsSpy.mockImplementation(() => [{}]);

            validComboData = {
                secondary_campaign_handle: 'secondary-handle',
                variant_combos: [{
                    'primary_variant_id': '111',
                    'secondary_variant_id': '222',
                }],
                start_datetime_utc: '1/1/2020 1:25pm',
                end_datetime_utc: '1/1/2025 1:25pm',
                banner_ad: {},
                primaryCampaign: {},
                comboTitle: 'combo title',
                comboCreatedAt: '2021-05-11T20:57:17.024Z',
                fameUpsellVariantSku: 'fame-upsell-sku',
            };
        });

        afterEach(() => {
            loadSpy.mockRestore()
            getPrimaryCampaignSpy.mockRestore();
            fetchProductByHandleSpy.mockRestore();
            findComboIDsSpy.mockRestore();
        });

        test('should call load comboData', async () => {
            await ComboPromotionFeature.initComboFeature(validComboData);

            const expectedResponse = validComboData;

            expectedResponse.primaryCampaign = {};
            expectedResponse.secondaryCampaign = {};
            expectedResponse.variantCombos = [{}];

            expect(loadSpy).toHaveBeenCalledWith(expectedResponse);
        });

        test('should throw an error if no variantCombos with IDs found', async () => {
            findComboIDsSpy.mockImplementation(() => [] );

            let error;

            try {
                await ComboPromotionFeature.initComboFeature(validComboData);
            } catch (e) {
                error = e;
            }

            expect(error).toEqual(
                new Error('[ComboPromotion.initComboFeature]: no valid variant combos found.')
            );
        });
    });

    describe('fetchFromShopifyApi', () => {
        beforeEach(() => {
            // eslint-disable-next-line
            global.fetch = jest.fn(() => {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({ product: secondaryProduct }),
                })
            });
        });

        afterEach(() => {
            fetch.mockClear();
        });

        test('should return json object', async () => {
            const data = await ComboPromotionFeature.fetchFromShopifyApi('/product.json');

            expect(data.product).toEqual(secondaryProduct);
        });
    });

    describe('generateFeatureId', () => {
        test('should return false no startDate', () => {
            const result = ComboPromotionFeature.generateFeatureId();
            expect(result).toEqual(false);
        });

        test('should return combo variant id', () => {
            const timestampStartUTC = DateUtils.stringDateAsTimestampUTC('06/06/2021 11:25 pm', 'm/d/yyyy h:mm am');
            const result = ComboPromotionFeature.generateFeatureId('06/06/2021 11:25 pm', '1', '2');
            expect(result).toEqual(`1-2-${timestampStartUTC}`);
        });
    });

    describe('isValidComboSku', () => {
        test('should return false if sku is invalid', () => {
            const result = ComboPromotionFeature.isValidComboSku('asdf');

            expect(result).toEqual(false);
        });

        test('should return true if sku is valid', () => {
            const result = ComboPromotionFeature.isValidComboSku('combo-entries_1234');

            expect(result).toEqual(true);
        });
    });

    describe('getDonationCardEls', () => {
        let consoleErrorSpy;

        beforeEach(() => {
            consoleErrorSpy = jest.spyOn(console, 'error');
            consoleErrorSpy.mockImplementation(() => 'error');
        });

        afterEach(() => {
            consoleErrorSpy.mockClear();
        });

        test('should return false if no donation card container', () => {
            const donationCardsEls = ComboPromotionFeature.getDonationCardEls();
            expect(donationCardsEls).toBeFalsy();
        });

        test('should return false if no donation card element', () => {
            document.body.innerHTML = `
                <div id="active-experience-app__donation-cards">
                </div>
            `;
            const donationCardsEls = ComboPromotionFeature.getDonationCardEls();
            expect(donationCardsEls).toBeFalsy();
        });

        test('should return donation card elements', () => {
            document.body.innerHTML = `
                <div id="active-experience-app__donation-cards">
                    <a data-testid="DonationCard:DonationCard" href="/cart/add?id=39342474985547&quantity=1"></a>
                </div>
            `;

            const donationCardsEls = ComboPromotionFeature.getDonationCardEls();
            expect(donationCardsEls.length).toEqual(1);
        });
    });

    describe('addComboVariantsToCart', () => {
        let consoleErrorSpy;

        beforeEach(() => {
            // eslint-disable-next-line
            global.fetch = jest.fn(() => {
                return Promise.reject('error');
            });
            consoleErrorSpy = jest.spyOn(console, 'error');
            consoleErrorSpy.mockImplementation(() => 'error');
        });

        afterEach(() => {
            fetch.mockClear();
            consoleErrorSpy.mockClear();
        });

        test('should return false if no primaryVariantId', async () => {
            const response = await ComboPromotionFeature.addComboVariantsToCart('a_b_1', '', '1111111');
            expect(response).toEqual(false);
        });

        test('should return false if no secondaryVariantId', async () => {
            const response = await ComboPromotionFeature.addComboVariantsToCart('a_b_1', '1111111');
            expect(response).toEqual(false);
        });

        test('should call fetch api', async () => {
            await ComboPromotionFeature.addComboVariantsToCart('a_b_1', '1111111', '1111111');
            expect(fetch).toHaveBeenCalled();
        });
    });

    describe('initEventListeners', () => {
        let consoleErrorSpy;
        let comboData;

        beforeEach(() => {
            // eslint-disable-next-line
            global.fetch = jest.fn(() => {
                return Promise.reject('error');
            });
            consoleErrorSpy = jest.spyOn(console, 'error');
            consoleErrorSpy.mockImplementation(() => 'error');

            comboData = {
                startDateUTC: '1/1/22 1:25pm',
                variantCombos: [{
                    primaryVariantId: 111,
                    secondaryVariantId: 222,
                }],
                primaryCampaign: {
                    id: 111,
                },
                secondaryCampaign: {
                    id: 222,
                },
            }
        });

        afterEach(() => {
            fetch.mockClear();
            consoleErrorSpy.mockClear();
        });

        test('should add event listeners to donation cards', () => {
            document.body.innerHTML = `
                <div id="active-experience-app__donation-cards">
                    <a data-testid="DonationCard:DonationCard" href="/cart/add?id=111&quantity=1"></a>
                </div>
            `;

            ComboPromotionFeature.initEventListeners(comboData);
            const donationCardsEls = ComboPromotionFeature.getDonationCardEls();

            donationCardsEls.forEach(async (card) => {
                await card.click();
                expect(fetch).toHaveBeenCalled();
            });
        });
    });

    describe('addComboDataToFameLink', () => {
        let consoleErrorSpy;

        beforeEach(() => {
            // eslint-disable-next-line
            global.fetch = jest.fn(() => {
                return Promise.reject('error');
            });
            consoleErrorSpy = jest.spyOn(console, 'error');
            consoleErrorSpy.mockImplementation(() => 'error');
        });

        afterEach(() => {
            fetch.mockClear();
            consoleErrorSpy.mockClear();
        });

        test('should return false for invalid secondary product', () => {
            document.body.innerHTML = `
                <div id="active-experience-app__donation-cards">
                    <a data-testid="FameLink:FameLink" href="https://fame-qa.omaze.com/6557118038091?title=fameLink"></a>
                </div>
            `;

            const result = ComboPromotionFeature.addComboDataToFameLink();

            expect(result).toBe(false);
        });

        test('should return false if no fame combo', () => {
            document.body.innerHTML = `
                <div id="active-experience-app__donation-cards">
                    <a data-testid="FameLink:FameLink" href="https://fame-qa.omaze.com/6557118038091?title=fameLink"></a>
                </div>
            `;

            const result = ComboPromotionFeature.addComboDataToFameLink({ secondaryCampaign: {} });

            expect(result).toBe(false);
        });

        test('should add combo data to fame link', () => {
            document.body.innerHTML = `
                <div id="active-experience-app__donation-cards">
                    <a data-testid="FameLink:FameLink" href="https://fame-qa.omaze.com/6557118038091?title=fameLink"></a>
                </div>
            `;

            const result = ComboPromotionFeature.addComboDataToFameLink({
                secondaryCampaign: secondaryProduct,
                variant_combos: options.variant_combos,
                primaryCampaign: {
                    variants: [
                        {
                            id: fameCombo.primary_variant_id,
                            sku: fameUpsellVariantSku,
                        },
                    ],
                },
                config: { fameUpsellVariantSku: fameUpsellVariantSku },
            });

            expect(result).toBe(true);
        });
    });

    describe('initBannerAd', () => {
        let bannerAdFeatureSpy;

        const baseOptions = {
            comboCreatedAt: '2021-05-11T20:57:17.024Z',
            comboTitle: 'hello title',
            startDateUTC: '5/31/2001 1:25pm',
            endDateUTC: '5/31/3001 1:25pm',
            bannerAd: {
                content: 'hello content',
                url_link: 'https://omaze.com',
            },
        };

        beforeEach(() => {
            bannerAdFeatureSpy = jest.spyOn(BannerAdFeature, 'init');
            bannerAdFeatureSpy.mockImplementation(() => true);
        });

        afterEach(() => {
            bannerAdFeatureSpy.mockRestore();
        });

        test('should init BannerAdFeature with valid options', () => {
            ComboPromotionFeature.initBannerAd(baseOptions);

            const expectedBannerAdConfig = {
                created_at: '2021-05-11T20:57:17.024Z',
                title: 'hello title',
                metadata: {
                    content: 'hello content',
                    url_link: 'https://omaze.com',
                    start_datetime_utc: '5/31/2001 1:25pm',
                    end_datetime_utc: '5/31/3001 1:25pm',
                },
            }

            const expectedShopifyConfig = {
                productStatus: 'active',
            };

            expect(bannerAdFeatureSpy).toHaveBeenCalledWith(
                [expectedBannerAdConfig],
                expectedShopifyConfig
            );
        });

        test('should require content', () => {
            const options = Object.assign({}, baseOptions);
            options.bannerAd.content = ' ';

            ComboPromotionFeature.initBannerAd(options);

            expect(bannerAdFeatureSpy).not.toHaveBeenCalled();
        });
    });

    describe('isComboActive', () => {
        const testCases = [
            {
                input: {
                    start: '1/1/1999 1:25pm',
                    end: '1/1/2999 1:25pm',
                },
                expected: true,
            },
            {
                input: {
                    start: '1/1/1999',
                    end: '1/1/2999',
                },
                expected: false,
            },
            {
                input: {
                    start: '1/1/1999 1:25pm',
                    end: '1/1/2000 1:25pm',
                },
                expected: false,
            },
            {
                input: {
                    start: '1/1/2999 1:25pm',
                    end: '1/1/3000 1:25pm',
                },
                expected: false,
            },
            {
                input: {
                    start: 'invalid start',
                    end: '1/1/3000 1:25pm',
                },
                expected: false,
            },
            {
                input: {
                    start: '1/1/2000 1:25pm',
                    end: 'invalid end',
                },
                expected: false,
            },
            {
                input: {
                    start: '',
                    end: '',
                },
                expected: false,
            },
        ];

        testCases.forEach((testCase) => {
            test(`${testCase.expected} - start: ${testCase.input.start} end: ${testCase.input.end}`, () =>
                expect(ComboPromotionFeature.isComboActive(testCase.input.start, testCase.input.end)).toBe(testCase.expected)
            );
        });
    });
});
