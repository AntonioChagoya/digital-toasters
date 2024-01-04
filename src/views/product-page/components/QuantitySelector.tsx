// Libs
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { UseFormSetValue, UseFormRegister } from 'react-hook-form';
import { FormValues } from '@views/product-page/components/ProductForm';

type QuantitySelectorProps = {
	id?: string;
	name: keyof FormValues;
	register: UseFormRegister<FormValues>;
	setValue: UseFormSetValue<FormValues>;
	watch: (name: keyof FormValues) => number;
	getValues: (name?: keyof FormValues) => number;
	setLoading: (state: boolean) => void;
};

const QuantitySelector = ({
	id,
	name,
	register,
	getValues,
	setValue,
	setLoading,
	watch,
}: QuantitySelectorProps) => {
	const incrementCounter = () => {
		setLoading(true);
		if (watch('amount') < 99) {
			const currentValue = getValues('amount') || 0;
			setValue('amount', currentValue + 1);
		}
		setTimeout(() => {
			setLoading(false);
		}, 500);
	};

	const decrementCounter = () => {
		setLoading(true);
		if (watch('amount') > 1) {
			const currentValue = getValues('amount') || 0;
			setValue('amount', currentValue - 1);
		}
		setTimeout(() => {
			setLoading(false);
		}, 500);
	};

	return (
		<div className='flex flex-col'>
			<div className='flex items-center gap-1'>
				<button
					onClick={decrementCounter}
					type='button'
					className={`flex h-12 w-12 items-center justify-center rounded bg-gray-100 hover:scale-[1.1]`}
				>
					<FaMinus />
				</button>
				<input
					id={id}
					max={99}
					min={0}
					{...register(name, { valueAsNumber: true })}
					onBlur={e => {
						if (parseInt(e.target.value) > 99) {
							setValue(name, 99);
						}
						if (parseInt(e.target.value) < 1) {
							setValue(name, 0);
						}
					}}
					onChange={e => {
						setLoading(true);

						if (parseInt(e.target.value) < 100) {
							setValue(name, parseInt(e.target.value));
						}

						setTimeout(() => {
							setLoading(false);
						}, 500);
					}}
					className={`h-12 min-w-[5rem] rounded border border-gray-200 text-center text-sm`}
				/>
				<button
					type='button'
					onClick={incrementCounter}
					className={`flex h-12 w-12 items-center justify-center rounded bg-gray-100 hover:scale-[1.1]`}
				>
					<FaPlus />
				</button>
			</div>
		</div>
	);
};

export default QuantitySelector;
