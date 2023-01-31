import '@testing-library/jest-dom/extend-expect';
import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import { RenderResult } from '@testing-library/react';
import React from 'react';
import { IModuleStore } from 'redux-dynamic-modules-core/src/Contracts';

import { createFetchClosedExperienceFromCosmicSuccessAction } from '../../../../../../ClosedExperienceModule/actions/FetchClosedExperienceFromCosmic/FetchClosedExperienceFromCosmicSuccess/FetchClosedExperienceFromCosmicSuccess';
import { getClosedExperienceModule } from '../../../../../../ClosedExperienceModule/ClosedExperience.module';
import { ITransformedCosmic } from '../../../../../../ClosedExperienceModule/sagas/FetchClosedExperienceFromCosmic/CosmicClosedExperienceTransformer/CosmicClosedExperienceTransformer';
import { createEmptyTransformedCosmicMock, createTransformedCosmicMock } from '../../../../../../shared/tests/CosmicMock';
import { IMockedComponent } from '../../../../../../shared/tests/IMockedComponent';
import { FEATURE_NAME } from '../../../../../NonProfitFeature.namespace';

import { IImpactMessageProps, ImpactMessage } from './ImpactMessage/ImpactMessage.component';
import { ImpactMessageContainer } from './ImpactMessageContainer.component';

jest.mock('./ImpactMessage/ImpactMessage.component');

const transformedCosmicMock: ITransformedCosmic = createTransformedCosmicMock();

describe(ImpactMessageContainer.displayName, (): void => {
    it('was created by the app', (): void => {
        expect(ImpactMessageContainer.displayName).toContain('ImpactMessageContainer');
        expect(ImpactMessageContainer.app).toBe(FEATURE_NAME);
    });

    let component: RenderResult;
    let store: IModuleStore<any>;

    beforeEach((): void => {
        const testComponent: ITestComponent = bootstrapAndRender(
            <ImpactMessageContainer />,
            [getClosedExperienceModule()]
        );

        component = testComponent.component;
        store = testComponent.store;
    });

    it('should render', (): void => {
        store.dispatch(createFetchClosedExperienceFromCosmicSuccessAction(transformedCosmicMock));

        expect(component.getByText(ImpactMessage.displayName)).toBeInTheDocument();

        const {
            message,
        }: IImpactMessageProps = (ImpactMessage as IMockedComponent).testingProps.mock.calls[0][0];

        expect(message).toBe(transformedCosmicMock.nonProfit.impactMessage);
    });

    it('when impactMessage is missing should not render the NetRaiseAmount', (): void => {
        store.dispatch(createFetchClosedExperienceFromCosmicSuccessAction(createEmptyTransformedCosmicMock()));

        expect(component.queryByText(ImpactMessage.displayName)).not.toBeInTheDocument();
    });
});
