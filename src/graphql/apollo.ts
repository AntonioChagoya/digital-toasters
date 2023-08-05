// Apollo Client
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "apollo-link-context";

const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_STOREFRONT_API}`,
});

const authLink = setContext((_, { headers }) => {

  return {
    headers: {
      ...headers,
      'X-Shopify-Storefront-Access-Token': `${process.env.NEXT_PUBLIC_STOREFRONT_API_TOKEN}` || ""
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
