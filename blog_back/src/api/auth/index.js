// ------------------- auth 라우터 생성

import Router from 'koa-router';
import * as authCtrl from './auth.ctrl';

const auth = new Router();

// 해당 경로로  회원 인증 API 를 가져온다.
auth.post('/register', authCtrl.register);

auth.post('/login', authCtrl.login);

auth.post('/check', authCtrl.check);

auth.post('/logout', authCtrl.logout);

export default auth;
