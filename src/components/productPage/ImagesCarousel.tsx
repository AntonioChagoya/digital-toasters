import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/flicking-plugins.css";
import "@egjs/flicking-plugins/dist/pagination.css";

// React
import { useEffect, useRef, useState } from "react";

// Libs
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { Sync, Pagination } from "@egjs/flicking-plugins";
import { Image } from "@shopify/hydrogen-react/storefront-api-types";

const ImagesCarousel = ({ images }: { images: Image[] }) => {
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
    <div className="md:sticky md:h-full top-10 p-5">
      <div className="max-w-[500px]">
        <Flicking
          className="mb-5"
          ref={flicking0}
          plugins={plugins}
          bounce={30}
          renderOnlyVisible={true}
        >
          {images?.map((image, index) => (
            <div key={index} className="w-full h-[400px] xs:w-[500px] xs:h-[500px] max-h-[500px] max-w-[500px] border">
              <img
                className="panel-image object-cover w-full h-full pointer-events-none "
                width={image.width}
                height={image.height}
                src={image.src}
              />
            </div>
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
        >
          {images?.map((image, index) => (
            <div key={index} className="w-[100px] h-[100px] mr-2">
              <img
                className="thumb-image w-full h-full object-cover rounded"
                width={image.width}
                height={image.height}
                src={image.src}
              />
            </div>
          ))}

        </Flicking>
      </div>
    </div>
  )
}

export default ImagesCarousel