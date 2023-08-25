// Apollo Client
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2023-07/graphql.json`,
});

const authLink = setContext((_, { headers }) => {

  return {
    headers: {
      ...headers,
      'X-Shopify-Storefront-Access-Token': `${process.env.NEXT_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN}` || ""
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  // link: httpLink,
  link: authLink.concat(httpLink),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
    },
    query: {
      fetchPolicy: "no-cache",
    },
    mutate: {
      errorPolicy: "none",
    },
  },
});

export { client };
