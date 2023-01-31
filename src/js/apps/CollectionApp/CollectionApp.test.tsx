import '@testing-library/jest-dom/extend-expect';

import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { screen, render, act } from '@testing-library/react';
import React from 'react';

import { CollectionApp } from './CollectionApp';
import { cache } from './shopifyClient/shopifyClient';
import { mockTravelCollection, mockTravelCollectionPage2 } from './testing/mockCollections';
import {
    DOMRectReadOnly,
    getMockObserver,
    mockIntersectionObserver,
    restoreIntersectionObserver,
} from './testing/mockIntersectionObserver';
import { GET_COLLECTION_QUERY } from './useShopifyCollection/useShopifyCollection';

const mocks: MockedResponse[] = [{
    request: {
        query: GET_COLLECTION_QUERY,
        variables: {
            handle: 'experiences',
        },
    },
    result: mockTravelCollection,
}, {
    request: {
        query: GET_COLLECTION_QUERY,
        variables: {
            handle: 'experiences',
            cursor: 'random-cursor-hash-10',
        },
    },
    result: mockTravelCollectionPage2,
}];

describe('CollectionApp', (): void => {
    beforeEach((): void => {
        mockIntersectionObserver();

        window.ozGeolocation = {
            getData: jest.fn(),
        };

        window.ozGeolocation.getData.mockReturnValue(Promise.resolve({
            COUNTRY_CODE: 'US',
            REGION_CODE: 'CA',
            CONTINENT_CODE: 'NA',
        }));

        window.ozEligibilitySettings = {
            restrictedCountries: ['UK', 'DE', 'AU'],
            eligibilityDate: new Date('August 11, 2021'),
        };

        global['window'] = Object.create(window);

        Object.defineProperty(window, 'location', {
            value: {
                href: 'https://www.omaze.com/collections/experiences?oa_h=iZtBQd8RHHs03Kpn5jrzgw&utm_term=collections/experiences&utm_medium=email&utm_source=activation&utm_campaign=MysteryIncentive_LastChance_ARTest_MITest_XC&utm_content=photo_Stock_Image#howitworks',
                pathname: '/collections/experiences',
                search: '?oa_h=iZtBQd8RHHs03Kpn5jrzgw&utm_term=collections/experiences&utm_medium=email&utm_source=activation&utm_campaign=MysteryIncentive_LastChance_ARTest_MITest_XC&utm_content=photo_Stock_Image',
                hash: '#howitworks',
            },
            writable: true,
        });

        cache.reset();
    });

    afterEach((): void => {
        restoreIntersectionObserver();
    });

    it('should exist', (): void => {
        expect(CollectionApp).toBeDefined();
    });

    it('should display a loading message while waiting for shopify data', async (): Promise<void> => {
        render(
            <MockedProvider mocks={mocks} cache={cache}>
                <CollectionApp />
            </MockedProvider>
        );

        expect(screen.getByTestId('loading-collection')).toBeInTheDocument();

        await screen.findByText('Meet Lady Gaga and Score VIP Seats to Her Vegas Residencies');

        expect(screen.queryByTestId('loading-collection')).not.toBeInTheDocument();
    });

    it('should display a list of sweepstakes for a collection', async (): Promise<void> => {
        render(
            <MockedProvider mocks={mocks} cache={cache}>
                <CollectionApp />
            </MockedProvider>
        );

        await screen.findByText('Meet Lady Gaga and Score VIP Seats to Her Vegas Residencies');

        expect(screen.getByText('Meet Lady Gaga and Score VIP Seats to Her Vegas Residencies')).toBeInTheDocument();
    });

    it('should display loading spinner when loading collection', async (): Promise<void> => {
        render(
            <MockedProvider mocks={mocks} cache={cache}>
                <CollectionApp />
            </MockedProvider>
        );

        expect(screen.getByTestId('loading-collection')).toBeInTheDocument();

        await screen.findByText('Meet Lady Gaga and Score VIP Seats to Her Vegas Residencies');
    });

    it('should display a list of sweepstakes when in US', async (): Promise<void> => {
        render(
            <MockedProvider mocks={mocks} cache={cache}>
                <CollectionApp />
            </MockedProvider>
        );

        await screen.findByText('Meet Lady Gaga and Score VIP Seats to Her Vegas Residencies');

        expect(screen.getByText('Voice a Character in Big Mouth and Meet Nick Kroll')).toBeInTheDocument();
    });

    it('should not display a list of sweepstakes when ineligible in UK', async (): Promise<void> => {
        window.ozGeolocation.getData.mockReturnValue(Promise.resolve({
            COUNTRY_CODE: 'UK',
            REGION_CODE: '',
            CONTINENT_CODE: 'EU',
        }));

        render(
            <MockedProvider mocks={mocks} cache={cache}>
                <CollectionApp />
            </MockedProvider>
        );

        await screen.findByText('Meet Lady Gaga and Score VIP Seats to Her Vegas Residencies');

        expect(screen.queryByText('Voice a Character in Big Mouth and Meet Nick Kroll')).not.toBeInTheDocument();
    });

    it('should fetch the 2nd page of sweepstakes when the user scrolls to the bottom', async (): Promise<void> => {
        render(
            <MockedProvider mocks={mocks} cache={cache}>
                <CollectionApp />
            </MockedProvider>
        );

        await screen.findByText('Meet Lady Gaga and Score VIP Seats to Her Vegas Residencies');

        expect(screen.queryByTestId('loading-collection')).not.toBeInTheDocument();

        act((): void => {
            getMockObserver().triggerIntersection([{
                boundingClientRect: new DOMRectReadOnly(),
                intersectionRatio: 1,
                intersectionRect: new DOMRectReadOnly(),
                isIntersecting: true,
                rootBounds: null,
                target: document.body,
                time: 15,
            }]);
        });

        expect(screen.findByTestId('loading-collection'));

        await screen.findByText('Win a Restored 1968 “Bullitt” Ford® Mustang GT Fastback');

        expect(screen.queryByTestId('loading-collection')).not.toBeInTheDocument();

    });
});
