import { render, RenderResult, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import { SweepstakesTag } from './SweepstakesTag';

describe('Sweepstakes Tag', (): void => {
    it('exists', (): void=> {
        expect(SweepstakesTag).toBeDefined();
    });

    it('renders', (): void=> {
        expect((): void => {
            render(
                <SweepstakesTag hasWinner={true} closeDate={new Date()} />
            );
        }).not.toThrow();
    });

    it('displays "See who won!" tag', (): void => {
        render(
            <SweepstakesTag hasWinner={true} closeDate={new Date()} />
        );
        expect(screen.getByText('See who won!')).toBeInTheDocument();
        expect(screen.queryByText('Winner Pending')).not.toBeInTheDocument();
    });

    it('displays "Winner Pending" tag', (): void => {
        render(
            <SweepstakesTag hasWinner={false} closeDate={new Date()} />
        );
        expect(screen.getByText('Winner Pending')).toBeInTheDocument();
        expect(screen.queryByText('See who won!')).not.toBeInTheDocument();
    });

    it('displays "48 hours left!" tag', (): void => {
        const date: Date = new Date();
        const now: Date = new Date();

        date.setHours(now.getHours() + 48);

        render(
            <SweepstakesTag hasWinner={false} closeDate={date} />
        );
        expect(screen.getByText('48 hours left!')).toBeInTheDocument();
    });

    it('displays "24 hours left!" tag', (): void => {
        const date: Date = new Date();
        const now: Date = new Date();

        date.setHours(now.getHours() + 24);

        render(
            <SweepstakesTag hasWinner={false} closeDate={date} />
        );
        expect(screen.getByText('24 hours left!')).toBeInTheDocument();
    });

    it('displays "7 days left!" tag', (): void => {
        const date: Date = new Date();
        const now: Date = new Date();

        date.setDate(now.getDate() + 7);

        render(
            <SweepstakesTag hasWinner={false} closeDate={date} />
        );
        expect(screen.getByText('7 days left!')).toBeInTheDocument();
    });

    it('should not render tag if days left is greater than 7', (): void => {
        const date: Date = new Date();
        const now: Date = new Date();

        date.setDate(now.getDate() + 8);

        render(
            <SweepstakesTag hasWinner={false} closeDate={date} />
        );

        expect(screen.queryByText('8 days left!')).not.toBeInTheDocument();
    });

    it('displays "3 days left!" tag', (): void => {
        const date: Date = new Date();
        const now: Date = new Date();

        date.setDate(now.getDate() + 3);

        render(
            <SweepstakesTag hasWinner={false} closeDate={date} />
        );
        expect(screen.getByText('3 days left!')).toBeInTheDocument();
    });

    it('displays "4 days left!" tag', (): void => {
        const date: Date = new Date();
        const now: Date = new Date();

        date.setHours(now.getHours() + 75);

        render(
            <SweepstakesTag hasWinner={false} closeDate={date} />
        );
        expect(screen.getByText('4 days left!')).toBeInTheDocument();
    });

    it('takes in custom className', (): void => {
        const date: Date = new Date();
        const now: Date = new Date();

        date.setHours(now.getHours() + 75);

        const { container }: RenderResult = render(
            <SweepstakesTag hasWinner={false} closeDate={date} className='test' />
        );

        expect(container.querySelectorAll('.test')).toHaveLength(1);
    });
});
