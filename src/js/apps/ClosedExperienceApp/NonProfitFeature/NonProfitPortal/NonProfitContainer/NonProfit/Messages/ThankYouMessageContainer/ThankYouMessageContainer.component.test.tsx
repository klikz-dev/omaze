import '@testing-library/jest-dom/extend-expect';
import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import { RenderResult } from '@testing-library/react';
import React from 'react';
import { IModuleStore } from 'redux-dynamic-modules-core/src/Contracts';

import { createFetchClosedExperienceFromCosmicSuccessAction } from '../../../../../../ClosedExperienceModule/actions/FetchClosedExperienceFromCosmic/FetchClosedExperienceFromCosmicSuccess/FetchClosedExperienceFromCosmicSuccess';
import { getClosedExperienceModule } from '../../../../../../ClosedExperienceModule/ClosedExperience.module';
import { ITransformedCosmic } from '../../../../../../ClosedExperienceModule/sagas/FetchClosedExperienceFromCosmic/CosmicClosedExperienceTransformer/CosmicClosedExperienceTransformer';
import {
    createEmptyTransformedCosmicMock,
    createTransformedCosmicMock,
} from '../../../../../../shared/tests/CosmicMock';
import { IMockedComponent } from '../../../../../../shared/tests/IMockedComponent';
import { FEATURE_NAME } from '../../../../../NonProfitFeature.namespace';

import { IThankYouMessageProps, ThankYouMessage } from './ThankYouMessage/ThankYouMessage.component';
import { ThankYouMessageContainer } from './ThankYouMessageContainer.component';

jest.mock('./ThankYouMessage/ThankYouMessage.component');

const transformedCosmicMock: ITransformedCosmic = createTransformedCosmicMock();

describe(ThankYouMessageContainer.displayName, (): void => {
    it('was created by the app', (): void => {
        expect(ThankYouMessageContainer.displayName).toContain('ThankYouMessageContainer');
        expect(ThankYouMessageContainer.app).toBe(FEATURE_NAME);
    });

    let component: RenderResult;
    let store: IModuleStore<any>;

    beforeEach((): void => {
        const testComponent: ITestComponent = bootstrapAndRender(
            <ThankYouMessageContainer />,
            [getClosedExperienceModule()]
        );

        component = testComponent.component;
        store = testComponent.store;
    });

    it('should render', (): void => {
        store.dispatch(createFetchClosedExperienceFromCosmicSuccessAction(transformedCosmicMock));

        expect(component.getByText(ThankYouMessage.displayName)).toBeInTheDocument();

        const {
            thankYouMessage,
            imgixUrl,
            impactMessage,
        }: IThankYouMessageProps = (ThankYouMessage as IMockedComponent).testingProps.mock.calls[0][0];

        expect(thankYouMessage).toBe(transformedCosmicMock.nonProfit.thankYouMessage);
        expect(imgixUrl).toBe(transformedCosmicMock.nonProfit.logo.imgixUrl);
        expect(impactMessage).toBe(transformedCosmicMock.nonProfit.impactMessage);
    });

    it('when netRaiseAmount is missing should not contain the NetRaiseAmount component', (): void => {
        store.dispatch(createFetchClosedExperienceFromCosmicSuccessAction(createEmptyTransformedCosmicMock()));

        expect(component.queryByText(ThankYouMessage.displayName)).not.toBeInTheDocument();
    });
});
