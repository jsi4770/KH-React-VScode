
/*
    React Fetch
    외부 API로부터 데이터를 가져오는 도구
    javascript 내장함수로 비동기 처리를 할 수 있다.
    기존에 사용하던 ajax는 jquery cdn 또는 라이브러리를 참조해야하지만
    fetch는 내장함수이기에 별도의 설치 또는 참조 없이 사용 가능하다.

    javascript 비동기 처리 기본 개념
    -Promise : 비동기 작업의 완료 또는 실패를 나타내는 객체
    -async/await : Promise를 더 쉽게 사용할 수 있는 문법'
    -async : 함수가 promise를 반환하도록 만든다 (항상)
    -await : promise가 완료될때까지 기다린다. (동기적으로 보이게 함)
    -await : async 함수 내부에 사용 가능

    -fetch() 함수를 이용하여 서버로 요청을 보내고 response 객체를 반환받는다.

    -데모데이터 서버
    JSONPlacehodler API 사용
    테스트용 무료 REST API를 제공하는 사이트
    실제 서버 없이도 API 호출 처리 테스느 가능
    https://jsonplaceholder.typicode.com
*/

import { useEffect, useState } from "react";

const Fetch = () => {
    //사용자 (users) 정보를 담을 상태
    const [users, setUsers] = useState([]); //빈 배열 기본값
    //포스트 목록 상태값
    const [posts, setPosts] = useState([]);
    //선택된 사용자 정보 담을 state
    const [selectedUser, setSelectedUser] = useState(null);

    //에러 객체 상태값
    const [error, setError] = useState(null);
    //로딩 처리 상태값
    const [loading, setLoading] = useState(false);


    //모든 사용자 데이터 가져오기
    const fetchUsers = async () => { //async - 비동기 처리
        setLoading(true); //로딩 상태를 true로 변경하여 로딩중 화면 보여주기

        try{
        //해당 api 경로로 요청 후 응답 객체 처리
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        //응답 상태 확인
        //response.ok : 상태가 200~299 범위인지 확인한다.
        //-true : 성공적인 응답
        //-false : 에러 응답

        //에러 발생시 에러 처리할 수 있도록 예외 발생시키기
        if(!response.ok){
            throw new Error(`Http error : state : ${response.status}`);
        } //만역 에러응답이 들어온다면 catch 블럭으로 이동시킬 수 있도록 예외 강제 발생

        //응답된 객체 response를 json으로 파싱하여 변수 처리
        const data = await response.json(); //Promise를 반환하므로 await 처리하기

      //  console.log(data);

        setUsers(data); //유저 객체 배열 정보 담기

        }catch(err){ //error 객체 정보가 매개변수에 담겨서 확인 가능
        //    console.log(`Fetch error : ${err}`);
            setError(`사용자 정보를 불러오는데 실패하였습니다.${err.message}`);
        }finally{
            //로딩 처리 끝
            setLoading(false);
        }

    }

    //특정 사용자의 포스트 조회해오기 (사용자 아이디 전달값으로 이용)
    const fetchUserPosts = (userId) => {
        setLoading(true);
        setError(null); //에러 메시지 초기화

        //서버에 전달하고자 하는 요청 파라미터가 있는 경우 사용하는 형식
        //쿼리스트링

        const response = fetch('https://jsonplaceholder.typicode.com/posts?userId='+userId)
                        .then(response => response.json())
                        .then(data => {
                                        setPosts(data); // ⬅️ 비어있던 부분: 상태에 데이터 담기
                                        const user = users.find(u => u.id === userId);
                                        setSelectedUser(user);
                        }) //포스트 데이터 상태에 담기
                        .catch(error => setError(`유저의 포스트 정보 조회 실패 - ${error.message}`))
                        .finally(()=>setLoading(false)); //로딩 처리

        //선택된 사용자 정보 저장하기
        //사용자 목록에서 전달받은 사용자 아이디와 일치하는 아이디 가진 유저 정보 추출
        const user = users.find(u => u.id === userId);

        setSelectedUser(user); //선택된 사용자 정보 저장하기


    }

    //useEffect를 이용하여 처음 마운트 되었을때 데이터 조회 요청 처리
    useEffect(()=> {
        fetchUsers(); //사용자 데이터 조회 함수 호출
    },[]);

    return(
        <div style={{padding : '20px', maxWidth : '1000px', margin : '0 auto'}}>
            <h1>React에서 API(서버) 데이터 조회해오기</h1>
            <div style={{marginBottom : '20px', padding : '15px', backgroundColor : 'beige', borderRadius : '8px'}}>
                <h3>Fetch 이용하여 처리</h3>
                <ul>
                    <li>GET 요청 : 사용자 목록 조회해 보기</li>
                    <li>Loading 상태 : 데이터 조회할때 로딩중 표시해 보기 </li>
                    <li>ERROR 처리 : API 호출 실패시 에러 페이지 표시해 보기</li>
                </ul>
            </div>
            {/*에러 메시지 위치 */}
            {
                error && (
                    <div style={{backgroundColor : 'black',
                                 color : 'white',
                                 padding : '15px',
                                 borderRadius : '8px',
                                 marginBottom : '20px'
                    }}>
                        ❌ {error}
                    </div>
                )
            }

            {/*로딩 상태 */}
            {
                loading && (
                    <div style={{backgroundColor : 'pink',
                                 color : 'white',
                                 padding : '15px',
                                 borderRadius : '8px',
                                 marginBottom : '20px'
                    }}>
                        데이터 로딩중... ⏳
                    </div>
                )
            }

            {/*사용자 목록 화면 구현 위치 */}
            <>
                <h2>사용자 목록</h2>
                <p>사용자가 클릭하면 해당 사용자의 포스트를 볼 수 있습니다.</p>
                <div style={{
                    display : 'flex',
                    flexWrap : 'wrap',
                    gap : '15px',
                    marginTop : '20px'
                }}>
                    { !selectedUser &&
                        users.map(user=> (
                            <div key={user.id}
                                onClick={() => fetchUserPosts(user.id)}
                                style={{
                                    border : '1px solid black',
                                    borderRadius : '8px',
                                    padding : '20px',
                                    cursor : 'pointer',
                                    backgroundColor : 'lightblue',
                                    transition : 'all 0.3s ease'
                                }}>
                                <h3 style={{margin : '0 0 10px 0'}}>{user.name}</h3>
                                <p style={{margin : '5px 0', fontSize : '14px'}}>
                                    {user.email}
                                </p>
                                <p style={{margin : '5px 0', fontSize : '14px'}}>
                                    {user.company.name}
                                </p>
                                <p style={{margin : '5px 0', fontSize : '14px'}}>
                                    {user.website}
                                </p>
                            </div>
                        ))}

                        {/*선택된 사용자의 포스트 목록 화면 */}
                        {selectedUser &&
                            <div>
                                <h2>{selectedUser.name}님의 포스트 목록</h2>
                                {
                                    posts.length === 0 ? (
                                        <p style={{textAlign : 'center', padding : '40px'}}>
                                            포스트가 없습니다.
                                        </p>
                                    ) : (
                                        <div stype={{display : 'flex', flexDirection : 'column', gap : '15px'}}>
                                            {posts.map(post =>(
                                                <div key={post.id}>
                                                    <div>
                                                        <h4>{post.title}</h4>
                                                        <p>{post.body}</p>
                                                        <p>포스트 ID : {post.id}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                }
                            </div>
                        }



                </div>
            </>

        </div>
    )
}
export default Fetch;

