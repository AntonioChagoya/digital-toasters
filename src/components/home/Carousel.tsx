// Styles
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/arrow.css";

// React
import { useState } from "react";

// Libs
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { AutoPlay, Arrow, Fade } from "@egjs/flicking-plugins";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

// Types
interface CarouselItem {
  src: string
  alt: string
  title?: string
  subtitle?: string
}

const images: CarouselItem[] = [
  {
    src: "https://kofi-demo.myshopify.com/cdn/shop/files/slider_small_2.jpg?v=1637574918",
    alt: "Slide 1",
  },
  {
    src: "https://kofi-demo.myshopify.com/cdn/shop/files/slider_small_2.jpg?v=1637574918",
    alt: "Slide 1",
  },
  {
    src: "https://kofi-demo.myshopify.com/cdn/shop/files/slider_small_2.jpg?v=1637574918",
    alt: "Slide 1",
  },
  {
    src: "https://kofi-demo.myshopify.com/cdn/shop/files/slider_small_2.jpg?v=1637574918",
    alt: "Slide 1",
  },
]

const slides = images.map((image, index) => (
  <div key={index} className="panel w-full h-full">
    <div className="h-[300px] lg:h-[650px] w-full" style={{ background: `url('${image.src}')` }}>
    </div>
  </div>
))

const Carousel = () => {
  const [activeArrows, setActiveArrows] = useState(false);

  const plugins = [
    new AutoPlay({ duration: 5000, direction: "NEXT", stopOnHover: true }),
    new Arrow(),
    new Fade("", 2),
  ];

  return (
    <section
      className="container mx-auto w-full grid grid-cols-1 grid-rows-1 lg:grid-cols-7 lg:grid-rows-3 gap-2 max-h-[650px]"
    >
      <div
        onMouseEnter={() => setActiveArrows(true)} onMouseLeave={() => setActiveArrows(false)}
        className="rounded overflow-hidden col-span-1 row-span-2 lg:col-span-5 lg:row-span-3"
      >
        <Flicking
          plugins={plugins}
          align="prev"
          circular={true}
          onMoveEnd={e => {
            console.log(e);
          }}>
          {slides}
          <ViewportSlot>
            <FaAngleLeft className={`${activeArrows ? "opacity-100" : "opacity-0"} duration-150 custom-arrow flicking-arrow-prev is-circle text-white`} />
            <FaAngleRight className={`${activeArrows ? "opacity-100" : "opacity-0"} duration-150 custom-arrow flicking-arrow-next is-circle text-white`} />
          </ViewportSlot>
        </Flicking>
      </div>

      <div className="hidden lg:flex flex-col gap-2 col-span-1 row-span-3 lg:col-span-2 lg:row-span-3">
        <div className="h-full lg:h-1/3 border-[0.5px] rounded overflow-hidden">
          <img className="w-full h-full object-cover object-top" src="https://kofi-demo.myshopify.com/cdn/shop/files/3_a88bf04a-3a9e-4ee5-9556-3311f54c5724.jpg?v=1637578314" alt="" />
        </div>
        <div className="h-full lg:h-1/3 border-[0.5px] rounded overflow-hidden"      >
          <img className="w-full h-full object-cover" src="https://kofi-demo.myshopify.com/cdn/shop/files/3_a88bf04a-3a9e-4ee5-9556-3311f54c5724.jpg?v=1637578314" alt="" />
        </div>
        <div className="h-full lg:h-1/3 border-[0.5px] rounded overflow-hidden"      >
          <img className="w-full h-full object-cover" src="https://kofi-demo.myshopify.com/cdn/shop/files/3_a88bf04a-3a9e-4ee5-9556-3311f54c5724.jpg?v=1637578314" alt="" />
        </div>
      </div>






    </section>
  )
}

export default Carousel