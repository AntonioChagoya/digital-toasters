import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/flicking-plugins.css";
import "@egjs/flicking-plugins/dist/pagination.css";

// React
import { useEffect, useState } from "react";

// Next
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

// Utils
import { parseIdStorefront } from "@utils/stringParse";

// GraphQL
import { GET_METAOBJECT_BY_ID, GET_PRODUCT_BY_HANDLE } from "@graphql/queries/products";
import { createApolloClient } from "@graphql/apolloSSR";

// Shopify  
import { Product, ProductVariant } from "@shopify/hydrogen-react/storefront-api-types";

// Components
import Section from "@components/Section";
import Box from "@components/Box";
import ImagesCarousel from "@views/product-page/components/ImagesCarousel";
import ProductForm from "@views/product-page/components/ProductForm";
import MoreInfo from "@views/product-page/components/MoreInfo";
const RelatedProducts = dynamic(() => import("@views/product-page/components/RelatedProducts"));

// Types
import { LayoutType } from "types/app";
import { MetaFieldsKeys, MetaFieldsNamespaces } from "types/metafields";

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
          { key: MetaFieldsKeys.stars_rating, namespace: MetaFieldsNamespaces.default },
          { key: MetaFieldsKeys.notes, namespace: MetaFieldsNamespaces.default },
          { key: MetaFieldsKeys.info_relevant, namespace: MetaFieldsNamespaces.default },
          { key: MetaFieldsKeys.info_general, namespace: MetaFieldsNamespaces.default }
        ]
      }
    })
    const rateMetafieldId = data?.product?.metafields?.find(product => product?.key === MetaFieldsKeys.stars_rating)
    const notesMetaobjectId = data?.product?.metafields?.find(product => product?.key === MetaFieldsKeys.notes)
    const relevantInfoMetaobjectId = data?.product?.metafields?.find(product => product?.key === MetaFieldsKeys.info_relevant)
    const generalInfoMetaobjectId = data?.product?.metafields?.find(product => product?.key === MetaFieldsKeys.info_general)

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
    console.log("product data", data?.product);

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
    console.log("Custom error", error);
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
          <Box className="flex flex-col gap-5 lg:gap-10 md:flex-row justify-start p-5">
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