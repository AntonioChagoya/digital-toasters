// Components
import HeaderIndex from '@views/header';
import Footer from '@views/footer';

const PublicLayout = ({ children }) => {
	return (
		<>
			<HeaderIndex />
			<main className='container relative z-0 mx-auto flex max-w-7xl flex-col gap-20 py-10'>
				{children}
			</main>
			<Footer />
		</>
	);
};

export default PublicLayout;
