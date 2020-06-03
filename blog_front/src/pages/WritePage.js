import React from 'react';
import Editor from '../components/write/Editor';
import Responsive from '../components/common/Responsive';

/*  ------------------------글쓰기---------------------------*/
const WritePage = () => {
  console.log('-------------write page@@----------------');

  return (
    <Responsive>
      <Editor />
    </Responsive>
  );
};

export default WritePage;
