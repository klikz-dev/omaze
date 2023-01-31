import { render, screen } from '@testing-library/react';
import React from 'react';

import '@testing-library/jest-dom/extend-expect';

import {
    DOMRectReadOnly,
    getMockObserver,
    mockIntersectionObserver,
    restoreIntersectionObserver,
} from '../testing/mockIntersectionObserver';

import { ISweepstakes } from './SweepstakesCard/SweepstakesCard';
import { SweepstakesList } from './SweepstakesList';

function createSweepstakes (title: string, charity: string): ISweepstakes {
    const handle: string = title.split(' ').map((piece: string): string => {
        return piece.toLowerCase();
    }).join('-');

    return {
        image: {
            src: `http://testurl.com/images/${handle}.jpg`,
            alt: title,
        },
        charity: charity,
        title: title,
        url: `http://testurl.com/${handle}`,
        handle: handle,
        launchDate: new Date(),
        closeDate: new Date(),
        hasWinner: false,
    };
}

describe('SweepstakesList', (): void => {
    const mockCollection: ISweepstakes[] = [
        createSweepstakes('Test Title', 'Test Charity'),
        createSweepstakes('Other Test Title', 'Other Test Charity'),
        createSweepstakes('Another Test Title', 'Another Test Charity'),
    ];

    beforeEach((): void => {
        mockIntersectionObserver();
    });

    afterEach((): void => {
        restoreIntersectionObserver();
    });

    it('displays a sweepstakes card for each sweepstakes given', (): void => {
        render(<SweepstakesList collection={mockCollection} isLoadingMore={false} />);

        mockCollection.forEach((sweepstakes: ISweepstakes): void => {
            expect(screen.getByText(`Support ${sweepstakes.charity}`)).toBeInTheDocument();
            expect(screen.getByText(sweepstakes.title)).toBeInTheDocument();
        });
    });

    it('triggers the scroll bottom event when the user scrolls', (): void => {
        const handleScrollBottom: () => void = jest.fn();

        render(<SweepstakesList collection={mockCollection} onScrollBottom={handleScrollBottom} isLoadingMore={false} />);

        getMockObserver().triggerIntersection([{
            boundingClientRect: new DOMRectReadOnly(),
            intersectionRatio: 0.5,
            intersectionRect: new DOMRectReadOnly(),
            isIntersecting: true,
            rootBounds: null,
            target: document.body,
            time: 10,
        }]);

        expect(handleScrollBottom).not.toHaveBeenCalled();

        getMockObserver().triggerIntersection([{
            boundingClientRect: new DOMRectReadOnly(),
            intersectionRatio: 1,
            intersectionRect: new DOMRectReadOnly(),
            isIntersecting: true,
            rootBounds: null,
            target: document.body,
            time: 15,
        }]);

        expect(handleScrollBottom).toHaveBeenCalled();
    });
});
