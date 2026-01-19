import { useState } from "react";

//State : 컴포넌트 내부에서 변경될 수 있는 데이터 관리 (상태값)
function Step4_State(){
    //숫자 상태값을 담을 수 있는 count와 해당 count를 변경할 수 있는 setCount함수
    const [count, setCount] = useState(0); //기본값 0
    //입력 문자열 상태를 다룰수 있는 속성과 함수
    const [name, setName] = useState(''); //기본값 빈문자열
    const [password, setPassword] = useState('');

    const styles = {
        container : {padding : '20px', maxWidth : '600px', margin : '0px auto'},
        section : {marginBottom : '30px', padding : '20px', border : '1px solid black', borderRadius : '8px'},
        button : {padding : '8px 16px', margin : '5px', backgroundColor : 'darkblue', color : 'white', border : 'none', cursor : 'pointer'},
        input : {padding : '8px', margin : '5px', border : '1px solid black', borderRadius : '4px', width : '200px'},
        count : {fontSize : '24px', fontWeight : 'bold', color : 'red'}
    };


    return(
        <div style={styles.container}>
            <h1>React State 관리</h1>
            <p>State는 컴포넌트의 상태를 관리하는 데이터이다.</p>

            <div style={styles.section}>
                <h2>카운터 예시</h2>
                <p>현재 카운트 : <span style={styles.count}>{count}</span></p>
                <button style={styles.button} onClick={()=>setCount(count+1)}>증가</button>
                <button style={styles.button} onClick={()=>setCount(count-1)}>감소</button>
                <button style={styles.button} onClick={()=>setCount(0)}>리셋</button>
            </div>

            <div style={styles.section}>
                <h2>입력값 상태 관리</h2>
                <input type="text" 
                    style={styles.input}
                    value={name}
                    placeholder="이름을 입력하세요"
                    //input text 입력요소의 상태가 변경되면 동작하는 이벤트 핸들러를 추가하여
                    //대상의 value값이 변경될때 해당 값을 추출하여 상태값(state) name을 수정하기 (setName 이용)
                    onChange={(e)=>{
                        //console.log(e.target.value);
                        setName(e.target.value);
                    }}      
                />

                <p>입력한 이름 : {name}</p>

                {/*비밀번호 입력 상태관리 해보기 위에 있는 내용을 참고하여 비밀번호 입력 
                input과 입력한 비밀번호 출력 p태그를 만들어보시오. 상태관리 속성 및 함수명은 자유 */}
                <input type="password" 
                    style={styles.input}
                    value={password}
                    placeholder="비밀번호를 입력하시오"
                    onChange={(e)=>{
                        setPassword(e.target.value);
                    }}
                    
                />
                <p>입력한 비밀번호 : {password}</p>


            </div>

        </div>
    )


}

export default Step4_State;