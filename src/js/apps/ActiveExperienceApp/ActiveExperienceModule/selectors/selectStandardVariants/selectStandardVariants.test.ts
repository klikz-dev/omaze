import { IStateTestFixture, createStateTestFixture, ISelect } from '@omaze/test';
import { Dispatch } from 'redux';

import { createTransformedShopifyMock } from '../../../shared/tests/ShopifyMock';
import { createFetchActiveExperienceFromShopifySuccessAction } from '../../actions/FetchActiveExperienceFromShopify/FetchActiveExperienceFromShopifySuccess/FetchActiveExperienceFromShopifySuccess';
import { getActiveExperienceModule } from '../../ActiveExperience.module';
import { IVariant } from '../../ActiveExperience.state';
import { ITransformedShopify } from '../../sagas/FetchActiveExperienceFromShopify/ShopifyActiveExperienceTransformer/ShopifyActiveExperienceTransformer';

import { selectStandardVariants } from './selectStandardVariants';

const variants: IVariant[] = [{
    id: 1,
    sku: 'non-standard_sku',
    title: 'title',
    name: 'name',
    price: 10,
    metafields: {
        calloutText: 'hello',
    },
},{
    id: 2,
    sku: 'standard_sku-1',
    title: 'title',
    name: 'name',
    price: 10,
    metafields: {
        calloutText: 'hello',
    },
},{
    id: 3,
    sku: 'standard_sku-2',
    title: 'title',
    name: 'name',
    price: 10,
    metafields: {
        calloutText: 'hello',
    },
}];

describe('selectStandardVariants', (): void => {
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

    it('should be able to select Standard variants only', (): void => {
        transformedShopifyMock.variants = variants;

        dispatch(createFetchActiveExperienceFromShopifySuccessAction(transformedShopifyMock));

        const standardVariants: IVariant[] = select(selectStandardVariants);

        expect(standardVariants).toEqual([
            variants[1],
            variants[2],
        ]);
    });
});
