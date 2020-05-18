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

const AuthForm = () => {
  return (
    <AuthFormBlock>
      <h3>LOGIN</h3>
      <form>
        <StyledInput
          autoComplete="username"
          name="username"
          placeholder="id.."
        />
        <StyledInput
          autoComplete="new-password"
          name="password"
          placeholder="password.."
        />
        <ButtonWithMarginTop cyan fullWidth>
          LOG-IN
        </ButtonWithMarginTop>
      </form>
      <Footer>
        <Link to="/register">JOIN</Link>
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthForm;
