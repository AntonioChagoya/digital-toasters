// React
import React, { createContext, useState, useContext, useEffect } from "react";

// Shopify
import { Checkout, CheckoutLineItemInput } from "shopify-buy";

// Hooks
import { useLocalStorage } from "hooks/useLocalStorage";

// Services
import { updateLineItem } from "services/shopify";

// Libs
import { shopifyClient } from "libs/shopify";

// Types
export interface Props {
  children: React.ReactNode;
}

export interface CartProviderProps {
  checkout: Checkout
  isCartOpen: boolean
  setIsCartOpen?: (isCartOpen: boolean) => void
  setCheckout?: (checkout: Checkout) => void
}

const CartContext = createContext<CartProviderProps>({
  checkout: null,
  isCartOpen: false,
});

export const useCartContext = () => {
  return useContext(CartContext);
};

export const removeDuplicatedItemsFromVariantObjectsArray = (items) => {

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
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (!checkout?.id || checkout?.completedAt) {
      shopifyClient.checkout.create().then((checkout) => {
        setCheckout(checkout)
      });
    } else {
      shopifyClient.checkout.fetch(checkout?.id)
        .then((checkout) => {
          setCheckout(checkout)
        });
    }
  }, [isCartOpen]);


  const value = {
    checkout,
    isCartOpen,
    setCheckout,
    setIsCartOpen
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
