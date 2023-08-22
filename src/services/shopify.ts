import { shopifyClient } from "libs/shopify";
import { Checkout, CheckoutLineItemInput } from "shopify-buy";

export const updateLineItem = (
  lineItems: CheckoutLineItemInput[],
  checkoutToUpdate: Checkout,
  setCheckout: React.Dispatch<React.SetStateAction<Checkout>>
) => {
  const lineItemToUpdate = checkoutToUpdate.lineItems?.map((item) => ({
    id: item.id,
    quantity: lineItems?.find((lineItem) => lineItem?.variantId === item?.variant?.id).quantity,
  }))

  shopifyClient.checkout.updateLineItems(checkoutToUpdate.id, lineItemToUpdate)
    .then((checkout) => {
      setCheckout(checkout)
    })
}

export const addLineItem = (
  lineItems: CheckoutLineItemInput[],
  checkoutToUpdate: Checkout,
  setCheckout: React.Dispatch<React.SetStateAction<Checkout>>
) => {
  shopifyClient.checkout.addLineItems(checkoutToUpdate.id, lineItems)
    .then((checkout) => {
      setCheckout(checkout)
    })
}

export const removeLineItem = (
  removedId: string,
  checkoutToUpdate: Checkout,
  setCheckout: React.Dispatch<React.SetStateAction<Checkout>>
) => {
  const lineItemToRemove = checkoutToUpdate.lineItems?.filter((item) => item.id === removedId)
  console.log("lineItemToRemove", lineItemToRemove);

  // shopifyClient.checkout.removeLineItems(checkoutToUpdate.id, lineItemToUpdate)
  //   .then((checkout) => {
  //     setCheckout(checkout)
  //   })

}