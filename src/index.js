import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { store, persistor } from './redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PersistGate loading={null} persistor={persistor}>
    <Provider store={store}>
        <App />
    </Provider>
  </PersistGate>
);