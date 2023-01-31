import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import mediaQuery from 'css-mediaquery';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import { ICollection, ISweepstakesCarouselProps, SweepstakesCarousel } from './SweepstakesCarousel';

const mockCollection: ICollection = {
    title: 'Closing soon',
    handle: 'closing-soon',
    sweepstakesList: [
        {
            image: {
                src: 'https://cdn.shopify.com/s/files/1/0043/8471/8938/products/162074695689517631_812x457_crop_center.jpg?v=1620920473',
                alt: 'image alt',
            },
            charity: '3 Stupid Dogs',
            title: 'Win a 2022 Mercedes Benz with $20000 in the trunk',
            url: '/product/mercedes-benz-2022',
            handle: 'mercedes-benz-2022',
            launchDate: new Date(),
            closeDate: new Date(),
            hasWinner: false,
        },
        {
            image: {
                src: 'https://cdn.shopify.com/s/files/1/0043/8471/8938/products/162074695689517631_812x457_crop_center.jpg?v=1620920473',
                alt: 'image alt',
            },
            charity: 'American Cancer Society',
            title: 'Spend a luxury weekend in the Bahamas',
            url: '/product/bahamas-weekend',
            handle: 'bahamas-weekend',
            launchDate: new Date(),
            closeDate: new Date(),
            hasWinner: false,
        },
        {
            image: {
                src: 'https://cdn.shopify.com/s/files/1/0043/8471/8938/products/162074695689517631_812x457_crop_center.jpg?v=1620920473',
                alt: 'image alt',
            },
            charity: 'American Cancer Society',
            title: 'Spend a luxury weekend in the Bahamas',
            url: '/product/bahamas-weekend',
            handle: 'bahamas-weekend',
            launchDate: new Date(),
            closeDate: new Date(),
            hasWinner: false,
        },
        {
            image: {
                src: 'https://cdn.shopify.com/s/files/1/0043/8471/8938/products/162074695689517631_812x457_crop_center.jpg?v=1620920473',
                alt: 'image alt',
            },
            charity: 'American Cancer Society',
            title: 'Spend a luxury weekend in the Bahamas',
            url: '/product/bahamas-weekend',
            handle: 'bahamas-weekend',
            launchDate: new Date(),
            closeDate: new Date(),
            hasWinner: false,
        },
        {
            image: {
                src: 'https://cdn.shopify.com/s/files/1/0043/8471/8938/products/162074695689517631_812x457_crop_center.jpg?v=1620920473',
                alt: 'image alt',
            },
            charity: 'American Cancer Society',
            title: 'Spend a luxury weekend in the Bahamas',
            url: '/product/bahamas-weekend',
            handle: 'bahamas-weekend',
            launchDate: new Date(),
            closeDate: new Date(),
            hasWinner: false,
        },
        {
            image: {
                src: 'https://cdn.shopify.com/s/files/1/0043/8471/8938/products/162074695689517631_812x457_crop_center.jpg?v=1620920473',
                alt: 'image alt',
            },
            charity: 'American Cancer Society',
            title: 'Spend a luxury weekend in the Bahamas',
            url: '/product/bahamas-weekend',
            handle: 'bahamas-weekend',
            launchDate: new Date(),
            closeDate: new Date(),
            hasWinner: false,
        },
        {
            image: {
                src: 'https://cdn.shopify.com/s/files/1/0043/8471/8938/products/162074695689517631_812x457_crop_center.jpg?v=1620920473',
                alt: 'image alt',
            },
            charity: 'American Cancer Society',
            title: 'Spend a luxury weekend in the Bahamas',
            url: '/product/bahamas-weekend',
            handle: 'bahamas-weekend',
            launchDate: new Date(),
            closeDate: new Date(),
            hasWinner: false,
        },
        {
            image: {
                src: 'https://cdn.shopify.com/s/files/1/0043/8471/8938/products/162074695689517631_812x457_crop_center.jpg?v=1620920473',
                alt: 'image alt',
            },
            charity: 'American Cancer Society',
            title: 'Spend a luxury weekend in the Bahamas',
            url: '/product/bahamas-weekend',
            handle: 'bahamas-weekend',
            launchDate: new Date(),
            closeDate: new Date(),
            hasWinner: false,
        },
        {
            image: {
                src: 'https://cdn.shopify.com/s/files/1/0043/8471/8938/products/162074695689517631_812x457_crop_center.jpg?v=1620920473',
                alt: 'image alt',
            },
            charity: 'American Cancer Society',
            title: 'Spend a luxury weekend in the Bahamas',
            url: '/product/bahamas-weekend',
            handle: 'bahamas-weekend',
            launchDate: new Date(),
            closeDate: new Date(),
            hasWinner: false,
        },
        {
            image: {
                src: 'https://cdn.shopify.com/s/files/1/0043/8471/8938/products/162074695689517631_812x457_crop_center.jpg?v=1620920473',
                alt: 'image alt',
            },
            charity: 'American Cancer Society',
            title: 'Spend a luxury weekend in the Bahamas',
            url: '/product/bahamas-weekend',
            handle: 'bahamas-weekend',
            launchDate: new Date(),
            closeDate: new Date(),
            hasWinner: false,
        },
        {
            image: {
                src: 'https://cdn.shopify.com/s/files/1/0043/8471/8938/products/162074695689517631_812x457_crop_center.jpg?v=1620920473',
                alt: 'image alt',
            },
            charity: 'American Cancer Society',
            title: 'Spend a luxury weekend in the Bahamas',
            url: '/product/bahamas-weekend',
            handle: 'bahamas-weekend',
            launchDate: new Date(),
            closeDate: new Date(),
            hasWinner: false,
        },
        {
            image: {
                src: 'https://cdn.shopify.com/s/files/1/0043/8471/8938/products/162074695689517631_812x457_crop_center.jpg?v=1620920473',
                alt: 'image alt',
            },
            charity: 'American Cancer Society',
            title: 'Spend a luxury weekend in the Bahamas',
            url: '/product/bahamas-weekend',
            handle: 'bahamas-weekend',
            launchDate: new Date(),
            closeDate: new Date(),
            hasWinner: false,
        },
        {
            image: {
                src: 'https://cdn.shopify.com/s/files/1/0043/8471/8938/products/162074695689517631_812x457_crop_center.jpg?v=1620920473',
                alt: 'image alt',
            },
            charity: 'American Cancer Society',
            title: 'Spend a luxury weekend in the Bahamas',
            url: '/product/bahamas-weekend',
            handle: 'bahamas-weekend',
            launchDate: new Date(),
            closeDate: new Date(),
            hasWinner: false,
        },
    ],
};

const fakeCarouselProps: ISweepstakesCarouselProps = {
    'data-testid': 'test-carousel',
    collection: mockCollection,
};

function createMatchMedia (width: number): (query: string) => { removeListener: () => void; matches: boolean; addListener: () => void } {
    return (query: string): { matches: boolean; addListener: () => void; removeListener: () => void; } => {
        return {
            matches: mediaQuery.match(query, {
                width: width,
            }),
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/no-empty-function
            addListener: () => {},
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/no-empty-function
            removeListener: () => {},
        };
    };
}

/**
 * Sets the screen size to a specific width.
 */
function setScreenWidth (width: string): void {
    Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.matchMedia = createMatchMedia(window.innerWidth);
}

function resetScreenWidth (): void {
    const DEFAULT_JS_DOM_WIDTH: string = '1024px';

    setScreenWidth(DEFAULT_JS_DOM_WIDTH);
}

describe('SweepstakesCarousel Component', (): void => {
    beforeEach((): void => {
        resetScreenWidth();

        window.ozEligibilitySettings = {
            restrictedCountries: ['UK', 'DE', 'AU'],
            eligibilityDate: new Date('July 10, 2021'),
        };

        window.ozGeolocation = {
            getData: jest.fn().mockReturnValue(Promise.resolve({ COUNTRY_CODE: 'US' })),
        };
    });

    it('should render without crashing', async (): Promise<void> => {
        render(<SweepstakesCarousel {...fakeCarouselProps} />);

        expect(await screen.findByTestId('test-carousel')).toBeInTheDocument();
    });

    it('should render a title', async (): Promise<void> => {
        render(<SweepstakesCarousel {...fakeCarouselProps} />);

        expect(screen.getByText('Closing soon')).toBeInTheDocument();

        render(<SweepstakesCarousel collection={{
            ...mockCollection,
            title: 'Only at Omaze',
        }}
        />);

        expect(await screen.findByText('Only at Omaze')).toBeInTheDocument();
    });

    it('should render a list of sweepstakes cards', async (): Promise<void> => {
        render(<SweepstakesCarousel {...fakeCarouselProps} />);

        expect(await screen.findAllByTestId('carousel-item')).toHaveLength(13);
    });

    it('should not render carousel if collection is empty', async (): Promise<void> => {
        render(<SweepstakesCarousel collection={{
            ...mockCollection,
            sweepstakesList: [],
        }}
        />);

        await waitFor((): void => {
            expect(screen.queryByTestId('test-carousel')).not.toBeInTheDocument();
        });
    });

    it('should not render a pagination component on mobile', async (): Promise<void> => {
        setScreenWidth('400px');
        render(<SweepstakesCarousel collection={mockCollection} />);

        assertNoPaginationComponent();
    });

    it('should render the pagination component on tablet and desktop', async (): Promise<void> => {
        render(<SweepstakesCarousel collection={mockCollection} />);

        expect(await screen.findByLabelText('Current Page')).toBeInTheDocument();
        expect(screen.getByLabelText('Total Pages')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Goto Page 1' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Goto Page 2' })).toBeInTheDocument();
    });

    it('should not render the pagination component on desktop when only one page of sweepstakes list is shown', async (): Promise<void> => {
        setScreenWidth('1200px');

        render(<SweepstakesCarousel collection={{
            title: mockCollection.title,
            handle: mockCollection.handle,
            sweepstakesList: mockCollection.sweepstakesList.slice(0, 4) }}
        />);

        assertNoPaginationComponent();
    });

    it('should not render the pagination component on tablet when only one page of sweepstakes list is shown', async (): Promise<void> => {
        setScreenWidth('1099px');

        render(<SweepstakesCarousel collection={{
            title: mockCollection.title,
            handle: mockCollection.handle,
            sweepstakesList: mockCollection.sweepstakesList.slice(0, 3) }}
        />);

        assertNoPaginationComponent();
    });

    describe('when the next button is clicked', (): void => {
        it('should slide to the first page if currently on the last page', async (): Promise<void> => {
            render(<SweepstakesCarousel collection={{
                title: mockCollection.title,
                handle: mockCollection.handle,
                sweepstakesList: mockCollection.sweepstakesList.slice(0, 13) }}
            />);

            fireEvent.click(screen.getByRole('button', { name: 'Goto Page 2' }));
            fireEvent.click(screen.getByRole('button', { name: 'Goto Page 3' }));
            fireEvent.click(screen.getByRole('button', { name: 'Goto Page 4' }));
            fireEvent.click(screen.getByRole('button', { name: 'Goto Page 5' }));
            fireEvent.click(screen.getByRole('button', { name: 'Goto Page 1' }));

            expect(await screen.findByRole('button', { name: 'Goto Page 1' })).toBeInTheDocument();
            expect(await screen.findByRole('button', { name: 'Goto Page 2' })).toBeInTheDocument();
            expect(await screen.findByLabelText('Current Page')).toHaveTextContent('1');
            expect(await screen.findByLabelText('Total Pages')).toHaveTextContent('5');
        });

        it('should slide to the next page', async (): Promise<void> => {
            render(<SweepstakesCarousel collection={{
                title: mockCollection.title,
                handle: mockCollection.handle,
                sweepstakesList: mockCollection.sweepstakesList.slice(0, 13) }}
            />);

            fireEvent.click(screen.getByRole('button', { name: 'Goto Page 2' }));
            expect(await screen.findByRole('button', { name: 'Goto Page 1' })).toBeInTheDocument();
            expect(await screen.findByRole('button', { name: 'Goto Page 3' })).toBeInTheDocument();
            expect(await screen.findByLabelText('Current Page')).toHaveTextContent('2');
            expect(await screen.findByLabelText('Total Pages')).toHaveTextContent('5');

            fireEvent.click(screen.getByRole('button', { name: 'Goto Page 3' }));
            expect(await screen.findByRole('button', { name: 'Goto Page 2' })).toBeInTheDocument();
            expect(await screen.findByRole('button', { name: 'Goto Page 4' })).toBeInTheDocument();
            expect(await screen.findByLabelText('Current Page')).toHaveTextContent('3');
            expect(await screen.findByLabelText('Total Pages')).toHaveTextContent('5');

            fireEvent.click(screen.getByRole('button', { name: 'Goto Page 4' }));
            expect(await screen.findByRole('button', { name: 'Goto Page 3' })).toBeInTheDocument();
            expect(await screen.findByRole('button', { name: 'Goto Page 5' })).toBeInTheDocument();
            expect(await screen.findByLabelText('Current Page')).toHaveTextContent('4');
            expect(await screen.findByLabelText('Total Pages')).toHaveTextContent('5');

            fireEvent.click(screen.getByRole('button', { name: 'Goto Page 5' }));
            expect(await screen.findByRole('button', { name: 'Goto Page 4' })).toBeInTheDocument();
            expect(await screen.findByRole('button', { name: 'Goto Page 1' })).toBeInTheDocument();
            expect(await screen.findByLabelText('Current Page')).toHaveTextContent('5');
            expect(await screen.findByLabelText('Total Pages')).toHaveTextContent('5');
        });
    });

    describe('when previous button is clicked', (): void => {
        it('should remain on the first page if that is the current page', async (): Promise<void> => {
            render(<SweepstakesCarousel collection={{
                title: mockCollection.title,
                handle: mockCollection.handle,
                sweepstakesList: mockCollection.sweepstakesList.slice(0, 13) }}
            />);

            fireEvent.click(screen.getByRole('button', { name: 'Goto Page 1' }));
            expect(await screen.findByRole('button', { name: 'Goto Page 1' })).toBeInTheDocument();
            expect(await screen.findByRole('button', { name: 'Goto Page 2' })).toBeInTheDocument();
            expect(await screen.findByLabelText('Current Page')).toHaveTextContent('1');
        });

        it('should go to the previous page', async (): Promise<void> => {
            render(<SweepstakesCarousel collection={{
                title: mockCollection.title,
                handle: mockCollection.handle,
                sweepstakesList: mockCollection.sweepstakesList.slice(0, 13) }}
            />);

            fireEvent.click(screen.getByRole('button', { name: 'Goto Page 1' }));
            fireEvent.click(screen.getByRole('button', { name: 'Goto Page 2' }));
            fireEvent.click(screen.getByRole('button', { name: 'Goto Page 1' }));
            expect(await screen.findByRole('button', { name: 'Goto Page 1' })).toBeInTheDocument();
            expect(await screen.findByRole('button', { name: 'Goto Page 2' })).toBeInTheDocument();
            expect(await screen.findByLabelText('Current Page')).toHaveTextContent('1');

            fireEvent.click(screen.getByRole('button', { name: 'Goto Page 2' }));
            fireEvent.click(screen.getByRole('button', { name: 'Goto Page 3' }));
            fireEvent.click(screen.getByRole('button', { name: 'Goto Page 4' }));
            fireEvent.click(screen.getByRole('button', { name: 'Goto Page 3' }));
            expect(await screen.findByRole('button', { name: 'Goto Page 2' })).toBeInTheDocument();
            expect(await screen.findByRole('button', { name: 'Goto Page 4' })).toBeInTheDocument();
            expect(await screen.findByLabelText('Current Page')).toHaveTextContent('3');
        });
    });

    describe('analytics', (): void => {
        beforeEach((): void => {
            window.SDG = {
                Analytics: {
                    events: {
                        slickCuratedCollectionsCallback: jest.fn(),
                        pushDataLayerEvent: jest.fn(),
                    },
                },
            };

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            delete window.location;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            window.location = {
                assign: jest.fn(),
                replace: jest.fn(),
            };
        });

        it('tracks card clicks', async (): Promise<void> => {
            render(<SweepstakesCarousel collection={{
                title: mockCollection.title,
                handle: mockCollection.handle,
                sweepstakesList: mockCollection.sweepstakesList.slice(0, 13) }}
            />);

            fireEvent.click((await screen.findAllByTestId('ga-card'))[0]);
            expect(window.SDG.Analytics.events.pushDataLayerEvent).toHaveBeenCalledTimes(1);
            expect(window.SDG.Analytics.events.pushDataLayerEvent).toHaveBeenCalledWith({
                event: 'click',
                /* eslint-disable camelcase */
                ga_category: 'Homepage Curated Collections',
                ga_action: 'Product Click',
                ga_label: 'Closing soon mercedes-benz-2022',
                ga_value: 1,
                /* eslint-enable camelcase */
            });

            fireEvent.click(screen.getAllByTestId('ga-card')[1]);
            fireEvent.click(screen.getAllByTestId('ga-card')[2]);
            expect(window.SDG.Analytics.events.pushDataLayerEvent).toHaveBeenCalledTimes(3);
        });
    });

    it('tracks carousel header clicks', async (): Promise<void> => {
        render(<SweepstakesCarousel collection={{
            title: mockCollection.title,
            handle: mockCollection.handle,
            sweepstakesList: mockCollection.sweepstakesList.slice(0, 13) }}
        />);

        fireEvent.click(await screen.findByText(mockCollection.title));

        expect(window.SDG.Analytics.events.pushDataLayerEvent).toHaveBeenCalledTimes(1);
        expect(window.SDG.Analytics.events.pushDataLayerEvent).toHaveBeenCalledWith({
            event: 'click',
            /* eslint-disable camelcase */
            ga_category: 'Homepage Curated Collections',
            ga_action: 'Collection Page Link',
            ga_label: 'Closing soon',
            /* eslint-enable camelcase */
        });
    });

    it('tracks carousel swipes and previous / next button clicks', async (): Promise<void> => {
        render(<SweepstakesCarousel collection={{
            title: mockCollection.title,
            handle: mockCollection.handle,
            sweepstakesList: mockCollection.sweepstakesList.slice(0, 13) }}
        />);

        fireEvent.click(await screen.findByRole('button', { name: 'Goto Page 2' }));

        await waitFor((): void => {
            expect(window.SDG.Analytics.events.slickCuratedCollectionsCallback).toHaveBeenCalledTimes(1);
        });
    });
});

async function assertNoPaginationComponent (): Promise<void> {
    await waitFor((): void => {
        expect(screen.queryByLabelText('Current Page')).not.toBeInTheDocument();
    });

    const totalPages: HTMLElement | null = screen.queryByLabelText('Total Pages');
    const previousArrow: HTMLElement | null = screen.queryByRole('button', { name: 'Goto Page' });
    const nextArrow: HTMLElement | null = screen.queryByRole('button', { name: 'Goto Page' });

    expect(totalPages).not.toBeInTheDocument();
    expect(previousArrow).not.toBeInTheDocument();
    expect(nextArrow).not.toBeInTheDocument();
}
