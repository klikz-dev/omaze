import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
} from '@apollo/client';
import { RestLink } from 'apollo-link-rest';

const DONOR_COUNTER_URI: string = window.ozActiveExperienceApp.config.donorCounterAPIHost;

const restLink: RestLink = new RestLink({
    endpoints: {
        donorCounter: DONOR_COUNTER_URI,
    },
});

export const restClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache: new InMemoryCache(),
    link: restLink,
});
