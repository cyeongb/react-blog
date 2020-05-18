import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import AuthForm from '../components/auth/AuthForm';
/*  ------------------------로그인---------------------------*/
const LoginPage = () => {
  console.log('login page');

  return (
    <AuthTemplate>
      <AuthForm />
    </AuthTemplate>
  );
};

export default LoginPage;
