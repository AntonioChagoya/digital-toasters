import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/flicking-plugins.css";
import "@egjs/flicking-plugins/dist/pagination.css";

// React
import { useEffect, useState } from "react";

// Next
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

// Utils
import { parseIdStorefront } from "utils/stringParse";

// GraphQL
import { GET_METAOBJECT_BY_ID, GET_PRODUCT_BY_HANDLE } from "graphql/queries/products";
import { createApolloClient } from "graphql/apolloSSR";

// Shopify  
import { Product, ProductVariant } from "@shopify/hydrogen-react/storefront-api-types";

// Components
const ImagesCarousel = dynamic(() => import("@components/views/productPage/ImagesCarousel"));
const RelatedProducts = dynamic(() => import("@components/global/RelatedProducts"));
const MoreInfo = dynamic(() => import("@components/views/productPage/MoreInfo"));
import ProductForm from "@components/views/productPage/ProductForm";
import Section from "@components/global/Section";
import Box from "@components/global/Box";

// Types
import { LayoutType } from "types/app";

export const getServerSideProps = async ({ params }) => {
  try {
    let notesMetaobject = null
    let rateMetaobject = null
    let relevantInfoMetaobject = null
    let generalInfoMetaobject = null

    const client = createApolloClient()

    const { data } = await client.query({
      query: GET_PRODUCT_BY_HANDLE,
      variables: {
        handle: params.handle,
        variantsQty: 250,
        metafields: [
          { key: "rate", namespace: "custom" },
          { key: "notas_de_cata", namespace: "custom" },
          { key: "informacion_relevante", namespace: "custom" },
          { key: "informacion_general", namespace: "custom" }
        ]
      }
    })
    const rateMetafieldId = data?.product?.metafields?.find((metafield) => metafield?.key === "rate")
    const notesMetaobjectId = data?.product?.metafields?.find((metafield) => metafield?.key === "notas_de_cata")
    const relevantInfoMetaobjectId = data?.product?.metafields?.find((metafield) => metafield?.key === "informacion_relevante")
    const generalInfoMetaobjectId = data?.product?.metafields?.find((metafield) => metafield?.key === "informacion_general")

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
    if (relevantInfoMetaobjectId) {
      const { data } = await client.query({
        query: GET_METAOBJECT_BY_ID,
        variables: {
          id: relevantInfoMetaobjectId.value
        }
      })
      relevantInfoMetaobject = data
    }
    if (generalInfoMetaobjectId) {
      const { data } = await client.query({
        query: GET_METAOBJECT_BY_ID,
        variables: {
          id: generalInfoMetaobjectId.value
        }
      })
      generalInfoMetaobject = data
    }

    return {
      props: {
        product: data?.product || null,
        notesMetaobject: notesMetaobject?.metaobject || null,
        rateMetaobject: rateMetaobject?.metaobject || null,
        relevantInfoMetaobject: relevantInfoMetaobject?.metaobject || null,
        generalInfoMetaobject: generalInfoMetaobject?.metaobject || null,
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

const ProductPage = ({
  product, notesMetaobject, rateMetaobject, relevantInfoMetaobject, generalInfoMetaobject
}: {
  product: Product, notesMetaobject, rateMetaobject, relevantInfoMetaobject, generalInfoMetaobject
}) => {
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
    <>
      <Section
        renderSection={() => (
          <Box className="flex flex-col md:flex-row justify-start">
            <ImagesCarousel images={images.edges.map(({ node }) => node)} />
            <ProductForm
              product={product}
              rateMetaobject={rateMetaobject}
              relevantInfoMetaobject={relevantInfoMetaobject}
              selectedVariant={selectedVariant}
              productVariants={productVariants}
            />
          </Box >
        )}
      />
      <Section
        renderSection={() => (
          <MoreInfo
            metaobject={notesMetaobject}
            generalInfoMetaobject={generalInfoMetaobject}
            descriptionHtml={product?.descriptionHtml}
          />
        )}
      />
      <Section
        renderSection={() => (
          <RelatedProducts />
        )}
      />
    </>
  )
}

ProductPage.layout = LayoutType.PUBLIC
export default ProductPage