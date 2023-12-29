import { ReactNode } from 'react';

// Libs
import { TbLoader3 } from 'react-icons/tb';

// Theme
import {
	ButtonSize,
	ButtonColor,
	ButtonTextTransform,
	ButtonWide,
} from 'theme';

interface ButtonProps {
	children: ReactNode;
	type?: 'button' | 'submit' | 'reset';
	color?: ButtonColor;
	size?: ButtonSize;
	transform?: ButtonTextTransform;
	wide?: ButtonWide;
	loading: boolean;
	action?: () => void;
}

const Button = ({
	children,
	type = 'button',
	color = ButtonColor.primary,
	size = ButtonSize.md,
	wide = ButtonWide.auto,
	loading,
	action,
}: ButtonProps) => {
	const defaults = 'rounded font-bold text-white duration-200 hover:opacity-80';
	const classNames = defaults + ' ' + size + ' ' + color + ' ' + ' ' + wide;

	return (
		<button
			type={type}
			disabled={loading}
			className={classNames}
			onClick={() => {
				action && action();
			}}
		>
			{loading ? (
				<TbLoader3
					className={`animate-spin ${color} mx-auto text-white`}
					size={28}
				/>
			) : (
				<>{children}</>
			)}
		</button>
	);
};

export default Button;
