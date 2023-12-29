import { ReactNode } from 'react';

interface BoxProps {
	id?: string;
	className?: string;
	children: ReactNode;
}

const Box = ({ id, children, className = '' }: BoxProps) => {
	return (
		<div
			id={id}
			className={`${className}`}
		>
			{children}
		</div>
	);
};

export default Box;
