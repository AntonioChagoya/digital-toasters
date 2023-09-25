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
import ProductCard from "@components/cards/ProductCard";
import Section from "../Section";


const ProductsCarousel = ({ data }) => {
  const [activeArrows, setActiveArrows] = useState(false);

  const plugins = [
    // new AutoPlay({ duration: 5000, direction: "NEXT" }),
    new Arrow()
  ];
  const slides = data.map((product) => (
    <div key={product.id} className="w-full sm:w-2/4 lg:w-1/4 px-5">
      <ProductCard
        product={product}
      />
    </div>
  ))

  return (
    <Section
      renderSection={() => (
        <Flicking
          plugins={plugins}
          align={"prev"}
          circular={true}
          autoResize
          onMouseEnter={() => setActiveArrows(true)}
          onMouseLeave={() => setActiveArrows(false)}
        >
          {slides}
          <ViewportSlot>
            <FaAngleLeft className={`${activeArrows ? "opacity-100 custom-active" : "opacity-100 lg:opacity-0"} duration-150 custom-arrow flicking-arrow-prev is-circle text-white`} />
            <FaAngleRight className={`${activeArrows ? "opacity-100 custom-active" : "opacity-100 lg:opacity-0"} duration-150 custom-arrow flicking-arrow-next is-circle text-white`} />
          </ViewportSlot>
        </Flicking>
      )}
    />
  )
}
export default ProductsCarousel