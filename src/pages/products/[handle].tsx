import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/flicking-plugins.css";
import "@egjs/flicking-plugins/dist/pagination.css";

// React
import { useEffect, useRef, useState } from "react";

// Context
import { useCartContext } from "context/CartContext";

// Next
import { useRouter } from "next/router";

// Utils
import { parseMoneyFormat, parseIdStorefront } from "utils/stringParse";

// GraphQL
import { useQuery, useMutation, gql } from "@apollo/client";
import { GET_PRODUCT_METAFIELDS } from "graphql/queries/products";

// Libs
import { shopifyClient, parseShopifyResponse } from "libs/shopify"
import { TbLoader3 } from "react-icons/tb";
import { FaFireBurner, FaBoxesStacked } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { Sync, Pagination } from "@egjs/flicking-plugins";

// Utils
import { calculateAvergaRating } from "utils/rates";

// Shopify  
import { addLineItem, updateLineItem } from "services/shopify";

// Components
import Options from "@components/productPage/Options";
import QuantitySelector from "@components/productPage/QuantitySelector";
import RatingStars from "@components/global/RatingStars";

// Types
import { LayoutType } from "types/app";
import { CustomProduct } from "types/shopify-sdk";
import { ProductVariant } from "shopify-buy";
import { MetaFields, RatesCount } from "types/metafields";

export const getServerSideProps = async ({ params }) => {
  const product = await shopifyClient.product.fetchByHandle(params.handle)

  return {
    props: {
      product: parseShopifyResponse(product) || null,
    },
  }
};


export const UPDATE_PRODUCT_METAFIELD = gql`
mutation ( $key: String!, $namespace: String!, $value: String!, $ownerId: ID!, $type: String! ){
  metafieldsSet(metafields: [
    {
      key: $key
      namespace: $namespace
      value: $value
      ownerId: $ownerId
      type: $type
    }
  ]) {
    metafields {
        id
        key
        namespace
        value
        createdAt
        updatedAt
    }
    userErrors {
      field
      message
      code
    }
  }
}
`

const ProductPage = ({ product }: { product: CustomProduct }) => {
  const router = useRouter()

  const { variants, options, handle } = product

  const flicking0 = useRef();
  const flicking1 = useRef();
  const [plugins, setPlugins] = useState([]);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>()
  const { setIsCartOpen, checkout, setCheckout, } = useCartContext()
  const { getValues, setValue, register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      ProductAmount: 1
    }
  });

  const { data: productMetadata, error: metafieldErrors } = useQuery(GET_PRODUCT_METAFIELDS, {
    variables: {
      handle: router.query.handle, metafields: [
        { key: "rate", namespace: "custom_metafield" },
        { key: "reviews", namespace: "custom_metafield" }
      ]
    },

  });
  const metafields = productMetadata?.productByHandle?.metafields || [];
  const rates: RatesCount = JSON.parse(metafields?.find((metafield) => metafield.key === MetaFields.stars_rating)?.value || 0);

  const [updateRatingMetafield, { data: metafieldUpdated }] = useMutation(UPDATE_PRODUCT_METAFIELD, {
    context: {
      clientName: "shopify-admin",
    }
  });

  const [loading, setLoading] = useState(false)
  const findVariant = variants.find((variant) => parseIdStorefront(variant.id) === router.query.variant)


  // Carousel plugins
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

  // Update rating
  const updateRating = (index) => {
    console.log("index", index);
    updateRatingMetafield({
      variables: {
        key: MetaFields.stars_rating,
        namespace: "custom_metafield",
        value: JSON.stringify({ ...rates, [Object.keys(rates)[index]]: parseInt(Object.values(rates)[index]) + 1 }),
        ownerId: parseIdStorefront(product.id),
        type: "json"
      }
    })
    // console.log("rates", rates);
    // console.log("keys", Object.keys(rates));
    // console.log("values", Object.values(rates)[index]);
    // const newCount = parseInt(Object.values(rates)[index]) + 1;
    // console.log("rates after update", newCount);

    // updateRatingMetafield({
    //   variables: {
    //     key: MetaFields.stars_rating,
    //     namespace: "custom_metafield",
    //     value: JSON.stringify({ ...rates, Object.keys(rates)[index]: 0 }),
    //     ownerId: parseIdStorefront(product.id),
    //     type: "json"
    //   }
    // })
  }

  console.log("metafieldUpdated", productMetadata?.productByHandle?.metafields);

  return (
    <section className="container mx-auto p-5 lg:p-20 flex flex-col gap-32">
      <article className="flex flex-col lg:flex-row justify-center gap-10 min-h-[100vh]">
        <div className="lg:sticky lg:h-full top-10">
          <div className="lg:max-w-[500px]">
            <Flicking
              className="mb-5"
              ref={flicking0}
              plugins={plugins}
              bounce={30}
              renderOnlyVisible={true}
            >
              {product.images.map((image, index) => (
                <div key={index} className="w-[500px] h-[500px] max-h-[500px] max-w-[500px] border">
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
              ref={flicking1}
              moveType="freeScroll"
              bound={true}
              bounce={30}
            >
              {product.images.map((image, index) => (
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

        <div className="lg:w-1/2 lg:pr-36">
          {selectedVariant &&
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-2">
                  <div>
                    <h1 className="text-3xl font-bold">
                      {product.variants.length > 1 ? product.title + " - " + selectedVariant.title : product.title}
                      {/* {product.title + `${selectedVariant ? " - " + selectedVariant.title : ""}`} */}
                    </h1>
                    <div className="flex gap-2 items-center">
                      <RatingStars
                        currentRating={calculateAvergaRating(rates)}
                        onSelectRate={updateRating}
                      />
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

                <div className="flex flex-col-reverse lg:gap-10 gap-5 items-start justify-start">
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
                    inputsize="w-20 h-10"
                    buttonsize="w-10 h-10"
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

      <div>
        <h2 className="text-2xl font-bold mb-5">Más Información</h2>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-5">Productos relacionados</h2>
      </div>
    </section >
  )
}

ProductPage.layout = LayoutType.PUBLIC
export default ProductPage