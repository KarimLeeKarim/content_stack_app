import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { RouteProvider } from './routes/RouteProvider.js';
import { MainRoutes } from './routes/Routes';
import GlobalStyles from './styles.js';


const httpLink = createHttpLink({
  uri: `https://graphql.contentstack.com/stacks/${process.env.REACT_APP_APIKEY}?environment=${process.env.REACT_APP_ENVIRONMENT}`
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      access_token: `${process.env.REACT_APP_DELIVERY_TOKEN}`,
    },
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Publication: {
        merge: true,
      },
      Post: {
        merge: true,
      },
    },
  }),
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ApolloProvider client={client}>
    <RouteProvider>
      <GlobalStyles />
      <MainRoutes />
    </RouteProvider>
  </ApolloProvider>
);
