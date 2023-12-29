import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
	query getProductsAndVariants(
		$first: Int!
		$sortKey: ProductSortKeys
		$reverse: Boolean
		$query: String
		$variantsQty: Int!
	) {
		products(
			first: $first
			sortKey: $sortKey
			reverse: $reverse
			query: $query
		) {
			edges {
				cursor
				node {
					id
					title
					description
					handle
					options {
						id
						name
						values
					}
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
export const GET_METAOBJECT_BY_ID = gql`
	query getMetaObject($id: ID!) {
		metaobject(id: $id) {
			id
			handle
			fields {
				key
				value
			}
		}
	}
`;
export const GET_PRODUCT_BY_SLUG = gql`
	query Article($id: ID!) {
		article(id: $id) {
			data {
				id
				attributes {
					name
					description
					price
					slug
					createdAt
					updatedAt
					publishedAt
					locale
					# roasts {
					#   data {
					#     attributes {
					#       name
					#       createdAt
					#       updatedAt
					#       locale
					#     }
					#   }
					# }
				}
			}
		}
	}
`;
export const GET_PRODUCT_METAFIELDS = gql`
	query getProduct($handle: String!, $metafields: [HasMetafieldsIdentifier!]!) {
		product(handle: $handle) {
			id
			handle
			metafields(identifiers: $metafields) {
				id
				key
				value
			}
		}
	}
`;
export const GET_RELATED_PRODUCTS = gql`
	query productRecommendations {
		productRecommendations(
			productId: "gid://shopify/Product/8378676052276"
			intent: RELATED
		) {
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
`;
