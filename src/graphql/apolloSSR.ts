import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink, NormalizedCacheObject } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Shopify Storefront API
const ssrHttpLink = createHttpLink({
  uri: `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2023-07/graphql.json`,
});

// Shopify Admin API
const ssrHttpLink2 = createHttpLink({
  uri: `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/admin/api/2023-07/graphql.json`,
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
    link: ApolloLink.split(
      operation => operation.getContext().clientName === "shopify-admin",
      authLink.concat(ssrHttpLink2),
      authLink.concat(ssrHttpLink),
    ),
    cache: new InMemoryCache(),
  })
}

export { createApolloClient };