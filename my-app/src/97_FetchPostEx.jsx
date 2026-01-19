import { use, useState } from "react";

const FetchPostEx = () => {
    //입력값 상태
    const [form, setForm] = useState({
        title : '',
        body : ''
    });

    //응답 결과 상태
    const [result, setResult] = useState(null);

    //로딩 상태
    const [loading, setLoading] = useState(false);

    const styles = {
        container : {
            padding : '20px', madWidth : '500px', margin : '0 auto'
        },
        input : {
            width : '100%', padding : '10px', marginBottom : '10px', fontSize : '16px'
        },
        textarea : {
            width : '100%', padding : '10px', marginBottom : '10px', fontSize : '16px', minHeight : '100px'
        },
        button : {
            padding : '10px 20px', fontSize : '16px', cursor : 'pointer', backgroundColor : 'black', color : 'white', border : 'none', borderRadius : '4px'
        },
        resultBox : {
            marginTop : '20px', padding : '15px', backgroundColor : 'beige', borderRadius : '4px'
        }
    };


    //입력값 변경 처리 함수
    const handleChange = (e) => {
        
        const {name, value} = e.target; //e.traget(요소객체)에서 필요 속성을 구조분해할당

        //console.log(name, value);
        
        //전달받은 대상의 name 속성값으로 상태값에 접근하여 해당 상태 변경 (다른 상태값은 유지될 수 있도록 풀어넣기)
        setForm(
            {
                ...form,
                [name] : value
            }
        );
    }

    //post 요청 처리 함수
    const submitPost = () => {
        //then 구문
        //로딩처리
        setLoading(true);
        //https://jsonplaceholder.typicode.com/posts
        fetch('https://jsonplaceholder.typicode.com/posts',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json; charset=UTF-8'
            },
            body : JSON.stringify({
                title : form.title,
                body : form.body,
                userId : 99
            })
        }).then(response => response.json())
          .then(data=>{
            console.log(data);
            setResult(data);
          })
          .catch(err=>{
            console.log('에러',err);
          })
          .finally(()=>{
            setLoading(false); //조회요청 끝나면 로딩 해제
          });


    }

    const submitPostAsync = async () => {
        //async await
        setLoading(true);

        try{
            const response =await fetch('https://jsonplaceholder.typicode.com/posts', {
                method : 'POST',
                headers : {
                    'Content-type' : 'application/json; charset=UTF-8'
                },
                body : JSON.stringify({
                    title : form.title,
                    body : form.body,
                    userId : 5555
                })
            });
            const data = await response.json();

            console.log(data);
            setResult(data);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }

    }

    return (
        <div style={styles.container}>
            <h1>Post 요청 연습</h1>

            {/*입력폼 */}
            <input type="text"
                   style={styles.input}
                   placeholder="제목입력"
                   name='title'
                   value={form.title}
                   onChange={handleChange}
            />

            <textarea name="body"
                      style={styles.textarea}
                      placeholder="내용입력"
                      value={form.body}
                      onChange={handleChange}
            >

            </textarea>
            
            {/*버튼 */}
            <button style={styles.button}
                    onClick={submitPost}
                    disabled={loading} //로딩값으로 처리
            >
                전송
            </button>

            <button style={styles.button}
                    onClick={submitPostAsync}
                    disabled={loading} //로딩값으로 처리
            >
                전송
            </button>
            {/*로딩 표시 위치 */}
            {loading && <p>로딩중...⏳</p>}

            {/*결과 표시 위치 */}
            {/*결과가 있다면 */}
            {result && (
                <div style={styles.resultBox}>
                    <h3>서버 응답</h3>
                    <p>아이디 : {result.id} </p>
                    <p>제목 : {result.title}</p>
                    <p>내용 : {result.body}</p>
                </div>
            )}

        </div>
    )





}
export default FetchPostEx;