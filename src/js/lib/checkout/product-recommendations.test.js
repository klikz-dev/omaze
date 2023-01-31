import '@testing-library/jest-dom/extend-expect';

import 'slick-carousel';
import validate from 'jquery-validation';

import { waitFor } from '@testing-library/react';

import { getEnvironment } from '../env/environment';
import { initCheckoutRecommendations } from './product-recommendations';

jest.mock('../env/environment');

const TAG_EXPERIENCE_ACTIVE = '$experience-active';
const TAG_SWEEPSTAKES_ACTIVE = '$os_sweepstake_status:active';
const TAG_CROSS_SELL = '$oz_sweepstake_collection:cross-sell-prioritized';
const TAG_START_DATE_EQ_7_10 = '$oz_sweepstake_dates-start:2021-07-10T00:00:00.000Z';
const TAG_START_DATE_LT_7_10 = '$oz_sweepstake_dates-start:2021-06-03T00:00:00.000Z';
const TAG_START_DATE_GT_7_10 = '$oz_sweepstake_dates-start:2021-07-12T00:00:00.000Z';

const mockProducts = [
    {
        handle: 'product-1',
        title: 'Product 1: LT710',
        type: 'experience',
        featured_image: 'product1.jpg',
        vendor: 'charity1',
        url: '/products/product1.com',
        id: 1,
        tags: [TAG_EXPERIENCE_ACTIVE, TAG_SWEEPSTAKES_ACTIVE, TAG_START_DATE_LT_7_10],
    },
    {
        handle: 'product-2',
        title: 'Product 2: EQ710',
        type: 'experience',
        featured_image: 'product2.jpg',
        vendor: 'charity2',
        url: '/products/product2.com',
        id: 2,
        tags: [TAG_EXPERIENCE_ACTIVE, TAG_SWEEPSTAKES_ACTIVE, TAG_START_DATE_EQ_7_10],
    },
    {
        handle: 'product-3',
        title: 'Product 3: GTE710',
        type: 'experience',
        featured_image: 'product3.jpg',
        vendor: 'charity3',
        url: '/products/product3.com',
        id: 3,
        tags: [TAG_EXPERIENCE_ACTIVE, TAG_SWEEPSTAKES_ACTIVE, TAG_START_DATE_GT_7_10],
    },
    {
        handle: 'product-4',
        title: 'Product 4: CS-LT710',
        type: 'experience',
        featured_image: 'product4.jpg',
        vendor: 'charity4',
        url: '/products/product4.com',
        id: 4,
        tags: [TAG_EXPERIENCE_ACTIVE, TAG_SWEEPSTAKES_ACTIVE, TAG_CROSS_SELL, TAG_START_DATE_LT_7_10],
    },
    {
        handle: 'product-5',
        title: 'Product 5: CS-EQ710',
        type: 'experience',
        featured_image: 'product5.jpg',
        vendor: 'charity5',
        url: '/products/product5.com',
        id: 5,
        tags: [TAG_EXPERIENCE_ACTIVE, TAG_SWEEPSTAKES_ACTIVE, TAG_CROSS_SELL, TAG_START_DATE_EQ_7_10],
    },
    {
        handle: 'product-6',
        title: 'Product 6: CS-GT710',
        type: 'experience',
        featured_image: 'product6.jpg',
        vendor: 'charity6',
        url: '/products/product6.com',
        id: 6,
        tags: [TAG_EXPERIENCE_ACTIVE, TAG_SWEEPSTAKES_ACTIVE, TAG_CROSS_SELL, TAG_START_DATE_GT_7_10],
    },
    {
        handle: 'product-7',
        title: 'Product 7: LT710',
        type: 'experience',
        featured_image: 'product7.jpg',
        vendor: 'charity7',
        url: '/products/product7.com',
        id: 7,
        tags: [TAG_EXPERIENCE_ACTIVE, TAG_SWEEPSTAKES_ACTIVE, TAG_START_DATE_LT_7_10],
    },
    {
        handle: 'product-8',
        title: 'Product 8: LT710',
        type: 'experience',
        featured_image: 'product8.jpg',
        vendor: 'charity8',
        url: '/products/product8.com',
        id: 8,
        tags: [TAG_EXPERIENCE_ACTIVE, TAG_SWEEPSTAKES_ACTIVE, TAG_START_DATE_LT_7_10],
    },
];

const mockGeoLocationData = {
    COUNTRY_CODE: 'us',
};

const mockShopify = {
    checkout: {
        line_items: [
            {
                product_type: 'a',
                product_id: 1,
            },
            {
                product_type: 'b',
                product_id: 2,
            },
        ],
    },
    Checkout: {
        step: false,
        page: false,
        isOrderStatusPage: true,
    },
};

const boxEl = document.createElement('div');
boxEl.className = 'content-box';

function setup(products, customEnv) {
    window.jQuery = validate;
    window.$ = validate;
    window.Shopify = mockShopify;

    require('../features/analytics/index');

    window.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => {
            return {
                products: products,
            };
        },
    });

    document.body.appendChild(boxEl);

    const defaultEnv = {
        productRecMinProducts: 4,
        productRecUsePriorityCollection: false,
        productRecPriorityCollectionSlug: 'priority',
        productRecDefaultCollectionSlug: 'default',
        restrictedCountries: [],
        // eligibilityDate: Sweepstakes on omaze.com, launched before this date, are available to all countries
        eligibilityDate: new Date('3000-01-01'),
    };

    const env = {
        ...defaultEnv,
        ...customEnv,
    };

    getEnvironment.mockReturnValue(env);

    initCheckoutRecommendations();
}

function teardown() {
    window.jQuery = undefined;
    window.$ = undefined;
    window.Shopify = undefined;
    window.fetch = undefined;
    document.body.innerHTML = '';
}

describe('init', () => {
    afterEach(() => {
        teardown();
    });

    describe('fetching products', () => {
        it('fetches priority collection with productRecUsePriorityCollection ON', async () => {
            const customEnv = {
                productRecUsePriorityCollection: true,
                productRecPriorityCollectionSlug: 'prioritySlug',
            }

            setup(mockProducts, customEnv);

            const expectedFetchPath = '/collections/prioritySlug/products.json?limit=10';

            await waitFor(() => {
                expect(fetch).toHaveBeenCalledTimes(1);
                expect(fetch).toHaveBeenCalledWith(expectedFetchPath);
            });
        });

        it('fetches priority collection with API recommendation with product ID and productRecUsePriorityCollection OFF', async () => {
            const customEnv = {
                productRecUsePriorityCollection: false,
            }

            setup(mockProducts, customEnv);

            const expectedFetchPath = '/recommendations/products.json?product_id=1&limit=10';

            await waitFor(() => {
                expect(fetch).toHaveBeenCalledTimes(1);
                expect(fetch).toHaveBeenCalledWith(expectedFetchPath);
            });
        });

        it('fetches priority and default collections as default', async () => {
            const customEnv = {
                productRecUsePriorityCollection: false,
                productRecPriorityCollectionSlug: 'my-priority',
                productRecDefaultCollectionSlug: 'my-default',
            }

            // first API for product recommendations call will return no Products - []
            const returnedProducts = [];
            setup(returnedProducts, customEnv);

            const expectedFetchPaths = [
                "/recommendations/products.json?product_id=1&limit=10",
                "/collections/my-priority/products.json?limit=10",
                "/collections/my-default/products.json?limit=10",
            ]

            await waitFor(() => {
                expect(fetch).toHaveBeenCalledTimes(3);
                expect(fetch).toHaveBeenNthCalledWith(1, expectedFetchPaths[0]);
                expect(fetch).toHaveBeenNthCalledWith(2, expectedFetchPaths[1]);
                expect(fetch).toHaveBeenNthCalledWith(3, expectedFetchPaths[2]);
            });
        });
    });
});
