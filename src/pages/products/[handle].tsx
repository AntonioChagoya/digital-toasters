import '@egjs/react-flicking/dist/flicking.css';
import '@egjs/flicking-plugins/dist/flicking-plugins.css';
import '@egjs/flicking-plugins/dist/pagination.css';

// GraphQL
import { GET_PRODUCT_BY_SLUG } from '@graphql/queries/products';
import { createApolloClient } from '@graphql/apollo';

// Types
import { LayoutType } from 'types/app';

export const getServerSideProps = async ({ params }) => {
	try {
		return {
			props: {
				product: [],
			},
		};
	} catch (error) {
		console.log('Custom error', error);
		return {
			props: {
				product: {},
			},
		};
	}
};

const ProductPage = ({ product }: { product }) => {
	console.log('product', product);

	return <></>;
};

ProductPage.layout = LayoutType.PUBLIC;
export default ProductPage;
