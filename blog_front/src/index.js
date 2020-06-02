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
import createSagaMiddleWare from 'redux-saga';
import { tempSetUser, check } from './modules/user';

const sagaMiddleWare = createSagaMiddleWare();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleWare)),
);

function loadUser() {
  try {
    const user = localStorage.getItem('user');

    if (!user) return; // 로그인 상태가 아니면 아무것도 하지 않는다.

    // 리액트앱이 브라우저에서 처음 렌더링될 때 user정보를 localStorage에 저장한다.
    store.dispatch(tempSetUser(user));
    store.dispatch(check());
  } catch (e) {
    console.log('index.js - user정보를 load하다가 에러 >', e);
  }
}

sagaMiddleWare.run(rootSaga);

//loadUser() 함수는  sagaMiddleWare.run 이후에 호출해야 한다.
// 만약 loadUser()를 먼저 호출하게 되면 check 액션을 dispatch 했을 때 사가에서 이를 제대로 처리하지 않는다.
loadUser();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
