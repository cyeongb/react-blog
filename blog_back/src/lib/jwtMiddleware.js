import jwt from 'jsonwebtoken';

const jwtMiddleware = (ctx, next) => {
  const token = ctx.cookies.get('access_token');

  if (!token) return next(); //토큰이 없으면 반환

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decoded>>', decoded);
    return next();
  } catch (e) {
    console.log('토큰 검증 실패 >>', e);
    return next();
  }
};
