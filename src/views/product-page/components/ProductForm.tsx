// React
import { useEffect, useState } from 'react';

// Next
import { useRouter } from 'next/router';

// Utils
import { parseMoneyFormat } from '@utils/stringParse';

// Libs
import { useForm } from 'react-hook-form';

// Components
import Box from '@components/Box';
import Button from '@components/buttons/Button';
import QuantitySelector from '@views/product-page/components/QuantitySelector';

// Views
import ProductPageDescription from '@views/product-page/components/Description';
import Options from '@views/product-page/components/Options';

export type FormValues = {
	amount: number;
};

function containsProperties(obj: object, targetObject: object) {
	for (const key in targetObject) {
		if (
			obj[key as keyof typeof obj] !==
			targetObject[key as keyof typeof targetObject]
		) {
			return false;
		}
	}
	return true;
}
function areObjectsEqual(obj1: object, obj2: object): boolean {
	const entries1 = Object.entries(obj1 as object);
	const entries2 = Object.entries(obj2 as object);

	return (
		entries1.length === entries2.length &&
		entries1.every(
			([key, value]) =>
				Object.prototype.hasOwnProperty.call(obj2, key) &&
				(obj2 as Record<string, keyof typeof obj2>)[key] === value
		)
	);
}

const ProductForm = ({ product }: { product: IProduct }) => {
	const router = useRouter();
	const { query } = router;

	const {
		name,
		roaster,
		variations,
		description,
		attributes,
		price,
		sale_price,
	} = product?.attributes || {};
	const [loading, setLoading] = useState(false);

	// Variant management
	const fallbackVariant =
		variations && variations?.data?.length > 0 ? variations.data[0] : null;

	const [selectedVariant, setSelectedVariant] = useState(fallbackVariant);

	// Form management
	const { getValues, setValue, register, handleSubmit, watch } =
		useForm<FormValues>({
			defaultValues: {
				amount: 1,
			},
		});

	// Add to cart
	const onSubmit = () => {};

	const getPrice = () => {
		if (
			selectedVariant?.attributes?.sale_price &&
			selectedVariant?.attributes?.price
		) {
			return (
				<h4 className='text-secondary'>
					{parseMoneyFormat(selectedVariant?.attributes?.price)}{' '}
					<span className='text-gray-500 line-through'>
						{parseMoneyFormat(selectedVariant?.attributes?.sale_price)}
					</span>
				</h4>
			);
		} else if (selectedVariant?.attributes?.price) {
			return (
				<h4 className='text-secondary'>
					{parseMoneyFormat(selectedVariant?.attributes?.price)}
				</h4>
			);
		} else {
			return (
				<h4 className='text-secondary'>
					{parseMoneyFormat(price)}{' '}
					<span className='text-gray-500 line-through'>
						{parseMoneyFormat(sale_price)}
					</span>
				</h4>
			);
		}
	};

	useEffect(() => {
		const copyQuery = { ...query };
		delete copyQuery.slug;

		if (Object.keys(copyQuery).length > 0) {
			const newVariant = variations?.data?.filter(({ attributes }) => {
				const variantInfo = attributes.variantInfo.reduce(
					(acc, curr) => ({
						...acc,
						...curr,
					}),
					{}
				);

				const querySize = Object.keys(copyQuery).length;
				const variantInfoSize = Object.keys(variantInfo).length;

				if (querySize !== variantInfoSize) {
					return containsProperties(variantInfo, copyQuery);
				} else {
					return areObjectsEqual(copyQuery, variantInfo);
				}
			});

			newVariant && setSelectedVariant(newVariant[0]);
		}
	}, [query, variations, router]);

	return (
		<Box className='lg:max-w-[35rem]'>
			<form>
				<div className='flex flex-col gap-7'>
					{/* General info */}
					<Box className='flex flex-col gap-5'>
						<div>
							<div>
								<h1 className='text-3xl font-bold'>
									{selectedVariant?.attributes?.name
										? selectedVariant?.attributes?.name
										: name.toString()}{' '}
								</h1>
							</div>
							<div className='pointer-events-none text-accent'>
								Tostador: {roaster?.data?.attributes?.name.toString()}
							</div>
						</div>

						{getPrice()}

						<ProductPageDescription
							description={
								selectedVariant?.attributes?.description || description
							}
						/>
					</Box>

					{/* Swatches */}
					{attributes && (
						<Options
							attributes={attributes}
							selectedVariant={selectedVariant}
						/>
					)}

					{/* Quantity selector */}
					<QuantitySelector
						name='amount'
						register={register}
						setValue={setValue}
						getValues={getValues}
						setLoading={setLoading}
						watch={watch}
					/>

					{/* Pay button */}
					<Box className='flex flex-col items-start justify-start gap-1'>
						<span className='text-xs italic text-ligth'>
							El costo de envío se calcula en el momento de pagar*
						</span>
						<Button
							type='submit'
							loading={loading}
							action={handleSubmit(onSubmit)}
						>
							Agregar al carrito -{' '}
							{/* {parseMoneyFormat(parseFloat(selectedVariant?.attributes?.price))} */}
						</Button>
					</Box>
				</div>
			</form>
		</Box>
	);
};

export default ProductForm;
