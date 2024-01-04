// import '@egjs/react-flicking/dist/flicking.css';
// import '@egjs/flicking-plugins/dist/flicking-plugins.css';
// import '@egjs/flicking-plugins/dist/pagination.css';

// Next
import { GetServerSideProps } from 'next';

// Hooks
import { getArticleBySlug } from '@services/articles/getArticleBySlug';

// Types
import { Locale, LayoutType } from '@appTypes/app';

// Components
import Section from '@components/Section';
import Box from '@components/Box';

// Views
import ImagesCarousel from '@views/product-page/components/ImagesCarousel';
import ProductForm from '@views/product-page/components/ProductForm';

type Props = {
	product: IProduct;
};

export const getServerSideProps = (async ({ params, locale }) => {
	try {
		const { data } = await getArticleBySlug(
			params?.slug,
			Locale[locale as keyof typeof Locale]
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

const ProductPage = ({ product }: Props) => {
	const {
		image: { data: imageData },
		gallery: { data: galleryData },
	} = product?.attributes || {};

	return (
		<>
			<Section>
				<Box className='flex flex-col justify-start gap-5 p-5 md:flex-row lg:gap-10'>
					{imageData && galleryData ? (
						<ImagesCarousel
							images={[imageData, ...galleryData]?.map(node => node.attributes)}
						/>
					) : (
						<ImagesCarousel
							images={[imageData]?.map(node => node?.attributes)}
						/>
					)}
					<ProductForm product={product} />
				</Box>
			</Section>
			{/* <Section
				renderSection={() => (
					<MoreInfo
						metaobject={notesMetaobject}
						generalInfoMetaobject={generalInfoMetaobject}
						descriptionHtml={product?.descriptionHtml}
					/>
				)}
			/>
			<Section renderSection={() => <RelatedProducts />} /> */}
		</>
	);
};

ProductPage.layout = LayoutType.PUBLIC;
export default ProductPage;
