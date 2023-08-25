import { gql } from "@apollo/client";

export const PREDICTIVE_SEARCH = gql`
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