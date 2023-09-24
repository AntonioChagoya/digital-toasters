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
export const parseIdStorefront = (id: string = "") => {
  const storeFrontId = id.replace('gid://shopify/ProductVariant/', "");

  return storeFrontId;
};
/* 
 * Parse money format to MXN
 */
export const parseMoneyFormat = (amount: number, currency = "MXN") => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  })

  return formatter.format(Number(amount))
};

/* 
 * Parse string to be:
 * - Each first letter capitalized
 * - Remove underscores
 * - Remove dashes
 */
export const parseString = (string: string = "") => {
  const parsedString = string.replace(/_/g, " ").replace(/-/g, " ");

  return parsedString.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
}