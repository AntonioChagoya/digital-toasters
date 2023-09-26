// React
import { useState } from "react";

// Context
import { useCartContext } from "@context/CartContext";

// Utils
import { parseMoneyFormat } from "@utils/stringParse";

// Libs
import { shopifyClient } from "@libs/shopify"
import { TbCircleArrowRightFilled } from "react-icons/tb";
import { useForm } from "react-hook-form";

// Utils
import { calculateAvergeRating } from "@utils/rates";
import { groupArrayObjectsByGroupSize } from "@utils/arrays";

// Shopify  
import { addLineItem, updateLineItem } from "@services/shopify";

// Components
import Box from "@components/Box";
import Button from "@components/buttons/Button";
import Options from "@views/product-page/components/Options";
import RatingStars from "@views/product-page/components/RatingStars";
import QuantitySelector from "@components/QuantitySelector";
import ProductPageDescription from "@views/product-page/components/Description";

// Types
import { ButtonColor, ButtonSize, ButtonWide } from "theme";

const ProductForm = ({ selectedVariant, product, productVariants, rateMetaobject, relevantInfoMetaobject }) => {
  const { variants: { edges }, options, handle } = product;
  const { fields } = relevantInfoMetaobject || [];
  const groupedFields = groupArrayObjectsByGroupSize(fields, 3)
  const { setIsCartOpen, checkout, setCheckout, } = useCartContext()

  // Form management
  const [loading, setLoading] = useState(false)
  const { getValues, setValue, register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      ProductAmount: 1
    }
  });

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

  return (
    <Box className="lg:max-w-[35rem]">
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

              {
                fields && fields?.length > 0 &&
                <div className="flex flex-wrap justify-end gap-1">
                  <table className="table-fixed">
                    <tbody className="text-left">
                      {
                        groupedFields.map((group, index) => {
                          return (
                            <tr key={index}>
                              {group.map((field, index) => {
                                if (field.key === "altura") {
                                  return (
                                    <td key={index}>
                                      <h6>{field.key.replaceAll("_", " ")}</h6>
                                      <p className="mb-0">{JSON.parse(field.value).value} m s. n. m.</p>
                                    </td>
                                  )
                                } else {
                                  return (
                                    <td key={index}>
                                      <h6>{field.key.replaceAll("_", " ")}</h6>
                                      <p className="mb-0">{field.value}</p>
                                    </td>
                                  )
                                }

                              })}
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                  <span
                    onClick={() => {
                      document.getElementById("Description").scrollIntoView({ behavior: "smooth" })
                    }}
                    className="flex items-center text-sm text-accent cursor-pointer hover:opacity-80"
                  >
                    Saber más
                    <TbCircleArrowRightFilled size={15} className="inline-block ml-1" />
                  </span>
                </div>
              }
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

            <Box className="flex flex-col gap-1 items-start justify-start">
              <span className="text-xs text-ligth italic">El costo de envío se calcula en el momento de pagar*</span>
              <Button
                loading={loading}
                color={ButtonColor.primary}
                size={ButtonSize.lg}
                wide={ButtonWide.full}
              >
                Agregar al carrito
              </Button>
            </Box>
          </div>
        </form>
      }
    </Box>
  )
}

export default ProductForm