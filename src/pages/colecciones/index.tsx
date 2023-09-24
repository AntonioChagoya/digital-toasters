// Components
import { Product } from "@shopify/hydrogen-react/storefront-api-types"
import { Collection } from "shopify-buy"

// Types
import { LayoutType } from "types/app"

const CollectionsPage = ({ collections, products }: { collections: Collection[], products: Product[] }) => {

  return (
    <>
      <div className="container mx-auto py-16 h-screen flex gap-10">
        <aside className="flex flex-col">
          <h1 className="text-xl">Colecciones</h1>
        </aside>
        <section>
          <div className="grid grid-cols-3 gap-10">
            <div className="flex flex-col gap-5">

            </div>
          </div>
        </section>
      </div>
    </>
  )
}
CollectionsPage.layout = LayoutType.PUBLIC
export default CollectionsPage