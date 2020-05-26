import Post from '../../models/post';
import mongoose from 'mongoose';
import Joi from 'joi';

// onject id를 검증 할 때 사용
const { ObjectId } = mongoose.Types; //type 속성으로 스키마를 가져온다

// 일일이 코드를 중복해 넣지 않고 '미들웨어' 로 만들어서 여러 라우트에 쉽게 적용할 수 있다.
export const checkObjectId = (ctx, next) => {
  console.log('id 검증 checkObjectId 호출! ');

  const { id } = ctx.params;
  console.log('id >> ', id);

  if (!ObjectId.isValid(id)) {
    console.log('id가 검증된 아이디인가? >>', ObjectId.isValid(id));

    ctx.status = 400; //bad request 잘못된 요청
    return;
  }
  console.log('id가 검증된 아이디인가? >>', ObjectId.isValid(id));
  return next(); // id검증이 되면 그 다음 메서드를 실행한다.
};

// ----------------------------------------WRITE
// title:''/body:''/tags:['','']
export const write = async (ctx) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(), //해당 값이 필수로 있어야 한다.
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
  });

  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400; //bad request
    ctx.body = result.error;
    return;
  }

  const { title, body, tags } = ctx.request.body;

  const post = new Post({
    //post 의 인스턴스 생성
    title,
    body,
    tags,
  });

  try {
    console.log('posts.ctrl.js - write() 호출');
    log('title>>', title);
    await post.save(); // 인스턴스를 만들고 save() 함수를 실행시켜야 디비에 저장이 된다.
    // 함수의 반환값은 promise 이므로 async/await 문법으로 디비 저장 요청이 완료 될때 까지 await를 사용해서 대기할 수 있다.
    //그리고 await를 사용하려면 함수 선언 부분에 async 를 붙여야 한다. 그리고 try/catch 문으로 오류를 처리해야 한다.
    ctx.body = post;
  } catch (e) {
    console.log('posts.ctrl.js - write error >>', e);
    ctx.throw(500, e); // 컨텍스트에 500 에러와 에러문을 던진다.
  }
};

// -------------------------------------- LIST
export const list = async (ctx) => {
  try {
    console.log('posts.ctrl.js - list() 호출');
    const posts = await Post.find().exec(); // find() 함수를 호출하고 나서 exec() 함수를 호출 해야 서버에 쿼리를 요청한다.
    console.log('list 에 posts >>', posts);

    ctx.body = posts;
  } catch (e) {
    console.log('posts.ctrl.js - list error >>', e);
    ctx.throw(500, e);
  }
};

// ---------------------------------------- READ
export const read = async (ctx) => {
  const { id } = ctx.params; //컨텍스트의 파라미터에 id값을 읽어온다.

  try {
    console.log('posts.ctrl.js - read() 호출');
    console.log('id>>', id);
    const post = await Post.findById(id).exec();
    console.log('read에 post >>', post);

    if (!post) {
      console.log('read -->post 없음');

      ctx.status = 404; //not found
      console.log('ctx.status >>', ctx.status);

      return;
    }
  } catch (e) {
    console.log('posts.ctrl.js - read error >>', e);
    ctx.throw(500, e);
  }
};

// ---------------------------------------- REMOVE
export const remove = async (ctx) => {
  const { id } = ctx.params;

  try {
    console.log('posts.ctrl.js - remove() 호출');
    console.log('id >>', id);

    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204; // 성공은 했지만 응답할 데이터가 없다.
  } catch (e) {
    console.log('posts.ctrl.js - remove error >>', e);
    ctx.throw(500, e);
  }
};

// ------------------------------------------ UPDATE
export const update = async (ctx) => {
  const { id } = ctx.params;

  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true, // true 로 하면 업데이트된 후의 데이터를 반환한다. false는 업데이트 되기 전의 데이터를 반환한다.
    }).exec();
    console.log('posts.ctrl.js - update() 호출');
    console.log('id >>', id);

    if (!post) {
      console.log('post 없음');
      ctx.status = 404;
      return;
    }
    ctx.body = post;
    console.log('post>>', post);
  } catch (e) {
    console.log('posts.ctrl.js - update error >>', e);
    ctx.throw(500, e);
  }
};
