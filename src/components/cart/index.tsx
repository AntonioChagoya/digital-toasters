// Context
import { useCartContext } from 'context/CartContext'
// Libs
import { ShoppingBagIcon } from '@heroicons/react/24/outline'


const Cart = () => {
  const { cart } = useCartContext()

  // console.log("Cart", cart);

  return (
    <>
      <ShoppingBagIcon className="w-8" />
    </>
  )
}

export default Cart