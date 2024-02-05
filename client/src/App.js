import React from 'react';
import { SimpleTabs } from './components/Tabs/Tabs';
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/theme';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_API_URL}/graphql`,
  cache: new InMemoryCache(),
});

export const App = () =>  {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <SimpleTabs />
      </ThemeProvider>
    </ApolloProvider>
  );
}
