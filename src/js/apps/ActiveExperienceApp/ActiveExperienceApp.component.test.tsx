import '@testing-library/jest-dom/extend-expect';

import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import { RenderResult } from '@testing-library/react';
import React from 'react';
import { IModuleStore } from 'redux-dynamic-modules';

import { ActiveExperienceApp } from './ActiveExperienceApp.component';
import { APP_NAME } from './ActiveExperienceApp.namespace';
import { ACTIVE_EXPERIENCE_NAMESPACE } from './ActiveExperienceModule/ActiveExperience.factories';
import { IActiveExperienceState } from './ActiveExperienceModule/ActiveExperience.state';
import { DonationOptions } from './DonationOptions/DonationOptions.component';
import { DonorCounter } from './DonorCounter/DonorCounter.component';
import { createGetDonorCountMock } from './shared/tests/QueryResponseMocks';

jest.mock('./DonationOptions/DonationOptions.component');
jest.mock('./DonorCounter/DonorCounter.component');
jest.mock('./ActiveExperienceModule/sagas/FetchActiveExperienceFromShopify/FetchActiveExperienceFromShopify.saga');
jest.mock('./ActiveExperienceModule/sagas/FetchGeolocation/FetchGeolocation.saga');

const getDonorCountMock: MockedResponse = createGetDonorCountMock();
const queryMocks: MockedResponse[]  = [getDonorCountMock];

describe('ActiveExperienceApp', (): void => {
    let component: RenderResult;
    let store: IModuleStore<any>;

    beforeEach((): void => {
        const testComponent: ITestComponent = bootstrapAndRender(
            <MockedProvider mocks={queryMocks} addTypename={false}>
                <ActiveExperienceApp />
            </MockedProvider>,
        );

        component = testComponent.component;
        store = testComponent.store;
    });

    it('app was created', (): void => {
        expect(ActiveExperienceApp.displayName).toContain('ActiveExperienceApp');
        expect(ActiveExperienceApp.app).toBe(APP_NAME);
    });

    it('should render child components', (): void => {
        expect(component.getByText(DonationOptions.displayName)).toBeInTheDocument();
        expect(component.getByText(DonorCounter.displayName)).toBeInTheDocument();
    });

    it('should fetch geoLocation', (): void => {
        const state: IActiveExperienceState = store.getState()[ACTIVE_EXPERIENCE_NAMESPACE];

        expect(state.isFetchingGeolocation).toBe(true);
    });
});
