import { ApolloClient, HttpLink, ApolloProvider, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { IPropsWithChildren } from '@omaze/app';
import { ApolloPageClientProvider } from '@omaze/cms';
import fetch from 'cross-fetch';
import React, { Fragment, FunctionComponent, ReactElement } from 'react';

import { createApolloSanityClient } from './apolloSanityClient';
import { CuratedCollections } from './CuratedCollections/CuratedCollections';
import { FeaturedAdList } from './FeaturedAdList/FeaturedAdList';
import { Portal } from './shared/Portal/Portal.component';

const API_VERSION: string = '2021-07';
const STOREFRONT_URL: string = `/api/${API_VERSION}/graphql.json`;
const STOREFRONT_ACCESS_TOKEN: string = window.ozShopifyStorefrontClientToken;

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    link: new HttpLink({
        uri: STOREFRONT_URL,
        fetch: fetch,
        headers: {
            'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
        },
    }),
    cache: new InMemoryCache(),
});

export interface IHomepageAppProps {
    StorefrontProvider?: FunctionComponent<IPropsWithChildren>;
    SanityProvider?: FunctionComponent<IPropsWithChildren>;
}

export function DefaultStorefrontProvider (props: IPropsWithChildren): ReactElement {
    return (
        <ApolloProvider client={client}>
            {props.children}
        </ApolloProvider>
    );
}

export function DefaultSanityProvider (props: IPropsWithChildren): ReactElement {
    return (
        <ApolloProvider client={createApolloSanityClient(window.ozSanityConfig)}>
            <ApolloPageClientProvider>
                {props.children}
            </ApolloPageClientProvider>
        </ApolloProvider>
    );
}

export function HomepageApp (props: IHomepageAppProps): ReactElement {
    const {
        StorefrontProvider = DefaultStorefrontProvider,
        SanityProvider = DefaultSanityProvider,
    }: IHomepageAppProps = props;

    return (
        <Fragment>
            <StorefrontProvider>
                <Portal el="homepage-app__curated-collections">
                    <CuratedCollections />
                </Portal>
            </StorefrontProvider>
            <SanityProvider>
                <Portal el="homepage-app__featured-ad">
                    <FeaturedAdList />
                </Portal>
            </SanityProvider>
        </Fragment>
    );
}
