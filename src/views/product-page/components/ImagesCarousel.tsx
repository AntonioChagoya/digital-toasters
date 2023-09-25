import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/flicking-plugins.css";
import "@egjs/flicking-plugins/dist/pagination.css";

// Next
import Image from "next/image";

// React
import { useEffect, useRef, useState } from "react";

// Components
import Box from "@components/Box";

// Libs
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { Sync, Pagination } from "@egjs/flicking-plugins";
import { Image as ImageType } from "@shopify/hydrogen-react/storefront-api-types";

const ImagesCarousel = ({ images }: { images: ImageType[] }) => {
  const [plugins, setPlugins] = useState([]);
  const flicking0 = useRef();
  const flicking1 = useRef();

  useEffect(() => {
    setPlugins(
      [new Sync({
        type: "index",
        synchronizedFlickingOptions: [
          {
            flicking: flicking0.current,
            isSlidable: true
          },
          {
            flicking: flicking1.current,
            isClickable: true,
            activeClass: "custom-selected-thumb",
          }
        ]
      }),
      new Pagination({ type: 'bullet' })
      ],
    );
  }, []);

  return (
    <Box>
      <Box className="w-full mx-auto max-w-[400px] xs:max-w-[500px] xl:max-w-[550px]">
        <Flicking
          className="mb-5"
          ref={flicking0}
          plugins={plugins}
          bounce={30}
        >
          {images?.map((image, index) => (
            <picture key={index} className="max-w-[400px] xs:max-w-[500px] xl:max-w-[550px] xl:h-[550px]">
              <Image
                src={image.url}
                width={image.width}
                height={image.height}
                className="w-full h-full object-cover rounded"
                alt="Product image large"
                draggable="false"
                priority
              />
            </picture>
          ))}
          <ViewportSlot>
            <div className="flicking-pagination"></div>
          </ViewportSlot>
        </Flicking>

        <Flicking
          cameraClass="w-full"
          ref={flicking1}
          moveType="freeScroll"
          align={"prev"}
          bound={true}
          bounce={30}
          renderOnlyVisible={true}
        >
          {images?.map((image, index) => (
            <picture key={index} className="w-[100px] h-[100px] mr-2">
              <Image
                src={image.url}
                width={image.width}
                height={image.height}
                className="w-full h-full object-cover rounded"
                alt="Product image thumbnail"
                draggable="false"
                priority
              />
            </picture>
          ))}

        </Flicking>
      </Box>
    </Box>
  )
}

export default ImagesCarousel