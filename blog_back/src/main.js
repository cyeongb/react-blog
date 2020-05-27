/*// -------------- 기존의 index.js ------------------   */

//dotenv를 불러와서 config()함수를 호출 해 env파일을 읽을 수 있도록 한다.
require('dotenv').config();

import mongoose from 'mongoose'; //mongoose 연결
import Koa from 'koa'; // koa 가져온다.
import Router from 'koa-router'; //koa-router모듈을 불러온다
//import { routes } from './api'; // ** require 메서드는 export 한 걸 가져올 수 있다.
import bodyParser from 'koa-bodyparser';
import api from './api';
//import createFakeData from './createFakeData';
const app = new Koa();
const router = new Router();
// node.js에서 환경변수는 process.env로 조회 가능하다.
// 비구조화 할당으로 process.env 내부 값에 대한 레퍼런스를 만든다.
const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log('###### mongoDB에 연결함 ########');
    //createFakeData(); //디비가 연결 되면 fake data를 불러온다.
  })
  .catch((e) => {
    console.log('mongoDB연결하다가 에러남>>', e);
    console.error(e);
  });

// /api 경로로 route를 불러온다
router.use('/api', api.routes());

// 라우터를 적용하기 전에 bodyParser를 적용한다.
app.use(bodyParser());

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

//port가 지정되어있지 않으면 4000을 사용한다.
const port = PORT || 4000;
app.listen(port, () => {
  // 포트 4000 번으로 열고 서버에 접속하면 ctx.body에 있는 텍스트가 출력하게된다.
  console.log('>>>>>>포트 연드아>>>>>>', port);
});
