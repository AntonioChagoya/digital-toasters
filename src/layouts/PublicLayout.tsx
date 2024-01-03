import React from 'react';
// Components
import HeaderIndex from '@views/header';
import Footer from '@views/footer';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<HeaderIndex />
			<main className='container relative z-0 mx-auto flex flex-col gap-layoutPublic py-10'>
				{children}
			</main>
			<Footer />
		</>
	);
};

export default PublicLayout;
