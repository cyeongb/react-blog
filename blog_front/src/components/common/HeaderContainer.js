/*  헤더에서 user 값으로 로그인/로그아웃 변경 하기 위해서 컨테이너에서 user값을 들고 온다.*/

import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/common/Header';

const HeaderContainer = () => {
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));
  console.log('HeaderContainer 에서 user 값 들고옴 >>', user);
  return <Header user={user} />;
};
export default HeaderContainer;
