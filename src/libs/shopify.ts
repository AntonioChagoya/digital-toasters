// import Client from "shopify-buy";
import Client from 'shopify-buy/index.unoptimized.umd';

export const shopifyClient = Client.buildClient({
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN,
  domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
  apiVersion: "2023-07",
});



export const parseShopifyResponse = (response) => JSON.parse(JSON.stringify(response));