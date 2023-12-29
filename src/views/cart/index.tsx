import '@egjs/flicking-plugins/dist/pagination.css';

// Next
import { useRouter } from 'next/router';

// React
import { useEffect, useState } from 'react';

// Context
import { useCartContext } from 'context/CartContext';

// Icons
import { TbShoppingCart, TbLoader3 } from 'react-icons/tb';
import { FaXmark } from 'react-icons/fa6';

// Libs
import { useForm } from 'react-hook-form';
import { Transition } from '@headlessui/react';

// Components
import QuantitySelector from '@components/QuantitySelector';
import Button from '@components/buttons/Button';

// Utils
import { parseIdStorefront, parseMoneyFormat } from 'utils/stringParse';
import { ButtonSize, ButtonWide } from 'theme';

const Cart = () => {
	const { checkout, setCheckout, isCartOpen, setIsCartOpen, isDataLoading } =
		useCartContext();
	const { setValue, register, watch, getValues, handleSubmit } = useForm();
	const [itemToUpdate, setItemToUpdate] = useState(null);
	const [itemToRemove, setItemToRemove] = useState(null);

	const [loading, setLoading] = useState({
		id: null,
		status: false,
	});
	const router = useRouter();

	useEffect(() => {
		if (checkout?.lineItems.length > 0) {
			checkout?.lineItems.forEach(item => {
				const uniqueId = parseIdStorefront(item.variant.id);
				setValue(uniqueId, item.quantity);
			});
		}
	}, [checkout?.lineItems]);

	useEffect(() => {
		if (itemToUpdate && checkout) {
			const getData = setTimeout(() => {
				setLoading({ id: itemToUpdate.variant.id, status: true });
				const uniqueId = parseIdStorefront(itemToUpdate.variant.id);
			}, 1000);

			return () => {
				clearTimeout(getData);
			};
		}
	}, [itemToUpdate]);

	useEffect(() => {
		if (itemToRemove && checkout) {
			setLoading({ id: itemToRemove.variant.id, status: true });
		}
	}, [itemToRemove]);

	const onSubmit = data => {
		setLoading({ id: null, status: true });
		if (checkout?.lineItems.length > 0) {
			router.push(checkout.webUrl);
		}
	};

	return (
		<>
			<TbShoppingCart
				size={25}
				onClick={() => setIsCartOpen(true)}
				className='cursor-pointer hover:text-primary'
			/>

			<Transition
				show={isCartOpen}
				appear
				enter='duration-100'
				enterFrom='opacity-0'
				enterTo='opacity-100'
				leave=' duration-200'
				leaveFrom='opacity-100'
				leaveTo='opacity-0'
				className='absolute z-[100]'
			>
				<>
					<div className='z-100 fixed left-0 top-0 h-full w-full bg-black/30'>
						<section
							onClick={() => setIsCartOpen(false)}
							className='relative z-0 h-full w-full'
						></section>
						<Transition.Child
							enter='duration-200  delay-200'
							enterFrom='opacity-0 transform translate-x-24'
							enterTo='opacity-100 transform translate-x-0'
							leave='duration-200'
							leaveFrom='opacity-100'
							leaveTo='opacity-0 translate-x-24'
							className='fixed right-0 top-0 z-50 h-full w-full max-w-[90vw] bg-white p-2 shadow-xl md:max-w-[50vw] lg:max-w-[35vw] lg:px-3 lg:pb-4 lg:pt-2 xl:max-w-[25vw] 2xl:max-w-[22vw]'
						>
							<aside className='flex h-full flex-col'>
								{!isDataLoading ? (
									<form
										className='flex h-screen min-h-[100vh] flex-col justify-between pb-10 lg:gap-5'
										onSubmit={handleSubmit(onSubmit)}
									>
										<div className='mb-2 flex justify-between gap-20 border-b p-2 lg:py-4'>
											<h4 className='text-lg font-bold text-secondary'>
												Mi Carrito
											</h4>
											<FaXmark
												onClick={() => setIsCartOpen(false)}
												size={20}
												className='cursor-pointer text-secondary hover:scale-[1.1]'
											/>
										</div>

										<div className='relative h-full'>
											<section className='no-scrollbar max-h-[70vh] overflow-y-auto'>
												<div className='divide-y'>
													{checkout?.lineItems.map(item => (
														<li
															key={parseIdStorefront(item.id)}
															className='block'
														>
															<article className='relative flex gap-2 p-1 lg:gap-5 lg:p-2 '>
																<div className='h-[60px] w-[60px] min-w-[60px] max-w-[100px] lg:h-[100px] lg:w-[100px]'>
																	<img
																		width={80}
																		height={80}
																		src={item.variant.image.src}
																		alt={
																			'Product image' +
																			item.variant.image.altText
																		}
																		className='h-full w-full rounded object-cover'
																	/>
																</div>
																<div className='flex w-full flex-col justify-start gap-2 lg:gap-5'>
																	<div>
																		<h5>
																			{item.title + ' - ' + item.variant.title}
																		</h5>
																	</div>
																	<div
																		className={`${
																			loading && loading.id === item.variant.id
																				? 'pointer-events-none opacity-50'
																				: ''
																		} flex items-center justify-start gap-3
                                `}
																	>
																		<div className='relative'>
																			<QuantitySelector
																				id='CartSelector'
																				inputsize='w-10 h-7'
																				buttonsize='w-7 h-7'
																				name={parseIdStorefront(
																					item.variant.id
																				)}
																				register={register}
																				setValue={setValue}
																				onChange={e => {
																					e.preventDefault();
																					const nameId = parseIdStorefront(
																						item.variant.id
																					);

																					setItemToUpdate(item);

																					if (watch(nameId) === 0) {
																						setItemToRemove(item);
																					}
																				}}
																				decrementCounter={() => {
																					setLoading({
																						id: item.variant.id,
																						status: true,
																					});
																					const nameId = parseIdStorefront(
																						item.variant.id
																					);
																					const currentValue =
																						watch(nameId) || 0;

																					if (currentValue > 1) {
																						// shopifyClient.checkout
																						//   .updateLineItems(checkout.id, [
																						//     {
																						//       id: item.id,
																						//       quantity: currentValue - 1,
																						//     },
																						//   ])
																						//   .then((checkout) => {
																						//     setCheckout(checkout);
																						//     setLoading({
																						//       id: null,
																						//       status: false,
																						//     });
																						//   });
																					} else if (currentValue - 1 === 0) {
																						setItemToRemove(item);
																						setValue(nameId, 0);
																					}
																				}}
																				incrementCounter={() => {
																					setLoading({
																						id: item.variant.id,
																						status: true,
																					});

																					const nameId = parseIdStorefront(
																						item.variant.id
																					);

																					if (watch(nameId) < 99) {
																						const currentValue =
																							getValues(nameId) || 0;

																						// shopifyClient.checkout
																						//   .updateLineItems(checkout.id, [
																						//     {
																						//       id: item.id,
																						//       quantity: currentValue + 1,
																						//     },
																						//   ])
																						//   .then((checkout) => {
																						//     setCheckout(checkout);
																						//     setLoading({
																						//       id: null,
																						//       status: false,
																						//     });
																						//   });
																					}
																				}}
																			/>
																		</div>
																		<FaXmark size={13} />
																		<p className='mb-0 text-sm'>
																			{parseMoneyFormat(
																				item.variant.price.amount
																			)}
																		</p>
																	</div>
																</div>
															</article>
														</li>
													))}
												</div>
											</section>
										</div>

										<Button
											loading={loading.status ? true : false}
											wide={ButtonWide.full}
											size={ButtonSize.lg}
										>
											Proceder al pago -{' '}
											{parseMoneyFormat(checkout?.totalPrice?.amount)}
										</Button>
									</form>
								) : (
									<div className='flex h-full w-full items-center justify-center'>
										<TbLoader3
											size={40}
											className='animate-spin text-primary'
										/>
									</div>
								)}
							</aside>
						</Transition.Child>
					</div>
				</>
			</Transition>
		</>
	);
};

export default Cart;
