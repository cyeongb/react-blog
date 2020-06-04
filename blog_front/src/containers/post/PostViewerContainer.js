import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { readPost, unloadPost } from '../../modules/post';
import PostViewer from '../../components/post/PostViewer';

const PostViewerContainer = ({match}) => {
//처음 마운트 될 때 post read API를 요청한다.
const {postId} = match.params;



};
    return
    
    

export default withRouter(PostViewerContainer);
