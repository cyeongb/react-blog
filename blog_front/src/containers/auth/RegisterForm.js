import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
/*  ------------------------회원가입---------------------------*/
const RegisterForm = () => {
  console.log('-----------register form 호출');
  const dispatch = useDispatch(); //useDispatch() 로 dispatch를 가져온다

  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    //useSelector는 connect의 mapStateToProps와 유사함. 값이 바뀔 때 재정의할 지 결정한다.
    form: auth.register, //form 에 auth의 register정보를 넘긴다.
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));
  console.log('RegisterForm - form>', form);
  console.log('RegisterForm - auth>', auth);
  console.log('RegisterForm - authError>', authError);

  //input 변경 이벤트 핸들러
  const onChange = (e) => {
    console.log('e.target>>', e.target);
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'register',
        key: name,
        value,
      }),
    );
  };

  // 폼 등록 이벤트 핸들러
  // onSubmit 함수에서 이벤트가 발생하면, username과 password를 파라미터로 넣어서 액션을  dispatch 해 주었다.
  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password, passwordConfirm } = form;
    if (password !== passwordConfirm) {
      console.log('RegisterForm _ 비밀번호 안맞음!>');
      console.log('password:', password, 'password check:', passwordConfirm);
      return; //오류처리
    }
    dispatch(register({ username, password })); //username, password를 register에 전달함
  };

  //컴포넌트가 처음 렌더링 될 때 form 을 초기화한다.
  // 이걸 쓴 이유는 , 다른페이지에 갔다가 왔을때 값이 유지된 상태로 보여지기 위해서임
  // 처음 렌더링 될때만 초기화가 되지 두번째 세번째 렌더링 하면 호출되지 않는다.
  // -------- useEffect에 넣어 준 함수는 auth , authError값에 따라서 다른 작업을 한다.
  useEffect(() => {
    //  dispatch(initializeForm('register'));
    // 회원가입 성공,실패 처리하기
    if (authError) {
      console.log(' RegisterFoem _회원가입 실패 auth error>>', authError);
      return;
    }
    if (auth) {
      console.log('RegisterForm _ 회원가입 성공 auth>>', auth);
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  // user값이 잘 설정되었는지 확인
  useEffect(() => {
    if (user) {
      console.log('RegisterForm _ checkAPI 성공>>', user);
    }
  }, [user]);

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default RegisterForm;
