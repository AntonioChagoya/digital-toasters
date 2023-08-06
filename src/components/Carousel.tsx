// Styles
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/arrow.css";

// React
import { useState } from "react"

// Libs
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { AutoPlay, Arrow } from "@egjs/flicking-plugins";
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/solid'

// GraphQL
import { useQuery } from "@apollo/client"

// Types
interface CarouselItem {
  src: string
  alt: string
  title?: string
  subtitle?: string
}

const images: CarouselItem[] = [
  {
    src: "https://snow-19.myshopify.com/cdn/shop/files/s1_b754d127-860e-445b-9895-a11dcd5c7a4e_1920x.jpg?v=1641411412",
    alt: "Slide 1",
  },
  {
    src: "https://snow-19.myshopify.com/cdn/shop/files/s2_1920x.jpg?v=1641412508",
    alt: "Slide 2",
  },
]

const slides = images.map((image, index) => (
  <div key={index} className="panel w-full h-full">
    <div className="h-[80vh] w-full" style={{ background: `url('${image.src}')` }}>
    </div>
  </div>
))

const Carousel = () => {
  const plugins = [
    new AutoPlay({ duration: 10000, direction: "NEXT", stopOnHover: false }),
    new Arrow()
  ];


  return (
    <section className="w-full">
      <Flicking
        plugins={plugins}
        align="prev"
        circular={true}
        onMoveEnd={e => {
          console.log(e);
        }}>
        {slides}
        <ViewportSlot>
          <ChevronLeftIcon className="flicking-arrow-prev  text-gray-300" />
          <ChevronRightIcon className="flicking-arrow-next text-gray-300" />
        </ViewportSlot>
      </Flicking>
    </section>
  )
}
export default Carousel