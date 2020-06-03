import React, { useEffect, useCallback } from 'react';
import Editor from '../../components/write/Editor';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initialize } from '../../modules/write';

const EditorContainer = () => {
  const dispatch = useDispatch();

  //리덕스에서 title 과 body 값을 불러와서 Editor 컴포넌트에 전달해 준다.
  const { title, body } = useSelector(({ write }) => ({
    title: write.title,
    body: write.body,
  }));
  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch],
  );
  useEffect(() => {
    // 컴포넌트가 언마운트 되면 useEffect 로 INITIALIZE 액션을 발생시켜서 리덕스의 write 에 관한 상태를 초기화 시켜준다.
    // 만약에 이 initialize 작업을 해주지 않으면 글 작성 후  다시 글쓰기 페이지에 들어오면 자기가 전에 썼던 작업이 남아있게 된다.
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);
  return <Editor onChangeField={onChangeField} title={title} body={body} />;
};

export default EditorContainer;
