import React from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';
import Button from './Button';
import { Link } from 'react-router-dom';

const HeaderBlock = styled.div`
  position: fixed; /* 헤더가 항상 상단에 떠 있도록 fixed로 설정. */
  width: 100%;
  background: lightgray;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

// responsive 컴포넌트의 속성에 스타일을 추가해서 새로운 컴포넌트 생성함.
const Wrapper = styled(Responsive)`
  height: 7rem;
  display: flex;
  align-items: center;
  justify-content: space-between; /* 자식 엘리먼트 사이의 여백을 최대로 설정 */
  .logo {
    font-size: 2.4rem;
    font-weight: 800;
    letter-spacing: 3px;
    font-family: fantasy;
  }
  .right {
    display: flex;
    align-items: center;
  }
`;

//헤더가 fixed이기 때문에 페이지의 컨텐츠가 4rem 아래에 나타나게끔 해 준다.
const Spacer = styled.div`
  height: 7rem;
`;

// user 값이 있을 경우 계정명을 보여주고 로그인을 로그아웃으로 보여주도록 수정.
const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 1rem;
`;

const Header = ({ user, onLogout }) => {
  console.log('헤더에 user.usename값 잘 들고오나 >>', user.username);

  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <Link to="/" className="logo">
            R e a c t &nbsp; W o r l d
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Link>
          &nbsp;
          {user ? (
            <div className="right">
              <UserInfo>{user.username}</UserInfo>
              <Button onClick={onLogout}> L o g o u t </Button>
            </div>
          ) : (
            <div className="right">
              <Button to="/login"> L o g i n</Button>
            </div>
          )}
        </Wrapper>
      </HeaderBlock>
      <Spacer /* headerblock의 position이 fixed이면 헤더 컴포넌트 하단에 나오는 내용이 헤더와 겹치기 때문에 spacer로 헤더 크기만큼 공간을 차지하게 함. */
      />
    </>
  );
};

export default Header;
