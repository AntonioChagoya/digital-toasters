// Images
import coffe from "@assets/images/cup.png";

// Components
import Carousel from "@components/home/Carousel"
import ProductsCarousel from "@components/global/ProductsCarousel";
import Section from "@components/global/Section";
import Box from "@components/global/Box";

// GraphQL
import { createApolloClient } from "graphql/apolloSSR";

// Types
import { LayoutType } from "types/app";
import { GET_PRODUCTS } from "graphql/queries/products";
import Image from "next/image";

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
        title="¿Cómo funciona DigitalToasters.com?"
        subTitle="Area de Servicio"
        className="lg:flex-col"
      >
        <Box className="grid grid-cols-1 lg:grid-rows-2 lg:grid-cols-3">
          {
            serviceCards.map((card, index) => (
              <Box key={index} className="flex items-center border-[0.5px] border-gray-300 p-5 rounded shadow hover:scale-[1.05]">
                <Box className="w-1/3">
                  <Image
                    src={card.image}
                    alt={""}
                  />
                </Box>
                <Box className="w-2/3">
                  <h5>{card.title}</h5>
                  <p>{card.description}</p>
                </Box>
              </Box>
            ))
          }
        </Box>
      </Section>

      <Section
        title="Productos Recientes"
        subTitle="Café fresco"
        className="lg:flex-col"
      >
        <ProductsCarousel data={products} />
      </Section>
    </>
  )
}

Home.layout = LayoutType.PUBLIC