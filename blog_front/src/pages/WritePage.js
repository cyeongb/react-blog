import React from 'react';
import EditorContainer from '../containers/write/EditorContainer';
import Responsive from '../components/common/Responsive';
import TagBox from '../components/write/TagBox';
import WriteActionButtonsContainer from '../containers/write/WriteActionButtonsContainer';

/*  ------------------------글쓰기---------------------------*/
const WritePage = () => {
  console.log('-------------write page@@----------------');

  return (
    <Responsive>
      <EditorContainer />
      <TagBox />
      <WriteActionButtonsContainer />
    </Responsive>
  );
};

export default WritePage;
