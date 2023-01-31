import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import '@testing-library/jest-dom/extend-expect';
import { RenderResult } from '@testing-library/react';
import React from 'react';
import { IModuleStore } from 'redux-dynamic-modules-core/src/Contracts';

import { createFetchClosedExperienceFromCosmicSuccessAction } from '../../../../../ClosedExperienceModule/actions/FetchClosedExperienceFromCosmic/FetchClosedExperienceFromCosmicSuccess/FetchClosedExperienceFromCosmicSuccess';
import { createFetchClosedExperienceFromShopifySuccessAction } from '../../../../../ClosedExperienceModule/actions/FetchClosedExperienceFromShopify/FetchClosedExperienceFromShopifySuccess/FetchClosedExperienceFromShopifySuccess';
import { getClosedExperienceModule } from '../../../../../ClosedExperienceModule/ClosedExperience.module';
import { ITransformedCosmic } from '../../../../../ClosedExperienceModule/sagas/FetchClosedExperienceFromCosmic/CosmicClosedExperienceTransformer/CosmicClosedExperienceTransformer';
import { ITransformedShopify } from '../../../../../ClosedExperienceModule/sagas/FetchClosedExperienceFromShopify/ShopifyClosedExperienceTransformer/ShopifyClosedExperienceTransformer';
import { createEmptyTransformedCosmicMock, createTransformedCosmicMock } from '../../../../../shared/tests/CosmicMock';
import { IMockedComponent } from '../../../../../shared/tests/IMockedComponent';
import { createTransformedShopifyMock } from '../../../../../shared/tests/ShopifyMock';
import { FEATURE_NAME } from '../../../../NonProfitFeature.namespace';

import { INetRaiseAmountProps, NetRaiseAmount } from './NetRaiseAmount/NetRaiseAmount.component';
import { NetRaiseAmountContainer } from './NetRaiseAmountContainer.component';

jest.mock('./NetRaiseAmount/NetRaiseAmount.component');

const transformedCosmicMock: ITransformedCosmic = createTransformedCosmicMock();
const transformedShopifyMock: ITransformedShopify = createTransformedShopifyMock();

describe(NetRaiseAmountContainer.displayName, (): void => {
    it('was created by the app', (): void => {
        expect(NetRaiseAmountContainer.displayName).toContain('NetRaiseAmountContainer');
        expect(NetRaiseAmountContainer.app).toBe(FEATURE_NAME);
    });

    let component: RenderResult;
    let store: IModuleStore<any>;

    beforeEach((): void => {
        const testComponent: ITestComponent = bootstrapAndRender(
            <NetRaiseAmountContainer />,
            [getClosedExperienceModule()]
        );

        component = testComponent.component;
        store = testComponent.store;
    });

    it('should contain the NetRaiseAmount component', (): void => {
        store.dispatch(createFetchClosedExperienceFromCosmicSuccessAction(transformedCosmicMock));
        store.dispatch(createFetchClosedExperienceFromShopifySuccessAction(transformedShopifyMock));

        expect(component.getByText(NetRaiseAmount.displayName)).toBeInTheDocument();

        const {
            messageName,
            netRaiseAmount,
            ovalBackgroundDesktop,
            ovalBackgroundMobile,
        }: INetRaiseAmountProps = (NetRaiseAmount as IMockedComponent).testingProps.mock.calls[1][0];

        expect(messageName).toBe(transformedCosmicMock.nonProfit.messageName);
        expect(netRaiseAmount).toBe(transformedCosmicMock.nonProfit.netRaiseAmount);
        expect(ovalBackgroundDesktop).toBe(transformedShopifyMock.assets.ovalBackgroundDesktop);
        expect(ovalBackgroundMobile).toBe(transformedShopifyMock.assets.ovalBackgroundMobile);
    });

    it('when netRaiseAmount is missing should not contain the NetRaiseAmount component', (): void => {
        store.dispatch(createFetchClosedExperienceFromCosmicSuccessAction(createEmptyTransformedCosmicMock()));

        expect(component.queryByText(NetRaiseAmount.displayName)).not.toBeInTheDocument();
    });
});
