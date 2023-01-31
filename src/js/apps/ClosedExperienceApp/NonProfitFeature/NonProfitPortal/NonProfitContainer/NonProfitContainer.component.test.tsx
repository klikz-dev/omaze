import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';

import { createFetchClosedExperienceFromCosmicErrorAction } from '../../../ClosedExperienceModule/actions/FetchClosedExperienceFromCosmic/FetchClosedExperienceFromCosmicError/FetchClosedExperienceFromCosmicError';
import { createFetchClosedExperienceFromCosmicStartAction } from '../../../ClosedExperienceModule/actions/FetchClosedExperienceFromCosmic/FetchClosedExperienceFromCosmicStart/FetchClosedExperienceFromCosmicStart';
import { createFetchClosedExperienceFromCosmicSuccessAction } from '../../../ClosedExperienceModule/actions/FetchClosedExperienceFromCosmic/FetchClosedExperienceFromCosmicSuccess/FetchClosedExperienceFromCosmicSuccess';
import { getClosedExperienceModule } from '../../../ClosedExperienceModule/ClosedExperience.module';
import { createTransformedCosmicMock } from '../../../shared/tests/CosmicMock';
import { FEATURE_NAME } from '../../NonProfitFeature.namespace';

import { NonProfit } from './NonProfit/NonProfit.component';
import { NonProfitContainer } from './NonProfitContainer.component';

jest.mock('./NonProfit/NonProfit.component');
jest.mock('../../../ClosedExperienceModule/sagas/FetchClosedExperienceFromCosmic/FetchClosedExperienceFromCosmic.saga');

describe(NonProfitContainer.displayName, (): void => {
    it('was created by the app', (): void => {
        expect(NonProfitContainer.displayName).toContain('NonProfitContainer');
        expect(NonProfitContainer.app).toBe(FEATURE_NAME);
    });

    describe('when fetching from cosmic', (): void => {
        it('return null', (): void => {
            const { component, store }: ITestComponent = bootstrapAndRender(
                <NonProfitContainer />,
                [getClosedExperienceModule()]
            );

            store.dispatch(createFetchClosedExperienceFromCosmicStartAction());

            expect(component.queryByText(NonProfit.displayName)).not.toBeInTheDocument();
        });
    });

    describe('when there is an error when fetching from cosmic', (): void => {
        it('return null', (): void => {
            const { component, store }: ITestComponent = bootstrapAndRender(
                <NonProfitContainer />,
                [getClosedExperienceModule()]
            );

            store.dispatch(createFetchClosedExperienceFromCosmicErrorAction('Error message'));

            expect(component.queryByText(NonProfit.displayName)).not.toBeInTheDocument();
        });
    });

    describe('when fetched from cosmic successfully', (): void => {
        it('should contain the NonProfit component', (): void => {
            const { component, store }: ITestComponent = bootstrapAndRender(
                <NonProfitContainer />,
                [getClosedExperienceModule()]
            );

            store.dispatch(createFetchClosedExperienceFromCosmicSuccessAction(createTransformedCosmicMock()));

            expect(component.getByText(NonProfit.displayName)).toBeInTheDocument();
        });
    });
});
