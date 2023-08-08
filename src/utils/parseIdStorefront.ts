/* 
 * GraphQL Id format: gid://shopify/ProductVariant/${id}
 * Storefront Id format: ${id}
 * 
 * Using non-standar implementation to parse the id
 * GraphQL Variants Id's defers JS Buy SDK Id's (https://shopify.github.io/js-buy-sdk/ProductHelpers.html)
 * JS Buy SDK Requieres 
 * 
 * References: 
 * (https://stackoverflow.com/questions/60338239/shopify-storefront-api-getting-referenced-variant-with-graphql)
*/
export const parseIdStorefront = (id: string) => {
  const storeFrontId = id.replace('gid://shopify/ProductVariant/', "");

  return storeFrontId;
};