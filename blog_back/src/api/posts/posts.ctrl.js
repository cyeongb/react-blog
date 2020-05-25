let postId = 1; // id의 초깃값

const posts = [
  {
    id: 1,
    title: 'first title',
    body: 'contents',
  },
];

// 포스트 작성(write)
//get/api/posts

exports.write = (ctx) => {
  // rest api의  request body 는 ctx.request.body에서 조회할 수 있다.
  const { title, body } = ctx.request.body;
  postId += 1;
  const post = { id: postId, title, body };
  posts.push(post); //post 값을 넣어서 새로운 posts 객체를 만든다.
  ctx.body = post; // ctx.body에 post 데이터를 뿌린다.
};

//포스트 목록 조회(list find)
//get/api/posts

exports.list = (ctx) => {
  ctx.body = posts;
};

// 특정 포스트 find(조회)
// get /api/posts/:id

exports.read = (ctx) => {
  // 받아온 컨텍스트의 파라미터 값을 id로 넣는다.
  const { id } = ctx.params;

  // 파라미터로 받아온 값은 문자열 형식이므로  비교할 p.id값을 문자열로 비교한다.
  const post = posts.find((p) => p.id.toString() === id);

  //포스트가 없으면 에러 반환
  if (!post) {
    ctx.status = 404;
    ctx.body = {
      message: 'post is not exist',
    };
    return;
  }
  ctx.body = post;
};

// 특정 포스트 delete(삭제)
exports.remove = (ctx) => {
  const { id } = ctx.params;

  // 해당 id를 가진 post가 몇번째인지 확인.
  const index = posts.findIndex((p) => p.id.toString() === id);

  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: 'post is not exist',
    };
    return;
  }

  //index번째 아이템을 제거한다.
  posts.splice(index, 1);
  ctx.status = 204; //content없음
};

//특정 포스트 수정(replace)
exports.replace = (ctx) => {
  const { id } = ctx.params;

  const index = posts.findIndex((p) => p.id.toString() === id);

  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: 'post is not exist',
    };
    return;
  }
  // post가 해당id로 조회가 되면, id를 제외한 정보를 날리고 객체를 새로 만든다.
  posts[index] = {
    //posts 배열의 index번째 객체에
    id, //id와
    ...ctx.request.body, // body에서 요청된 ctx 데이터를 나열
  };
  ctx.body = posts[index]; //위에 데이터를 담은  해당 index번째의 posts 배열을 ctx.body에 담는다.
};


// 포스트 수정(patch)
// patch 메서드는 주어진 필드만 교체한다.
exports.update = ctx =>{
    
}