import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const ssrHttpLink = createHttpLink({
	uri: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`,
});

function createApolloClient() {
	return new ApolloClient({
		ssrMode: typeof window === 'undefined',
		link: ssrHttpLink,
		cache: new InMemoryCache(),
	});
}

export { createApolloClient };
