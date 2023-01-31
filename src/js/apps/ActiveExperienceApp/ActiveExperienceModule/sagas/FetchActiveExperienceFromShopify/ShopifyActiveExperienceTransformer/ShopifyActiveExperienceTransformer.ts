import { IShopifyExperience } from '../../../../shared/Shopify/IShopifyExperience';
import { IVariantMetafields } from '../../../ActiveExperience.state';

export interface IVariant {
    id: number;
    sku: string;
    title: string;
    name: string;
    price: number;
    metafields: {
        calloutText?: string;
    };
}

export interface ITransformedShopify {
    experience: {
        id: number;
        handle: string;
        name: string;
    };
    nonProfit: {
        name: string;
    };
    variants: IVariant[];
    config: {
        env: string;
        fameHostname: string;
        fameUpsellVariantSku: string;
        donorCounterBlackList: string[];
        donorCounterMinDonors: number;
    };
}

export class ShopifyActiveExperienceTransformer {
    protected shopifyData: IShopifyExperience;

    public constructor (shopifyData: IShopifyExperience) {
        this.shopifyData = shopifyData;
    }

    public transform (): ITransformedShopify {
        return {
            experience: {
                id: parseInt(this.shopifyData.experience.id),
                handle: this.shopifyData.experience.handle,
                name: this.shopifyData.experience.name,
            },
            nonProfit: {
                name: this.shopifyData.nonProfit.name,
            },
            variants: this.transformedVariants(),
            config: {
                env: this.shopifyData.config.env,
                fameHostname: this.shopifyData.config.fameHostname,
                fameUpsellVariantSku: this.shopifyData.config.fameUpsellVariantSku,
                donorCounterBlackList: this.parseDonorCounterBlackList(this.shopifyData.config.donorCounterBlackList),
                donorCounterMinDonors: this.shopifyData.config.donorCounterMinDonors,
            },
        };
    }

    public static isValidMetafield (metafield: string | undefined): boolean {
        const INVALID_VALUE: string = 'metafield_null_value';

        if (!metafield) {
            return false;
        }

        if (metafield.toLowerCase() === INVALID_VALUE) {
            return false;
        }

        return true;
    }

    protected transformedVariants (): IVariant[] {
        if (!this.shopifyData.variants) {
            return [];
        }

        return this.shopifyData.variants.map((variant: any): IVariant => {
            const meta: IVariantMetafields = this.shopifyData.variantMetafieldSets[variant.id];

            variant.metafields = {};

            if (!meta) {
                return variant;
            }

            const calloutText: string | undefined = meta.calloutText;

            if (ShopifyActiveExperienceTransformer.isValidMetafield(calloutText)) {
                variant.metafields.calloutText = calloutText;
            }

            return variant;
        });
    }

    protected parseDonorCounterBlackList (value: string): string[] {
        try {
            return JSON.parse(value);
        } catch (e) {
            return [];
        }
    }
}
