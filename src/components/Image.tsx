// Next
import NextImage from 'next/image';

// Constants
import { ImageViewports } from 'constants/theme';

const CustomImage = ({ image }: { image: Image }) => {
	return (
		<picture>
			{Object.keys(image.formats).map(key => {
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

			<NextImage
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
};

export default CustomImage;
