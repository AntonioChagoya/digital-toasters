import "@egjs/flicking-plugins/dist/pagination.css";

// Next
import { useRouter } from 'next/router'

// React
import { useEffect, useState } from 'react'

// Context
import { useCartContext } from 'context/CartContext'

// Icons
import { TbShoppingCart, TbPaperBagOff, TbLoader3 } from 'react-icons/tb'

// Libs
import { useForm } from 'react-hook-form'
import { Transition } from '@headlessui/react'
import { shopifyClient } from 'libs/shopify'
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { Pagination } from "@egjs/flicking-plugins";

// Components
import QuantitySelector from '@components/productPage/QuantitySelector';

// Utils
import { parseIdStorefront, parseMoneyFormat } from 'utils/stringParse';

const Cart = () => {
  const { checkout, setCheckout, isCartOpen, setIsCartOpen } = useCartContext()
  const { setValue, register, watch, getValues, handleSubmit } = useForm();
  const [itemToUpdate, setItemToUpdate] = useState(null)
  const [loading, setLoading] = useState({
    id: null,
    status: false
  })
  const router = useRouter()

  const plugins = [new Pagination({ bulletCount: 7, type: "scroll" })];

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
    console.log("checkout stored", checkout);

    router.push(checkout.webUrl);
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
              className="fixed right-0 top-0 max-w-[40vw] px-6 py-4 h-full bg-white z-50 shadow-xl"
            >
              <aside>
                <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
                  <div className='flex justify-between gap-20 mb-2 py-4 border-b'>
                    <h4 className='font-bold text-lg'>Mi Carrito</h4>
                    <span onClick={() => setIsCartOpen(false)}>x</span>
                  </div>

                  <div className='relative pb-8'>
                    <section className='max-h-[70vh] h-full overflow-y-auto no-scrollbar'>
                      <div>
                        <Flicking align={"10"} circular={true} horizontal={false} plugins={plugins}>
                          {checkout?.lineItems.map((item) => (
                            <li key={parseIdStorefront(item.id)} className='block mb-5'>
                              <article className='relative flex flex-nowrap gap-5 border rounded p-3 pt-8 pr-8'>
                                <div className='w-[100px] max-w-[100px] h-[100px]'>
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

                                <div className='w-full flex flex-col justify-start gap-5'>
                                  <h5>{item.title + " - " + item.variant.title}</h5>
                                  <div
                                    className={`${loading && loading.id === item.variant.id
                                      ? "pointer-events-none opacity-50"
                                      : ""
                                      } flex justify-between items-center gap-10
                                `}
                                  >
                                    <div className="scale-[0.8] ">
                                      <QuantitySelector
                                        id="CartSelector"
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

                                    <div>
                                      {parseMoneyFormat(item.variant.price.amount * item.quantity)}
                                    </div>
                                  </div>
                                </div>

                              </article>
                            </li>
                          ))}
                          <ViewportSlot>
                            <div id='CustomPagination' className="flicking-pagination"></div>
                          </ViewportSlot>
                        </Flicking>
                      </div>
                    </section>
                  </div>

                  <section>
                    <button
                      disabled={loading.status || false}
                      type="submit"
                      className="bg-primary p-4 w-full text-white rounded shadow text-lg disabled:opacity-50"
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

              </aside>
            </Transition.Child>
          </div>
        </>
      </Transition>
    </>
  )
}

export default Cart