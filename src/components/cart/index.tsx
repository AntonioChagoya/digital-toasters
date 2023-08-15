import { useState } from 'react'

// Context
import { useCartContext } from 'context/CartContext'

// Libs
import { TbShoppingCart, TbTrashFilled, TbPaperBagOff } from 'react-icons/tb'
import { Transition } from '@headlessui/react'

// Components

const Cart = () => {
  const { checkout }: any = useCartContext()
  const [active, setActive] = useState(false)
  // console.log("checkout", checkout);

  return (
    <>
      <TbShoppingCart size={30} onClick={() => setActive(true)} className='hover:text-orange-500 cursor-pointer' />

      <Transition
        show={active}
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="z-[100] absolute"
      >
        <>
          <div className='fixed top-0 left-0 w-full h-full bg-black/30 z-100'>
            <section onClick={() => setActive(false)} className='relative w-full h-full z-0'></section>
            <Transition.Child
              enter="duration-300"
              enterFrom="opacity-50 transform translate-x-24"
              enterTo="opacity-100 transform translate-x-0"
              leave="duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-50 translate-x-24"
              className="fixed right-0 top-0 w-1/4 p-10 h-full bg-white z-50 shadow-xl"
            >
              <aside className='flex flex-col gap-5'>
                <div className='flex justify-between gap-20'>
                  <h4 className='font-bold'>Carrito</h4>
                  <span onClick={() => setActive(false)}>x</span>
                </div>

                <ul>
                  {checkout?.lineItems.map((item) => (
                    <li key={item.id} className='mb-5'>
                      <article className='relative flex flex-nowrap gap-5 border rounded p-5 pt-7'>
                        <button className='absolute top-3 right-3' type='button'>
                          <TbPaperBagOff size={20} />
                        </button>

                        <p>x {item.quantity}</p>
                        <h5>{item.title + " - " + item.variant.title}</h5>
                      </article>
                    </li>
                  ))}
                </ul>
              </aside>
            </Transition.Child>
          </div>
        </>
      </Transition>
    </>
  )
}

export default Cart