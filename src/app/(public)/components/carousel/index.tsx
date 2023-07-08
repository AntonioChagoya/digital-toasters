'use client'

// Styles
import "keen-slider/keen-slider.min.css"

// React
import { useState } from "react"

// Libs
import { useKeenSlider, TrackDetails } from "keen-slider/react"

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

const Carousel = () => {
  const [details, setDetails] = useState<TrackDetails | null>(null)

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    detailsChanged(s) {
      setDetails(s.track.details)
    },
    initial: 2,
  })

  function scaleStyle(idx: number) {
    if (!details) return {}
    const slide = details.slides[idx]
    const scale_size = 0.7
    const scale = 1 - (scale_size - scale_size * slide.portion)
    return {
      transform: `scale(${scale})`,
      WebkitTransform: `scale(${scale})`,
    }
  }

  return (
    <div ref={sliderRef} className="keen-slider zoom-out">
      {images.map((image, idx) => (
        <div key={idx} className="keen-slider__slide zoom-out__slide">
          {/* <div className="absolute h-full w-full">
            <div>
              <h2>TEST TITLE</h2>
            </div>
            <div>
              
            </div>
          </div> */}
          <div style={scaleStyle(idx)}>
            <img src={image.src} />
          </div>
        </div>
      ))}
    </div>
  )
}
export default Carousel