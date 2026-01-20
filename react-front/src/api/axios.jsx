

//Axios 인스턴스 생성
import axios from "axios";

const api = axios.create({
    baseURL : 'http://localhost:8080/spring',
    timeout : 10000,
    headers : {
        'Content-Type' : 'application/json'
    }
});

//Requset Interceptor - 토큰 자동 추가 (요청 인턱셉터)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//Response Interceptor - 에러 처리 및 토큰 만료 처리
api.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error) => {
        const {response} = error;
        if(response){
            switch(response.status) {
                case 401 : //토큰 만료
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                break;
                case 403 : //권한 불충분
                    console.log('접근 권한이 없습니다.');
                break;
                case 404 : //리소스를 찾을 수 없음
                    console.log('요청한 리소스를 찾을 수 없습니다.');
                break;
                case 500 : //서버 내부 오류
                    console.log('서버 오류가 발생했습니다.');
                break;
                default : 
                console.error('알 수 없는 오류가 발생했습니다.');
            }
        } else{
            console.log('네트워크 오류가 발생했습니다.');
        }
        return Promise.reject(error);
    } 
);

export default api;