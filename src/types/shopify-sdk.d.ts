/* 
 * Missing or incorrect types 
 * 
 * - StoreFront API Types are not compatible with JS Buy SDK types
 * - JS Buy SDK types are not up to date or synced with @shopify/hydrogen-react/storefront-api-types
 *    Reference: https://github.com/Shopify/js-buy-sdk/issues/770
 * - Some JS Buy SDK types are missing or incorrect on @types/shopify-buy
 * - Using custom types to fix the issue
*/

import { Product } from "shopify-buy"

interface CustomProductOption extends Node, Transaction {
  name: string
  values: {
    value: string
    type: TransactionKind
  }[]
}

interface CustomProduct extends Product {
  options: CustomProductOption[]
}