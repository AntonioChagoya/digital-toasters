// Constants

interface SectionProps {
	children: React.ReactNode;
	className?: string;
}

const Section = ({ children, className }: SectionProps) => {
	return (
		<section className={`${className ? className : ''}`}>
			<div className={`container mx-auto max-w-section`}>{children}</div>
		</section>
	);
};

export default Section;
