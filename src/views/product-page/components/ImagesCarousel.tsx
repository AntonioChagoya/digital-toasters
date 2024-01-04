import '@egjs/react-flicking/dist/flicking.css';
import '@egjs/flicking-plugins/dist/flicking-plugins.css';
import '@egjs/flicking-plugins/dist/pagination.css';

// Next
import Image from 'next/image';

// React
import { useEffect, useRef, useState } from 'react';

// Components
import Box from '@components/Box';

// Constants
import { ImageViewports } from 'constants/theme';

// Libs
import Flicking, { ViewportSlot } from '@egjs/react-flicking';
import { Sync, Pagination } from '@egjs/flicking-plugins';

const ImagesCarousel = ({ images }: { images: Image[] }) => {
	const [plugins, setPlugins] = useState<(Sync | Pagination)[]>([]);
	const flicking0 = useRef<Flicking>(null);
	const flicking1 = useRef<Flicking>(null);

	useEffect(() => {
		setPlugins([
			new Sync({
				type: 'index',
				synchronizedFlickingOptions: [
					{
						flicking: flicking0.current as Flicking,
						isSlidable: true,
					},
					{
						flicking: flicking1.current as Flicking,
						isClickable: true,
						activeClass: 'custom-selected-thumb',
					},
				],
			}),
			new Pagination({ type: 'bullet' }),
		]);
	}, []);

	return (
		<Box className='mx-auto w-full min-w-[400px] max-w-[400px] lg:mx-0 xl:max-w-[450px]'>
			<Flicking
				ref={flicking0}
				className='mb-5'
				plugins={plugins}
				bounce={30}
			>
				{images?.map((image, index) => {
					if (!image) return;

					return (
						<picture
							key={index}
							className='aspect-square max-w-[400px] xl:max-w-[450px]'
						>
							{Object.keys(image?.formats).map(key => {
								const format = image.formats[key as keyof typeof image.formats];
								return (
									<source
										key={format.hash}
										srcSet={`${process.env.NEXT_PUBLIC_IMAGE_SOURCE}${format.url}`}
										type={format.mime}
										media={ImageViewports[key as keyof typeof ImageViewports]}
									/>
								);
							})}

							<Image
								src={`${process.env.NEXT_PUBLIC_IMAGE_SOURCE}${image.url}`}
								width={image.width}
								height={image.height}
								className='h-full w-full rounded object-cover'
								alt={image.name}
								draggable='false'
								priority
							/>
						</picture>
					);
				})}
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
				{images?.map((image, index) => {
					if (!image) return;

					return (
						<picture
							key={index}
							className='mr-2 aspect-square max-w-[100px] xl:max-w-[100px] '
						>
							{Object.keys(image.formats).map(key => {
								const format = image.formats[key as keyof typeof image.formats];
								return (
									<source
										key={format.hash}
										srcSet={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${format.url}`}
										type={format.mime}
										media={ImageViewports[key as keyof typeof ImageViewports]}
									/>
								);
							})}

							<Image
								src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${image.url}`}
								width={image.width}
								height={image.height}
								className='h-full w-full rounded object-cover'
								alt={image.name}
								draggable='false'
								priority
							/>
						</picture>
					);
				})}
			</Flicking>
		</Box>
	);
};

export default ImagesCarousel;
