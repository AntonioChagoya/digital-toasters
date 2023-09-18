import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/flicking-plugins.css";
import "@egjs/flicking-plugins/dist/pagination.css";

// React
import { useEffect, useState } from "react";

// Context
import { useCartContext } from "context/CartContext";

// Next
import { useRouter } from "next/router";

// Utils
import { parseMoneyFormat, parseIdStorefront } from "utils/stringParse";

// GraphQL
import { GET_PRODUCT_BY_HANDLE } from "graphql/queries/products";
import { createApolloClient } from "graphql/apolloSSR";

// Libs
import { shopifyClient } from "libs/shopify"
import { TbLoader3 } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { FaBoxesStacked } from "react-icons/fa6";
import { TbDots } from "react-icons/tb";
import parse from 'html-react-parser';

// Utils
import { calculateAvergeRating } from "utils/rates";

// Shopify  
import { addLineItem, updateLineItem } from "services/shopify";

// Components
import Options from "@components/productPage/Options";
import QuantitySelector from "@components/productPage/QuantitySelector";
import RatingStars from "@components/global/RatingStars";
import ImagesCarousel from "@components/productPage/ImagesCarousel";

// Types
import { LayoutType } from "types/app";
import { MetaFields, RatesCount } from "types/metafields";
import RelatedProducts from "@components/global/RelatedProducts";
import { Product, ProductVariant } from "@shopify/hydrogen-react/storefront-api-types";

export const getServerSideProps = async ({ params }) => {

  try {
    const client = createApolloClient()

    const { data } = await client.query({
      query: GET_PRODUCT_BY_HANDLE,
      variables: {
        handle: params.handle,
        variantsQty: 250,
        metafields: [
          { key: "rate", namespace: "custom_metafield" },
          { key: "reviews", namespace: "custom_metafield" }
        ]
      }
    });

    return {
      props: {
        product: data.product || null,
      },
    }
  } catch (error) {
    console.log(error);
    return {
      props: {
        product: {},
      },
    };
  }
};


const ProductPage = ({ product }: { product: Product }) => {
  const router = useRouter()

  // Product general info
  const { variants: { edges }, images, options, handle, metafields } = product;
  const productVariants = edges.map(({ node }) => node);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>()
  const findVariant = productVariants.find((variant) => parseIdStorefront(variant.id) === router.query.variant)

  useEffect(() => {
    if (productVariants && router.query.variant) {
      setSelectedVariant(findVariant)
    } else {
      setSelectedVariant(edges[0].node)
    }
  }, [router.query])

  // // // Cart info
  const { setIsCartOpen, checkout, setCheckout, } = useCartContext()

  // // Metafields info
  // const { data: productMetadata } = useQuery(GET_PRODUCT_METAFIELDS, {
  //   variables: {
  //     handle: router.query.handle, metafields: [
  //       { key: "rate", namespace: "custom_metafield" },
  //       { key: "reviews", namespace: "custom_metafield" }
  //     ]
  //   },

  // });
  // const metafields = productMetadata?.productByHandle?.metafields || [];
  // const rates: RatesCount = JSON.parse(metafields?.find((metafield) => metafield?.key === MetaFields.stars_rating)?.value || 0);

  // // Form management
  const [loading, setLoading] = useState(false)
  const { getValues, setValue, register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      ProductAmount: 1
    }
  });

  // const [updateRatingMetafield] = useMutation(UPDATE_PRODUCT_METAFIELD, {
  //   context: {
  //     clientName: "shopify-admin",
  //   }
  // });

  // /* 
  //   * Product page actions:
  //  */

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

  // // // Update rating
  // // const updateRating = (index) => {
  // //   console.log("index", index);
  // //   updateRatingMetafield({
  // //     variables: {
  // //       key: MetaFields.stars_rating,
  // //       namespace: "custom_metafield",
  // //       value: JSON.stringify({ ...rates, [Object.keys(rates)[index]]: parseInt(Object.values(rates)[index]) + 1 }),
  // //       ownerId: parseIdStorefront(product.id),
  // //       type: "json"
  // //     }
  // //   })
  // // }

  console.log("product", product);

  return (
    <section className="container mx-auto md:p-7 lg:p-7 flex flex-col gap-5 lg:gap-20">
      <article className="flex flex-col md:flex-row justify-center gap-10 min-h-[100vh]">
        {
          <ImagesCarousel images={images.edges.map(({ node }) => node)} />
        }
        <div className="sm:w-1/2 lg:pr-36 p-5">
          {
            selectedVariant &&
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-1">
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
                      currentRating={calculateAvergeRating(product?.metafields?.find((metafield) => metafield?.key === MetaFields.stars_rating))}
                      onSelectRate={() => { }}
                    />
                  </div>
                  {
                    product.description &&

                    <div className="group relative max-h-[120px] overflow-hidden transition duration-400 my-2 pb-1">
                      <p className=" text-gray-500">{product.description}</p>
                      <div
                        onClick={() => {
                          document.getElementById("Description")?.scrollIntoView({ behavior: "smooth" })
                        }}
                        className="absolute top-0 left-0 flex flex-col justify-end items-center w-full h-full bg-gradient-to-t from-white via-transparent rounded cursor-pointer"
                      >
                        <TbDots className="animate-bounce hidden group-hover:block" size={35} />
                      </div>
                    </div>
                  }

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
                </div>

                <div className="flex flex-col gap-3">
                  {
                    selectedVariant.sku &&
                    <div className="flex gap-2 items-center">
                      <FaBoxesStacked size={30} /><h5>{selectedVariant.sku}</h5>
                    </div>
                  }
                </div>
                {
                  productVariants.length > 1 &&
                  <Options
                    variants={productVariants}
                    options={options}
                    handle={handle}
                    selectedVariant={selectedVariant}
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
                        <>Agregar al carrito - {parseMoneyFormat(parseFloat(selectedVariant?.price.amount) * watch('ProductAmount'))}</>
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

      {
        product?.descriptionHtml.trim() &&
        <div id="Description" className="p-5">
          <h2 className="text-2xl font-bold mb-5">Más Información</h2>

          <div className="prose max-w-6xl lg:prose-lg">
            {parse(product?.descriptionHtml)}
          </div>
        </div>
      }
      {
        <RelatedProducts />
      }

    </section >
  )
}

ProductPage.layout = LayoutType.PUBLIC
export default ProductPage