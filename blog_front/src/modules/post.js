import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const {
  READ_POST,
  READ_POST_SUCCESS,
  READ_POST_FAILURE,
} = createRequestActionTypes('post/READ_POST');

const UNLOAD_POST = 'post/UNLOAD_POST'; //post 페이지에서 벗어날 때 데이터를 unload(비운다.)한다.
// 이게 필요한 이유가... 만약에 post페이지에서 글 작성하다가 해당 페이지를 벗어나고 다른 post를 읽게되면  이전에 불러왔던 글이 나타나는 깜빡임 현상이 일어난다고 함.

export const readPost = createAction(READ_POST, (id) => id);
export const unloadPost = createAction(UNLOAD_POST);

const readPostSaga = createRequestSaga(READ_POST, postAPI.readPost);

export function* postSaga() {
  yield takeLatest(READ_POST, readPostSaga);
}

const initialState = {
  post: null,
  error: null,
};

const post = handleActions(
  {
    [READ_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [READ_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_POST]: initialState,
  },
  initialState,
);

export default post;
