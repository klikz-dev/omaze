import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import fetch from 'cross-fetch';

type THeaders = Record<string, string>;

interface ISanityConfig {
    dataset: string,
    projectId: string,
    apiVersion: string,
    tag: string,
    useCDN: string,
    token: string
}

export function createApolloSanityClient (config: ISanityConfig): ApolloClient<NormalizedCacheObject> {
    function setAuthLinkContext (_: any | null, prevContext: { headers: THeaders; authToken?: string; }): { headers: THeaders; } {
        const { token }: ISanityConfig = config;
        const bearerToken: string | undefined = prevContext.authToken || token;

        if (!bearerToken) {
            return {
                headers: prevContext.headers,
            };
        }

        return {
            headers: {
                ...prevContext.headers,
                authorization: `Bearer ${bearerToken}`,
            },
        };
    }

    const authLink: ApolloLink = setContext(setAuthLinkContext);

    function getSanityUri (config: ISanityConfig, forceNoCdn: boolean): string {
        const { dataset, projectId, apiVersion, tag, useCDN }: ISanityConfig = config;
        const api: string = (useCDN && !forceNoCdn) ? 'apicdn' : 'api';

        return `https://${projectId}.${api}.sanity.io/v${apiVersion}/graphql/${dataset}/${tag}`;
    }

    const httpLink: ApolloLink = createHttpLink({
        uri: getSanityUri(config, true),
        fetch: fetch,
        credentials: 'include',
    });

    const apolloSanityClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    });

    return apolloSanityClient;
}
