import { useState } from "react";

//리스트 랜더링 : 배열 데이터를 기반으로 여러 컴포넌트들을 랜더링 하는 방법
function Step8_List(){
    //데모데이터 목록 준비
    const[todos, setTodos] = useState([
        {id : 1, text : '리액트 공부하기', completed : false},
        {id : 2, text : '프로젝트 만들기', completed : true},
        {id : 3, text : '포트폴리오 만들기', completed : false}
    ]);

    //사용자 목록
    const users = [
        {id : 1, name : '김유저', age : 20, job : '개발자'},
        {id : 2, name : '박학생', age : 25, job : '의사'},
        {id : 3, name : '이라클', age : 30, job : '소방관'},
    ]

    //과일 목록
    const fruits = ['딸기', '망고',' 오렌지', '수박'];

    const[inputTodo, setInputTodo] = useState('');
    const handlerAddTodo = ()=> {
        if(inputTodo.trim() === '') return;

        const newTodo = {
            id : Date.now(),
            text : inputTodo,
            completed : false
        };

        setTodos([...todos, newTodo]);
        setInputTodo('');
    };

    const handlerModifyTodo = (id) => {
        const updatedTodos = todos.map(todo =>
            //map 함수에서 반복처리될때 접근된 todo의 id값이 전달받은 id값과 일치한다면
            //기존 객체 정보를 풀어넣고 변경해야하는 completed만 수정해서 다시 추가하기
            //만약 id값이 다르다면 그대로 넣어서 반환하기
            todo.id === id ? { ...todo, completed : !todo.completed } : todo
        );
        setTodos(updatedTodos);
    };

    const handlerDeleteTodo = (id) => {
        const filteredTodos = todos.filter(todo => todo.id !== id);
        setTodos(filteredTodos);
    };

    //새로운 할 일 담을 변수 준비 (변수명 자유)

    //할 일 추가 이벤트 핸들러 (함수명 자유)
    //공백 제거한 입력값이 있을 때 할 일 목록에 추가하기
    //할 일 목록은 각 인덱스에 담긴 데이터가 객체 형태이기 때문에
    //할 일 추가할때도 객체로 만들어서 추가하기 (식별자, 할 일, 여부)
    //식별자는 중복되지 않는 키 값을 이용. 카운트 증가값 또는 Date now() 사용하여 현재시간으로 처리
    //할 일은 추가 input 요소에서 작성한 value로 넣기
    //실행 여부는 기본값 false
    //작성 후 새 할 일 작성영역 비워주기

    //할 일 완료 토글 이벤트 핸들러 (함수명 자유)
    //각 반복되어 나온 요소가 어떤 요소인지 판별할 수 있는 식별자를 전달받아
    //해당 요소를 찾아서 completed를 반대값으로(논리부정) 변환하여 수정하기
    //todos 목록 자체에서 찾아내어 수정해야함. **

    //할 일 삭제 이벤트 핸들러 (함수명 자유)
    //어떠한 대상이 삭제되어야 하는지 식별자를 전달받아 해당 값을 이용하여 기존 목록에서 제거란 목록으로 수정해보기



    const styles = {
        container : {padding : '20px', maxWidth : '600px', margin : '0px auto'},
        section : {marginBottom : '30px', padding : '20px', border : '1px solid black', borderRadius : '8px'},
        button : {padding : '10px 20px', margin : '5px', backgroundColor : 'beige', color : 'red', border : 'none', cursor : 'pointer'},
        deleteButton : {padding : '5px 10px', backgroundColor : 'red', color : 'white', border : 'none', borderRadius : '4px', cursor : 'pointer', fontSize : '12px'},
        input : {padding : '8px', margin : '5px', border : '1px solid gray', borderRadius : '4px', width : '200px'},
        todoItem : {display : 'flex', alignItems : 'center', justifyContent : 'space-between', padding : '10px', borderBottom : '1px solid lightgray'},
        completed : {textDecoration : 'line-through', color : 'gray'},
        userCard : {padding : '15px', margin : '10px 0', backgroundColor : 'white', border : '1px solid lightgray', borderRadius : '6px'},
        fruitItem : {display : 'inline-block', padding : '5px 10px', margin : '5px', backgroundColor : 'lightblue', borderRadius : '15px', fontSize : '14px'}
       };

    return(
        <div style={styles.container}>
            <h1>React 리스트 랜더링</h1>
            <p>배열 데이터를 기반으로 여러 컴포넌트를 랜더링 하는 방법 (고유 key값 필수)</p>

            <div style={styles.section}>
                <h2>1. 동적 리스트 - 할 일 목록 만들기</h2>
                <div style={{display : 'flex', gap : '10px', marginBottom : '15px', justifyContent : 'center'}}>
                    <input type="text"
                           style={styles.input}
                           placeholder="새 할 일 입력" 
                           value={inputTodo}
                           onChange={(e)=> setInputTodo(e.target.value)}
                    />

                    <button style={styles.button}
                            onClick={handlerAddTodo}
                    >
                        할 일 추가
                    </button>
                </div>

                {/*위에서 작성한 할 일 목록 출력하기 */}
                <div>
                    {
                        todos.map(todo => (
                            //해당 객체에 있던 id(식별자)를 이용하여 key값 추가
                            <div key={todo.id} style={styles.todoItem}>
                                <span
                                    onClick={()=>handlerModifyTodo(todo.id)}
                                    //각 todo에 있는 completed 속성값이 true라면 스타일 부여, 아니라면 스타일 X
                                    style={{...(todo.completed ? styles.completed : {}), cursor : 'pointer'}}>

                                    {todo.completed ? '✅':'⬜'}{todo.text}
                                </span>
                                <button style={styles.deleteButton}
                                        onClick={()=> handlerDeleteTodo(todo.id)}
                                >
                                    삭제
                                </button>


                            </div>
                        ))
                    }
                </div>
                {/* todo 객체 실행여부 논리값인 completed를 이용하여 조건에 부합하는 대상만 모아 배열로 반환시켜 해당 개수를 추출(length) */}
                <p>총 {todos.length}개의 할 일, 완료 : {todos.filter(t=>t.completed).length}개</p>
            </div>
            
            <div style={styles.section}>
                <h2>2. 정적 리스트 - 사용자 목록</h2>
                {/*위에서 정의한 사용자 목록을 출력해보기 */}
                {/*div style userCard를 사용
                    이름은 h3태그
                    나이, 직업은 p태그를 이용하여 출력해보기 */}
                    {
                        users.map(user => (
                            <div key={user.id} style={styles.userCard}>
                                <h3>{user.name}</h3>
                                <p>{user.age}</p>
                                <p>{user.job}</p>
                            </div>
                        ))
                    }
            </div>

            <div style={styles.section}>
                <h2>3. 간단한 리스트 - 과일 목록</h2>
                {/*위에서 정의한 과일 목록 배열 출력해보기 */}
                {/*span태그 이용하여 출력 스타일은 fruitItem 사용 */}
                    {
                        //키값이 없을땐 인덱스 요소 추가하기!
                        fruits.map((fruit, index) => (
                            <span key={index} style={styles.fruitItem}>
                                {fruit}
                            </span>
                        ))
                    }
            </div>
            <p>
                *인덱스를 key로 사용하는 경우는 배열이 변경되지 않을 경우에만 권장
            </p>

            <div style={styles.section}>
                    <h2>4. 필터링된 리스트</h2>
                    <h3>완료된 할 일 : </h3>
                    {/*div 태그로 완료된 할 일만 뽑아보기 */}
                    {/*filter함수를 이용하여 조건에 부합하는 목록 추출 후 map으로 출력하기 */}
                    {
                        todos.filter(todo => todo.completed).map((todo) => (
                            <div key={todo.id}>
                                ✅{todo.text}
                            </div>
                        ))    
                    }
                    <h3>미완료 할 일 : </h3>
                    {/*div 태그로 미완료 할 일만 뽑아보기 */}
                    {
                        todos.filter(todo => !todo.completed).map((todo) => (
                            <div key={todo.id}>
                                ⬜{todo.text}
                            </div>
                        ))    
                    }
            </div>

            <div style={styles.section}>
                <h3>리스트 렌더싱시 key의 필요성</h3>
                <ul>
                    <li>key는 리스트(배열)의 렌더링 시 각 아이템을 식별하기 위한 고유 식별자(이름표)이다.</li>
                    <li>하나의 리스트 내에서 key값은 형제 요소간에서 반드시 고유해야한다.(식별자)</li>
                    <li>데이터가 가진 고유한 id를 key로 사용하는것이 가장 이상적이다.</li>
                    <li>배열의 index를 key로 사용할 시 배열이 변경되면 성능 저하 또는 오류가 발생할 수 있다.</li>
                    <li>key는 리액트가 사용하는 특별한 식별용 속성으로 props로 전달되지 않는다.</li>
                </ul>
            </div>



        </div>
    )




}
export default Step8_List;