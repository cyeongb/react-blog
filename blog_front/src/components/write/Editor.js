import React, { useRef, useEffect } from 'react'; // 외부 라이브러리를 연동할 때는 useRef 와 useEffect 를 사용하면 된다.
import Quill from 'quill'; /* Quill 에디터는 일반 input 이나 textarea 가 아니기 때문에 onChange 와 value값을 사용해서 상태를 관리할 수 없다. */
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

const Editor = ({ title, body, onChangeField }) => {
  console.log('Editor.js () 호출 _ 여기에 들고오는 값 >>');
  console.log('title>>', title);
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

    // quill의 text-change 이벤트를 등록한다. [https://quilljs.com/docs/api/#events]
    const quill = quillInstance.current;
    quill.on('text-change', (delta, oldDelta, source) => {
      console.log('quill 의 text-change 이벤트 source >>', source);

      if (source === 'user') {
        onChangeField({ key: 'body', value: quill.root.innerHTML });
      }
    });
  }, [onChangeField]);

  const onChangeTitle = (e) => {
    onChangeField({ key: 'title', value: e.target.value });
  };

  return (
    <EditorBlock>
      <TitleInput
        placeholder="please insert title.."
        onChange={onChangeTitle}
        value={title}
      />
      <QuillWrapper>
        <div ref={quillElement} />
      </QuillWrapper>
    </EditorBlock>
  );
};

export default Editor;
