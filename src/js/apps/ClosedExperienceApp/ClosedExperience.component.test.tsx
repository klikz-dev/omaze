import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import { ClosedExperienceApp } from './ClosedExperienceApp.component';
import { APP_NAME } from './ClosedExperienceApp.namespace';
import { CLOSED_EXPERIENCE_NAMESPACE } from './ClosedExperienceModule/ClosedExperience.factories';
import { IClosedExperienceState } from './ClosedExperienceModule/ClosedExperience.state';
import { NonProfitFeature } from './NonProfitFeature/NonProfitFeature.component';
import { SummaryFeature } from './SummaryFeature/SummaryFeature.component';

jest.mock('./SummaryFeature/SummaryFeature.component');
jest.mock('./NonProfitFeature/NonProfitFeature.component');
jest.mock('./ClosedExperienceModule/sagas/FetchClosedExperienceFromCosmic/FetchClosedExperienceFromCosmic.saga');
jest.mock('./ClosedExperienceModule/sagas/FetchClosedExperienceFromShopify/FetchClosedExperienceFromShopify.saga');

describe('ClosedExperienceApp', (): void => {
    it('app was created', (): void => {
        expect(ClosedExperienceApp.displayName).toContain('ClosedExperienceApp');
        expect(ClosedExperienceApp.app).toBe(APP_NAME);
    });

    it('should render', (): void => {
        const { component, store }: ITestComponent = bootstrapAndRender(
            <ClosedExperienceApp />,
        );

        expect(component.getByText(SummaryFeature.displayName)).toBeInTheDocument();
        expect(component.getByText(NonProfitFeature.displayName)).toBeInTheDocument();

        const state: IClosedExperienceState = store.getState()[CLOSED_EXPERIENCE_NAMESPACE];

        expect(state.isFetchingCosmic).toBe(true);
    });
});
