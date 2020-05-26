import Post from '../../models/post';

// ----------------------------------------WRITE
// title:''/body:''/tags:['','']
export const write = async (ctx) => {
  const { title, body, tags } = ctx.request.body;

  const post = new Post({
    //post 의 인스턴스 생성
    title,
    body,
    tags,
  });

  try {
    console.log('posts.ctrl.js - write() 호출');

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
    const post = await Post.findById(id).exec();

    if (!post) {
      ctx.status = 404; //not found
      return;
    }
  } catch (e) {
    console.log('posts.ctrl.js - read error >>', e);
    ctx.throw(500, e);
  }
};

export const remove = (ctx) => {};

export const update = (ctx) => {};
