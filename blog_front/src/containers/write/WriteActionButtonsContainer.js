/* 글을 쓰고 '글쓰기 등록 '을 처리하는 버튼을 누르면 동작하는 컨테이너 
글을 등록 : 현재 리덕스 store 안에 있는 값을 사용해서 새로운 post를 작성한다.
등록 취소 : history를 사용해서 브라우저에서 뒤로 가도록 구현함.
글 등록 성공 : 서버에서 보내온 post의 _id , username 을 참조해서 post를 읽을 수 있는 경로를 만들고, push 속성으로 해당 경로로 이동한다.
*/

import React, { useEffect } from 'react';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { writePost } from '../../modules/write';

const WriteActionButtonsContainer = ({ history }) => {
  const dispatch = useDispatch();

  const { title, body, tags, post, postError } = useSelector(({ write }) => ({
    title: write.title,
    body: write.body,
    tags: write.tags,
    post: write.post,
    postError: write.postError,
  }));

  // 글 등록하기
  const onPublish = () => {
    dispatch(
      writePost({
        title,
        body,
        tags,
      }),
    );
  };

  // 등록 취소
  const onCancel = () => {
    history.goBack();
  };

  //성공 혹은 실패 시 할 작업
  useEffect(() => {
    if (post) {
      console.log('글 있음 >', post);
      const { _id, user } = post; //글이 있으면 post 객체에서 id와 사용자 정보를 얻어와서
      history.push(`/@${user.username}/${_id}`); // post를 읽을 수 있는 경로 만들고 해당 경로로 이동.
    }
    if (postError) {
      console.log('post 에러 남 >>', postError);
    }
  }, [history, post, postError]);
  return <WriteActionButtons onPublish={onPublish} onCancel={onCancel} />;
};

export default withRouter(WriteActionButtonsContainer);
