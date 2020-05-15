import React from 'react';
import { Route } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import LoginPage from './pages/LoginPage';
import PostPage from './pages/PostPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import './App.css';

const App = () => {
  return (
    <>
      <Route
        component={PostListPage}
        path={
          [
            '/@:username',
            '/',
          ] /* username은 경로에서 파라미터로 읽을 수 있다. */
        }
        exact /* 배열 사용은 라우터 v5부터 사용 가능하다. */
      />
      <Route component={LoginPage} path="/login" />
      <Route component={RegisterPage} path="/register" />
      <Route component={WritePage} path="/write" />
      <Route component={PostPage} path="/@:username/:postId" />
    </>
  );
};

export default App;
