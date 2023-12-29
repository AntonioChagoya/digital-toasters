const RelatedProducts = () => {
	return (
		<div className='p-5'>
			<h4>Productos relacionados</h4>
			{/* {loading && (
				<div className='flex h-[200px] w-full items-center justify-center'>
					<TbLoader3
						size={40}
						className='animate-spin text-primary'
					/>
				</div>
			)}
			{data?.productRecommendations && !loading && (
				<ProductsCarousel data={data?.productRecommendations} />
			)} */}
		</div>
	);
};

export default RelatedProducts;
