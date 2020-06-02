/* common 디렉토리는 여기저기서 재사용되는 컴포넌트를 모아놓음 */
import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';

const buttonStyle = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1.8rem;
  font-weight: bold;
  font-family: fantasy;
  padding: 0.25rem 1rem;
  color: wheat;
  outline: none;
  cursor: pointer;

  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }
  ${(props) =>
    props.fullWidth &&
    css`
/* 로그인 버튼에 밝은 파란색을 넣어주고 width는 100%*/
padding-top:0.75rem;
padding-bottom:0.75rem;
width:100%
font-size:1.125rem;
`}

  ${(props) =>
    props.cyan &&
    css`
      background: ${palette.cyan[5]};
      &:hover {
        background: ${palette.cyan[4]};
      }
    `}
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

// Link를 사용하는 것이 더 좋다고 함.
// 이유는 html 태그는 용도대로 사용하는 것이 좋다. link 컴포넌트는 'a'태그를 사용하니까.
// 그리고 link 컴포넌트로 구현하면  해당 컴포넌트를 구현한 버튼이나 컴포넌트에 하단에 이동할 주소를 볼 수 있다는 점이다.
const StyledLink = styled(Link)`
  ${buttonStyle}
`;

// to객체가 먼지 몰라서 생각해보니 Link to 에 사용하는 '경로'깂 애들 인듯.
const Button = (props) => {
  console.log('button 에 들고오는 객체의 to >>', props.to);

  // props.to 의 값에 따라서 컴포넌트를 다르게 사용한다.
  // StyledLink에 'props.cyan' 값을 '1'과'0'으로 변환해 준 이유는, 'styled()' 함수를 감싸서 만든 컴포넌트는 props가 '필터링' 되지 않기 때문이다.
  // 필터링이 되지 않으면 'link'에 사용하는  'a'태그 값이 boolean인데 boolean은 props에 전달할 수 없기 때문에 boolean을 숫자로 변환해 주었다.
  return props.to ? (
    <StyledLink {...props} cyan={props.cyan ? 1 : 0} />
  ) : (
    <StyledButton {...props} />
  );
};
// ...props : Button 컴포넌트가 받아오는 props를 모두 StyledButton 컴포넌트에 전달하겠다는 의미.
/* Button 컴포넌트안에 StyledButton 컴포넌트를 렌더링한 이유는 추후 이 컴포넌트를 사용할 떄 자동 import 가 되게 하기 위함.
styled-components로 만든 컴포넌트를 바로 내보내면 자동 import가 제대로 작동하지 않음*/

export default Button;
