const ProductPageDescription = ({ description }: { description: string }) => {
	return (
		<div className='duration-400 group relative my-2 pb-1 transition'>
			<p className=' text-gray-700'>{description}</p>
		</div>
	);
};

export default ProductPageDescription;
