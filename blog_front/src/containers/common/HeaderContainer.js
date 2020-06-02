/*  헤더에서 user 값으로 로그인/로그아웃 변경 하기 위해서 컨테이너에서 user값을 들고 온다.*/

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/common/Header';
import { logout } from '../../modules/user';

const HeaderContainer = () => {
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));
  const dispatch = useDispatch();
  const onLogout = () => {
    //logout 액션 생성 함수를 dispatch 헤서 header 컴포넌트에 전달해준다.
    dispatch(logout());
  };

  console.log('HeaderContainer 에서 user 값 들고옴 >>', user);
  return <Header user={user} onLogout={onLogout} />;
};
export default HeaderContainer;
