// Next
// import Link from 'next/link';
// import Image from 'next/image';

// Components
// import Box from '@components/Box';

const ProductCard = () => {
	return (
		<>
			{/* {renderCard && renderCard(product)}

			{!renderCard && (
				<article className='flex flex-col gap-5'>
					<Link
						href={`/products/${handle}`}
						className='block'
					>
						<Image
							src={image?.url}
							alt={image?.altText || 'Product image'}
							width={image.width}
							height={image.height}
							className='rounded'
						/>

						<h5 className='text-center font-bold'>{title}</h5>
						<Box className='text-center'>
							{priceRange ? (
								<>
									<span className='mr-2 text-gray-400'>Desde</span>
									<span className='text-xl font-bold text-primary'>
										MX${priceRange?.minVariantPrice.amount}
									</span>
								</>
							) : (
								<>
									{compareAtPriceRange && (
										<span className='my-0 mr-2 text-gray-400 line-through'>
											MX${compareAtPriceRange.minVariantPrice.amount}
										</span>
									)}
									<span className='my-0 text-xl font-bold text-primary'>
										MX${price.amount}
									</span>
								</>
							)}
						</Box>
					</Link>
				</article>
			)} */}
		</>
	);
};

export default ProductCard;
