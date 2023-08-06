// Styles
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/arrow.css";

// Libs
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { AutoPlay, Arrow } from "@egjs/flicking-plugins";
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/solid'

// Components
import SmallProductCard from "@components/product-cards/Small";

// Shopify
import { Product } from "@shopify/hydrogen-react/storefront-api-types";


const RecentProducts = ({ data }: { data: StorefrontResponse<Product> }) => {
  const plugins = [
    new AutoPlay({ duration: 2000, direction: "NEXT", stopOnHover: false }),
    new Arrow()
  ];
  data.products.edges[0].node.title
  const slides = data?.products?.edges?.map((product) => (
    <div key={product.cursor} className="w-2/5 mx-5">
      <SmallProductCard key={product.cursor} product={product.node} />
    </div>
  ))

  return (
    <section className="w-full">
      <Flicking
        plugins={plugins}
        circular={true}
        align={"prev"}
        bound={true}
      >
        {slides}
        <ViewportSlot>
          <ChevronLeftIcon className="flicking-arrow-prev  text-gray-300" />
          <ChevronRightIcon className="flicking-arrow-next text-gray-300" />
        </ViewportSlot>
      </Flicking>
    </section >
  )
}
export default RecentProducts