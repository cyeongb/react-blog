import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
  username: String,
  hashedPassword: String,
});

// ================ tocken 값에 대한 서명을 한다.
UserSchema.methods.generateToken = function () {
  console.log('----------generateToken function 호출----------');

  const token = jwt.sign(
    // 첫번째 파라미터에는 토큰안에 넣고싶은 데이터를 넣는다.
    {
      _id: this.id,
      username: this.username,
    },
    process.env.JWT_SECRET, // 두번째 파라미터에는 jwt 암호를 넣는다.
    {
      expiresIn: '7d', // 7일 동안 토큰이 유효하다.
    },
  );
  return token;
};

// ---------- 비번 hash 설정하기
// setPassword 를 통해서 password값을 파라미터로 받아서 계정의 hashedPassword 값을 설정 해 준다.
// 여기서는 화살표 함수를 사용하면 안된다 ! 왜냐면 함수 내부에서 this에 접근해야 하기 때문에.
UserSchema.methods.setPassword = async function (password) {
  console.log('------setPassword 메서드 호출------');
  console.log('setPassword 에 들고온 비번 >>', password);

  const hash = await bcrypt.hash(password, 10);
  console.log('hash 로 만든 비번 >>', hash);
  this.hashedPassword = hash;
};

// checkPassword 메서드에서는 파라미터로 받은 password값이 해당 계정의 hasedPassword 와 일치하는지 검증한다.
UserSchema.methods.checkPassword = async function (password) {
  console.log('------checkPassword 메서드 호출------');

  console.log('checkPassword 에 들고온 비번 >>', password);
  const result = await bcrypt.compare(password, this.hashedPassword);
  console.log('hash 된 비번과 password 비교한 결과 >> ', result);
  return result;
};

UserSchema.methods.findByUsername = function (username) {
  console.log('------findByUsername 메서드 호출------');

  console.log('findByUsername 에 들고온 username >>', username);

  return this.findOne({ username });
};

// json serialize(직렬화)
//  serialization 이란 어떤 데이터를 송/수신, 저장하기 위해 전송에 적합한 포맷으로 변환하는 과정.
// 데이터의 송수신에 가장 많이 쓰이는 것이 json 이라고함. 왜냐면 대부분의 프로그래밍 언어가 json 파싱을 지원하기 때문에 알아서 잘 파싱이 된다.
// 그래서 보통 클라이언트가 서버로 데이터를 쓸 때나 서버가 클라이언트로 데이터를 내려줄때 json 을 사용한다고 한다.

UserSchema.methods.serialize = function () {
  console.log('------serialize 메서드 호출------');

  const data = this.toJSON(); //받아온 해당 데이터를 json 으로 변환시켜 data에 담는다.
  delete data.hashedPassword;
  return data;
};

//model() 메서드에 뮨자열과 스키마를 전달해서 model을 생성한다. 모델명은 보통 대문자로 시작한다고 함.
// User : collection을 나타내는 문자열로 실재 컬렉션 이름은 Users 로 자동 변환되어서 사용된다.
//
const User = mongoose.model('User', UserSchema);

export default User;
