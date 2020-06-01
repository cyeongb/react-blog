import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl';
//import { list, write, read, remove, replace, update } from './posts.ctrl'; //posts.ctrl 에서 export 한 것들을 require 함수로 가져옴
import checkLoggedIn from '../../lib/checkLoggedIn';

/* const printInfo = (ctx) => {
  ctx.body = {
    method: ctx.method,
    path: ctx.path,
    params: ctx.params,
  };
};
*/
const posts = new Router();

// 해당 경로에 해당하면 printInfo 함수를 호출한다.
posts.get('/', postsCtrl.list);
posts.post('/', checkLoggedIn, postsCtrl.write);
// postsCtrl.checkObjectId ---> postsCtrl 에서 만든 미들웨어를 호출할 수 있음 해당 미들웨어는 id값이 검증 되었을 때만 실행한다.

const post = new Router();
post.get('/:id', postsCtrl.read);
post.delete('/:id', checkLoggedIn, postsCtrl.remove);
post.patch('/:id', checkLoggedIn, postsCtrl.update);
posts.use('/:id', postsCtrl.checkObjectId, post.routes()); // 해당 경로로 미들웨어가 실행되면 post.routes() 라우트가 실행된다.

export default posts;
