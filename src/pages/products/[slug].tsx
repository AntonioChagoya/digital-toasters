// import '@egjs/react-flicking/dist/flicking.css';
// import '@egjs/flicking-plugins/dist/flicking-plugins.css';
// import '@egjs/flicking-plugins/dist/pagination.css';
import { GetServerSideProps } from 'next';
// Hooks
import { getArticleBySlug } from '@services/articles/getArticleBySlug';

// Types
import { Locale, LayoutType } from '@appTypes/app';

type Props = {
	product: IProduct;
};

export const getServerSideProps = (async ({ params, locale, query }) => {
	try {
		const { data } = await getArticleBySlug(
			params?.slug,
			Locale[locale as keyof typeof Locale],
			query
		);

		return {
			props: {
				product: data?.data || {},
			},
		};
	} catch (error) {
		return {
			redirect: {
				permanent: false,
				destination: '/500',
			},
		};
	}
}) satisfies GetServerSideProps<Props>;

const ProductPage = ({ product }: { product: IProduct }) => {
	console.log('product', product.attributes);

	return <>test</>;
};

ProductPage.layout = LayoutType.PUBLIC;
export default ProductPage;
