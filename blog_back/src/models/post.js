import mongoose from 'mongoose';

const { Schema } = mongoose; //mongoose 디비에있는 schema 속성을 들고온다]

const PostSchema = new Schema({
  title: String,
  body: String,
  tags: [String], //문자열로 이루어진 배열
  publishedDate: {
    type: Date,
    default: Date.now,
  },
});

// model 인스턴스 생성
// model(스키마이름 , 스키마 객체)
// 데이터베이스는 스키마 이름을 정해주면 그 이름의 복수 형태로 데이터베이스에 컬렉션 이름을 만든다.
// 그래서 스키마 이름이 "Post" 이므로 데이터베이스에 만드는 컬렉션 이름은  "posts" 이다.
const Post = mongoose.model('Post', PostSchema);

export default Post;
