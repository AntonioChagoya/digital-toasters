// Components
import Carousel from "components/Carousel"
import RecentProducts from "components/RecentProducts";

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

export default function Home({ products }) {
  console.log("prods", products);

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