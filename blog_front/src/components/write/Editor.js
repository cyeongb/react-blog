import React, { useRef, useEffect } from 'react'; // 외부 라이브러리를 연동할 때는 useRef 와 useEffect 를 사용하면 된다.
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';

// 반응형 스타일
const EditorBlock = styled(Responsive)`
  /* 페이지 위 아래 여백을 지정한다. */
  padding-top: 5rem;
  padding-bottom: 5rem;
`;

// input 창 스타일
const TitleInput = styled.input`
  font-size: 3rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[4]};
  margin-bottom: 2rem;
  width: 100%;
`;

// div 스타일
const QuillWrapper = styled.div`
  /*  최소 크기 지정 및 padding 제거*/
  .ql-editor {
    padding: 0;
    min-height: 320px;
    font-size: 1.125rem;
    line-height: 1.5;
  }
  .ql-editor .ql-blank::before {
    left: 0px;
  }
`;

const Editor = () => {
  const quillElement = useRef(null); // quill을 적용할 div element를 설정한다.
  const quillInstance = useRef(null); // quill 인스턴스를 설정.

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: 'bubble',
      placeholder: 'fill out the content...',
      modules: {
        // https://quilljs.com/docs/modules/toobal 에 더 많은 옵션이 있다고 함.
        toolbar: [
          [{ header: '1' }, { header: '2' }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['blockquote', 'code-block', 'link', 'image'],
        ],
      },
    });
  }, []);

  return (
    <EditorBlock>
      <TitleInput placeholder="please insert title.." />
      <QuillWrapper>
        <div ref={quillElement} />
      </QuillWrapper>
    </EditorBlock>
  );
};

export default Editor;
