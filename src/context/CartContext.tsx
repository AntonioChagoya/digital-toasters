// React
import React, { createContext, useState, useContext } from 'react';

// Hooks
import { useLocalStorage } from 'hooks/useLocalStorage';

// Types
export interface Props {
	children: React.ReactNode;
}

export interface CartProviderProps {
	// checkout: Checkout;
	isCartOpen: boolean;
	isDataLoading?: boolean;
	setIsDataLoading?: (isDataLoading: boolean) => void;
	setIsCartOpen?: (isCartOpen: boolean) => void;
	// setCheckout?: (checkout: Checkout) => void;
}

const CartContext = createContext<CartProviderProps>({
	// checkout: null,
	isCartOpen: false,
});

export const useCartContext = () => {
	return useContext(CartContext);
};

// export const removeDuplicatedItemsFromVariantObjectsArray = items => {
// 	return items.reduce((acc, obj) => {
// 		if (acc.has(obj.variantId)) {
// 			acc.set(obj.variantId, {
// 				...obj,
// 				quantity: acc.get(obj.variantId).quantity + obj.quantity,
// 			});
// 		} else {
// 			acc.set(obj.variantId, obj);
// 		}

// 		return acc;
// 	}, new Map());
// };

export const CartContextProvider = ({ children }: Props) => {
	const [checkout, setCheckout] = useLocalStorage('checkout', null);
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [isDataLoading, setIsDataLoading] = useState(false);

	const value = {
		checkout,
		isCartOpen,
		setCheckout,
		isDataLoading,
		setIsDataLoading,
		setIsCartOpen,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
