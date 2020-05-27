/*  임시로 데이터를 체워넣을 fake data */
import Post from './models/post';

export default function createFakeData() {
  // 0,1...39 로 이루어진 배열을 만든 후 post 데이터로 변환 할 것임
  const posts = [...Array(40).keys()].map((i) => ({
    title: `post#${i}`,
    body:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    tags: ['fake', 'data'],
  }));
  Post.insertMany(posts, (err, docs) => {
    //posts 배열에 넣을 문서들(err,docs)
    console.log('docs >>', docs);
  });
}
