/* ---------STORE 에 적용하기--------------*/

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // provider를 통한 리덕스 적용
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer, { rootSaga } from './modules';
import createSagaMiddleWare from 'redux-saga'; */

const sagaMiddleWare = createSagaMiddleWare();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleWare)),
);

sagaMiddleWare.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();


