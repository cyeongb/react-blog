import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';

const PostViewerBlock = styled(Responsive)`
  margin-top: 4rem;
`;

const PostHead = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const SubInfo = styled.div`
margin-top:1rem;
color:${palette.gray[6]}

/* span 사이에 가운뎃점 문자 보여주기*/
span+span:before {
  color:${palette.gray[5]};
  padding-left:0.25rem;
  padding-right:0.25rem;
  content:'\\B7' /* 가운뎃점 문자*/
}
`;

const Tags = styled.div`
  margin-top: 0.5rem;

  .tag {
    display: inline-block;
    color: ${palette.cyan[7]};
    text-decoration: none;
    margin-right: 0.5rem;
    &:hover {
      color: ${palette.cyan[6]};
    }
  }
`;

const PostContent = styled.div`
  font-size: 1.313rem;
  color: ${palette.gray[8]};
`;

const PostViewer = () => {
  return (
    <PostViewerBlock>
      <PostHead>
        <h1>TITLE</h1>
        <SubInfo>
          <span>
            <b>test</b>
          </span>
          <span>{new Date().toLocaleDateString()}</span>
        </SubInfo>
        <Tags>
          <div className="tag">#tag1</div>

          <div className="tag">#tag2</div>

          <div className="tag">#tag3</div>

          <div className="tag">#tag4</div>
        </Tags>
      </PostHead>
      <PostContent
        dangerouslySetInnerHTML={{
          __html: '<p>dangerously<b>HTML</b>content</p>',
          /* dangerously.. 이 값은, html을 적용하고 싶을 때 쓰는 props이다.(jsx로 작성하면 html 태그가 적용되지 않고 일반 텍스트 형태로 출력되기때문.)*/
        }}
      />
    </PostViewerBlock>
  );
};

export default PostViewer;
