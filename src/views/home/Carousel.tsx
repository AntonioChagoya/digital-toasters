// Styles
import '@egjs/react-flicking/dist/flicking.css';
import '@egjs/flicking-plugins/dist/arrow.css';

// React
import { useState } from 'react';

// Libs
import Flicking, { ViewportSlot } from '@egjs/react-flicking';
import { AutoPlay, Arrow, Fade } from '@egjs/flicking-plugins';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import Section from '@components/Section';
import Box from '@components/Box';

// Types
interface CarouselItem {
	src: string;
	alt: string;
	title?: string;
	subtitle?: string;
}

const images: CarouselItem[] = [
	{
		src: 'https://kofi-demo.myshopify.com/cdn/shop/files/slider_small_2.jpg?v=1637574918',
		alt: 'Slide 1',
	},
	{
		src: 'https://kofi-demo.myshopify.com/cdn/shop/files/slider_small_2.jpg?v=1637574918',
		alt: 'Slide 1',
	},
	{
		src: 'https://kofi-demo.myshopify.com/cdn/shop/files/slider_small_2.jpg?v=1637574918',
		alt: 'Slide 1',
	},
	{
		src: 'https://kofi-demo.myshopify.com/cdn/shop/files/slider_small_2.jpg?v=1637574918',
		alt: 'Slide 1',
	},
];

const slides = images.map((image, index) => (
	<div
		key={index}
		className='panel h-full w-full'
	>
		<div
			className='h-[300px] w-full lg:h-[650px]'
			style={{ background: `url('${image.src}')` }}
		></div>
	</div>
));

const Carousel = () => {
	const [activeArrows, setActiveArrows] = useState(false);

	const plugins = [
		new AutoPlay({
			duration: 5000,
			direction: 'NEXT',
			stopOnHover: true,
		}),
		new Arrow(),
		new Fade('', 2),
	];

	return (
		<Section
			renderSection={() => (
				<Box className='max-h-550px] grid grid-cols-1 grid-rows-1 gap-2 lg:grid-cols-7 lg:grid-rows-3'>
					<Box className='col-span-1 row-span-2 overflow-hidden rounded lg:col-span-5 lg:row-span-3'>
						<Flicking
							plugins={plugins}
							align='prev'
							circular={true}
							onMouseEnter={() => setActiveArrows(true)}
							onMouseLeave={() => setActiveArrows(false)}
						>
							{slides}
							<ViewportSlot>
								<FaAngleLeft
									className={`${
										activeArrows ? 'opacity-100' : 'opacity-0'
									} custom-arrow flicking-arrow-prev is-circle text-white duration-150`}
								/>
								<FaAngleRight
									className={`${
										activeArrows ? 'opacity-100' : 'opacity-0'
									} custom-arrow flicking-arrow-next is-circle text-white duration-150`}
								/>
							</ViewportSlot>
						</Flicking>
					</Box>

					<Box className='col-span-1 row-span-3 hidden flex-col gap-2 lg:col-span-2 lg:row-span-3 lg:flex'>
						<Box className='h-full overflow-hidden rounded border-[0.5px] lg:h-1/3'>
							<img
								className='h-full w-full object-cover object-top'
								src='https://kofi-demo.myshopify.com/cdn/shop/files/3_a88bf04a-3a9e-4ee5-9556-3311f54c5724.jpg?v=1637578314'
								alt=''
							/>
						</Box>
						<Box className='h-full overflow-hidden rounded border-[0.5px] lg:h-1/3'>
							<img
								className='h-full w-full object-cover'
								src='https://kofi-demo.myshopify.com/cdn/shop/files/3_a88bf04a-3a9e-4ee5-9556-3311f54c5724.jpg?v=1637578314'
								alt=''
							/>
						</Box>
						<Box className='h-full overflow-hidden rounded border-[0.5px] lg:h-1/3'>
							<img
								className='h-full w-full object-cover'
								src='https://kofi-demo.myshopify.com/cdn/shop/files/3_a88bf04a-3a9e-4ee5-9556-3311f54c5724.jpg?v=1637578314'
								alt=''
							/>
						</Box>
					</Box>
				</Box>
			)}
		/>
	);
};

export default Carousel;
