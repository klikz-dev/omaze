import { RenderResult, render, act, waitFor } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import { DonorCounterContainer } from './DonorCounterContainer.component';

const donorCount: number = 7456;
const formattedDonorCount: string = Number(donorCount).toLocaleString('en');

describe('DonorCounterContainer Component', (): void => {

    let component: RenderResult;

    beforeEach((): void => {
        jest.useFakeTimers();

        component = render(<DonorCounterContainer donorCount={donorCount} />);
    });

    afterEach((): void => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    it('should show the correct headline', (): void => {
        expect(component.getByTestId('headline')).toHaveTextContent('Join today\'s');
    });

    it('should render the Component', async (): Promise<void> => {
        act((): void => {
            jest.advanceTimersByTime(2500);
        });

        await waitFor((): void => {
            const donorEl: HTMLElement = component.getByText(`${formattedDonorCount} donors`) as HTMLElement;

            expect(donorEl).toBeInTheDocument();
        });
    });
});
