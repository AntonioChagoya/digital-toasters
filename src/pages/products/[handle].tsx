// import '@egjs/react-flicking/dist/flicking.css';
// import '@egjs/flicking-plugins/dist/flicking-plugins.css';
// import '@egjs/flicking-plugins/dist/pagination.css';

// Types
import { LayoutType } from 'types/app';

export const getServerSideProps = async () => {
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

const ProductPage = () => {
	return <></>;
};

ProductPage.layout = LayoutType.PUBLIC;
export default ProductPage;
