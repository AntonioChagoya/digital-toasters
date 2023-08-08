import Client from "shopify-buy";

console.log(process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN);
console.log(process.env.NEXT_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN);

export const shopifyClient = Client.buildClient({
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN,
  domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
});


export const parseShopifyResponse = (response) => JSON.parse(JSON.stringify(response));