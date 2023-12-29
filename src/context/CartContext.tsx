import { createContext, useState, useContext } from 'react';

// Hooks
import { useLocalStorage } from 'hooks/useLocalStorage';

// Types
export interface Props {
	children: React.ReactNode;
}

export interface CartProviderProps {
	isCartOpen: boolean;
	isDataLoading?: boolean;
	setIsDataLoading?: (isDataLoading: boolean) => void;
	setIsCartOpen?: (isCartOpen: boolean) => void;
}

const CartContext = createContext<CartProviderProps>({
	isCartOpen: false,
});

export const useCartContext = () => {
	return useContext(CartContext);
};

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
