// Styles
import '../styles/globals.css';

// Next
import { AppProps } from 'next/app';

// Apollo
import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from 'graphql/apollo';

// Contexts
import { CartContextProvider } from 'context/CartContext';

// Layouts
import PublicLayout from '@layouts/PublicLayout';
import DefaultLayout from '@layouts/DefaultLayout';

// Libs
import { DefaultSeo } from 'next-seo';

// Types
import { LayoutType } from 'types/app';

interface CustomAppProps extends AppProps {
	Component: AppProps['Component'] & { layout: string };
}

const App = ({ Component }: CustomAppProps) => {
	const client = createApolloClient();
	const CustomLayout = getLayout();

	function getLayout() {
		if (Component?.layout === LayoutType.PUBLIC) {
			return PublicLayout || DefaultLayout;
		} else {
			return DefaultLayout;
		}
	}

	return (
		<ApolloProvider client={client}>
			<>
				<DefaultSeo
					title='Digital Toasters | Coffee Shop'
					description='Coffee Shop'
					openGraph={{
						type: 'website',
						locale: 'en_IE',
						url: 'https://digitaltoasters.com',
						site_name: 'Digital Toasters',
					}}
				/>
				<CartContextProvider>
					<CustomLayout>
						<Component />
					</CustomLayout>
				</CartContextProvider>
			</>
		</ApolloProvider>
	);
};

export default App;
