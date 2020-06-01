/* 다른 라우트에서 사용될 가능성이 있는 파일은 lib 폴더안에 저장한다.
 -------------- 로그인 상태 확인 작업 미들웨어 ------------------
*/

const checkLoggedIn = (ctx, next) => {
  if (!ctx.state.user) {
    ctx.status = 401; // 권한없음
    console.log(' checkLoggedIn >> 권한이 없슴니다 ~~');

    return;
  }
  return next();
};
export default checkLoggedIn;
