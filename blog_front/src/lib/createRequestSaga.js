import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

export const createRequestActionTypes = (type) => {
  // auth 에 사용할 action type 설정
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};
export default function createRequestSaga(type, request) {
  return function* (action) {
    yield put(startLoading(type)); //로딩 시작

    try {
      const response = yield call(request, action.payload);

      yield put({
        // eslint-disable-next-line no-undef
        type: SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      //  console.log('error>', e);

      yield put({
        // eslint-disable-next-line no-undef
        type: FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(type));
  };
}
