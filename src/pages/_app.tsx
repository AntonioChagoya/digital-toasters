// Styles
import "../styles/globals.css";

// Next
import { AppProps } from 'next/app';

// Apollo
// import { ApolloProvider } from '@apollo/client';
// import { client } from "graphql/apollo";

// Components
import PublicLayout from "components/PublicLayout";

// Libs
import { DefaultSeo } from "next-seo";

// Types
import { LayoutType } from "types/app";

interface CustomAppProps extends AppProps {
  Component: AppProps["Component"] & { layout: string };
}

const App = ({ Component, pageProps, ...rest }: CustomAppProps) => {
  const CustomLayout = getLayout();

  function getLayout() {
    if (Component?.layout === LayoutType.PUBLIC) {
      return PublicLayout || ((children) => <>{children}</>);
    } else {
      return ((children) => <>{children}</>);
    }
  }

  return (
    // <ApolloProvider client={client}>
    <>
      <DefaultSeo
        title="Digital Toasters | Coffee Shop"
        description="Coffee Shop"
        openGraph={{
          type: "website",
          locale: "en_IE",
          url: "https://coffee-shop.com",
          site_name: "Coffee Shop",
        }}
      />
      <CustomLayout>
        <Component {...pageProps} />
      </CustomLayout>
    </>
    // </ApolloProvider>
  );
}

export default App;
