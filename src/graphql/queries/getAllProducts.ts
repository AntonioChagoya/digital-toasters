import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
query getProductsAndVariants($qty: Int!, $variantsQty: Int!) {
  products(first: $qty) {
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
