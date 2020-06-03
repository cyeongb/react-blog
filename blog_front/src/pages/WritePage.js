import React from 'react';
import EditorContainer from '../containers/write/EditorContainer';
import Responsive from '../components/common/Responsive';
import TagBox from '../components/write/TagBox';
import WriteActionButtons from '../components/write/WriteActionButtons';

/*  ------------------------글쓰기---------------------------*/
const WritePage = () => {
  console.log('-------------write page@@----------------');

  return (
    <Responsive>
      <EditorContainer />
      <TagBox />
      <WriteActionButtons />
    </Responsive>
  );
};

export default WritePage;
