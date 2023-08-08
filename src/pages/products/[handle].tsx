// Shopify
import { Product, ProductVariantConnection } from "@shopify/hydrogen-react/storefront-api-types";

// Libs
import { shopifyClient, parseShopifyResponse } from "libs/shopify"
import Link from "next/link";

// Types
import { LayoutType } from "types/app";

// Utils
import { parseIdStorefront } from "utils/parseIdStorefront";

export const getServerSideProps = async ({ params, query }) => {
  const { handle } = params

  const product = await shopifyClient.product.fetchByHandle(handle);
  // const { data } = await client.query({
  //   query: GET_PRODUCTS,
  //   variables: { qty: 6, variantsQty: 3 },
  // });

  return {
    props: {
      product: parseShopifyResponse(product) || null,
      variantId: query.variant || null,
      // data: data || null,
    },
  };
};

const ProductPage = ({ product, variantId }: { product: Product, variantId: string }) => {
  /* 
   * Missing or incorrect types 
   * - JS Buy SDK types are not up to date or synced with @shopify/hydrogen-react/storefront-api-types
   *    Reference: https://github.com/Shopify/js-buy-sdk/issues/770
   * - Using any for now to avoid errors
  */
  const { variants, handle }: any = product

  console.log("product", product);
  console.log("variantId", variantId);


  const getProductTitle = () => {
    const variant = variants.find((variant: Product) => btoa(variant.id) === variantId)
    return product.title + `${variantId ? " - " + variant.title : ""}`
  }
  console.log("title", getProductTitle());

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

        <div className="flex flex-col gap-5 w-1/2">
          <div>
            <h1 className="text-2xl">
              {getProductTitle()}
            </h1>
            <p>{product?.description}</p>
          </div>

          <div className="">
            {variants.length > 1 && variants.map((variant: Product) => (
              <Link
                key={variant.id}
                href={`/products/${handle}?variant=${btoa(variant.id)}`}
                className="inline-block mx-2 p-2 border rounded"
              >
                {variant.title}
              </Link>
            ))}
          </div>
        </div>
      </article>
    </section>
  )
}

ProductPage.layout = LayoutType.PUBLIC
export default ProductPage