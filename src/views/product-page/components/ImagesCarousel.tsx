import '@egjs/react-flicking/dist/flicking.css';
import '@egjs/flicking-plugins/dist/flicking-plugins.css';
import '@egjs/flicking-plugins/dist/pagination.css';

// Next
// import Image from 'next/image';

// React
// import { useEffect, useRef, useState } from 'react';

// Components
import Box from '@components/Box';

// Libs
// import Flicking, { ViewportSlot } from '@egjs/react-flicking';
// import { Sync, Pagination } from '@egjs/flicking-plugins';

const ImagesCarousel = () => {
	// const [plugins, setPlugins] = useState<unknown>([]);
	// const flicking0 = useRef();
	// const flicking1 = useRef();

	// useEffect(() => {
	// 	setPlugins([
	// 		new Sync({
	// 			type: 'index',
	// 			synchronizedFlickingOptions: [
	// 				{
	// 					flicking: flicking0.current,
	// 					isSlidable: true,
	// 				},
	// 				{
	// 					flicking: flicking1.current,
	// 					isClickable: true,
	// 					activeClass: 'custom-selected-thumb',
	// 				},
	// 			],
	// 		}),
	// 		new Pagination({ type: 'bullet' }),
	// 	]);
	// }, []);

	return (
		<Box>
			<Box className='xs:max-w-[500px] mx-auto w-full max-w-[400px] xl:max-w-[550px]'>
				<></>
				{/* <Flicking
					className='mb-5'
					ref={flicking0}
					plugins={plugins}
					bounce={30}
				>
					{images?.map((image, index) => (
						<picture
							key={index}
							className='xs:max-w-[500px] max-w-[400px] xl:h-[550px] xl:max-w-[550px]'
						>
							<Image
								src={image.url}
								width={image.width}
								height={image.height}
								className='h-full w-full rounded object-cover'
								alt='Product image large'
								draggable='false'
								priority
							/>
						</picture>
					))}
					<ViewportSlot>
						<div className='flicking-pagination'></div>
					</ViewportSlot>
				</Flicking>

				<Flicking
					cameraClass='w-full'
					ref={flicking1}
					moveType='freeScroll'
					align={'prev'}
					bound={true}
					bounce={30}
					renderOnlyVisible={true}
				>
					{images?.map((image, index) => (
						<picture
							key={index}
							className='mr-2 h-[100px] w-[100px]'
						>
							<Image
								src={image.url}
								width={image.width}
								height={image.height}
								className='h-full w-full rounded object-cover'
								alt='Product image thumbnail'
								draggable='false'
								priority
							/>
						</picture>
					))}
				</Flicking> */}
			</Box>
		</Box>
	);
};

export default ImagesCarousel;
