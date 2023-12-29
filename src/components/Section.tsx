interface SectionProps {
	renderSection?: () => React.ReactNode;
}

const Section = ({ renderSection }: SectionProps) => {
	return (
		<section className='container mx-auto max-w-7xl'>
			{renderSection && renderSection()}
		</section>
	);
};

export default Section;
