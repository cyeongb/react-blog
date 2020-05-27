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

  /*export function validate<T, R>(value: T, schema: SchemaLike, callback: (err: ValidationError, value: T) => R): R;
    ---> joi API를 타고 가다보면 joi와 error 클래스를 상속받아 error 객체를 선언하지 않고도 사용할 수 있다. */
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
    console.log('title>>', title);
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
  const page = parseInt(ctx.query.page || '1', 10); // query는 문자열이라서 숫자로 변환해야함. 값이 없다면(페이지가 없다면) 1을 기본으로 사용한다.
  console.log('page >>', page);
  if (page < 1) {
    ctx.status = 400;
    console.log('페이지 없음 >>', ctx.status);
    return;
  }
  try {
    console.log('posts.ctrl.js - list() 호출');
    const posts = await Post.find()
      .lean() //lean() 함수를 쓰면 처음부터 데이터를 json 형태로 들고온다.
      .skip() //skip 함수에 skip(10) 을 하면 1~10을  제외한 그 다음 데이터를 불러온다.
      .limit(10) //한번에 보이는 개수를 10개로 제한하기
      .sort({ _id: -1 }) // sort함수의 파라미터는 key:1 형식으로 넣는데 key는 정렬할 필드를 의미하며 1:오름차순 -1:내림차순 으로 정렬한다.
      .exec(); // find() 함수를 호출하고 나서 exec() 함수를 호출 해야 서버에 쿼리를 요청한다.
    console.log('list 에 posts >>', posts);

    const postCount = await Post.countDocuments().exec();
    ctx.set('Last_page', Math.ceil(postCount / 10)); //math.ceit : 소수점 이하를 올림한다.

    console.log('post 갯수>>', postCount);

    ctx.body = posts //ctx.body 에 post내용을 담음
      //.map((post) => post.toJSON()) //posts 데이터를 json으로 '직렬화' 시킨다. lean() 함수를 사용하지 않았을 때 이  변환과정이 필요하다.
      .map((post) => ({
        ...post, // 직렬화 시킨 post 데이터 펼치기
        body:
          post.body.length < 150 ? post.body : `${post.body.slice(0, 150)}...`, //글의 길이가 200 미만이면 그대로 하고, 150 이상이면 0~200까지 자르고 그 뒤를 ... 으로 대체한다.
      }));
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

  const schema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });

  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    console.log('400 에러 ! >>', result.error);

    ctx.status = 400; //잘못된 요청
    ctx.body = result.error;
    return;
  }

  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true, // true 로 하면 업데이트된 후의 데이터를 반환한다. false는 업데이트 되기 전의 데이터를 반환한다.
    }).exec();
    console.log('posts.ctrl.js - update() 호출');
    console.log('id >>', id);
    console.log('schema >>', schema);
    console.log('result >>', result);

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
