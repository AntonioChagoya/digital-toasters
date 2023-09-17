

// GraphQL
import { useQuery, gql } from "@apollo/client"

// Components
import ProductsCarousel from "./ProductsCarousel"

const GET_RELATED_PRODUCTS = gql`
query productRecommendations {
  productRecommendations(productId: "gid://shopify/Product/8378676052276", intent: RELATED) {
    id
    title
    description
    handle
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      src
      url
      altText
      width
      height
    }
    variants(first: 10) {
      edges {
        cursor
        node {
          id
          title
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          image {
            id
            src
            url
            altText
            width
            height
          }
          selectedOptions {
            name
            value
          }
          sku
        }
      }
    }
  }
}

`

const RelatedProducts = () => {
  const { data, loading } = useQuery(GET_RELATED_PRODUCTS)

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">Productos relacionados</h2>

      {
        data?.productRecommendations && !loading &&
        <ProductsCarousel data={data?.productRecommendations} />
      }
    </div>
  )
}

export default RelatedProducts