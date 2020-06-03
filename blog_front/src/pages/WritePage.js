import React from 'react';
import Editor from '../components/write/Editor';
import Responsive from '../components/common/Responsive';
import TagBox from '../components/write/TagBox';

/*  ------------------------글쓰기---------------------------*/
const WritePage = () => {
  console.log('-------------write page@@----------------');

  return (
    <Responsive>
      <Editor />
      <TagBox />
    </Responsive>
  );
};

export default WritePage;
