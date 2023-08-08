// Styles
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/arrow.css";

// React
import { useState } from "react";

// Libs
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { AutoPlay, Arrow } from "@egjs/flicking-plugins";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Transition } from "@headlessui/react";

// Components
import SmallProductCard from "components/product-cards/Small";

// Shopify
import { Product } from "@shopify/hydrogen-react/storefront-api-types";


const RecentProducts = ({ data }: { data: Product[] }) => {
  const [activeArrows, setActiveArrows] = useState(false);

  const plugins = [
    new AutoPlay({ duration: 5000, direction: "NEXT", stopOnHover: false }),
    new Arrow()
  ];

  const slides = data.map((product) => (
    <div key={product.id} className="w-1/5 mx-5 overflow-hidden">
      <SmallProductCard key={product.id} product={product} />
    </div>
  ))

  return (
    <section className="relative w-full" onMouseEnter={() => setActiveArrows(true)} onMouseLeave={() => setActiveArrows(false)}>
      <Flicking
        plugins={plugins}
        circular={true}
        align={"prev"}
      >
        {slides}

        <ViewportSlot>
          <FaAngleLeft className={`${activeArrows ? "opacity-100" : "opacity-0"} duration-150 custom-arrow flicking-arrow-prev is-circle text-white`} />
          <FaAngleRight className={`${activeArrows ? "opacity-100" : "opacity-0"} duration-150 custom-arrow flicking-arrow-next is-circle text-white`} />
        </ViewportSlot>
      </Flicking>
    </section >
  )
}
export default RecentProducts