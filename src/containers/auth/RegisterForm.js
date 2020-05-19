import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
/*  ------------------------회원가입---------------------------*/
const RegisterForm = () => {
  const dispatch = useDispatch(); //useDispatch() 로 dispatch를 가져온다
  console.log('RegisterForm - form>', form);
  console.log('RegisterForm - auth>', auth);
  console.log('RegisterForm - authError>', authError);

  const { form, auth, authError } = useSelector(({ auth }) => ({
    //useSelector는 connect의 mapStateToProps와 유사함. 값이 바뀔 때 재정의할 지 결정한다.
    form: auth.register, //form 에 auth의 register정보를 넘긴다.
    auth: auth.auth,
    authError: auth.authError,
  }));

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
  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password, passwordConfirm } = form;
    if (password !== passwordConfirm) {
      return; //오류처리
    }
    dispatch(register({ username, password })); //이름, password를 register에 전달함
  };

  //컴포넌트가 처음 렌더링 될 때 form 을 초기화한다.
  // 이걸 쓴 이유는 , 다른페이지에 갔다가 왔을때 값이 유지된 상태로 보여지기 위해서임
  // 처음 렌더링 될때만 초기화가 되지 두번째 세번째 렌더링 하면 호출되지 않는다.
  useEffect(() => {
    // 회원가입 성공,실패 처리하기
    if (authError) {
      console.log(' 회원가입 실패 auth error>>', authError);
      return;
    }
    if (auth) {
      console.log('회원가입 성공 auth>>', auth);
    }
  }, [auth, authError]);

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
