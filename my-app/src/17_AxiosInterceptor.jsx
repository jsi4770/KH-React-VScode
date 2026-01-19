
/*
    Axios 인터셉터 (Interceptors)

    -요청(request)이나 응답(response)을 가로채서 전처리/후처리 하는 기능
    -모든 API 호출에 공통으로 적용할 로직을 한 곳에서 처리
    -JWT 토큰 자동첨부, 에러, 공통처리, 로딩 상태관리 등등...

    실제 프로젝트에서 활용 예시
    -모든 요청에 JWT토큰 자동추가
    -에러 발생기 처리구문 작성
    -공통 에러 메시지 처리
    -API 요청/응답 로깅처리

*/

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

//Axios 인스턴스 생성
//요청을 보낼때 사용할 기본 URL과 요청시간 및 헤더 설정을 주입한 Axios 인스턴스 생성

const api = axios.create({
    baseURL : '/api',
    timeout : 10000, //10초
    headers : {
        'Content-Type' : 'application/json'
    }
});

//요청 인터셉터
//모든 API 요청이 서버로 전송되기 전에 실행되는 함수
//주로 인증 토큰을 헤더에 추가하는 용도로 사용된다.

api.interceptors.request.use(
    //요청 성공시 실행

    (config)=>{
        console.log(`API 요청 : ${config}`);
        console.log(config);

        //로컬스토리지에서 JWT(데모) 토큰 가져오기
        const token = localStorage.getItem('token');

        //토큰이 있다면 Authorization 헤더에 추가하기
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
            console.log('토큰 추가 완료');
        }

        //config 정보 반환
        return config;

    },
    //요청 에러시 실행
    (error) =>{
        console.log(`요청 에러 : ${error}`);
        console.error('요청 에러(console.error) : ', error);

        return Promise.reject(error); //응답반환 (에러 처리)
    }
);

//응답 인터셉터 (Response Interceptor)
/*
    서버로부터 응답을 받은 후 then/catch로 전달되기 전에 실행되는 함수
    주로 에러 공통처리, 토큰 갱신, 응답 데이터 가공등에 사용됨

*/

api.interceptors.response.use(
    //응답 성공시 실행 (상태코드 2xx일 경우)
    (response) => {
        console.log('API 응답', response);
    
        return response; //응답 데이터 그대로 반환
    
    },
    (error) => { //응답 에러 발생시 (상태코드 2xx 외 상태일 경우)
        console.log(`API 에러 발생`, error)

        //에러 응답이 있는 경우 상태 코드에 따라 에러 메시지 처리
        if(error.response){
            const {status, data} = error.response;

            console.error(`상태코드 : ${status}`)
            console.error('에러 메시지 : ', data);

            //상태 코드별 에러메시지 정리
            switch(status){
                case 400 : 
                    //Bad Request : 잘못된 요청
                    alert(data.message || '잘못된 요청입니다.');
                break;

                case 401 : 
                    //Unauthorized : 인증 실패
                    alert('로그인이 필요하거나 세션이 만료되었습니다.');

                    //인증 실패했으니 토큰 제거 및 로그인 페이지로 이동시키기
                    localStorage.removeItem('token');
                break;

                case 403 :
                    //Forbidden - 권한 없음
                    alert('접근 권한이 없습니다.');
                break;

                case 404 :
                    //Not Found - 리소스 찾지 못 함
                    alert('요청 데이터를 찾을 수 없습니다.');
                break;

                case 500 : 
                    //Internal Servel Error - 서버 에러
                    alert('서버 오류가 발생했습니다. 잠시 후 다시 시도하세요.');
                break;

                default : alert('오류 발생!');
            }
        }else if (error.request){
            //네트워크 오류 (서버 응답 없음)
            console.error('네트워크 에러 : 서버응답 없음');
        }else{
            console.log('요청 에러')
        }

        return Promise.reject(error); //에러 던지기 (반환하여 응답위치에서 catch 구문으로 보낼 수 있도록)

    }
)

//게시판 관련 API함수들 준비

export const boardAPI = {
    //게시글 목록 조회 기능
    getList : (page = 1, size = 10, searchParams={})=>{
        return api.get('/board/list',{
            params : {page,size,...searchParams}
        });
    }
};

//사용 예제 컴포넌트
const InterceptorExample = () => {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //게시글 목록 조회 함수
    const axiosBoards = async ()=> {
        
        try{
            setLoading(true);
            setError(null);

            //인터셉터가 적용된 API 호출
            const response = await boardAPI.getList(1, 10);
            console.log(response.data);
            setBoards(response.data);
        }
        catch(err){
            setError('게시글 목록 조회 실패!');
        }finally{
            setLoading(false); //로딩 끝
        }
    };

    //마운트 되었을때 한번 조회하기
    useEffect(()=> {
        axiosBoards(); //액시오스보드 정보 가져오기

    },[]);

    return (
        <div style={{padding : '20px', maxWidth : '800px', margin : '0 auto'}}>
            <h1>Axios 인터셉터 사용 예제</h1>
            <div style={{marginBottom : '20px', padding : '15px', backgroundColor : 'lightblue'}}>
                <h3>인터셉터의 동작</h3>

            </div>

            {loading && <p>로딩중...⌛</p>}
            {error && <p style={{color : 'red'}}>{error}</p>}

            <div>
                <h2>게시글 목록</h2>
                {boards.map(board=>(
                    <div style={{padding : '10px', marginBottom : '10px', border : '1px solid black'}}
                         key={board.boardNo}
                    >
                        <h3>{board.boardTitle}</h3>
                        <p>{board.boardContent}</p>
                    </div>
                ))}
            </div>

            <button>
                게시글 작성 테스트
            </button>
        </div>
    )

}

//메인 컴포넌트 내보내기
export default InterceptorExample;
