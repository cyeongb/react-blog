/* 글쓰기 관련 상태를 리덕스로 관리해주기 */

import { createAction, handleActions } from 'redux-actions';

const INITIALIZE = 'write/INITIALIZE'; //모든 내용 초기화
const CHANGE_FIELD = 'write/CHANGE_FIELD'; // 특정 key 값 변경.

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));

const initialState = {
  title: '',
  body: '',
  tags: [],
};

const write = handleActions(
  {
    [INITIALIZE]: (state) => initialState, //initial state 를 넣으면 초기 상태로 바뀐다.
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value, //특정 key값을 업데이트함.
    }),
  },
  initialState,
);

export default write;
