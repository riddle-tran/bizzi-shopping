import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { AuthProvider } from 'context/AuthContext';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BIZZI_BASE_GRAPHQL_URL } from 'configs';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: BIZZI_BASE_GRAPHQL_URL,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
