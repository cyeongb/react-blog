import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, login } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';

const LoginForm = ({ history }) => {
  //history : location이 포함되어있고 브라우저의 세션기록에 접근할 수 있어 앞,뒤로 이동할 수 있다.
  // location : 현재 페이지 정보가 담겨있다.
  const [error, setError] = useState(null);

  const dispatch = useDispatch(); //useDispatch() 로 dispatch를 가져온다
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    //useSelector는 connect의 mapStateToProps와 유사함. 값이 바뀔 때 재정의할 지 결정한다.
    form: auth.login, //form 에 auth의 login정보를 넘긴다.
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  //input 변경 이벤트 핸들러
  const onChange = (e) => {
    // console.log('e.target>>', e.target);
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'login',
        key: name,
        value,
      }),
    );
  };

  // 홈 등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = form;
    dispatch(login({ username, password }));
  };

  //컴포넌트가 처음 렌더링 될 때 form 을 초기화한다.
  // 이걸 쓴 이유는 , 다른페이지에 갔다가 왔을때 값이 유지된 상태로 보여지기 위해서임
  // 처음 렌더링 될때만 초기화가 되지 두번째 세번째 렌더링 하면 호출되지 않는다.
  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log('authError 발생 >>', authError);
      setError('로그인 실패');
      return;
    }
    if (auth) {
      console.log('로그인 성공 >>', auth);
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      console.log('user이므로 바로 글목록 이동함>', user);

      history.push('/'); // 사용자이면 바로 글목록으로 이동한다.
      try {
        console.log(
          'LoginForm - 사용자이므로 user을 string으로 변환시켜서 storage에 담는다.',
        );

        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localstorage 에서 에러 >', e);
      }
    }
  }, [history, user]);

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(LoginForm);
