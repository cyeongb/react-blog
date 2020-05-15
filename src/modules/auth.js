/* -----------리덕스 모듈 
ducks패턴을 사용해서 액션타입,액션 생성 함수 , 리듀서가 하나의 파일에 다 정의되어있는 리덕스 모듈을 만들것임.
*/
import { createAction, handleActions } from 'redux-actions';

const SAMPLE_ACTION = 'auth/SAMPLE_ACTION';

export const sampleAction = createAction(SAMPLE_ACTION);
const initialState = {};

const auth = handleActions(
  {
    [SAMPLE_ACTION]: (state, action) => state,
  },
  initialState,
);

export default auth;
