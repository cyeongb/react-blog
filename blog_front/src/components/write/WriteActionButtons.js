import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const WriteActionButtonsBlock = styled.div`
  margin-top: 1rem;
  margin-bottom: 3rem;
  button + button {
    margin-left: 0.5rem;
  }
`;

// tagbox 에서 사용하는 버튼과 일치하는 높이로 설정하고, 서로간의 여백을 주었음.
const StyledButton = styled(Button)`
  height: 2.125rem;

  & + & {
    margin-left: 0.5rem;
  }
`;

const WriteActionButtons = ({ onCancel, onPublish }) => {
  return (
    <WriteActionButtonsBlock>
      <StyledButton cyan onClick={onPublish}>
        {' '}
        P o s t
      </StyledButton>
      <StyledButton cyan onClick={onCancel}>
        {' '}
        C a n c e l{' '}
      </StyledButton>
    </WriteActionButtonsBlock>
  );
};

export default WriteActionButtons;
