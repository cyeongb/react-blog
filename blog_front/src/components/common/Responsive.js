/* Responsive 컴포넌트는 반응형 디자인을 할 때 현하게 작업하기 위해서 사용한다.
다양한 컴포넌트에서 사용할 수 있기 때문에 common 디렉토리에 분류함.
*/

import React from 'react';
import styled from 'styled-components';

const ResponsiveBlock = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  width: 1024px;
  margin: 0 auto; /* 중앙정렬 */

  /* @media 는 그들의 상태에 따라 다른 스타일을 적용할 수 있다. */
  @media (max-width: 1024px) {
    width: 768px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Responsive = ({ children, ...rest }) => {
  //Responsive block이 둘러싸면 그의 children이  style,classname , onclick등의 props를 사용할 수 있도록 ...rest를 사용해서 ResponsiveBlock에 전달.
  return <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>;
};

export default Responsive;
