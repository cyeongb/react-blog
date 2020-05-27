// --------------------- 회원 인증 API

import Joi from 'joi';
import User from '../../models/user';

// ------------------ 회원가입
export const register = async (ctx) => {
  console.log('auth.ctrl.js - register ');

  const schema = Joi.object().keys({
    // username은 알파벳,숫자 3~20자리, 필수 영역이다.
    username: Joi.string()
      .alphanum() //alphanum : alphabet + num 만 올 수 있도록 하는 메서드
      .min(3)
      .max(20)
      .required(),
    // password는 필수영역이다.
    password: Joi.string().required(),
  });
  console.log('여긴 오나???');

  const result = Joi.validate(ctx.request.body, schema);
  console.log('ctx.request.body >> ', ctx.request.body);
  console.log('schema >>', schema);

  console.log('result >>', result);

  if (result.error) {
    console.log('400 에러남  아마 validate 에서 에러.');

    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  // validate 가 제대로 진행이 되었다면 여기에 와서 body 부분에 이름과 비번 데이터가 담길 것.
  const { username, password } = ctx.request.body;

  try {
    const exists = await User.findByUsername(username); // models/user 에서 username으로 찾는 스태틱 메서드를 가져와서 처리.

    if (exists) {
      console.log('username이 존재함 >>', exists);

      ctx.status = 409; //중복
      return;
    }

    // username 에 중복된 데이터가 없으면 새 인스턴스를 생성해서 username을 담는다.
    const user = new User({
      username,
    });
    console.log('username 생성함');

    await user.setPassword(password);
    console.log('password 생성함');

    await user.save(); // 디비에 저장
    console.log(' db에 저장함');

    ctx.body = user.serialize(); //body 에 json 으로 직렬화를 거친 data 를 뿌리기위해 해당 메서드 호출
  } catch (e) {
    console.log(e);
    ctx.throw(500, e);
  }
};

// ------------------- 로그인
export const login = async (ctx) => {
  const { username, password } = ctx.reqiest.body;

  if (!username || !password) {
    console.log('username 이나 password 없음');
    ctx.status = 401; //권한없음
    return;
  }

  try {
    const user = await User.findByUsername(username);

    if (!user) {
      console.log('user 가 업다 !!');
      ctx.status = 401; //unauthorize
      return;
    }

    const valid = await user.checkPassword(password);
    if (!valid) {
      console.log('password 가 유효하지 않다!');
      ctx.status = 401;
      return;
    }

    ctx.body = user.serialize();
  } catch (e) {
    console.log('login 에러 >>', e);
    ctx.throw(500, e);
  }
};

//---------------------- 로그인 상태 확인
export const check = async (ctx) => {};

// -------------------------- 로그아웃
export const logout = async (ctx) => {};
