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

const Productos = ({ collections, products }: { collections: Collection[], products: CustomProduct[] }) => {
  console.log("collections", collections);
  console.log("products", products);

  return (
    <>
      <div className="container mx-auto py-16 flex gap-10">
        <aside className="flex flex-col w-full md:w-1/4 lg:w-auto bg-gray-100 p-10 rounded-lg">
          <div className="flex flex-col gap-10">
            <section className="flex flex-col">
              <h2 className="text-xl text-gray-800 font-bold mb-2">Órden</h2>
              <select className="w-full border border-gray-300 rounded px-4 py-2 mt-2">
                <option value="">A - Z</option>
                <option value="">Z - A</option>
                <option value="">Precio más bajo</option>
                <option value="">Precio más alto</option>
              </select>
            </section>
            <section className="flex flex-col">
              <h2 className="text-xl text-gray-800 font-bold mb-2">Tostado</h2>
              <div className="flex flex-col gap-2 w-auto">
                <label>
                  <input defaultChecked type="checkbox" name="Ligero" id="" className="mr-2" />
                  Ligero
                </label>
                <label>
                  <input defaultChecked type="checkbox" name="Medio" id="" className="mr-2" />
                  Medio
                </label>

                <label>
                  <input type="checkbox" name="Oscuro" id="" className="mr-2" />
                  Oscuro
                </label>

                <label>
                  <input type="checkbox" name="Frances" id="" className="mr-2" />
                  Francés
                </label>
              </div>
            </section>
            <section className="flex flex-col">
              <h2 className="text-xl text-gray-800 font-bold mb-2">Casa tostadora</h2>
              <select className="w-full border border-gray-300 rounded px-4 py-2 mt-2">
                <option value="">Zaranda</option>
                <option value="">Kaffistle</option>
                <option value="">Digital Toasters</option>
                <option value="">Ninmbus</option>
              </select>
            </section>
            <section className="flex flex-col">
              <h2 className="text-xl text-gray-800 font-bold mb-2">Cafetería</h2>
              <div className="w-full">
                <select className="w-full border border-gray-300 rounded px-4 py-2 mt-2">
                  <option value="">Nimbus</option>
                  <option value="">Zaranda</option>
                </select>
              </div>
            </section>
          </div>
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
Productos.layout = LayoutType.PUBLIC
export default Productos