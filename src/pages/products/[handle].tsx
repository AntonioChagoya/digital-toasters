// React
import { useEffect, useRef, useState } from "react";

// Context
import { useCartContext } from "context/CartContext";

// Next
import { useRouter } from "next/router";

// Utils
import { parseMoneyFormat, parseIdStorefront } from "utils/stringParse";

// Libs
import { shopifyClient, parseShopifyResponse } from "libs/shopify"
import { TbStar, TbStarHalfFilled, TbStarFilled, TbLoader3 } from "react-icons/tb";
import { FaFireBurner, FaBoxesStacked } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { Sync, Pagination } from "@egjs/flicking-plugins";
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/flicking-plugins.css";
import "@egjs/flicking-plugins/dist/pagination.css";
// Components
import Options from "@components/productPage/Options";
import QuantitySelector from "@components/productPage/QuantitySelector";

// Types
import { LayoutType } from "types/app";
import { CustomProduct } from "types/shopify-sdk";
import { addLineItem, updateLineItem } from "services/shopify";
import { ProductVariant } from "shopify-buy";

export const getServerSideProps = async ({ params, query }) => {
  const { handle } = params

  const product = await shopifyClient.product.fetchByHandle(handle);

  return {
    props: {
      product: parseShopifyResponse(product) || null,
    },
  };
};


const ProductPage = ({ product }: { product: CustomProduct }) => {
  const flicking0 = useRef();
  const flicking1 = useRef();
  const router = useRouter()
  const { setIsCartOpen, checkout, setCheckout, } = useCartContext()
  const { getValues, setValue, register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      ProductAmount: 1
    }
  });
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>()
  const [loading, setLoading] = useState(false)

  const { variants, options, handle } = product
  const findVariant = variants.find((variant) => parseIdStorefront(variant.id) === router.query.variant)

  const [plugins, setPlugins] = useState([]);

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

  useEffect(() => {
    if (variants && router.query.variant) {
      setSelectedVariant(findVariant)
    } else {
      setSelectedVariant(variants[0])
    }
  }, [router.query])

  const onSubmit = async (data) => {
    setLoading(true)

    const currentCheckout = await shopifyClient.checkout.fetch(checkout?.id)
    const lineItemToAdd = { variantId: selectedVariant.id, quantity: data.ProductAmount }

    const getLineItemInCheckout = currentCheckout.lineItems.find((item) => item.id === lineItemToAdd.variantId);

    if (getLineItemInCheckout) {
      updateLineItem([{ variantId: selectedVariant.id, quantity: data.ProductAmount }], currentCheckout, setCheckout)
    } else {
      addLineItem([{ variantId: selectedVariant.id, quantity: data.ProductAmount }], currentCheckout, setCheckout)
    }

    setIsCartOpen(true)
    setLoading(false)
  }

  const incrementCounter = () => {
    setLoading(true)
    if (watch('ProductAmount') < 99) {
      const currentValue = getValues('ProductAmount') || 0;
      setValue('ProductAmount', currentValue + 1);
    }
    setLoading(false)
  };

  const decrementCounter = () => {
    setLoading(true)
    if (watch('ProductAmount') > 1) {
      const currentValue = getValues('ProductAmount') || 0;
      setValue('ProductAmount', currentValue - 1);
    }
    setLoading(false)
  };

  console.log("product", product);

  return (
    <section className="container mx-auto p-5 lg:p-20">
      <article className="flex flex-col lg:flex-row justify-center gap-10">
        <div className="lg:w-[500px]">
          <Flicking
            className="mb-5"
            ref={flicking0}
            bounce={30}
            plugins={plugins}
          >
            <div className=" w-[500px] h-[500px] max-h-[500px] max-w-[500px]">
              <img className="panel-image object-cover w-full h-full pointer-events-none" src={product.images[0]?.src} />
            </div>
            <div className=" w-[500px] h-[500px] max-h-[500px] max-w-[500px]">
              <img className="panel-image object-cover w-full h-full pointer-events-none" src={product.images[1]?.src} />
            </div>
            <div className="w-[500px] h-[500px] max-h-[500px] max-w-[500px]">
              <img className="panel-image object-cover w-full h-full pointer-events-none" src={product.images[2]?.src} />
            </div>
            <div className=" w-[500px] h-[500px] max-h-[500px] max-w-[500px]">
              <img className="panel-image object-cover w-full h-full pointer-events-none" src={product.images[3]?.src} />
            </div>
            <div className=" w-[500px] h-[500px] max-h-[500px] max-w-[500px]">
              <img className="panel-image object-cover w-full h-full pointer-events-none" src={product.images[3]?.src} />
            </div>
            <div className="w-[500px] h-[500px] max-h-[500px] max-w-[500px]">
              <img className="panel-image object-cover w-full h-full pointer-events-none" src={product.images[3]?.src} />
            </div>

            <ViewportSlot>
              <div className="flicking-pagination"></div>
            </ViewportSlot>
          </Flicking>

          <Flicking
            ref={flicking1}
            moveType="freeScroll"
            bound={true}
            bounce={30}
          >
            <div className="w-[100px] h-[100px] mr-2">
              <img className="thumb-image w-full h-full object-cover rounded" src={product.images[0]?.src} />
            </div>
            <div className=" w-[100px] h-[100px] mr-2">
              <img className="thumb-image w-full h-full object-cover rounded" src={product.images[1]?.src} />
            </div>
            <div className="w-[100px] h-[100px] mr-2">
              <img className="thumb-image w-full h-full object-cover rounded" src={product.images[2]?.src} />
            </div>
            <div className=" w-[100px] h-[100px] mr-2">
              <img className="thumb-image w-full h-full object-cover rounded" src={product.images[3]?.src} />
            </div>
            <div className=" w-[100px] h-[100px] mr-2">
              <img className="thumb-image w-full h-full object-cover rounded" src={product.images[3]?.src} />
            </div>
            <div className=" w-[100px] h-[100px] mr-2">
              <img className="thumb-image w-full h-full object-cover rounded" src={product.images[3]?.src} />
            </div>
          </Flicking>
        </div>

        <div className="lg:w-1/2 lg:pr-36">
          {selectedVariant &&
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-2">
                  <div>
                    <h1 className="text-3xl font-bold">
                      {product.title + `${selectedVariant ? " - " + selectedVariant.title : ""}`}
                    </h1>
                    <div className="flex gap-2 items-center">
                      <TbStarFilled className="text-yellow-500" />
                      <TbStarFilled className="text-yellow-500" />
                      <TbStarFilled className="text-yellow-500" />
                      <TbStarHalfFilled className="text-yellow-500" />
                      <TbStar className="text-yellow-500" />
                      <span>1 reviews</span>
                    </div>
                    <p className="mb-5 mt-2 text-gray-500">{product.description}</p>
                  </div>

                  <div className="flex gap-3">
                    {
                      selectedVariant?.compareAtPrice?.amount &&
                      <h4 className="text-2xl text-gray-400 line-through">{parseMoneyFormat(selectedVariant.compareAtPrice.amount)}</h4>
                    }
                    <h4 className="text-2xl text-gray-900">{parseMoneyFormat(selectedVariant?.price.amount)}</h4>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  {
                    selectedVariant.sku &&
                    <div className="flex gap-2 items-center">
                      <FaBoxesStacked size={30} /><h5>{selectedVariant.sku}</h5>
                    </div>
                  }
                  <div className="flex gap-2 items-center">
                    <FaFireBurner size={30} /><h5>{product.vendor}</h5>
                  </div>
                </div>
                {
                  variants.length > 1 &&
                  <Options
                    variants={variants}
                    options={options}
                    handle={handle}
                    selectedVariant={selectedVariant}
                    register={register}
                  />
                }

                <div className="flex flex-col-reverse lg:flex-row gap-10 items-center">
                  <button disabled={loading} type="submit" className="disabled:opacity-50 disabled:pointer-events-none border rounded p-3 bg-orange-400 text-white w-full">
                    {
                      loading
                        ?
                        <div className="flex w-full justify-center items-center">
                          <TbLoader3 className="animate-spin" size={24} />
                        </div>
                        :
                        <>Agregar al carrito - {parseMoneyFormat(selectedVariant?.price.amount * watch('ProductAmount'))}</>
                    }

                  </button>
                  <QuantitySelector
                    id="ProductPageSelector"
                    inputSize="w-20 h-10"
                    buttonSize="w-10 h-10"
                    name={'ProductAmount'}
                    decrementCounter={decrementCounter}
                    incrementCounter={incrementCounter}
                    register={register}
                    setValue={setValue}
                  />
                </div>
              </div>
            </form>
          }
        </div>
      </article >
    </section >
  )
}

ProductPage.layout = LayoutType.PUBLIC
export default ProductPage