import { gql } from "@apollo/client";

export const GET_PRODUCT_METAFIELDS = gql`
  query getProduct($handle: String!, $metafields: [HasMetafieldsIdentifier!]!) {
    productByHandle(handle: $handle) {
      id 
      handle
      metafields (identifiers: $metafields) {
        id
        key
        value
      }
    }
  }
`

export const GET_PRODUCTS = gql`
query getProductsAndVariants(
  $first: Int!,
  $sortKey: ProductSortKeys
  $reverse: Boolean
  $query: String
  $variantsQty: Int!,
) {
  products(first: $first, sortKey: $sortKey, reverse: $reverse, query: $query) {
    edges {
      cursor
      node {
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
        metafields(first: 10) {
          edges {
            node {
              id
              namespace
              key
              value
            }
          }
        }
        variants(first: $variantsQty) {
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
  }
}

`;
