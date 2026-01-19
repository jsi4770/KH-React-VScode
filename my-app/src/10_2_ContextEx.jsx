import { createContext, useContext, useState } from "react";

//스타일 부여 객체
const styles = {
    box : {border : '1px solid #ccc', padding : '15px', margin : '10px', borderRadius : '5px'},
    button : {padding : '8px 16px', marginRight : '5px', cursor : 'pointer'},
    header : {backgroundColor : '#f0f0f0', padding : '15px', marginBottom : '20px'}
};

//1. Context 생성
const AuthContext = createContext();

//2. Provider 컴포넌트 정의
const AuthProvider = ({children}) => {
    //로그인 상태용 state(false: 로그아웃, true : 로그인. -기본값 : false)
    const [isLogin, setIsLogin] = useState(false)

    //사용자 이름용 state(문자열 state 기본값 '')
    const [user, setUser] = useState('');

    //로그인 함수 (로그인 상태값 true로, 전달받은 이름 업데이트)
    const login = (name) => {
        setIsLogin(true);
        setUser(name);
    };

    //로그아웃 함수 (로그인 상태값 false로, 전달받은 이름 기본값으로 업데이트)
    const logout = () => {
        setIsLogin(false);
        setUser('');
    };

    //위에 생성한 AuthContext를 이용하여 Provider로 하위 컴포넌트들에게 로그인 상태, 사용자 이름, 로그인 함수, 로그아웃 함수 전달
    return (
        <AuthContext.Provider value={{isLogin, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );

};

//3. Context를 사용하는 컴포넌트들 준비

//헤더 컴포넌트 - 로그인 상태 표시용
const Header = () => {
    //AuthContext에서 값을 가져오기
    const {isLogin, user} = useContext(AuthContext);
    return (
        <div style={styles.header}>
            <h2>🏠 마이 사이트</h2>
            {/*로그인 상태값이 true라면 000님 환영합니다!를, 상태값이 false라면 '로그인이 필요합니다.' p태그로 출력 */}
            {isLogin ? (
                <p> {user}님 환영합니다!</p>
            ) : (
                <p>로그인이 필요합니다.</p>
            )}
        </div>
    );
};

//로그인 폼 컴포넌트
const LoginForm = () => {
    //AuthContext에서 필요한 요소 받아오기
    //입력란에 필요한 상태값 준비 (문자열)
    const {isLogin, login, logout} = useContext(AuthContext);
    const [inputName, setInputName] = useState('');


    //로그인 버튼 클릭시 입력값으로 로그인 처리 될 수 있도록 하는 이벤트 핸들러
    const handleLogin = () => {
        if(inputName.trim() !== ''){
            login(inputName);
            setInputName('');
        };
    };

    return (
        <div style={styles.box}>
            <h3>로그인 영역</h3>
            {/*로그인 상태일땐 로그아웃 버튼 보이도록 */}
            {/*로그아웃 상태일땐 이름 입력용 input요소와 로그인 버튼 보이도록 처리 */}
            {isLogin ? (
                <button style={styles.button} onClick={logout}>로그아웃</button>

            ) : (
                <div>
                    <input type="text"
                            placeholder="이름을 입력하세요" 
                            value={inputName}
                            style={styles.box}
                            onChange={(e)=> setInputName(e.target.value)}
                    />

                    <button onClick={handleLogin}>
                        로그인
                    </button>
                </div>
            )}
        </div>
    );

};

//프로필 컴포넌트
const Profile = () => {
    //AuthContext에서 필요한 데이터 찾아오기
    const {isLogin, user} = useContext(AuthContext);

    return (
        <div style={styles.box}>
            <h3>프로필 영역</h3>
            {/*로그인 되어있다면 이름과 로그인 상태를 p태그로 표현 */}
            {/*로그인 되어있지 않다면 '로그인 후 확인 가능합니다. 를 p태그로 표현 */}
            {isLogin ? (
                <>
                    <p>사용자 이름 : {user}</p>
                    <p>상태 : ✅로그인 됨</p>
                </>
            ) : (
                <p>❌ 로그인 후 확인 가능합니다.</p>
            )}
        </div>
    );

};

//메인 컴포넌트
const LoginExample = () => {

    return (
        //사용할 Provider를 이용하여 처리
        <AuthProvider>
            <div style={{maxWidth : '500px', margin : '0 auto'}}>
                <h1>로그인 Context 예제</h1>
                <Header></Header>
                <LoginForm></LoginForm>
                <Profile></Profile>
            </div>
        </AuthProvider>
    );
};

//메인에서 해당 로그인 예제를 불러와 화면에 출력 후 확인해보기
export default LoginExample;