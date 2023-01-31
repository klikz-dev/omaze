import { screen, render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import { ISweepstakes } from '../shared/ISweepstakes';

import { SweepstakesCard } from './SweepstakesCard';

function addHours (date: Date, hours: number): Date {
    date.setHours(date.getHours() + hours);
    return date;
}

const mockSweepstakes: ISweepstakes = {
    image: {
        src: 'image src 1',
        alt: 'image alt 1',
    },
    charity: 'American Cancer Society',
    title: 'Win a Custom Tesla Model S and $20,000',
    url: '/products/tesla-model-s',
    handle: 'sweepstakes-handle',
    launchDate: new Date(),
    closeDate: addHours(new Date(), 2),
    hasWinner: false,
};

describe('SweepstakesCard Component', (): void => {
    it('should render the SweepstakesCard component', (): void => {
        render(
            <SweepstakesCard data-testid='sweepstakes-card' sweepstakes={mockSweepstakes} />
        );

        expect(screen.getByTestId('sweepstakes-card')).toBeInTheDocument();
    });

    it('should render a sweepstakes image', (): void => {
        render(
            <SweepstakesCard sweepstakes={mockSweepstakes} />
        );

        const image: HTMLImageElement = screen.getByAltText('image alt 1') as HTMLImageElement;

        expect(image).toBeInTheDocument();
    });

    it('should render placeholder if image src is missing', (): void => {
        const sweepstakes: ISweepstakes = {
            ...mockSweepstakes,
            image: {
                src: '',
                alt: 'Image alt',
            },
        };

        render(
            <SweepstakesCard sweepstakes={sweepstakes} />
        );

        const image: HTMLImageElement = screen.getByRole('img') as HTMLImageElement;

        expect(image).toHaveClass('oz-bg-black-10');
    });

    it('should handle responsive images', (): void => {
        const responsiveImageSrcSet: string = 'image src 1 480w, image src 1 650w, image src 1 812w, image src 1 1049w, image src 1 1249w, image src 1 1439w, image src 1 1600w, image src 1 2000w, image src 1 2400w';

        const sweepstakes: ISweepstakes = {
            ...mockSweepstakes,
            image: {
                ...mockSweepstakes.image,
            },
        };

        render(<SweepstakesCard sweepstakes={sweepstakes} />);

        const image: HTMLImageElement = screen.getByRole('img') as HTMLImageElement;

        expect(image).toHaveAttribute('data-srcset', responsiveImageSrcSet);
    });

    it('should use render with a default alt text that matches the sweepstakes title if no alt is provided', async (): Promise<void> => {
        const sweepstakes: ISweepstakes = {
            ...mockSweepstakes,
            image: {
                ...mockSweepstakes.image,
                alt: '',
            },
        };

        render(
            <SweepstakesCard sweepstakes={sweepstakes} />
        );

        const image: HTMLImageElement = await screen.findByRole('img') as HTMLImageElement;

        expect(image).toHaveAttribute('alt', 'Win a Custom Tesla Model S and $20,000');
    });

    it('should render non profit associated with the sweepstakes', (): void => {
        render(
            <SweepstakesCard sweepstakes={mockSweepstakes} />
        );

        const charity: HTMLElement = screen.getByText('Support American Cancer Society');

        expect(charity).toBeInTheDocument();
    });

    it('should render the sweepstakes title', (): void => {
        render(
            <SweepstakesCard sweepstakes={mockSweepstakes} />
        );

        const title: HTMLElement = screen.getByText('Win a Custom Tesla Model S and $20,000');

        expect(title).toBeInTheDocument();
    });

    it('should link to the sweepstakes details page given a url', (): void => {
        render(
            <SweepstakesCard data-testid='sweepstakes-card' sweepstakes={mockSweepstakes} />
        );

        const cardLink: HTMLElement = screen.getByRole('link');

        expect(cardLink).toHaveAttribute('href', '/products/tesla-model-s');
    });

    it('should link to the sweepstakes details page if url is empty', (): void => {
        const sweepstakes: ISweepstakes = {
            ...mockSweepstakes,
            url: '',
        };

        render(
            <SweepstakesCard data-testid='sweepstakes-card' sweepstakes={sweepstakes} />
        );

        const cardLink: HTMLElement = screen.getByRole('link');

        expect(cardLink).toHaveAttribute('href', '/products/sweepstakes-handle');
    });

    it('should show the time left to enter a sweepstake', (): void => {
        const sweepstakes: ISweepstakes = {
            ...mockSweepstakes,
            url: '',
            closeDate: addHours(new Date(), 48),
        };

        render(
            <SweepstakesCard data-testid='sweepstakes-card' sweepstakes={sweepstakes} />
        );

        expect(screen.getByText('48 hours left!')).toBeInTheDocument();
    });
});
