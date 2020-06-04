import React from 'react';
import PostViewer from '../components/post/PostViewer';
import HeaderContainer from '../containers/common/HeaderContainer';
const PostPage = () => {
  console.log('----------------Post page@@-------------------');
  return (
    <>
      <HeaderContainer />
      <PostViewer />
    </>
  );
};

export default PostPage;
