import { TbDots } from 'react-icons/tb';

const ProductPageDescription = ({ description }: { description: string }) => {
	return (
		<div className='duration-400 group relative my-2 max-h-[120px] overflow-hidden pb-1 transition'>
			<p className=' text-gray-500'>{description}</p>
			<div
				onClick={() => {
					document
						.getElementById('Description')
						?.scrollIntoView({ behavior: 'smooth' });
				}}
				className='absolute left-0 top-0 flex h-full w-full cursor-pointer flex-col items-center justify-end rounded bg-gradient-to-t from-white via-transparent'
			>
				<TbDots
					className='hidden animate-bounce group-hover:block'
					size={35}
				/>
			</div>
		</div>
	);
};

export default ProductPageDescription;
