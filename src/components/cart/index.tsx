import { useEffect, useState } from 'react'

// Context
import { useCartContext } from 'context/CartContext'

// Libs
import { TbShoppingCart, TbPaperBagOff } from 'react-icons/tb'
import { Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'

// Components
import QuantitySelector from '@components/productPage/QuantitySelector';
import { parseIdStorefront } from 'utils/stringParse';
import { shopifyClient } from 'libs/shopify'

const Cart = () => {
  const { checkout, setCheckout, isCartOpen, setIsCartOpen } = useCartContext()
  const { setValue, register, watch, getValues } = useForm();
  const [itemToUpdate, setItemToUpdate] = useState(null)

  useEffect(() => {
    if (checkout?.lineItems.length > 0) {
      checkout?.lineItems.forEach((item) => {
        const uniqueId = parseIdStorefront(item.variant.id);
        setValue(uniqueId, item.quantity)
      })
    }
  }, [checkout?.lineItems])

  useEffect(() => {
    if (itemToUpdate) {

      const getData = setTimeout(() => {
        const uniqueId = parseIdStorefront(itemToUpdate.variant.id);

        shopifyClient.checkout
          .updateLineItems(checkout.id, [{ id: itemToUpdate.id, quantity: getValues(uniqueId) }])
          .then((checkout) => {
            setCheckout(checkout)
          })
      }, 1000);
      return () => clearTimeout(getData);
    }
  }, [itemToUpdate])

  return (
    <>
      <TbShoppingCart size={30} onClick={() => setIsCartOpen(true)} className='hover:text-orange-500 cursor-pointer' />

      <Transition
        show={isCartOpen}
        enter="transition-opacity duration-100"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="z-[100] absolute"
      >
        <>
          <div className='fixed top-0 left-0 w-full h-full bg-black/30 z-100'>
            <section onClick={() => setIsCartOpen(false)} className='relative w-full h-full z-0'></section>
            <Transition.Child
              enter="duration-200"
              enterFrom="opacity-50 transform translate-x-24"
              enterTo="opacity-100 transform translate-x-0"
              leave="duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-50 translate-x-24"
              className="fixed right-0 top-0 w-1/4 px-6 py-4 h-full bg-white z-50 shadow-xl"
            >
              <aside className='flex flex-col gap-5'>
                <div className='flex justify-between gap-20 mb-2 py-4 border-b'>
                  <h4 className='font-bold text-lg'>Mi Carrito</h4>
                  <span onClick={() => setIsCartOpen(false)}>x</span>
                </div>

                <div className='block max-h-[60vh] overflow-y-hidden'>
                  <ul>
                    {checkout?.lineItems.map((item) => (
                      <li key={parseIdStorefront(item.id)} className='mb-5'>
                        <article className='relative flex flex-nowrap gap-5 border rounded p-5 pt-7'>
                          <div className='w-[80px] h-[100px]'>
                            <img
                              width={80}
                              height={80}
                              src={item.variant.image.src}
                              alt={"Product image" + item.variant.image.altText}
                              className='object-cover w-full h-full rounded'
                            />
                          </div>
                          <button className='absolute top-3 right-3' type='button'>
                            <TbPaperBagOff size={20} />
                          </button>

                          <div className='flex flex-col gap-5'>
                            <h5>{item.title + " - " + item.variant.title}</h5>
                            <div className='scale-[0.8]'>
                              <QuantitySelector
                                nameId={parseIdStorefront(item.variant.id)}
                                register={register}
                                setValue={setValue}
                                onChange={(e) => {
                                  setItemToUpdate(item)
                                }}
                                decrementCounter={() => {
                                  const nameId = parseIdStorefront(item.variant.id);

                                  if (watch(nameId) > 1) {
                                    const currentValue = getValues(nameId) || 0;

                                    shopifyClient.checkout
                                      .updateLineItems(checkout.id, [{ id: item.id, quantity: currentValue - 1 }])
                                      .then((checkout) => {
                                        setCheckout(checkout)
                                      })
                                  }
                                }}
                                incrementCounter={() => {
                                  const nameId = parseIdStorefront(item.variant.id);

                                  if (watch(nameId) < 99) {
                                    const currentValue = getValues(nameId) || 0;

                                    shopifyClient.checkout
                                      .updateLineItems(checkout.id, [{ id: item.id, quantity: currentValue + 1 }])
                                      .then((checkout) => {
                                        setCheckout(checkout)
                                      })
                                  }
                                }}
                              />
                            </div>
                          </div>

                        </article>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </Transition.Child>
          </div>
        </>
      </Transition>
    </>
  )
}

export default Cart