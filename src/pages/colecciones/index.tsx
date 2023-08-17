// Components
import SmallProductCard from "@components/productCards/Small"
import { parseShopifyResponse, shopifyClient } from "libs/shopify"
import { Collection } from "shopify-buy"

// Types
import { LayoutType } from "types/app"
import { CustomProduct } from "types/shopify-sdk";

export async function getStaticProps() {
  const collections = await shopifyClient.collection.fetchAllWithProducts();
  const products = await shopifyClient.product.fetchAll();

  return {
    props: {
      collections: parseShopifyResponse(collections),
      products: parseShopifyResponse(products),
    }
  }
}

const CollectionsPage = ({ collections, products }: { collections: Collection[], products: CustomProduct[] }) => {
  console.log("collections", collections);
  console.log("products", products);

  return (
    <>
      <div className="container mx-auto py-16 h-screen flex gap-10">
        <aside className="flex flex-col">
          <h1 className="text-xl">Colecciones</h1>
        </aside>
        <section>
          <div className="grid grid-cols-3 gap-10">
            <div className="flex flex-col gap-5">
              {/* <SmallProductCard
                product={product}
              /> */}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
CollectionsPage.layout = LayoutType.PUBLIC
export default CollectionsPage