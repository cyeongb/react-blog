import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl';
//import { list, write, read, remove, replace, update } from './posts.ctrl'; //posts.ctrl 에서 export 한 것들을 require 함수로 가져옴

const posts = new Router();

const printInfo = (ctx) => {
  ctx.body = {
    method: ctx.method,
    path: ctx.path,
    params: ctx.params,
  };
};

// 해당 경로에 해당하면 printInfo 함수를 호출한다.
posts.get('/', postsCtrl.list);
posts.post('/', postsCtrl.write);
posts.get('/:id', postsCtrl.read);
posts.delete('/:id', postsCtrl.remove);
posts.put('/:id', postsCtrl.replace);
posts.patch('/:id', postsCtrl.update);

export default posts;
