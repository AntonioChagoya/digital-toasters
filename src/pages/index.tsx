// Components
import Carousel from "components/Carousel"
import RecentProducts from "components/RecentProducts";

// Shopify 
import { shopifyClient, parseShopifyResponse } from "libs/shopify";
import { useEffect } from "react";

// Types
import { LayoutType } from "types/app";

export async function getServerSideProps() {
  const products = await shopifyClient.product.fetchAll();

  return {
    props: {
      products: parseShopifyResponse(products),
    },
  };
}

export default function Home({ products }) {

  useEffect(() => {
    const seeProducts = async () => {
      const products2 = await shopifyClient.product.fetchAll();

      console.log("products client", parseShopifyResponse(products2));
    }
    seeProducts()
  }, [])

  return (
    <>
      <Carousel />
      <main className="flex flex-col gap-16 items-center justify-between container mx-auto">

        <section className="flex flex-col items-center justify-center gap-5 p-5 lg:p-0">
          <div>
            <h4 className="text-center">Recent Products</h4>
            <p className="text-center">Choose your coffee</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            <RecentProducts data={products} />
          </div>

        </section>
      </main>
    </>
  )
}

Home.layout = LayoutType.PUBLIC