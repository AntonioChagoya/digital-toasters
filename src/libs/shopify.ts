import Client from "shopify-buy";

export const shopifyClient = Client.buildClient({
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN,
  domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
  apiVersion: "2022-10",
});


export const parseShopifyResponse = (response) => JSON.parse(JSON.stringify(response));