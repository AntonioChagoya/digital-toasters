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

export const CartContextProvider = ({ children }: Props) => {
  const [checkout, setCheckout] = useLocalStorage("checkout", null);
  const [lineItems, setLineItems] = useLocalStorage("lineItems", []);

  useEffect(() => {
    if (!checkout?.id) {
      shopifyClient.checkout.create().then((checkout) => {
        console.log("create checkout", checkout);

        setCheckout(checkout)
      });
    } else {
      shopifyClient.checkout.fetch(checkout?.id).then((checkout) => {
        console.log("fetch checkout", checkout);

        setCheckout(checkout)
      });
    }
  }, []);

  useEffect(() => {
    if (checkout?.id) {
      shopifyClient.checkout.addLineItems(checkout?.id, lineItems).then((checkout) => {
        setCheckout(checkout)
      });
    }
  }, [lineItems]);

  // console.log("checkout", checkout?.lineItems);

  const value = {
    checkout,
    lineItems,
    setLineItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
