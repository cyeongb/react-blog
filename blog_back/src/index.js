const Koa = require('koa'); // koa 가져온다.
const Router = require('koa-router'); //koa-router모듈을 불러온다
const api = require('./api');

const app = new Koa();
const router = new Router();

router.use('/api', api.routes());

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
  // 포트 4000 번으로 열고 서버에 접속하면 ctx.body에 있는 텍스트가 출력하게된다.
  console.log('4000 포트 연드아');
});
