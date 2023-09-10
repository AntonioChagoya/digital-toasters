// Styles
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/arrow.css";

// React
import { useState } from "react";

// Libs
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { AutoPlay, Arrow } from "@egjs/flicking-plugins";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

// Components
import SmallProductCard from "@components/productCards/Small";

// Shopify
import { CustomProduct } from "types/shopify-sdk";

const RecentProducts = ({ data }: { data: CustomProduct[] }) => {
  const [activeArrows, setActiveArrows] = useState(false);

  const plugins = [
    new AutoPlay({ duration: 1000000, direction: "NEXT", stopOnHover: false }),
    new Arrow()
  ];

  const slides = data.map((product) => (
    <div key={product.id} className="w-full sm:w-2/4 lg:w-1/4 sm:px-3 lg:px-5 flicking-panel">
      <SmallProductCard
        title={product.variants.length > 1 ? product.title + " - " + product.variants[0].title : product.title}
        handle={product.handle}
        price={product.variants[0].price}
        imageUrl={product.variants[0].image.src}
        altText={product.variants[0].image.altText}
        compareAtPrice={product.variants[0].compareAtPrice}
      />
    </div>
  ))

  return (
    <section className="relative" onMouseEnter={() => setActiveArrows(true)} onMouseLeave={() => setActiveArrows(false)}>
      <Flicking
        plugins={plugins}
        circular={true}
        align={"prev"}
        renderOnlyVisible={true}
        bounce={30}
      >
        {slides}

        <ViewportSlot>
          <FaAngleLeft className={`${activeArrows ? "opacity-100" : "opacity-100 lg:opacity-0"} duration-150 custom-arrow flicking-arrow-prev is-circle text-white`} />
          <FaAngleRight className={`${activeArrows ? "opacity-100" : "opacity-100 lg:opacity-0"} duration-150 custom-arrow flicking-arrow-next is-circle text-white`} />
        </ViewportSlot>
      </Flicking>
    </section >
  )
}
export default RecentProducts