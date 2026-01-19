
/*
    부모 컴포넌트에서 중첩된 자식(자손) 컴포넌트에게 전달하려는 값이 있을때
    단순 Props를 이용하게 되면 매번 자식에게 Props를 전달하는 구문이 추가되어야한다.
    이때 전달하고자 하는 위치에서 Context를 이용하여 전달 및 받고자 하는 곳에서 바로 전달받아 사용 가능한 도구
*/

import { children, createContext, useContext, useState } from "react";

//1. Context 생성
//createContext() 로 새로운 Context 객체를 생성한다.
const ThemeContext = createContext(); //테마 관련 상태를 관리할 Context 준비
//사용자 정보를 관리할 Context
const UserContext = createContext();

//2. Context Provider 컴포넌트
//Provider는 Context의 값을 하위 컴포넌트에게 제공하는 역할로 사용된다.
const ThemeProvider = ({children}) => {
    //테마 상태와 상태 변경을 위한 state
    const[theme, setTheme] = useState('light');

    //테마를 토글하는 이벤트 핸들러 준비
    const toggleTheme = () => {
        setTheme (theme === 'light'?'dark':'light');
    }

    //Provider의 value prop으로 공유할 값들을 객체로 전달하면
    //하위 컴포넌트에서는 useContext로 접근 및 사용 가능하다.

    return (
        <ThemeContext.Provider value={{theme,toggleTheme}}>
            {children} {/*Provider로 감싸진 모든 하위 컴포넌트들에게 제공 */}
        </ThemeContext.Provider>
    )
};

//사용자 정보 context를 이용하는 Provider
const UserProvider = ({children}) => {
    //사용자 정보 상태 관리
    const [user, setUser] = useState({name:'김유저', role:'user'});

    //사용자 정보를 업데이트하는 이벤트 핸들러
    const updateUser = (newUser) => {
        setUser(newUser)
    };

    //사용자 정보와 정보 업데이트 이벤트 핸들러 하위 컴포넌트에 제공 (Provider)
    return(
        //UserContext에 Provider를 이용하여 하위 컴포넌트들에게 제공
        <UserContext.Provider value={{user, updateUser}}>
            {children} {/*Provider로 감싸진 모든 하위 컴포넌트들 */}
        </UserContext.Provider>
    );
};

//3. Context를 사용하는 컴포넌트들 정의
const Header = () => {
    //userContext를 이용하여 Context값에 접근
    //위에 만들어 놓았던 ThemeContext에서 theme과 toggleTheme 함수를 받아오기
    const {theme, toggleTheme} = useContext(ThemeContext); //import useContext(Hook)
    //UserContext에 담은 데이터도 받아오기
    const {user, updateUser} = useContext(UserContext);

    //현재 테마에 맞춰서 스타일 설정해보기
    const headerStyle = {
        backgroundColor : theme === 'light' ? 'white' : 'skyblue',
        color : theme === 'light' ? 'black' : 'white',
        padding : '15px',
        borderRadius : '5px',
        marginBottom : '20px' 
    };

    return (
        <div style={headerStyle}>
            <h2>헤더</h2>
            {/*Context로 받아온 값 화면에 표시 */}
            <p>현재 테마 : {theme}</p>
            <p>사용자 ㅣ {user.name} ({user.role})</p>
            {/*Context에서 받아온 테마 변경 이벤트 핸들러 연결 */}
            <button onClick={toggleTheme}>테마 변경</button>
        </div>
    );
};

const Content = () => {
    //해당 컴포넌트에서는 테마 정보만 불러와보기
    const {theme} = useContext(ThemeContext);

    const contentStyle = {
        backgroundColor : theme === 'light' ? 'white' : 'skyblue',
        color : theme === 'light' ? 'black' : 'white',
        padding : '15px',
        borderRadius : '5px',
        marginBottom : '20px' 
    };

    return (
        <div style={contentStyle}>
            <h3>메인 콘텐츠</h3>
            <p>Context를 통해 테마 적용 완료</p>

            {/*중첩 컴포넌트도 Context에 접근 가능한지 확인 */}
            <NestedComponent></NestedComponent>

        </div>
    );
};

//깊이 중첩된 컴포넌트에서도 Context 사용 가능 확인하기
//Props로 데이터를 전달받지 않아도 Context를 통해 직접 접근 가능
const NestedComponent = () => {
    //사용자 정보, 정보 수정 함수에 직접 접근 (Context 사용)
    //때문에 중간 컴포넌트에서 props를 전달해줄 필요가 없다.
    const {user, updateUser} = useContext(UserContext);

    //사용자 역할을 변경하는 함수
    const handleRoleChange = () => {
        const newRole = user.role ==='user'?'admin' : 'user';
        //기존 사용자 정보 중 역할만 변경하기
        updateUser({...user, role: newRole});
    };

    return (
        <div style={{
            border : '2px solid black',
            padding : '15px',
            marginTop : '15px',
            borderRadius : '5px'
        }}>
            <h4>중첩된 컴포넌트</h4>
            <p>현재 사용자 역할 : {user.role}</p>
            <button onClick={handleRoleChange}>
                역할 변경
            </button>
        </div>
    )
};


//Context 없이 전통적인 Props 전달 방식 다뤄보기
//Props Drilling
const WithoutContext = () => {
    //최상위 컴포넌트에서 상태관리를 위한 state 준비
    const[count, setCount] = useState(0);

    //상위 컴포넌트에서 전달한 props 데이터 받아서 하위 컴포넌트에게 전달
    const Parent = ({count, setCount}) => {
        return (
            <>
            <h4>부모 컴포넌트</h4>
            {/*이때 부모 컴포넌트는 count나 setCount를 사용하지 않아도 전달을 위해 매개변수 및 전달 구문을 작성해야한다.*/}
            <Child count={count} setCount={setCount}></Child>

            </>
        )
    };

    const Child = () => {
        return (
            <>
                <h4>자식 컴포넌트</h4>
                {/*자식 컴포넌트도 count를 사용하지 않지만 자손 컴포넌트에게 전달해야한다. */}
                <GrandChild count={count} setCount={setCount}></GrandChild>
            </>
        )
    };

    //실제 count를 전달받아 사용할 위치
    const GrandChild = ({count, setCount}) => {
        return (
            <>
                <h4>자손 컴포넌트</h4>
                <p>카운트 {count}</p>
                <button onClick={()=>setCount(count+1)}>증가</button>
            </>
        )
    };

    return(
        <>
            <h3>Props Drilling 방식</h3>
            <p>모든 중간 컴포넌트가 props를 전달하는 구문이 필요하다</p>
            {/* Props를 전달하는 구문 작성 */}
            <Parent count={count} setCount={setCount}></Parent>
        </>
    )

};


//메인 컴포넌트
const ContextComponent = () => {
    return (
        <>
            <h1>Context 예제</h1>

            <h2>Props Drilling 방식으로 해보기 (Context 없이)</h2>
            <WithoutContext></WithoutContext>

            <h2>Context 활용하여 테마 변경해보기</h2>
            <ThemeProvider>
                <UserProvider>
                    <div style={{marginBottom : '30px'}}>
                        <h2>Context 사용 방식</h2>
                        <Header></Header>
                        <Content></Content>

                    </div>
                </UserProvider>
            </ThemeProvider>


        </>
    )
}
export default ContextComponent;