// React
import { useState } from 'react';

// Context
// import { useCartContext } from '@context/CartContext';

// Utils
import { parseMoneyFormat } from '@utils/stringParse';

// Libs
// import { shopifyClient } from '@libs/shopify';
// import { TbCircleArrowRightFilled } from 'react-icons/tb';
// import { useForm } from 'react-hook-form';

// Utils
// import { calculateAvergeRating } from '@utils/rates';
// import { groupArrayObjectsByGroupSize } from '@utils/arrays';

// Components
import Box from '@components/Box';

// Views
import ProductPageDescription from '@views/product-page/components/Description';
import Options from '@views/product-page/components/Options';

// Types

// import Button from '@components/buttons/Button';
// import RatingStars from '@views/product-page/components/RatingStars';
// import QuantitySelector from '@components/QuantitySelector';

// Types
// import { ButtonColor, ButtonSize, ButtonWide } from 'theme';

const ProductForm = ({ product }: { product: IProduct }) => {
	const { name, roaster, variations, price, description, attributes } =
		product?.attributes || {};
	// const variant = variants?.length > 0 ? variants[0] : null;
	// const { setIsCartOpen, checkout, setCheckout } = useCartContext();
	// const { fields } = relevantInfoMetaobject || [];
	// const groupedFields = groupArrayObjectsByGroupSize(fields, 3);

	// Form management
	// const [loading, setLoading] = useState(false);
	const [selectedVariant] = useState(
		variations && variations?.data?.length > 0 ? variations.data[0] : null
	);
	// const { getValues, setValue, register, handleSubmit, watch } = useForm({
	// 	defaultValues: {
	// 		ProductAmount: 1,
	// 	},
	// });

	// Add to cart
	// const onSubmit = async data => {
	// 	setLoading(true);
	// 	const currentCheckout = await shopifyClient.checkout.fetch(checkout?.id);
	// 	const lineItemToAdd = {
	// 		variantId: selectedVariant.id,
	// 		quantity: data.ProductAmount,
	// 	};

	// 	const getLineItemInCheckout = currentCheckout.lineItems.find(
	// 		item => item.id === lineItemToAdd.variantId
	// 	);

	// 	if (getLineItemInCheckout) {
	// 		updateLineItem(
	// 			[{ variantId: selectedVariant.id, quantity: data.ProductAmount }],
	// 			currentCheckout,
	// 			setCheckout
	// 		);
	// 	} else {
	// 		addLineItem(
	// 			[{ variantId: selectedVariant.id, quantity: data.ProductAmount }],
	// 			currentCheckout,
	// 			setCheckout
	// 		);
	// 	}

	// 	setIsCartOpen(true);
	// 	setLoading(false);
	// };

	// Quantity Selectors
	// const incrementCounter = () => {
	// 	setLoading(true);
	// 	if (watch('ProductAmount') < 99) {
	// 		const currentValue = getValues('ProductAmount') || 0;
	// 		setValue('ProductAmount', currentValue + 1);
	// 	}
	// 	setTimeout(() => {
	// 		setLoading(false);
	// 	}, 500);
	// };

	// const decrementCounter = () => {
	// 	setLoading(true);
	// 	if (watch('ProductAmount') > 1) {
	// 		const currentValue = getValues('ProductAmount') || 0;
	// 		setValue('ProductAmount', currentValue - 1);
	// 	}
	// 	setTimeout(() => {
	// 		setLoading(false);
	// 	}, 500);
	// };
	console.log('selectedVariant', selectedVariant);

	return (
		<Box className='lg:max-w-[35rem]'>
			<></>
			{
				<form>
					<div className='flex flex-col gap-7'>
						<div className='flex flex-col gap-5'>
							<div>
								<div>
									<h1 className='text-3xl font-bold'>
										{selectedVariant?.attributes?.name
											? selectedVariant?.attributes?.name
											: name.toString()}{' '}
										{''}
									</h1>
								</div>
								<div className='pointer-events-none text-accent'>
									Tostador: {roaster?.data?.attributes?.name.toString()}
								</div>
								{/* <div className='flex items-center gap-2'>
									<RatingStars
										currentRating={calculateAvergeRating(rateMetaobject)}
										onSelectRate={() => {}}
									/>
								</div> */}
							</div>
							<div className='flex gap-3'>
								<h4 className='text-secondary'>
									{selectedVariant?.attributes?.sale_price
										? parseMoneyFormat(selectedVariant?.attributes?.sale_price)
										: parseMoneyFormat(price)}{' '}
									{selectedVariant?.attributes?.price && (
										<span className='text-gray-500 line-through'>
											{parseMoneyFormat(selectedVariant?.attributes?.price)}
										</span>
									)}
								</h4>
							</div>
							<ProductPageDescription
								description={
									selectedVariant?.attributes?.description || description
								}
							/>

							{/* {fields && fields?.length > 0 && (
								<div className='flex flex-wrap justify-end gap-1'>
									<table className='table-fixed'>
										<tbody className='text-left'>
											{groupedFields.map((group, index) => {
												return (
													<tr key={index}>
														{group.map((field, index) => {
															if (field.key === 'altura') {
																return (
																	<td key={index}>
																		<h6>{field.key.replaceAll('_', ' ')}</h6>
																		<p className='mb-0'>
																			{JSON.parse(field.value).value} m s. n. m.
																		</p>
																	</td>
																);
															} else {
																return (
																	<td key={index}>
																		<h6>{field.key.replaceAll('_', ' ')}</h6>
																		<p className='mb-0'>{field.value}</p>
																	</td>
																);
															}
														})}
													</tr>
												);
											})}
										</tbody>
									</table>
									<span
										onClick={() => {
											document
												.getElementById('Description')
												.scrollIntoView({ behavior: 'smooth' });
										}}
										className='flex cursor-pointer items-center text-sm text-accent hover:opacity-80'
									>
										Saber más
										<TbCircleArrowRightFilled
											size={15}
											className='ml-1 inline-block'
										/>
									</span>
								</div>
							)} */}
						</div>

						<section className='flex flex-col flex-nowrap justify-between gap-8 sm:flex-row sm:items-end lg:gap-5'>
							{attributes && attributes.length > 1 && (
								<Options attributes={attributes} />
							)}
							{/* <QuantitySelector
								id='ProductPageSelector'
								inputsize='w-20 h-10'
								buttonsize='w-10 h-10'
								name={'ProductAmount'}
								decrementCounter={decrementCounter}
								incrementCounter={incrementCounter}
								register={register}
								setValue={setValue}
							/> */}
						</section>

						{/* <Box className='flex flex-col items-start justify-start gap-1'>
							<span className='text-xs italic text-ligth'>
								El costo de envío se calcula en el momento de pagar*
							</span>
							<Button
								type='submit'
								loading={loading}
								action={handleSubmit(onSubmit)}
								color={ButtonColor.primary}
								size={ButtonSize.lg}
								wide={ButtonWide.full}
							>
								Agregar al carrito -{' '}
								{parseMoneyFormat(parseFloat(selectedVariant?.price.amount))}
							</Button>
						</Box> */}
					</div>
				</form>
			}
		</Box>
	);
};

export default ProductForm;
