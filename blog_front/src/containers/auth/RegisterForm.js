import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { withRouter } from 'react-router-dom'; //history 객체를 사용하려면  withRouter로 컴포넌트를 감싸주면 된다.
/*  ------------------------회원가입---------------------------*/
const RegisterForm = ({ history }) => {
  console.log('-----------register form 호출');
  const dispatch = useDispatch(); //useDispatch() 로 dispatch를 가져온다
  const [error, setError] = useState(null);
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
  // onSubmit 함수에서 이벤트가 발생하면, username , password를 파라미터로 넣어서 액션을  dispatch 해 주었다.
  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password, passwordConfirm } = form;

    // 하나라도 비어있으면 에러 처리 함.
    if ([username, password, passwordConfirm].includes('')) {
      setError('Empty is exist !');
      return;
    }

    if (password !== passwordConfirm) {
      console.log('RegisterForm _ 비밀번호 안맞음!>');
      console.log('password:', password, 'password check:', passwordConfirm);
      setError('password is not match');
      dispatch(changeField({ form: 'register', key: 'password', value: '' }));
      dispatch(
        changeField({ form: 'register', key: 'passwordConfirm', value: '' }),
      );
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
      if (authError.response.status === 409) {
        console.log('account is already exist !');
        setError('account is already exist !');
        return;
      }
      console.log(' RegisterForm _register FAIL>>', authError);
      setError('register FAIL');
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
      console.log('user이므로 바로 글목록 이동함>', user);
      history.push('/'); //가입 후 홈화면으로 이동

      try {
        console.log(
          'RegisterForm - 사용자이므로 user을 string으로 변환시켜서 storage에 담는다.',
        );
        // 회원가입(로그인도)을 하면 사용자 정보를 localstorage에 저장하도록 작업함.
        // 왜냐면 페이지를 새로고침했을 때도 로그인이 된 상태를 유지하려면, 리액트앱이 브라우저에서 맨 처음 렌더링될 때 localstorage에서 값을 불러와서
        // 리덕스 스토어 안에 넣도록 구현해 주어야 한다.
        // 해당 작업은  App  컴포넌트에서 useEffect로 작업을 하거나 클래스형으로 componentDidMount로 처리해도 되는데(둘 다 렌더링이 된 후에 실행된다.) 깜빡임 현상이 나타날 수 있어서
        // 여기서는 index.js에서 처리하겠음.
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('register 에서 localStorage에서 에러>', e);
      }
    }
  }, [user, history]);

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(RegisterForm);
