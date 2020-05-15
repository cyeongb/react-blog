/* common 디렉토리는 여기저기서 재사용되는 컴포넌트를 모아놓음 */
import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: wheat;
  outline: none;
  cursor: pointer;

  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }
`;

const Button = (props) => <StyledButton {...props} />;
// ...props : Button 컴포넌트가 받아오는 props를 모두 StyledButton 컴포넌트에 전달하겠다는 의미.
/* Button 컴포넌트안에 StyledButton 컴포넌트를 렌더링한 이유는 추후 이 컴포넌트를 사용할 떄 자동 import 가 되게 하기 위함.
styled-components로 만든 컴포넌트를 바로 내보내면 자동 import가 제대로 작동하지 않음*/

export default Button;
