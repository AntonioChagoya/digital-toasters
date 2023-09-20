import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/flicking-plugins.css";
import "@egjs/flicking-plugins/dist/pagination.css";

// React
import { useEffect, useState } from "react";

// Next
import { useRouter } from "next/router";

// Utils
import { parseIdStorefront } from "utils/stringParse";

// GraphQL
import { GET_METAOBJECT_BY_ID, GET_PRODUCT_BY_HANDLE } from "graphql/queries/products";
import { createApolloClient } from "graphql/apolloSSR";

// Shopify  
import { Product, ProductVariant } from "@shopify/hydrogen-react/storefront-api-types";

// Components
import ImagesCarousel from "@components/productPage/ImagesCarousel";
import RelatedProducts from "@components/global/RelatedProducts";

// Types
import { LayoutType } from "types/app";
import LargeDescription from "@components/productPage/LargeDescription";
import ProductForm from "@components/productPage/ProductForm";

export const getServerSideProps = async ({ params }) => {
  try {
    let notesMetaobject = null
    let rateMetaobject = null
    const client = createApolloClient()

    const { data } = await client.query({
      query: GET_PRODUCT_BY_HANDLE,
      variables: {
        handle: params.handle,
        variantsQty: 250,
        metafields: [
          { key: "rate", namespace: "custom" },
          { key: "notas_de_cata", namespace: "custom" }
        ]
      }
    })
    const rateMetafieldId = data?.product?.metafields?.find((metafield) => metafield?.key === "rate")
    const notesMetaobjectId = data?.product?.metafields?.find((metafield) => metafield?.key === "notas_de_cata")

    if (rateMetafieldId) {
      const { data } = await client.query({
        query: GET_METAOBJECT_BY_ID,
        variables: {
          id: rateMetafieldId.value
        }
      })
      rateMetaobject = data
    }
    if (notesMetaobjectId) {
      const { data } = await client.query({
        query: GET_METAOBJECT_BY_ID,
        variables: {
          id: notesMetaobjectId.value
        }
      })
      notesMetaobject = data
    }

    return {
      props: {
        product: data?.product || null,
        notesMetaobject: notesMetaobject?.metaobject || null,
        rateMetaobject: rateMetaobject?.metaobject || null
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


const ProductPage = ({ product, notesMetaobject, rateMetaobject }: { product: Product, notesMetaobject, rateMetaobject }) => {
  const router = useRouter()

  // Product general info
  const { variants: { edges }, images } = product;
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

  return (
    <section className="container mx-auto lg:max-w-7xl  md:p-7 lg:p-7 flex flex-col gap-5 lg:gap-20">
      <article className="flex flex-col lg:flex-row gap-5 flex-wrap justify-evenly">
        <ImagesCarousel images={images.edges.map(({ node }) => node)} />
        <ProductForm rateMetaobject={rateMetaobject} selectedVariant={selectedVariant} productVariants={productVariants} product={product} />
      </article >

      <LargeDescription descriptionHtml={product?.descriptionHtml} metaobject={notesMetaobject} />
      <RelatedProducts />
    </section >
  )
}

ProductPage.layout = LayoutType.PUBLIC
export default ProductPage