// Styles
import '@egjs/react-flicking/dist/flicking.css';
import '@egjs/flicking-plugins/dist/arrow.css';

// React
import { useState } from 'react';

// Libs
import Flicking, { ViewportSlot } from '@egjs/react-flicking';
import { AutoPlay, Arrow } from '@egjs/flicking-plugins';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

// Components
import ProductCard from '@components/cards/ProductCard';
import Section from '../Section';

const ProductsCarousel = ({ data = [] }) => {
	const [activeArrows, setActiveArrows] = useState(false);

	const plugins = [
		// new AutoPlay({ duration: 5000, direction: "NEXT" }),
		new Arrow(),
	];
	const slides = data?.map(product => (
		<div
			key={product.id}
			className='w-full px-5 sm:w-2/4 lg:w-1/4'
		>
			<ProductCard product={product} />
		</div>
	));

	return (
		<Section
			renderSection={() => (
				<Flicking
					plugins={plugins}
					align={'prev'}
					circular={true}
					autoResize
					onMouseEnter={() => setActiveArrows(true)}
					onMouseLeave={() => setActiveArrows(false)}
				>
					{slides}
					<ViewportSlot>
						<FaAngleLeft
							className={`${
								activeArrows
									? 'custom-active opacity-100'
									: 'opacity-100 lg:opacity-0'
							} custom-arrow flicking-arrow-prev is-circle text-white duration-150`}
						/>
						<FaAngleRight
							className={`${
								activeArrows
									? 'custom-active opacity-100'
									: 'opacity-100 lg:opacity-0'
							} custom-arrow flicking-arrow-next is-circle text-white duration-150`}
						/>
					</ViewportSlot>
				</Flicking>
			)}
		/>
	);
};
export default ProductsCarousel;
