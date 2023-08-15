// React
import React, { createContext, useState, useContext, useEffect } from "react";

// Shopify
import { Cart, Checkout } from "@shopify/hydrogen-react/storefront-api-types";

// Hooks
import { useLocalStorage } from "hooks/useLocalStorage";

// Libs
import { shopifyClient } from "libs/shopify";

// Types
export interface Props {
  children: React.ReactNode;
}

export interface CartProviderProps {
  checkout: Checkout
  lineItems?: any
  setLineItems?: any
}

const CartContext = createContext<CartProviderProps>({
  checkout: null,
});

export const useCartContext = () => {
  return useContext(CartContext);
};

export const removeDuplicatedItemsFromObjectsArray = (items) => {

  return items.reduce((acc, obj) => {
    if (acc.has(obj.variantId)) {
      acc.set(obj.variantId, { ...obj, quantity: acc.get(obj.variantId).quantity + obj.quantity });
    } else {
      acc.set(obj.variantId, obj);
    }

    return acc;
  }, new Map());
}

export const CartContextProvider = ({ children }: Props) => {
  const [checkout, setCheckout] = useLocalStorage("checkout", null);
  const [lineItems, setLineItems] = useLocalStorage("lineItems", []);

  useEffect(() => {
    if (!checkout?.id) {
      shopifyClient.checkout.create().then((checkout) => {
        setCheckout(checkout)
      });
    } else {
      shopifyClient.checkout.fetch(checkout?.id)
        .then((checkout) => {
          setCheckout(checkout)
        });
    }
  }, []);

  useEffect(() => {
    if (checkout?.id) {
      shopifyClient.checkout.fetch(checkout?.id)
        .then((checkout) => {
          const notDuplicatedLineItems: any = Array.from(removeDuplicatedItemsFromObjectsArray(lineItems).values())

          const updatedLineItem = checkout?.lineItems?.map((item) => {
            return {
              id: item.id,
              quantity: notDuplicatedLineItems?.find((lineItem: any) => lineItem?.variantId === item?.variant?.id).quantity,
            };
          })
          const notCreatedYetItems = notDuplicatedLineItems?.filter((item) => !checkout?.lineItems?.find((lineItem: any) => lineItem?.variant?.id === item?.variantId))

          if (notCreatedYetItems.length > 0) {
            shopifyClient.checkout.addLineItems(checkout.id, notCreatedYetItems).then((checkout) => {
              console.log("Items created at checkout", checkout);
              setCheckout(checkout)
            });
          }

          if (updatedLineItem.length > 0) {
            shopifyClient.checkout.updateLineItems(checkout.id, updatedLineItem).then((checkout) => {
              console.log("Items updated at checkout", checkout);
              setCheckout(checkout)
            });
          } else {
            shopifyClient.checkout.addLineItems(checkout.id, notDuplicatedLineItems).then((checkout) => {
              console.log("Items created at checkout", checkout);
              setCheckout(checkout)
            });
          }
        });
    }
  }, [lineItems]);

  // console.log("checkout", checkout);


  const value = {
    checkout,
    lineItems,
    setLineItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
