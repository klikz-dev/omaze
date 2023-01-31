import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import { RenderResult } from '@testing-library/react';
import React from 'react';
import { IModuleStore } from 'redux-dynamic-modules-core/src/Contracts';
import '@testing-library/jest-dom/extend-expect';

import { createFetchClosedExperienceFromCosmicSuccessAction } from '../../../../../../ClosedExperienceModule/actions/FetchClosedExperienceFromCosmic/FetchClosedExperienceFromCosmicSuccess/FetchClosedExperienceFromCosmicSuccess';
import { getClosedExperienceModule } from '../../../../../../ClosedExperienceModule/ClosedExperience.module';
import { ITransformedCosmic } from '../../../../../../ClosedExperienceModule/sagas/FetchClosedExperienceFromCosmic/CosmicClosedExperienceTransformer/CosmicClosedExperienceTransformer';
import { createEmptyTransformedCosmicMock, createTransformedCosmicMock } from '../../../../../../shared/tests/CosmicMock';
import { IMockedComponent } from '../../../../../../shared/tests/IMockedComponent';
import { FEATURE_NAME } from '../../../../WinnerFeature.namespace';

import { AdditionalWinners, IAdditionalWinnersProps } from './AdditionalWinners/AdditionalWinners.component';
import { AdditionalWinnersContainer } from './AdditionalWinnersContainer.component';

jest.mock('./AdditionalWinners/AdditionalWinners.component');

const transformedCosmicMock: ITransformedCosmic = createTransformedCosmicMock();

describe(AdditionalWinnersContainer.displayName, (): void => {
    it('was created by the app', (): void => {
        expect(AdditionalWinnersContainer.displayName).toContain('AdditionalWinnersContainer');
        expect(AdditionalWinnersContainer.app).toBe(FEATURE_NAME);
    });

    let component: RenderResult;
    let store: IModuleStore<any>;

    beforeEach((): void => {
        const testComponent: ITestComponent = bootstrapAndRender(
            <AdditionalWinnersContainer />,
            [getClosedExperienceModule()]
        );

        component = testComponent.component;
        store = testComponent.store;
    });

    it('should render', (): void => {
        store.dispatch(createFetchClosedExperienceFromCosmicSuccessAction(transformedCosmicMock));

        expect(component.getByText(AdditionalWinners.displayName)).toBeInTheDocument();
    });

    it('should not render when additional winners are not given', (): void => {
        store.dispatch(createFetchClosedExperienceFromCosmicSuccessAction(createEmptyTransformedCosmicMock()));

        expect(component.queryByText(AdditionalWinners.displayName)).not.toBeInTheDocument();
    });

    it('should pass correct props to AdditionalWinners component', (): void => {
        store.dispatch(createFetchClosedExperienceFromCosmicSuccessAction(transformedCosmicMock));

        const mockCalls: IAdditionalWinnersProps = (AdditionalWinners as IMockedComponent).testingProps.mock.calls[0][0];

        expect(mockCalls.additionalWinners).toEqual(transformedCosmicMock.experience.additionalWinners);
    });
});
