import React from 'react';
import ReactDOM from 'react-dom/client'; // New API for React 18+
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

// Create the root using the new ReactDOM API
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
