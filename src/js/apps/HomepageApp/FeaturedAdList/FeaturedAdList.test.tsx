import { IPage, IUsePage, usePage } from '@omaze/cms';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { mocked } from 'ts-jest';
import { MockedFunctionDeep } from 'ts-jest/dist/utils/testing';

import { IFeaturedAdProps } from './FeaturedAd/FeaturedAd';
import { FeaturedAdList } from './FeaturedAdList';

import '@testing-library/jest-dom/extend-expect';

jest.mock('@omaze/cms');

const mockedusePage: MockedFunctionDeep<(id: string) => IUsePage> = mocked(usePage, true);

function createFeaturedAd (title: string, subtitle: string, cta: string): IFeaturedAdProps {
    return {
        title: title,
        cta: cta,
        subtitle: subtitle,
        link: 'http://testurl.com/',
        image: {
            alt: title,
            sizes: {
                '16/9': 'http://testurl.com/images.jpg',
                '4/3': 'http://testurl.com/images.jpg',
            },
        },
        publishedAt: new Date(),
    };
}

const mockFeaturedAds: IFeaturedAdProps[] = [
    createFeaturedAd('test title', 'test subtitle', 'cta1'),
    createFeaturedAd('test title2', 'subtitle2', 'cta2'),
    createFeaturedAd('test title3', 'subtitle3', 'cta3'),
];

const mockHomepage: IPage = {
    blocks: [
        {
            type: 'FeaturedAd',
            content: mockFeaturedAds[0],
        },
        {
            type: 'FeaturedAd',
            content: mockFeaturedAds[1],
        },
        {
            type: 'FeaturedAd',
            content: mockFeaturedAds[2],
        },
    ],
};

function renderFeaturedAdList (id: string): void {
    window.ozSanityConfig.pages['home_page'] = id;

    mockedusePage.mockImplementation((id: string): IUsePage => {
        if (id === 'loading_page') {
            return {
                loading: true,
                error: undefined,
                page: null,
            };
        }

        if (id === 'error_page') {
            return {
                loading: false,
                error: 'Error',
                page: null,
            };
        }

        return {
            loading: false,
            error: undefined,
            page: mockHomepage,
        };
    });

    render(
        <FeaturedAdList/>
    );
}

describe('FeaturedAdList', (): void => {
    window.ozSanityConfig = {
        dataset: 'string',
        projectId: 'string',
        apiVersion: 'string',
        tag: 'string',
        useCDN: 'string',
        token: 'string',
        pages: {
            'home_page': 'test-homepage-id',
        },
    };

    it('displays a featuredAd for each featuredAd given', (): void => {
        renderFeaturedAdList('successful_page');

        expect(screen.getByText('test title')).toBeInTheDocument();
        expect(screen.getByText('test title2')).toBeInTheDocument();
        expect(screen.getByText('test title3')).toBeInTheDocument();
    });

    it('displays skeleton loading', (): void => {
        renderFeaturedAdList('loading_page');

        expect(screen.getByTestId('featuredAdLoadingTest')).toBeInTheDocument();
    });

    it('returns an error if one exists', (): void => {
        renderFeaturedAdList('error_page');

        expect(screen.getByText('Error! Something went wrong.')).toBeInTheDocument();
    });

    describe('analytics', (): void => {
        beforeEach((): void => {
            window.dataLayer = [];

            renderFeaturedAdList('successful_page');
        });

        it('tracks the hero image click', (): void => {
            expect(window.dataLayer.length).toBe(0);

            userEvent.click(screen.getAllByRole('img')[0]);

            expect(window.dataLayer.length).toBe(1);
            /* eslint-disable camelcase */
            expect(window.dataLayer[0]).toEqual({
                event: 'click',
                ga_category: 'Homepage Buttons',
                ga_action: 'Click',
                ga_label: 'Homepage Hero 1',
            });
            /* eslint-enable camelcase */
        });

        it('tracks the cta link click', (): void => {
            expect(window.dataLayer.length).toBe(0);

            userEvent.click(screen.getAllByRole('link', { name: 'cta1' })[0]);

            expect(window.dataLayer.length).toBe(1);
            /* eslint-disable camelcase */
            expect(window.dataLayer[0]).toEqual({
                event: 'click',
                ga_category: 'Homepage Buttons',
                ga_action: 'Click',
                ga_label: 'Homepage Hero 1',
            });
            /* eslint-enable camelcase */
        });
    });
});
