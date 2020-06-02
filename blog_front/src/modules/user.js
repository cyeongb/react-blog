/* 사용자의 상태를 담을 user라는 리덕스 모듈*/

import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';

/* 액션들을 만들고 , 해당 액션들이 dispatch 되었을 때 API를 호출한다.   */

const TEMP_SET_USER = 'user/TEMP_SET_USER'; //새로고침 이후 임시 로그인 처리

//회원 정보 확인
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
  'user/CHECK',
);

const LOGOUT = 'user/LOGOUT';

export const tempSetUser = createAction(TEMP_SET_USER, (user) => user);

export const check = createAction(CHECK);

export const logout = createAction(LOGOUT);

const checkSaga = createRequestSaga(CHECK, authAPI.check);

function checkFailureSaga() {
  try {
    console.log('user check fail 해서 user 정보 localStorage 에서 삭제함');

    localStorage.removeItem('user');
  } catch (e) {
    console.log('localstorage 에서 user 삭제하다가 에러 >>', e);
  }
}

function* logoutSaga() {
  try {
    yield call(authAPI.logout);
    localStorage.removeItem('user');
  } catch (e) {
    console.log('logoutsaga 실행하다가 에러 >', e);
  }
}

// 해당 액션 (CHECK , CHECK_FAILURE) 이 발생하면 해당 함수가 실행된다.
//yield는 await 와 비슷하다고 생각하면 된다.
export function* userSaga() {
  yield takeLatest(CHECK, checkSaga); // yield takelatest는  해당 함수를 한번만 실행시켜 준다.
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}

const initialState = {
  user: 'user', //null
  checkError: null,
};

export default handleActions(
  {
    [TEMP_SET_USER]: (state, { payload: user }) => ({
      ...state,
      user,
    }),
    [CHECK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      checkError: null,
    }),
    [CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      checkError: error,
    }),
    [LOGOUT]: (state) => ({
      ...state,
      user: null,
    }),
  },
  initialState,
);
