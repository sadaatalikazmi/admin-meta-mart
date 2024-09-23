import React from 'react';
import { render } from 'react-dom';
import { logger } from 'redux-logger';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import App from './App';
import rootSaga from './store/sagas';
import rootReducer from './store/reducers';

import './assets/css/style.css';
import './assets/css/nucleo-icons.css';
import './assets/scss/black-dashboard-react.css';
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware, logger)));

sagaMiddleware.run(rootSaga);
const queryClient = new QueryClient();

render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Provider>,
  document.getElementById('root')
);
if (module.hot) {
  module.hot.accept(App);
}
