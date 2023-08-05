import "../styles/globals.css";
import { AppProps } from 'next/app';

import { ApolloProvider } from '@apollo/client';
import { client } from "graphql/apollo";

const App = ({ Component, pageProps, ...rest }: AppProps) => {

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default App;
