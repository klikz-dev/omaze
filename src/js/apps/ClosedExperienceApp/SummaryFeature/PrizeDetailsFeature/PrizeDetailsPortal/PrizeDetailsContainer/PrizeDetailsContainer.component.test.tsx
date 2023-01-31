import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import { RenderResult } from '@testing-library/react';
import React from 'react';
import { IModuleStore } from 'redux-dynamic-modules-core/src/Contracts';

import '@testing-library/jest-dom/extend-expect';
import { createFetchClosedExperienceFromCosmicSuccessAction } from '../../../../ClosedExperienceModule/actions/FetchClosedExperienceFromCosmic/FetchClosedExperienceFromCosmicSuccess/FetchClosedExperienceFromCosmicSuccess';
import { getClosedExperienceModule } from '../../../../ClosedExperienceModule/ClosedExperience.module';
import { createEmptyTransformedCosmicMock, createTransformedCosmicMock } from '../../../../shared/tests/CosmicMock';
import { IMockedComponent } from '../../../../shared/tests/IMockedComponent';
import { FEATURE_NAME } from '../../PrizeDetailsFeature.namespace';

import { PrizeDetails } from './PrizeDetails/PrizeDetails.component';
import { PRIZE_DETAILS_QA } from './PrizeDetails/PrizeDetails.qa';
import { PrizeDetailsContainer } from './PrizeDetailsContainer.component';

jest.mock('./PrizeDetails/PrizeDetails.component');

describe(PrizeDetailsContainer.displayName, (): void => {
    it('was created by the app', (): void => {
        expect(PrizeDetailsContainer.displayName).toContain('PrizeDetailsContainer');
        expect(PrizeDetailsContainer.app).toBe(FEATURE_NAME);
    });

    let component: RenderResult;
    let store: IModuleStore<any>;

    beforeEach((): void => {
        const testComponent: ITestComponent = bootstrapAndRender(
            <PrizeDetailsContainer />,
            [getClosedExperienceModule()]
        );

        component = testComponent.component;
        store = testComponent.store;
    });

    it('should render the PrizeDetails component', (): void => {
        store.dispatch(createFetchClosedExperienceFromCosmicSuccessAction(createTransformedCosmicMock()));

        expect(component.getByText(PrizeDetails.displayName)).toBeInTheDocument();

        const prizeDetails: string = (PrizeDetails as IMockedComponent).testingProps.mock.calls[0][0].prizeDetails;

        expect(prizeDetails).toBe('<p>Great prices</p>');
    });

    it('should not render the PrizeDetails component if there prizeDetails is empty', (): void => {
        store.dispatch(createFetchClosedExperienceFromCosmicSuccessAction(createEmptyTransformedCosmicMock()));

        expect(component.queryByTestId(PRIZE_DETAILS_QA.CONTAINER)).not.toBeInTheDocument();
    });
});
