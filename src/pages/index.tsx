// Components
import Carousel from "@components/home/Carousel"
import RecentProducts from "@components/home/RecentProducts";

// Shopify 
import { shopifyClient, parseShopifyResponse } from "libs/shopify";

// Types
import { LayoutType } from "types/app";

export async function getStaticProps() {
  const products = await shopifyClient.product.fetchAll();

  return {
    props: {
      products: parseShopifyResponse(products),
    },
  };
}

const serviceCards = [
  {
    title: "Subscripción",
    description: "Suscribete a uno de nuestros planes y recibe tu café de especialidad favorito recurrentemete.",
    image: "https://kofi-demo.myshopify.com/cdn/shop/files/1_5d86f517-66c0-4296-ba04-8fa24de43302.png?v=1637750363"
  },
  {
    title: "Café a domicilio",
    description: "Adquiere café de especialidad recién tostado en la puerta de tu casa.",
    image: "https://kofi-demo.myshopify.com/cdn/shop/files/1_5d86f517-66c0-4296-ba04-8fa24de43302.png?v=1637750363"
  },
  {
    title: "Toasters Ranking",
    description: "Puntúa todas nuestras casas tostadoras despues de probarlas y recibe 1/2kg gratis de tu favorita.",
    image: "https://kofi-demo.myshopify.com/cdn/shop/files/1_5d86f517-66c0-4296-ba04-8fa24de43302.png?v=1637750363"
  },
  {
    title: "Barista Lover",
    description: "Suscribete a una o más cafeterías y recibe descuentos exclusivos en tiendas físicas.",
    image: "https://kofi-demo.myshopify.com/cdn/shop/files/1_5d86f517-66c0-4296-ba04-8fa24de43302.png?v=1637750363"
  },
  {
    title: "Soporte productores",
    description: "Suscribete a una o más cafeterías y recibe descuentos exclusivos en tiendas físicas.",
    image: "https://kofi-demo.myshopify.com/cdn/shop/files/1_5d86f517-66c0-4296-ba04-8fa24de43302.png?v=1637750363"
  },
]

export default function Home({ products }) {

  return (
    <>
      <Carousel />
      <main className="flex flex-col gap-16 items-center justify-between container mx-auto pb-10">

        <section className="flex flex-col items-center justify-center gap-5 p-5 lg:p-0">
          <div>
            <p className="text-center">Area de servicio</p>
            <h4 className="text-center font-bold">¿Cómo funciona DigitalToasters.com?</h4>
          </div>

          <div className="grid grid-rows-2 grid-cols-3 gap-5">
            {
              serviceCards.map((card, index) => (
                <div key={index} className="border border-gray-300 p-5 pr-32 rounded shadow hover:scale-[1.05] duration-200">
                  <img src={card.image} alt="" />
                  <h5>{card.title}</h5>
                  <p>{card.description}</p>
                </div>
              ))
            }
          </div>
        </section>

        <section className="flex flex-col items-center justify-center gap-5 p-5 lg:p-0">
          <div>
            <h4 className="text-center font-bold">Productos recientes</h4>
            <p className="text-center">Choose your coffee</p>
          </div>

          <div className="flex gap-10">
            <RecentProducts data={products} />
          </div>

        </section>
      </main>
    </>
  )
}

Home.layout = LayoutType.PUBLIC