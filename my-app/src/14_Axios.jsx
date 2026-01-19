/*
    React Axios 예제 - npm install axios 설치 필요
    해당 컴포넌트는 추가 라이브러리를 설치하고 사용

    Axios의 장점
    -자동 json 변환(fetch보다 편리)
    -요청/응답 인터셉터 지원
    -요청 취소기능
    -간단한 구현기능

    axios 추가 라이브러리를 사용할수 없는 환경 (순수 js환경) 또는 간단한 규모의 프로젝트가 아니라면
    axios를 사용하는것이 더욱 편리하다.
*/

import axios from "axios";

const AxiosComponent = () => {
    //GET요청
    const getUsers = async() =>{
        //요청 method 형식에 맞는 axios메소드를 제공한다. get, post, put, patch, delete
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");

        //console.log(response);

        //기존 fetch에서 response 객체를 json처리했던 작업이 이미 되어있기 때문에 생략가능
       // console.log(response.data);

    }

    //파라미터가 있는 GET요청
    const getPostId = async () => {
        //const response = await axios.get("https://jsonplaceholder.typicode.com/comments?postId=5");

        const response = await axios.get('https://jsonplaceholder.typicode.com/comments',{
            params : {
                postId : 1,
                userName : 'kims',
                title : 'hello world'
            }
        });
        //console.log(response);

    };

    //사용자 객체 생성
    const user = {
        name : 'kim',
        age : 20,
        email : 'kim@naver.com',
        userId : 'kimkim19'
    };
    //POST 요청해보기
    const createUser = async () => {
        //axios.post() 메소드는 데이터를 전송할때 파라미터에 객체 자체를 넣어 전달한다.
        //해당 객체는 자동으로 JSON 문자열로 변환되고 요청헤더에는 application/json 설정이 들어가게된다.

        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', user);

        const response2 = await axios.post('https://jsonplaceholder.typicode.com/posts', {
            name : 'lee',
            age : 30,
            email : 'lee123@gmail.com',
            userId : 'lee99'
        });
       // console.log(response);
        //console.log(response2);

    }

    //PUT 요청 해보기
    const updateUser = async () => {
        //PUT 요청 : 전체 수정-요청 경로와 두번째 전달값으로 수정될 대상 객체 전달
        const response = await axios.put('https://jsonplaceholder.typicode.com/posts/1',user);

      //  console.log(response);
    }


    //PATCH 요청해보기
    const updateTitle = async () => {
        //PATCH요청 : 부분 수정 - 요청 경로와 두번째 전달값으로 수정될 데이터가 담긴 객체 전달
        const response = await axios.patch('https://jsonplaceholder.typicode.com/posts/1',{
            title : '제목입니다.',
            body : '내용도 수정해볼게요'
        });
      //  console.log(response);
    }

    //DELETE 요청해보기
    const deletePost = async () => {
        //DELETE 요청
        const response = await axios.delete('https://jsonplaceholder.typicode.com/posts/1');

      //  console.log(response);
    }


    return (
        <>
            <h3>Axios로 요청해보기</h3>
            <button onClick={getUsers}>GET 요청</button>
            <button onClick={getPostId}>파라미터 GET요청</button>
            <button onClick={createUser}>파라미터 자체요청</button>
            <button onClick={updateUser}>파라미터 변경</button>
            <button onClick={updateTitle}>제목 변경요청</button>
            <button onClick={deletePost}>파라미터 삭제 요청</button>


        </>

    )


}
export default AxiosComponent;