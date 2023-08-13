// React
import React, { createContext, useState, useContext, useEffect } from "react";

// Shopify
import { Cart } from "@shopify/hydrogen-react/storefront-api-types";

// Hooks
import { useLocalStorage } from "hooks/useLocalStorage";

// Libs
import { shopifyClient } from "libs/shopify";

// Types
export interface Props {
  children: React.ReactNode;
}

export interface CartProviderProps {
  cart: Cart
}

const CartContext = createContext<CartProviderProps>({
  cart: null
});

export const useCartContext = () => {
  return useContext(CartContext);
};

export const CartContextProvider = ({ children }: Props) => {
  const [cartCheckout, setCartCheckout] = useState<Cart>(null);
  const [checkoutId, setCheckoutId] = useState<number>(null);

  useEffect(() => {
    shopifyClient.checkout.create().then((checkout) => {
      setCartCheckout(checkout)
      setCheckoutId(checkout.id)
      // console.log("checkout", checkout);
    });
  }, []);
  const value = {
    cart: cartCheckout
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
