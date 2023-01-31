import '@testing-library/jest-dom/extend-expect';
import { useQuery, QueryResult } from '@apollo/client';
import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import { RenderResult, waitFor, act } from '@testing-library/react';
import React from 'react';

import { getActiveExperienceModule } from '../ActiveExperienceModule/ActiveExperience.module';

import { DonorCounter } from './DonorCounter.component';

jest.mock('@apollo/client');

const mockUseQuery: any = useQuery as jest.MockedFunction<typeof useQuery>;

describe('DonationCounter', (): void => {
    let component: RenderResult;
    let portalEl: HTMLDivElement;

    beforeEach((): void => {
        jest.useFakeTimers();

        portalEl = document.createElement('div');
        portalEl.id = 'active-experience-app__donor-counter';
        document.body.appendChild(portalEl);

        mockUseQuery.mockReturnValue({
            loading: false,
            data: {
                getDonorsCount: {
                    // eslint-disable-next-line camelcase
                    donor_count: 123,
                },
            },
        } as QueryResult);

        const testComponent: ITestComponent = bootstrapAndRender(
            <DonorCounter />,
            [getActiveExperienceModule()]
        );

        component = testComponent.component;
    });

    afterEach((): void => {
        document.body.removeChild(portalEl);
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    it('should render the donor count', async (): Promise<void> => {
        const expectedCopy: string = '123 donors';

        act((): void => {
            jest.advanceTimersByTime(2500);
        });

        await waitFor((): void => {
            expect(component.getByText(expectedCopy)).toBeInTheDocument();
        });
    });
});
