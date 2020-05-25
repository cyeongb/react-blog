import axios from 'axios';

/* axios  인스턴스 생성하기
axios 인스턴스를 만들면 나중에 api 클라이언트에 공통된 설정을 쉽게 넣어줄 수 있다.
인스턴스를 만들지 않으면 어플리케이션에서 발생하는 모든 요청에 대해 설정하기 때문에 다른 api 서버를 사용할 때 곤란할 수 있다.
*/
const client = axios.create();

/*
// 글로벌 설정 예시 ***


//api 주소를 다른곳에서 사용하기
client.defaults.baseURL = 'https://external-api-server.com'

// 헤더 설정
client.defaults.headers.common['Authorization'] = 'Bearer a1b2c3d4';

//인터셉터 설정
axios.interceptor.response.use(\
    response =>{
        //요청 성공시 특정 작업 수행
        return response;
    },
    error =>{
        //요청 실패 시 특정 작업 수행
        return Promise.reject(error);
    })
    */

export default client;
