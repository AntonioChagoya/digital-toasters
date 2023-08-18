import "@egjs/flicking-plugins/dist/pagination.css";

// Next
import { useRouter } from 'next/router'

// React
import { useEffect, useState } from 'react'

// Context
import { useCartContext } from 'context/CartContext'

// Icons
import { TbShoppingCart, TbLoader3 } from 'react-icons/tb'
import { FaXmark } from "react-icons/fa6";

// Libs
import { useForm } from 'react-hook-form'
import { Transition } from '@headlessui/react'
import { shopifyClient } from 'libs/shopify'

// Components
import QuantitySelector from '@components/productPage/QuantitySelector';

// Utils
import { parseIdStorefront, parseMoneyFormat } from 'utils/stringParse';

const Cart = () => {
  const { checkout, setCheckout, isCartOpen, setIsCartOpen, isDataLoading } = useCartContext()
  const { setValue, register, watch, getValues, handleSubmit } = useForm();
  const [itemToUpdate, setItemToUpdate] = useState(null)
  const [loading, setLoading] = useState({
    id: null,
    status: false
  })
  const router = useRouter()

  useEffect(() => {
    if (checkout?.lineItems.length > 0) {
      checkout?.lineItems.forEach((item) => {
        const uniqueId = parseIdStorefront(item.variant.id);
        setValue(uniqueId, item.quantity)
      })
    }
  }, [checkout?.lineItems])

  useEffect(() => {
    if (itemToUpdate && checkout) {
      const getData = setTimeout(() => {
        setLoading({ id: itemToUpdate.variant.id, status: true })
        const uniqueId = parseIdStorefront(itemToUpdate.variant.id);

        shopifyClient.checkout
          .updateLineItems(checkout.id, [{ id: itemToUpdate.id, quantity: watch(uniqueId) }])
          .then((checkout) => {
            setCheckout(checkout)
            setLoading({ id: null, status: false })
          })

      }, 1000);

      return () => {
        clearTimeout(getData)
      };
    }
  }, [itemToUpdate])

  const onSubmit = (data) => {
    setLoading({ id: null, status: true })
    if (checkout?.lineItems.length > 0) {
      router.push(checkout.webUrl);
    }
  }

  return (
    <>
      <TbShoppingCart size={25} onClick={() => setIsCartOpen(true)} className='hover:text-primary cursor-pointer' />

      <Transition
        show={isCartOpen}
        appear
        enter="duration-100"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave=" duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="z-[100] absolute"
      >
        <>
          <div className='fixed top-0 left-0 w-full h-full bg-black/30 z-100'>
            <section onClick={() => setIsCartOpen(false)} className='relative w-full h-full z-0'></section>
            <Transition.Child
              enter="duration-200  delay-200"
              enterFrom="opacity-0 transform translate-x-24"
              enterTo="opacity-100 transform translate-x-0"
              leave="duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0 translate-x-24"
              className="fixed right-0 top-0 h-full w-full max-w-[90vw] md:max-w-[50vw] lg:max-w-[35vw] xl:max-w-[25vw] 2xl:max-w-[22vw] p-2 lg:px-3 lg:pb-4 lg:pt-2 bg-white z-50 shadow-xl"
            >
              <aside className="flex flex-col h-full">
                {!isDataLoading
                  ?
                  <form className='flex flex-col justify-between lg:gap-5 h-screen min-h-[100vh]' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex justify-between gap-20 mb-2 p-2 lg:py-4 border-b'>
                      <h4 className='font-bold text-lg text-secondary'>Mi Carrito</h4>
                      <FaXmark onClick={() => setIsCartOpen(false)} size={20} className="hover:scale-[1.1] cursor-pointer text-secondary" />
                    </div>

                    <div className='relative h-full'>
                      <section className='max-h-[70vh] overflow-y-auto no-scrollbar'>
                        <div className="divide-y">
                          {checkout?.lineItems.map((item) => (
                            <li key={parseIdStorefront(item.id)} className="block">
                              <article className='relative flex gap-2 lg:gap-5 p-1 lg:p-2 '>
                                <div className='w-[60px] h-[60px] lg:w-[100px] min-w-[60px] max-w-[100px] lg:h-[100px]'>
                                  <img
                                    width={80}
                                    height={80}
                                    src={item.variant.image.src}
                                    alt={"Product image" + item.variant.image.altText}
                                    className='object-cover w-full h-full rounded'
                                  />
                                </div>
                                <div className='w-full flex flex-col justify-start gap-2 lg:gap-5'>
                                  <div>
                                    <h5>{item.title + " - " + item.variant.title}</h5>
                                  </div>
                                  <div
                                    className={`${loading && loading.id === item.variant.id
                                      ? "pointer-events-none opacity-50"
                                      : ""
                                      } flex justify-start items-center gap-3
                                `}
                                  >
                                    <div className="relative">
                                      <QuantitySelector
                                        id="CartSelector"
                                        inputSize="w-10 h-7"
                                        buttonSize="w-7 h-7"
                                        name={parseIdStorefront(item.variant.id)}
                                        register={register}
                                        setValue={setValue}
                                        onChange={(e) => {
                                          e.preventDefault()
                                          setItemToUpdate(item)
                                        }}
                                        decrementCounter={() => {
                                          setLoading({ id: item.variant.id, status: true })
                                          const nameId = parseIdStorefront(item.variant.id);

                                          if (watch(nameId) > 1) {
                                            const currentValue = getValues(nameId) || 0;

                                            shopifyClient.checkout
                                              .updateLineItems(checkout.id, [{ id: item.id, quantity: currentValue - 1 }])
                                              .then((checkout) => {
                                                setCheckout(checkout)
                                                setLoading({ id: null, status: false })
                                              })
                                          }
                                        }}
                                        incrementCounter={() => {
                                          setLoading({ id: item.variant.id, status: true })

                                          const nameId = parseIdStorefront(item.variant.id);

                                          if (watch(nameId) < 99) {
                                            const currentValue = getValues(nameId) || 0;

                                            shopifyClient.checkout
                                              .updateLineItems(checkout.id, [{ id: item.id, quantity: currentValue + 1 }])
                                              .then((checkout) => {
                                                setCheckout(checkout)
                                                setLoading({ id: null, status: false })
                                              })
                                          }
                                        }}
                                      />
                                    </div>
                                    <FaXmark size={13} />
                                    <p className="text-sm">
                                      {parseMoneyFormat(item.variant.price.amount)}
                                    </p>
                                  </div>

                                </div>

                              </article>
                            </li>
                          ))}
                        </div>
                      </section>
                    </div>

                    <section className="mb-6">
                      <button
                        disabled={loading.status || checkout?.lineItems.length <= 0 || false}
                        type="submit"
                        className="bg-primary hover:opacity-70 p-4 w-full text-white rounded shadow text-sm lg:text-lg disabled:opacity-50"
                      >
                        {
                          loading.status
                            ? <div className="flex justify-center items-center">
                              <TbLoader3 className='animate-spin' size={30} />
                            </div>
                            : <>Proceder al pago - {parseMoneyFormat(checkout?.totalPrice?.amount)}</>
                        }
                      </button>
                    </section>
                  </form>
                  :
                  <div className="flex justify-center items-center w-full h-full">
                    <TbLoader3 size={40} className="text-primary animate-spin" />
                  </div>
                }
              </aside>
            </Transition.Child>
          </div>
        </>
      </Transition>
    </>
  )
}

export default Cart