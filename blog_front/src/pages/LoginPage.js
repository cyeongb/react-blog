import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import LoginForm from '../containers/auth/LoginForm';
/*  ------------------------로그인---------------------------*/
const LoginPage = () => {
  console.log('---------------login page @@--------------');

  return (
    <AuthTemplate>
      <LoginForm />
    </AuthTemplate>
  );
};

export default LoginPage;
