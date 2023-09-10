// Components
import { Collection } from "shopify-buy"

// Types
import { LayoutType } from "types/app"
import { CustomProduct } from "types/shopify-sdk";

const CollectionsPage = ({ collections, products }: { collections: Collection[], products: CustomProduct[] }) => {

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