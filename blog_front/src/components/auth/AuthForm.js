import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';

/* 회원가입 또는 로그인 폼을 보여준다.*/

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }
`;

// styled 된 input
const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }

  & + & {
    margin-top: 1rem;
  }
`;

// 폼 하단에 로그인 혹은 회원가입 링크를 보여준다.
const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;

  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;

// 버튼 상단 여백
const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

// type props에 따라 다른 내용을 보여주기
const textMap = {
  login: 'LOGIN',
  register: 'REGISTER',
};

// 에러 보여주기

const ErrorMessage = styled.div`
  color: darksalmon;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const AuthForm = ({ type, form, onChange, onSubmit, error }) => {
  console.log('----------------- auth form 호출');

  console.log('AuthForm - type ::', type);
  console.log('AuthForm - form ::', form);
  // console.log('ㄴ form.username::', form.username);
  console.log('AuthForm - onChange ::', onChange);
  console.log('AuthForm - onSubmit ::', onSubmit);
  const text = textMap[type];
  return (
    <AuthFormBlock>
      <h3>{text}</h3>
      <form onSubmit={onSubmit}>
        <StyledInput
          autoComplete="username"
          name="username"
          placeholder="id.."
          onChange={onChange}
          value={form.username} //auth.js에있는 username
        />
        <StyledInput
          autoComplete="newpassword"
          name="password"
          type="password"
          placeholder="password.."
          onChange={onChange}
          value={form.password}
        />
        {type === 'register' && (
          <StyledInput
            autoComplete="new-password"
            name="passwordConfirm"
            placeholder="password check"
            type="password"
            onChange={onChange}
            value={form.passwordConfirm}
          />
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ButtonWithMarginTop cyan fullWidth style={{ marginTop: '1rem' }}>
          {text}
        </ButtonWithMarginTop>
      </form>
      <Footer>
        {type === 'login' ? (
          <Link to="/register"> R E G I S T E R </Link>
        ) : (
          <Link to="/login"> L O G I N </Link>
        )}
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthForm;
