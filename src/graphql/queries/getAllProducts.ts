import gql from "graphql-tag";

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
            }
          }
        }
      }
    }
  }
}

`;
