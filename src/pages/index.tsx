// Next
import Image from 'next/image';

// Images
import coffe from '@assets/images/cup.png';

// Components
// import Carousel from '@views/home/Carousel';
// import ProductsCarousel from '@components/carousells/ProductsCarousel';
import Section from '@components/Section';
import Box from '@components/Box';
import Heading from '@components/headings/Heading';

// Types
import { LayoutType } from 'types/app';

export async function getStaticProps() {
	try {
		return {
			props: {
				products: [],
			},
		};
	} catch (error) {
		return {
			props: {
				products: [],
			},
		};
	}
}

const serviceCards = [
	{
		title: 'Subscripción',
		description:
			'Suscribete a uno de nuestros planes y recibe tu café de especialidad favorito recurrentemete.',
		image: coffe,
	},
	{
		title: 'Café a domicilio',
		description:
			'Adquiere café de especialidad recién tostado en la puerta de tu casa.',
		image: coffe,
	},
	{
		title: 'Toasters Ranking',
		description:
			'Puntúa todas nuestras casas tostadoras despues de probarlas y recibe 1/2kg gratis de tu favorita.',
		image: coffe,
	},
	{
		title: 'Barista Lover',
		description:
			'Suscribete a una o más cafeterías y recibe descuentos exclusivos en tiendas físicas.',
		image: coffe,
	},
	{
		title: 'Soporte productores',
		description:
			'Suscribete a una o más cafeterías y recibe descuentos exclusivos en tiendas físicas.',
		image: coffe,
	},
];

export default function Home() {
	return (
		<>
			{/* <Carousel /> */}
			<Section
				renderSection={() => (
					<Box className='flex flex-col gap-5 lg:gap-10'>
						<Heading
							title='¿Cómo funciona DigitalToasters.com?'
							subTitle='Conoce Digital Toasters'
						/>
						<Box className='grid grid-cols-1 gap-5 lg:grid-cols-3 lg:grid-rows-2'>
							{serviceCards.map((card, index) => (
								<Box
									key={index}
									className='flex items-center gap-5 rounded border-[0.5px] border-gray-300 p-5 shadow hover:scale-[1.05]'
								>
									<Box className='w-1/3'>
										<Image
											src={card.image}
											alt={''}
										/>
									</Box>
									<Box className='w-2/3'>
										<h5 className='pb-1 font-bold'>{card.title}</h5>
										<p className='text-secondary'>{card.description}</p>
									</Box>
								</Box>
							))}
						</Box>
					</Box>
				)}
			/>

			{/* <Section
        renderSection={() => (
          <Box className="flex flex-col gap-5 lg:gap-10">
            <Heading
              title="Productos Recientes"
              subTitle="Café Fresco de Especialidad"
            />
            <ProductsCarousel data={products} />
          </Box>
        )}
      /> */}
		</>
	);
}

Home.layout = LayoutType.PUBLIC;
