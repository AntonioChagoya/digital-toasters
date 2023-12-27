import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
console.log("back strapi url", process.env.NEXT_PUBLIC_STRAPI_API_URL);

const ssrHttpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {

  return {
    headers: {
      ...headers,
    },
  };
});

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: ssrHttpLink,
    cache: new InMemoryCache(),
  })
}

export { createApolloClient };