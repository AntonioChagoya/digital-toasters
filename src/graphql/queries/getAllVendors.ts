import { gql } from "@apollo/client";

export const GET_VENDORS = gql`
query suggestions($query: String!) {
  predictiveSearch(query: $query) {
    queries {
      text
    }
    collections {
      id
    }
    products {
      id
    }
    pages {
      id
    }
    articles {
      id
    }
  }
}
`;