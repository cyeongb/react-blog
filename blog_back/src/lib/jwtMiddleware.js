import jwt from 'jsonwebtoken';
import User from '../models/user';

const jwtMiddleware = async (ctx, next) => {
  const token = ctx.cookies.get('access_token');

  if (!token) return next(); //토큰이 없으면 반환

  try {
    console.log('jwtMiddleware() 호출 - token >>', token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decoded>>', decoded);

    ctx.state.user = {
      _id: decoded._id,
      username: decoded.username,
    };
    console.log('decoded 된 id >>', ctx.state.user._id);
    console.log('decoded된 username >> ', ctx.state.user.username);
    const now = Math.floor(Date.now() / 1000); //floor 는 바닥 이므로 내림 임
    if (decoded.exp - now < 60 * 60 * 24 * 3) {
      //만기일이 3일 미만으로 남았을 때,
      const user = await User.findById(decoded._id);
      const token = user.generateToken();
      console.log('jwtMiddleware  에 user값 >>', user, 'token값>>', token);

      ctx.cookies.set('access_token', token, {
        //set cookie 를 통해 브라우저의 쿠키에 토큰값을 등록한다.
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });

      console.log('브라우저의 쿠키에 token 값 등록함 ! ');
    }
    return next();
  } catch (e) {
    console.log('토큰 검증 실패 >>', e);
    return next();
  }
};

export default jwtMiddleware;
