import gql from "graphql-tag";

export const GET_ALL_PRODUCTS = gql`
query getProductsAndVariants($qty: Int!, $variantsQty: Int!) {
  products(first: $qty) {
    edges {
      cursor
      node {
        id
        title
        description
        handle
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
