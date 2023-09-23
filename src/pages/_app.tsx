// Styles
import "../styles/globals.css";

// React
import { useEffect } from 'react';

// Next
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';

// Apollo
import { ApolloProvider } from "@apollo/client";
import { client } from "graphql/apollo";

// Contexts
import { CartContextProvider } from "context/CartContext";

// Components
import PublicLayout from "@components/layouts/PublicLayout";

// Libs
import { DefaultSeo } from "next-seo";

// Shopify
import {
  sendShopifyAnalytics,
  getClientBrowserParameters,
  AnalyticsEventName,
  useShopifyCookies,
} from '@shopify/hydrogen-react';

// Types
import { LayoutType } from "types/app";

interface CustomAppProps extends AppProps {
  Component: AppProps["Component"] & { layout: string };
}

function sendPageView(analyticsPageData) {
  const payload = {
    ...getClientBrowserParameters(),
    ...analyticsPageData,
  };
  sendShopifyAnalytics({
    eventName: AnalyticsEventName.PAGE_VIEW,
    payload,
  });
}

const analyticsShopData = {
  shopId: 'gid://shopify/Shop/8f5ec6-2',
  currency: 'MXN',
  acceptedLanguage: 'es',
};

const App = ({ Component, pageProps, ...rest }: CustomAppProps) => {
  const CustomLayout = getLayout();

  function getLayout() {
    if (Component?.layout === LayoutType.PUBLIC) {
      return PublicLayout || ((children) => <>{children}</>);
    } else {
      return ((children) => <>{children}</>);
    }
  }

  const router = useRouter();

  const hasUserConsent = true;

  const analytics = {
    hasUserConsent,
    ...analyticsShopData,
    ...pageProps.analytics,
  };
  const pagePropsWithAppAnalytics = {
    ...pageProps,
    analytics,
  };

  useEffect(() => {
    const handleRouteChange = () => {
      sendPageView(analytics);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [analytics, router.events]);

  useShopifyCookies();

  return (
    <ApolloProvider client={client}>
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
        <CartContextProvider>
          <CustomLayout>
            <Component {...pagePropsWithAppAnalytics} />
          </CustomLayout>
        </CartContextProvider>

        {/* <Cart /> */}
      </>
    </ApolloProvider>
  );
}

export default App;
