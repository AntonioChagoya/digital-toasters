import { gql } from '@apollo/client';

export const UPDATE_PRODUCT_METAFIELD = gql`
	mutation (
		$key: String!
		$namespace: String!
		$value: String!
		$ownerId: ID!
		$type: String!
	) {
		metafieldsSet(
			metafields: [
				{
					key: $key
					namespace: $namespace
					value: $value
					ownerId: $ownerId
					type: $type
				}
			]
		) {
			metafields {
				id
				key
				namespace
				value
				createdAt
				updatedAt
			}
			userErrors {
				field
				message
				code
			}
		}
	}
`;
