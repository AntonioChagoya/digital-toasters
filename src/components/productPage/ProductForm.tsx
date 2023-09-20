// React
import { useState } from "react";

// Context
import { useCartContext } from "context/CartContext";

// Utils
import { parseMoneyFormat } from "utils/stringParse";

// Libs
import { shopifyClient } from "libs/shopify"
import { TbLoader3, TbCircleArrowRightFilled, TbArrowBadgeDown } from "react-icons/tb";
import { useForm } from "react-hook-form";

// Utils
import { calculateAvergeRating } from "utils/rates";

// Shopify  
import { addLineItem, updateLineItem } from "services/shopify";

// Components
import Options from "@components/productPage/Options";
import QuantitySelector from "@components/productPage/QuantitySelector";
import RatingStars from "@components/global/RatingStars";

// Types
import ProductPageDescription from "@components/productPage/Description";

const ProductForm = ({ selectedVariant, product, productVariants, rateMetaobject }) => {
  const { variants: { edges }, options, handle } = product;

  const { setIsCartOpen, checkout, setCheckout, } = useCartContext()

  // Form management
  const [loading, setLoading] = useState(false)
  const { getValues, setValue, register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      ProductAmount: 1
    }
  });

  /* 
    * Product page actions:
   */

  // Add to cart
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

  // Quantity Selectors
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

  console.log("rateMetaobject", calculateAvergeRating(rateMetaobject));


  return (
    <section className="lg:w-1/2 p-5">
      {
        selectedVariant &&
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-5">
              <div>
                <div>
                  <h1 className="text-3xl font-bold">
                    {edges.length > 1 ? product.title + " - " + selectedVariant.title : product.title}
                  </h1>
                </div>
                <div className="text-accent pointer-events-none">
                  Tostador: {product.vendor}
                </div>
                <div className="flex gap-2 items-center">
                  <RatingStars
                    currentRating={calculateAvergeRating(rateMetaobject)}
                    onSelectRate={() => { }}
                  />
                </div>
              </div>
              {
                selectedVariant?.price?.amount &&
                <div className="flex gap-3">
                  {
                    selectedVariant?.compareAtPrice?.amount &&
                    <h4 className="text-2xl text-gray-400 line-through">{parseMoneyFormat(parseFloat(selectedVariant.compareAtPrice.amount))}</h4>
                  }
                  <h4 className="text-2xl text-gray-900">{parseMoneyFormat(parseFloat(selectedVariant?.price.amount))}</h4>
                </div>
              }
              {
                product?.description &&
                <ProductPageDescription description={product.description} />
              }



              <div className="flex flex-wrap justify-end gap-1">
                <table className="table-fixed">
                  <tbody className="text-left">
                    <tr>
                      <th>
                        <h6>Altura</h6>
                        <p className="mb-0">1600m</p>
                      </th>
                      <th>
                        <h6>Variedad</h6>
                        <p className="mb-0">Caturra</p>
                      </th>
                      <th>
                        <h6>Origen</h6>
                        <p className="mb-0">Caturra</p>
                      </th>
                    </tr>
                    <tr>
                      <th>
                        <h6>Acidez</h6>
                        <p className="mb-0">Cítrica viva y maracuyá</p>
                      </th>
                      <th>
                        <h6>Tueste</h6>
                        <p className="mb-0">Colorimetría</p>
                      </th>
                      <th>
                        <h6>Calificación</h6>
                        <p className="mb-0">87.75 puntos</p>
                      </th>
                    </tr>
                  </tbody>
                </table>
                <span
                  onClick={() => {
                    document.getElementById("ProductPageSelector").scrollIntoView({ behavior: "smooth" })
                  }}
                  className="flex items-center text-sm text-accent cursor-pointer hover:opacity-80"
                >
                  Saber más
                  <TbCircleArrowRightFilled size={15} className="inline-block ml-1" />
                </span>
              </div>
            </div>

            <section className="flex flex-col flex-nowrap sm:flex-row gap-8 lg:gap-5 sm:items-end justify-between">
              {
                productVariants.length > 1 &&
                <Options
                  variants={productVariants}
                  options={options}
                  handle={handle}
                  selectedVariant={selectedVariant}
                />
              }
              <QuantitySelector
                id="ProductPageSelector"
                inputsize="w-20 h-10"
                buttonsize="w-10 h-10"
                name={'ProductAmount'}
                decrementCounter={decrementCounter}
                incrementCounter={incrementCounter}
                register={register}
                setValue={setValue}
              />
            </section>

            <div className="flex flex-col-reverse lg:gap-10 gap-5 items-start justify-start">
              <button disabled={loading} type="submit" className="disabled:opacity-50 disabled:pointer-events-none border rounded p-3 bg-orange-400 text-white w-full shadow-md">
                {
                  loading
                    ?
                    <div className="flex w-full justify-center items-center">
                      <TbLoader3 className="animate-spin" size={24} />
                    </div>
                    :
                    <p className="uppercase mb-0 font-bold">Agregar al carrito</p>
                }

              </button>

            </div>
          </div>
        </form>
      }
    </section>
  )
}

export default ProductForm