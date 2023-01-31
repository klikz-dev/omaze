import { IShopifyExperience } from '../../../../shared/Shopify/IShopifyExperience';
import { createRawShopifyMock, createTransformedShopifyMock } from '../../../../shared/tests/ShopifyMock';

import {
    ITransformedShopify,
    ShopifyActiveExperienceTransformer,
    IVariant,
} from './ShopifyActiveExperienceTransformer';

describe('ShopifyActiveExperienceTransformer', (): void => {
    describe('transform', (): void => {
        it('should transform data', (): void => {
            const inputMock: IShopifyExperience = createRawShopifyMock();
            const transformedMock: ITransformedShopify = createTransformedShopifyMock();
            const transformer: ShopifyActiveExperienceTransformer = new ShopifyActiveExperienceTransformer(inputMock);
            const transformed: ITransformedShopify = transformer.transform();

            expect(transformed).toEqual(transformedMock);
        });
    });

    describe('isValidMetafield', (): void => {
        it('should validate metaField', (): void => {
            expect(ShopifyActiveExperienceTransformer.isValidMetafield('hello')).toBe(true);
            expect(ShopifyActiveExperienceTransformer.isValidMetafield('')).toBe(false);
            expect(ShopifyActiveExperienceTransformer.isValidMetafield('METAFIELD_NULL_VALUE')).toBe(false);
        });
    });

    describe('transforming metafields', (): void => {
        interface IMeta {
            name: string;
            inputMeta: {
                [key: number]: any;
            };
            expectedMeta: {
                [key: number]: any;
            };
        }

        const testCases: IMeta[] = [
            {
                name: 'should handle empty variantMetafieldSets',
                inputMeta: {
                    222: {},
                    333: {},
                },
                expectedMeta: {
                    222: {},
                    333: {},
                },
            },
            {
                name: 'should ignore invalid metafield values',
                inputMeta: {
                    222: {
                        calloutText: '',
                    },
                    333: {
                        calloutText: 'METAFIELD_NULL_VALUE',
                    },
                },
                expectedMeta: {
                    222: {},
                    333: {},
                },
            },
            {
                name: 'should ignore unknown metafields',
                inputMeta: {
                    222: {
                        whatever: 'should not show',
                    },
                    333: {
                        calloutText: 'ok',
                    },
                },
                expectedMeta: {
                    222: {},
                    333: {
                        calloutText: 'ok',
                    },
                },
            },
        ];

        testCases.forEach((testCase: IMeta): void => {
            test(testCase.name, (): void => {
                const inputMock: IShopifyExperience = createRawShopifyMock();

                inputMock.variantMetafieldSets = testCase.inputMeta;

                const transformer: ShopifyActiveExperienceTransformer = new ShopifyActiveExperienceTransformer(inputMock);
                const transformed: ITransformedShopify = transformer.transform();

                transformed.variants.forEach((variant: IVariant): void => {
                    expect(variant.metafields).toEqual(testCase.expectedMeta[variant.id]);
                });
            });
        });
    });
});
