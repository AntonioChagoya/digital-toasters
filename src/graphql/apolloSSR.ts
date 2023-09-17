import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink, NormalizedCacheObject } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import merge from 'deepmerge';
import isEqual from 'lodash-es/isEqual';

let apolloClient: ApolloClient<NormalizedCacheObject> | null;
// Shopify Storefront API
const httpLink = createHttpLink({
  uri: `/shopify/api/2023-07/graphql.json`,
});

// Shopify Admin API
const httpLink2 = createHttpLink({
  uri: `/shopify/admin/api/2023-07/graphql.json`,
});

// Authentication headers
const authLink = setContext((_, { headers }) => {

  return {
    headers: {
      ...headers,
      'X-Shopify-Storefront-Access-Token': `${process.env.NEXT_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN}` || "",
      'X-Shopify-Access-Token': `${process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_ACCESS_TOKEN}` || ""
    },
  };
});

/* 
 * Server Side Rendering (SSR) Apollo Client configuration for Shopify Storefront API and Shopify Admin API 
 */

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    // link: ApolloLink.split(
    //   operation => operation.getContext().clientName === "shopify-admin",
    //   authLink.concat(httpLink2),
    //   authLink.concat(httpLink),
    // ),
    uri: `/shopify/api/2023-07/graphql.json`,
    cache: new InMemoryCache(),
  })
}


function initializeApollo(initialState?: any) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.cache.extract();

    const data = merge(initialState, existingCache, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });
    _apolloClient.cache.restore(data);
  }

  if (typeof window === 'undefined') {
    return _apolloClient;
  }

  if (!apolloClient) {
    apolloClient = _apolloClient;
  }

  return _apolloClient;
}

function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';
export { addApolloState, initializeApollo, createApolloClient };