// Next
import dynamic from "next/dynamic";
import Image from "next/image";

// Images
import coffe from "@assets/images/cup.png";

// Components
import Carousel from "@components/views/home/Carousel";
const ProductsCarousel = dynamic(() => import("@components/global/ProductsCarousel"));
const Section = dynamic(() => import("@components/global/Section"));
const Box = dynamic(() => import("@components/global/Box"));
const Heading = dynamic(() => import("@components/views/Heading"));

// GraphQL
import { createApolloClient } from "graphql/apolloSSR";
import { GET_PRODUCTS } from "graphql/queries/products";

// Types
import { LayoutType } from "types/app";

export async function getStaticProps() {
  try {
    const client = createApolloClient()

    const { data } = await client.query({
      query: GET_PRODUCTS,
      variables: {
        first: 12,
        variantsQty: 10,
        sortKey: "CREATED_AT",
        query: "",
        reverse: false,
      }
    });
    return {
      props: {
        products: data.products.edges.map(({ node }) => node),
      },
    };

  } catch (error) {
    console.log(error);
    return {
      props: {
        products: {},
      },
    };
  }
}

const serviceCards = [
  {
    title: "Subscripción",
    description: "Suscribete a uno de nuestros planes y recibe tu café de especialidad favorito recurrentemete.",
    image: coffe
  },
  {
    title: "Café a domicilio",
    description: "Adquiere café de especialidad recién tostado en la puerta de tu casa.",
    image: coffe
  },
  {
    title: "Toasters Ranking",
    description: "Puntúa todas nuestras casas tostadoras despues de probarlas y recibe 1/2kg gratis de tu favorita.",
    image: coffe
  },
  {
    title: "Barista Lover",
    description: "Suscribete a una o más cafeterías y recibe descuentos exclusivos en tiendas físicas.",
    image: coffe
  },
  {
    title: "Soporte productores",
    description: "Suscribete a una o más cafeterías y recibe descuentos exclusivos en tiendas físicas.",
    image: coffe
  },
]

export default function Home({ products }) {

  return (
    <>
      <Carousel />
      <Section
        renderSection={() => (
          <Box className="flex flex-col gap-5 lg:gap-10">
            <Heading
              title="¿Cómo funciona DigitalToasters.com?"
              subTitle="Conoce Digital Toasters"
            />
            <Box className="grid grid-cols-1 lg:grid-rows-2 lg:grid-cols-3 gap-5">
              {
                serviceCards.map((card, index) => (
                  <Box
                    key={index}
                    className="flex items-center border-[0.5px] border-gray-300 p-5 rounded shadow hover:scale-[1.05] gap-5"
                  >
                    <Box className="w-1/3">
                      <Image
                        src={card.image}
                        alt={""}
                      />
                    </Box>
                    <Box className="w-2/3">
                      <h5 className="font-bold pb-1">{card.title}</h5>
                      <p className="text-secondary">{card.description}</p>
                    </Box>
                  </Box>
                ))
              }
            </Box>
          </Box>
        )}
      />

      <Section
        renderSection={() => (
          <Box className="flex flex-col gap-5 lg:gap-10">
            <Heading
              title="Productos Recientes"
              subTitle="Café Fresco de Especialidad"
            />
            <ProductsCarousel data={products} />
          </Box>
        )}
      />
    </>
  )
}

Home.layout = LayoutType.PUBLIC