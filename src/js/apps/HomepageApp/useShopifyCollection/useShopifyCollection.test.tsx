import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { renderHook, RenderHookResult } from '@testing-library/react-hooks';
import React, { FunctionComponent, PropsWithChildren, ReactElement } from 'react';

import { mockTravelCollection } from './mockCollections';
import { useShopifyCollection, IUseShopifyCollection, GET_COLLECTION_QUERY } from './useShopifyCollection';

const mocks: MockedResponse[] = [{
    request: {
        query: GET_COLLECTION_QUERY,
        variables: {
            handle: 'travel',
        },
    },
    result: mockTravelCollection,
}, {
    request: {
        query: GET_COLLECTION_QUERY,
        variables: {
            handle: 'clown-college',
        },
    },
    error: new Error('An error occurred'),
}];

describe('useShopifyCollection', (): void => {
    const wrapper: FunctionComponent = (props: PropsWithChildren<unknown>): ReactElement => {
        const { children }: PropsWithChildren<unknown> = props;

        return (
            <MockedProvider mocks={mocks} addTypename={false}>
                {children}
            </MockedProvider>
        );
    };

    it('should fetch a collection from Shopify', async (): Promise<void> => {
        const { result, waitForNextUpdate }: RenderHookResult<string, IUseShopifyCollection> = renderHook((): IUseShopifyCollection => {
            return useShopifyCollection('travel');
        }, {
            wrapper: wrapper,
        });

        await waitForNextUpdate();

        expect(result.current.collection?.id).toBe('Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzE2Mzk2MDE5MzE1OQ==');
        expect(result.current.collection?.products.edges[0].node?.images.edges[0].node.originalSrc)
            .toBe('https://cdn.shopify.com/s/files/1/0305/6363/1239/products/156892433471617914_5bf27747-1764-45b0-9989-63fd6637ec7d.jpg?v=1579137164');
    });

    it('should know if it is loading or not', async (): Promise<void> => {
        const { result, waitForNextUpdate }: RenderHookResult<string, IUseShopifyCollection> = renderHook((): IUseShopifyCollection => {
            return useShopifyCollection('travel');
        }, {
            wrapper: wrapper,
        });

        expect(result.current.loading).toBe(true);

        await waitForNextUpdate();

        expect(result.current.loading).toBe(false);
    });

    it('should return an error if there is one', async (): Promise<void> => {
        const { result, waitForNextUpdate }: RenderHookResult<string, IUseShopifyCollection> = renderHook((): IUseShopifyCollection => {
            return useShopifyCollection('clown-college');
        }, {
            wrapper: wrapper,
        });

        await waitForNextUpdate();

        expect(result.current.error.message).toContain('An error occurred');
    });
});
