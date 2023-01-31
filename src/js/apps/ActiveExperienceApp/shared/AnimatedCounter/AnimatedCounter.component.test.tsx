import { RenderResult, render, waitFor, act } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import { AnimatedCounter } from './AnimatedCounter.component';

const endCount: number = 7456;
const formattedDonorCount: string = Number(endCount).toLocaleString('en');

describe('AnimatedCounter Component', (): void => {
    let component: RenderResult;

    beforeEach((): void => {
        jest.useFakeTimers();

        component = render(<AnimatedCounter end={endCount} />);
    });

    afterEach((): void => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    it('should render the Component', async (): Promise<void> => {
        act((): void => {
            jest.advanceTimersByTime(2000);
        });

        await waitFor((): void => {
            const countEl: HTMLElement = component.getByText(`${formattedDonorCount}`) as HTMLElement;

            expect(countEl).toBeInTheDocument();
        });
    });
});
