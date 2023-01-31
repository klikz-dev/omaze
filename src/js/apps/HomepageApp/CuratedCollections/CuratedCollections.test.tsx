import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { screen, render, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import {
    mockTrendingCollection,
    mockCarsCollection,
    mockNullCollection,
    mockTravelCollection,
    mockCollectionWithLessThanFourSweepstakes,
    mockDefaultCollection,
} from '../useShopifyCollection/mockCollections';
import { GET_COLLECTION_QUERY } from '../useShopifyCollection/useShopifyCollection';

import { CuratedCollections } from './CuratedCollections';

const mocks: MockedResponse[] = [
    {
        request: {
            query: GET_COLLECTION_QUERY,
            variables: {
                handle: 'travel',
            },
        },
        result: mockTravelCollection,
    },
    {
        request: {
            query: GET_COLLECTION_QUERY,
            variables: {
                handle: 'clown-college',
            },
        },
        error: new Error('An error occurred'),
    },
    {
        request: {
            query: GET_COLLECTION_QUERY,
            variables: {
                handle: 'empty-result',
            },
        },
        result: mockNullCollection,
    },
];

const mocksWithEligibilityConsidered: MockedResponse[] = [
    {
        request: {
            query: GET_COLLECTION_QUERY,
            variables: {
                handle: 'trending',
            },
        },
        result: mockTrendingCollection,
    },
    {
        request: {
            query: GET_COLLECTION_QUERY,
            variables: {
                handle: 'cars',
            },
        },
        result: mockCarsCollection,
    },
];

const mocksInvalidSweepstakes: MockedResponse[] = [
    {
        request: {
            query: GET_COLLECTION_QUERY,
            variables: {
                handle: 'less-than-four-sweepstakes',
            },
        },
        result: mockCollectionWithLessThanFourSweepstakes,
    },
    {
        request: {
            query: GET_COLLECTION_QUERY,
            variables: {
                handle: 'experiences',
            },
        },
        result: mockDefaultCollection,
    },
];

describe('CuratedCollections Component', (): void => {
    beforeEach((): void => {
        window.__OzShopifyCuratedCollectionsData = {
            curated: [
                {
                    id: 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzE2Mzk2MDE5MzE1OQ==',
                    url: '/collections/travel',
                },
            ],
            default: {
                products: [],
                displayTitle: 'Awesome Experiences',
                url: '/collections/experiences',
                id: 'default-collection-id',
            },
        };

        window.ozEligibilitySettings = {
            restrictedCountries: ['UK', 'DE', 'AU'],
            eligibilityDate: new Date('July 10, 2021'),
        };

        window.ozGeolocation = {
            getData: jest.fn().mockReturnValue(Promise.resolve({ COUNTRY_CODE: 'US' })),
        };
    });

    it('should render CuratedCollections Component without crashing', async (): Promise<void> => {
        expect((): void => {
            render(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <CuratedCollections />
                </MockedProvider>
            );
        }).not.toThrow();
    });

    it('should render loaders while fetching collections', async (): Promise<void> => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CuratedCollections />
            </MockedProvider>
        );

        expect(screen.getByTestId('loading-collection')).toBeInTheDocument();
    });

    it('should render a list of collections', async (): Promise<void> => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CuratedCollections />
            </MockedProvider>
        );

        expect(await screen.findByTestId('sweepstakes-carousel')).toBeInTheDocument();
        expect(await screen.findAllByTestId('sweepstakes-carousel')).toHaveLength(1);
        expect(screen.getByText('travel')).toBeInTheDocument();
        expect(screen.getByText('Meet Lady Gaga and Score VIP Seats to Her Vegas Residencies')).toBeInTheDocument();
    });

    it('should render collection title from CMS if it exists', async (): Promise<void> => {
        window.__OzShopifyCuratedCollectionsData.curated[0].displayTitle = 'Custom Title';

        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CuratedCollections />
            </MockedProvider>
        );

        expect(await screen.findByText('Custom Title')).toBeInTheDocument();
    });

    it('should render collection title fetched from shopify if title from CMS does not exist', async (): Promise<void> => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CuratedCollections />
            </MockedProvider>
        );

        expect(await screen.findByText('travel')).toBeInTheDocument();
    });

    it('should link the collection title to the right collection page', async (): Promise<void> => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CuratedCollections />
            </MockedProvider>
        );

        expect(await screen.findByTestId('sweepstakes-carousel')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'travel' })).toHaveAttribute('href', '/collections/travel');
    });

    it('should not render any collection that has no sweepstakes', async (): Promise<void> => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CuratedCollections />
            </MockedProvider>
        );

        expect(await screen.findAllByTestId('sweepstakes-carousel')).toHaveLength(1);
        expect(screen.queryByText('empty-result')).not.toBeInTheDocument();
        expect(screen.getByText('travel')).toBeInTheDocument();
    });

    describe('filter sweepstakes in all collections based on a user\'s location', (): void => {
        const restrictedCountriesCases: string[] = ['UK', 'DE', 'AU'];
        const unRestrictedCountriesCases: string[] = ['US', 'NG', 'CA'];

        describe.each(restrictedCountriesCases)('restricted contries', (country: string): void => {
            it(`should only render sweepstakes that launched before the set eligibility date for users in restricted countries e.g. ${country}`, async (): Promise<void> => {
                window.__OzShopifyCuratedCollectionsData = {
                    curated: [
                        {
                            id: 'trending-collection-id',
                            url: '/collections/trending',
                        },
                        {
                            id: 'cars-collection-id',
                            url: '/collections/cars',
                        },
                    ],
                    default: {
                        products: [],
                        displayTitle: 'Awesome Experiences',
                        url: '/collections/experiences',
                        id: 'default-collection-id',
                    },
                };

                window.ozGeolocation.getData.mockReturnValue(Promise.resolve({ COUNTRY_CODE: country }));

                render(
                    <MockedProvider mocks={mocksWithEligibilityConsidered} addTypename={false}>
                        <CuratedCollections />
                    </MockedProvider>
                );

                expect(await screen.findByText('trending')).toBeInTheDocument();
                expect(screen.queryByText('cars')).not.toBeInTheDocument();
                expect(screen.getAllByTestId('carousel-item')).toHaveLength(4);
            });
        });

        describe.each(unRestrictedCountriesCases)('unrestricted contries', (country: string): void => {
            it(`should only render sweepstakes that launched before the set eligibility date for users in restricted countries e.g. ${country}`, async (): Promise<void> => {
                window.__OzShopifyCuratedCollectionsData = {
                    curated: [
                        {
                            id: 'trending-collection-id',
                            url: '/collections/trending',
                        },
                        {
                            id: 'cars-collection-id',
                            url: '/collections/cars',
                        },
                    ],
                    default: {
                        products: [],
                        displayTitle: 'Awesome Experiences',
                        url: '/collections/experiences',
                        id: 'default-collection-id',
                    },
                };

                window.ozGeolocation.getData.mockReturnValue(Promise.resolve({ COUNTRY_CODE: country }));

                render(
                    <MockedProvider mocks={mocksWithEligibilityConsidered} addTypename={false}>
                        <CuratedCollections />
                    </MockedProvider>
                );

                expect(await screen.findByText('trending')).toBeInTheDocument();
                expect(screen.queryByText('cars')).toBeInTheDocument();
                expect(screen.getAllByTestId('carousel-item')).toHaveLength(8);
            });
        });
    });

    it('should not render a colletion with less than 4 products', async (): Promise<void> => {
        window.__OzShopifyCuratedCollectionsData = {
            curated: [
                {
                    id: 'less-than-four-sweepstakes-id',
                    url: '/collections/less-than-four-sweepstakes',
                },
            ],
            default: {
                products: [],
                displayTitle: 'Awesome Experiences',
                url: '/collections/experiences',
                id: 'default-collection-id',
            },
        };
        render(
            <MockedProvider mocks={mocksInvalidSweepstakes} addTypename={false}>
                <CuratedCollections />
            </MockedProvider>
        );

        await waitFor((): void => {
            expect(screen.queryByTestId('sweepstakes-carousel')).not.toBeInTheDocument();
        });
        expect(screen.queryByText('Less Than Four Sweepstakes')).not.toBeInTheDocument();
    });

    it('should only render one collection if there are duplicates', async (): Promise<void> => {
        window.__OzShopifyCuratedCollectionsData = {
            curated: [
                {
                    id: 'trending-collection-id',
                    url: '/collections/trending',
                },
                {
                    id: 'trending-collection-id',
                    url: '/collections/trending',
                },
            ],
            default: {
                products: [],
                displayTitle: 'Awesome Experiences',
                url: '/collections/experiences',
                id: 'default-collection-id',
            },
        };

        render(
            <MockedProvider mocks={mocksWithEligibilityConsidered} addTypename={false}>
                <CuratedCollections />
            </MockedProvider>
        );

        expect(await screen.findAllByText('trending')).toHaveLength(1);
    });

    it('should not render the default collection if at least one valid curated collection exists', async (): Promise<void> => {
        window.__OzShopifyCuratedCollectionsData = {
            curated: [
                {
                    id: 'less-than-four-sweepstakes-id',
                    url: '/collections/less-than-four-sweepstakes',
                },
                {
                    id: 'trending-collection-id',
                    url: '/collections/trending',
                },
                {
                    id: 'cars-collection-id',
                    url: '/collections/cars',
                },
                {
                    id: 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzE2Mzk2MDE5MzE1OQ==',
                    url: '/collections/travel',
                },
            ],
            default: {
                products: [],
                displayTitle: 'Awesome Experiences',
                url: '/collections/experiences',
                id: 'default-collection-id',
            },
        };

        render(
            <MockedProvider mocks={[...mocks, ...mocksInvalidSweepstakes, ...mocksWithEligibilityConsidered]} addTypename={false}>
                <CuratedCollections />
            </MockedProvider>
        );

        expect(screen.getAllByTestId('loading-collection')).toHaveLength(4);

        await waitForElementToBeRemoved((): HTMLElement[] => {
            return screen.getAllByTestId('loading-collection');
        });

        expect(screen.queryByText('Awesome Experiences')).not.toBeInTheDocument();
    });

    it('should render a default collection if no valid curated collections', async (): Promise<void> => {
        window.__OzShopifyCuratedCollectionsData = {
            curated: [
                {
                    id: 'less-than-four-sweepstakes-id',
                    url: '/collections/less-than-four-sweepstakes',
                },
            ],
            default: {
                products: [],
                displayTitle: 'Awesome Experiences',
                url: '/collections/experiences',
                id: 'default-collection-id',
            },
        };
        render(
            <MockedProvider mocks={mocksInvalidSweepstakes} addTypename={false}>
                <CuratedCollections />
            </MockedProvider>
        );

        await waitForElementToBeRemoved((): HTMLElement[] => {
            return screen.getAllByTestId('loading-collection');
        });

        expect(await screen.findByText('Awesome Experiences')).toBeInTheDocument();
    });
});
