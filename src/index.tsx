import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import client from './graphql/client';
import { ApolloProvider } from '@apollo/client';
import { IncidentProvider } from './context/IncidentContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <IncidentProvider>
        <App />
      </IncidentProvider>
    </ApolloProvider>
  </React.StrictMode>
);


reportWebVitals();
