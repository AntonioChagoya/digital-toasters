import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

console.log("NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN", process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN);

// Shopify Storefront API
const httpLink = createHttpLink({
  uri: `/shopify/api/2023-07/graphql.json`,
});

// Shopify Admin API
const httpLink2 = createHttpLink({
  uri: `/shopify/admin/api/2023-07/graphql.json`,
});

// // Shopify Storefront API
// const ssrHttpLink = createHttpLink({
//   uri: `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2023-07/graphql.json`,
// });

// // Shopify Admin API
// const ssrHttpLink2 = createHttpLink({
//   uri: `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/admin/api/2023-07/graphql.json`,
// });

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
 *  Client Side Rendering (CSR) 
 *  Apollo Client configuration for Shopify Storefront API and Shopify Admin API 
 */

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.split(
    operation => operation.getContext().clientName === "shopify-admin",
    authLink.concat(httpLink2),
    authLink.concat(httpLink),
  ),
});


export { client };
