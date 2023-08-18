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
import { TbStar, TbStarHalfFilled, TbStarFilled } from "react-icons/tb";
import { FaFireBurner, FaBoxesStacked } from "react-icons/fa6";
import { useForm } from "react-hook-form";

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
  const router = useRouter()
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>()
  const { setIsCartOpen, checkout, setCheckout } = useCartContext()
  const { getValues, setValue, register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      ProductAmount: 1
    }
  });

  const { variants, options, handle } = product
  const findVariant = variants.find((variant) => parseIdStorefront(variant.id) === router.query.variant)

  useEffect(() => {
    if (variants && router.query.variant) {
      setSelectedVariant(findVariant)
    } else {
      setSelectedVariant(variants[0])
    }
  }, [router.query])

  const onSubmit = async (data) => {
    const currentCheckout = await shopifyClient.checkout.fetch(checkout?.id)
    const lineItemToAdd = { variantId: selectedVariant.id, quantity: data.ProductAmount }

    const getLineItemInCheckout = currentCheckout.lineItems.find((item) => item.id === lineItemToAdd.variantId);

    if (getLineItemInCheckout) {
      updateLineItem([{ variantId: selectedVariant.id, quantity: data.ProductAmount }], currentCheckout, setCheckout)
    } else {
      addLineItem([{ variantId: selectedVariant.id, quantity: data.ProductAmount }], currentCheckout, setCheckout)
    }

    setIsCartOpen(true)
  }

  const incrementCounter = () => {
    if (watch('ProductAmount') < 99) {
      const currentValue = getValues('ProductAmount') || 0;
      setValue('ProductAmount', currentValue + 1);
    }
  };

  const decrementCounter = () => {
    if (watch('ProductAmount') > 1) {
      const currentValue = getValues('ProductAmount') || 0;
      setValue('ProductAmount', currentValue - 1);
    }
  };

  return (
    <section className="container mx-auto p-5 lg:p-20">
      <article className="flex flex-col lg:flex-row justify-center gap-10">
        <div className="flex lg:w-1/2">
          <div className="">
            <img src={product.images[0]?.src} alt={product?.featuredImage?.altText} />
          </div>
          <div>
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
          </div>
        </div>

        <div className="lg:w-1/2 pr-36">
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

                <div className="flex gap-10">
                  <button type="submit" className="border rounded p-4 bg-orange-400 text-white">
                    Agregar al carrito - {parseMoneyFormat(selectedVariant?.price.amount * watch('ProductAmount'))}
                  </button>
                  <QuantitySelector
                    id="ProductPageSelector"
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