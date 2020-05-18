import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import AuthForm from '../components/auth/AuthForm';
/*  ------------------------회원가입---------------------------*/
const RegisterPage = () => {
  console.log('register page');
  return (
    <AuthTemplate>
      <AuthForm />
    </AuthTemplate>
  );
};

export default RegisterPage;
