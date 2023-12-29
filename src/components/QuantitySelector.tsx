// Libs
import { FaMinus, FaPlus } from 'react-icons/fa6';

type QuantitySelectorProps = {
	decrementCounter: () => void;
	incrementCounter: () => void;
};

const QuantitySelector = ({
	decrementCounter,
	incrementCounter,
}: QuantitySelectorProps) => {
	return (
		<div className='flex flex-col'>
			<div className='flex items-center gap-1'>
				<button
					onClick={decrementCounter}
					type='button'
					className={`flex items-center justify-center rounded bg-gray-100 hover:scale-[1.1]`}
				>
					<FaMinus />
				</button>
				{/* <input
					{...rest}
					type='number'
					id={rest.id || ''}
					name={rest.name || ''}
					max={99}
					min={0}
					{...register(rest.name)}
					onBlur={e => {
						if (parseInt(e.target.value) > 99) {
							setValue(rest.name, 99);
						}
						if (parseInt(e.target.value) < 1) {
							setValue(rest.name, 0);
						}
					}}
					onChange={e => {
						if (parseInt(e.target.value) < 100) {
							setValue(rest.name, parseInt(e.target.value));
							onChange(e);
						}
					}}
					className={`${
						rest?.inputsize ? rest?.inputsize : 'h-6 w-6'
					} rounded border border-gray-200 text-center text-sm`}
				/> */}
				<button
					type='button'
					onClick={incrementCounter}
					// className={`${
					// 	rest?.buttonsize
					// 		? rest?.buttonsize
					// 		: 'flex h-6 w-6 items-center justify-center'
					// } flex items-center justify-center rounded bg-gray-100 hover:scale-[1.1]`}
				>
					<FaPlus />
				</button>
			</div>
		</div>
	);
};

export default QuantitySelector;
