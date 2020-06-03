/*  post에 관련된 api를 요청하는 함수 */

import client from './client';

export const writePost = ({ title, body, tags }) =>
  client.post('/api/posts', { title, body, tags });
