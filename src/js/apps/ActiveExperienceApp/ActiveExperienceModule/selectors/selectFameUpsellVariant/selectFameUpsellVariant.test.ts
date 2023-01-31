import { IStateTestFixture, createStateTestFixture, ISelect } from '@omaze/test';
import { Dispatch } from 'redux';

import { createTransformedShopifyMock } from '../../../shared/tests/ShopifyMock';
import { createFetchActiveExperienceFromShopifySuccessAction } from '../../actions/FetchActiveExperienceFromShopify/FetchActiveExperienceFromShopifySuccess/FetchActiveExperienceFromShopifySuccess';
import { getActiveExperienceModule } from '../../ActiveExperience.module';
import { IVariant } from '../../ActiveExperience.state';
import { ITransformedShopify } from '../../sagas/FetchActiveExperienceFromShopify/ShopifyActiveExperienceTransformer/ShopifyActiveExperienceTransformer';

import { selectFameUpsellVariant } from './selectFameUpsellVariant';

const variants: IVariant[] = [{
    id: 1,
    sku: 'non fame SKU',
    title: 'title',
    name: 'name',
    price: 10,
    metafields: {
        calloutText: 'hello',
    },
},{
    id: 2,
    sku: 'non fame SKU 2',
    title: 'title',
    name: 'name',
    price: 10,
    metafields: {
        calloutText: 'hello',
    },
}];

describe('selectFameUpsellVariant', (): void => {
    let select: ISelect;
    let dispatch: Dispatch;
    let transformedShopifyMock: ITransformedShopify;

    beforeEach((): void => {
        const testFixture: IStateTestFixture = createStateTestFixture(
            getActiveExperienceModule()
        );

        dispatch = testFixture.dispatch;
        select = testFixture.select;

        transformedShopifyMock = createTransformedShopifyMock();
    });

    it('should be able to select exiting Fame Upsell Variant', (): void => {
        variants[1].sku = transformedShopifyMock.config.fameUpsellVariantSku;
        transformedShopifyMock.variants = variants;

        dispatch(createFetchActiveExperienceFromShopifySuccessAction(transformedShopifyMock));

        const upsellVariant: IVariant = select(selectFameUpsellVariant);

        expect(upsellVariant).toEqual(variants[1]);
    });

    it('should return undefined with no Fame Upsell Variant', (): void => {
        dispatch(createFetchActiveExperienceFromShopifySuccessAction(transformedShopifyMock));

        const upsellVariant: IVariant = select(selectFameUpsellVariant);

        expect(upsellVariant).toBeUndefined();
    });
});
