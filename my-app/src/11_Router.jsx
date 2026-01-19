//React Router 사용법 : 페이지간의 이동과 라우팅
//터미널에서 npm install react-router-dom 명령어를 입력하여 라이브러리 설치부터 진행

import { Children, useEffect, useState } from 'react';
import {
    BrowserRouter as Router, //as 별칭 가능, HTML5 History API를 사용하는 라우터 (기본적으로 Route 처리를 하기 위해 컴포넌트 자체를 감싸는 형태로 사용)
    Link, //페이지 이동을 위한 링크 컴포넌트 (새로고침 없이 이동)
    NavLink, //활성 링크 스타일링이 가능한 Link 컴포넌트
    Route, //개별 라우트를 정의하는 컴포넌트(요청 경로에 대해서 어떤한 컴포넌트를 보여줄 것인지 연결시켜주는 컴포넌트)
    Routes, //개별 라우트를 묶어서 감싸주는 컨테이너 컴포넌트
    useParams, //URL 파라미터를 가지고 오는 Hook (ex) / user/id/:id 에서 id값을 추출
    useLocation, //현재 위치 정보(pathname, search, hash)등을 가지고 오는 훅
    useNavigate, //프로그래밍적으로 페이지 이동을 시킬 때 사용하는 훅
    Navigate, //프로그래밍적으로 리다이렉트 할 때 사용하는 컴포넌트
    Outlet, //중첩 라우팅 환경에서 자식 컴포넌트가 렌더링 될 위치를 지정하는 컴포넌트
    useSearchParams //URL의 쿼리 스트링을 읽고 수정할수 있는 훅 

} from 'react-router-dom';

//1. 홈페이지 컴포넌트
//가장 기본적인 정적 페이지 컴포넌트
const Home = () => {
    return (
        <div style={{padding : '20px'}}>
            <h1>홈페이지</h1>
            <p>리액트 라우터를 이용한 홈페이지 입니다.</p>
            <p>상단 메뉴를 클릭하여 다른 페이지로 이동해보기</p>
        </div>
    );
};

//2. 소개 페이지 컴포넌트
//정적 컨텐트를 보여주는 페이지
const About = () => {
    return (
        <div style={{padding : '20px'}}>
            <h1>소개 페이지</h1>
            <p>리액트 라우터 사용법을 배우는 예제입니다.</p>
            <ul>
                <li>SPA(Single Page Application) 구현</li>
                <li>페이지 새로고침 없이 이동</li>
                <li>URL 변경과 브라우저 히스토리 관리</li>
            </ul>
        </div>
    );
};

//3. 연락처 페이지 컴포넌트
//연락처 정보를 표시하는 정적 페이지 예제
const Contact = () => {
    return (
        <div style={{padding : '20px'}}>
            <h1>연락처</h1>
            <div>
                <p>이메일 : user01@gmail.com</p>
                <p>전화 : 010-3333-5555</p>
                <p>주소 : 강남구 역삼동 323번지</p>
            </div>
        </div>
    );
};

//4. 사용자 프로필 페이지
//동적 라우팅과 프로그래밍적 네비게이션
const UserProfile = () => {
    //useParams 훅을 사용하여 url에 전달된 userId 파라미터 추출해보기
    //ex) /user/123 과 같은 경로로 전달된 아이디는 123
    const {userId} = useParams();
    //useLocation 훅을 이용하여 현재 위치정보 가져오기
    const location = useLocation();

    //useNavigate 훅을 이용하여 네비게이션 함수 가져오기
    const navigate = useNavigate();

    console.log(navigate);

    //프로필 편집 버튼을 눌렀을 때 edit 경로로 이동시키는 함수
    const userEdit = () => {

        navigate(`/user/${userId}/edit`);
    }

    //브라우저 히스토리에서 이전페이지로 이동시키는 함수
    const goBack = () => {
        navigate(-1); //-1은 이전 1은 다음 (기존 js에서 사용한 history.go()와 같은 역할)
    }

    console.log(location);

    return (
        <div style={{padding : '20px'}}>
            <h1>사용자 프로필</h1>
            {/*URL 파라미터 값 화면에 포현 */}
            <p>사용자 ID(전달값) : {userId}</p>
            {/*현재 경로 표기 */}
            <p>현재 경로 : {location.pathname}</p>
            <p>동적 라우팅 예제 사용</p>

            <div style={{marginTop : '20px'}}>
                {/*버튼 클릭으로 네비게이션 사용(navigate 이동) */}
                <button style={{marginTop : '10px', padding : '5px 10px'}} onClick={userEdit}>
                    프로필 편집
                </button>

                <button style={{padding : '5px 10px'}} onClick={goBack}>
                    이전 페이지
                </button>
            </div>


        </div>
    )

}

//5. 사용자 편집 페이지 (중첩 라우팅 예제)
//폼 처리와 상태 관리를 포함한 페이지
const UserEdit = () => {
    //URL 파라미터에서 userId 꺼내오기
    const {userId} = useParams();
    const navigate = useNavigate();

    //폼 입력 상태 관리를 위한 useState 훅
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');    

    //폼 제출 처리 함수
    const handleSubmit = (e) => {
        //기존 요청되는 기본이벤트 막아주기
        e.preventDefault();

        //alert으로 사용자 ㅇㅇㅇ 정보가 저장되었습니다. \n 이름 : ooo \n 이메일 : ooo 나올 수 있도록 처리
        alert(`사용자 ${userId}정보가 저장되었습니다. \n 이름 : ${name}\n이메일 : ${email}`)

        //저장 후 사용자 프로필 페이지로 리다이렉트

        navigate(`/user/${userId}`);
    }

    return(
        <div style={{padding : '20px'}}>
            <h1>사용자 편집</h1>
            <p>사용자 ID : {userId}</p>
            <p>사용자 이름 : {name}</p>
            <p>사용자 이메일 : {email}</p>

            <form style={{marginTop : '20px'}} onSubmit={handleSubmit}>
                <div style={{marginBottom : '15px'}}>
                    <label htmlFor="name">이름</label> 
                    <input type="text"
                           id='name'
                           style={{padding : '5px', width : '200px'}}
                           value={name}
                           onChange={(e)=>setName(e.target.value)}
                    />
                </div>

                <div style={{marginBottom : '15px'}}>
                    <label htmlFor="name">이메일</label>
                    <input type="text"
                           id='email'
                           style={{padding : '5px', width : '200px'}}
                           value={email}
                           onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>

                {/*폼 제출 버튼 */}
                <button type='submit' style={{padding : '8px 15px', marginRight : '10px'}} onClick={handleSubmit}>
                    저장
                </button>
                <button type='button' style={{padding : '8px 15px'}} onClick={()=>navigate(`/user/${userId}`)}>
                    취소
                </button>
            </form>
        </div>
    )
}

//6. 대시보드 페이지 (중첩 라우팅 부모 컴포넌트)
//중첩 라우팅의 부모 컴포넌트 예제
const Dashboard = () => {
    return (
        <div style={{padding : '20px'}}>
            <h1>대시보드</h1>

            {/*NavLink를 이용하여 활성 상태 스타일 적용 */}
            <nav style={{marginBottom : '20px'}}>
            <NavLink to='/dashboard/overview'
              style={({isActive})=>({
                    margin : '15px',
                    color : isActive ? 'red' : 'blue',
                    fontWeight : isActive ? 'bold' : 'normal'
                })}> 
                개요
            </NavLink>
            <NavLink to='/dashboard/analytics'
              style={({isActive})=>({
                    margin : '15px',
                    color : isActive ? 'red' : 'blue',
                    fontWeight : isActive ? 'bold' : 'normal'
                })}> 
                분석
            </NavLink>
            <NavLink to='/dashboard/settings'
              style={({isActive})=>({
                    margin : '15px',
                    color : isActive ? 'red' : 'blue',
                    fontWeight : isActive ? 'bold' : 'normal'
                })}> 
                설정
            </NavLink>
            </nav>

            {/*Outlet : 중첩 라우팅에서 자식 컴포넌트가 렌더링 될 위치를 지정하는 컴포넌트 */}
            {/*위에 작성한 하위 컴포넌트 3가지 중에 요청 경로에 맞는 컴포넌트가 Outlet 컴포넌트 위치에 렌더링 된다. */}
            <Outlet></Outlet>
        </div>
    );
};

//7. 대시보드 하위 페이지들 (중첩 라우팅의 자식 컴포넌트들)
//각각 대시보드 내부에서 렌더링 되는 서브페이지
const Overview = () => (
    <div style={{padding : '15px', backgroundColor : 'beige', borderRadius : '5px'}}>
        <h3>개요</h3>
        <p>전체 시스템 개요를 보여주는 페이지입니다.</p>
    </div>
);

const Analytics = () => (
    <div style={{padding : '15px', backgroundColor : 'bisque', borderRadius : '5px'}}>
        <h3>분석</h3>
        <p>데이터 분석 결과를 보여주는 페이지입니다.</p>
    </div>
);

const Settings = () => (
    <div style={{padding : '15px', backgroundColor : 'lightcyan', borderRadius : '5px'}}>
        <h3>설정</h3>
        <p>시스템 설정을 관리하는 페이지입니다.</p>
    </div>
);

//8. 쿼리 스트링 예제 페이지
//URL 쿼리 파라미터 처리 예제 ex) /search?keyword=검색어
const Search =() => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    //useSearchParam() 훅을 사용하여 추출
    const [searchParams, setSearchParams] = useSearchParams();

    const currentSearch = searchParams.get('keyword') || ''; //keyword 파라미터값 추출

    //검색 폼 제출 처리 이벤트 핸들러
    const handleSearch = (e) => {
        //기본 이벤트 막기
        e.preventDefault();
        if(searchTerm.trim()){ //검색어 공백제거 했을때 존재한다면
            setSearchParams({keyword:currentSearch});
            //요청 경로에 쿼리스트링 추가하여 요청해보기
            navigate(`/search?keyword=${searchTerm.trim()}`);

        }
    };
 

    return (
        <div style={{padding : '20px'}}>
            <h1>검색</h1>

            <form style={{marginBottom : '20px'}} onSubmit={handleSearch}>
                <input type="text"
                       placeholder = '검색어를 입력하세요'
                       style = {{padding : '8px', width : '300px', marginRight : '10px'}}
                       value={searchTerm}
                       onChange={(e)=>setSearchTerm(e.target.value)}
                />

                <button type='submit' style={{padding : '8px 15px'}}>
                    검색
                </button>

                {/*검색결과 표시 영역 */}

                {
                    //검색 결과가 있다면
                    currentSearch &&
                    (<div style={{padding : '15px', backgroundColor : 'beige', borderRadius : '5px'}}>
                        <h3>검색 결과</h3>
                        <p>검색어 : {currentSearch}</p>
                        <p>현재 URL : {location.pathname + location.search}</p>
                    </div>

                    )


                }
            </form>

        </div>
    );
};

//9. 404페이지 (존재하지 않는 페이지)
//라우트에 매칭되지 않는 모든 경로에 대한 페이지
const NotFound = () => {
    const location = useLocation();

    return (
        <div style={{padding : '2px', textAlign : 'center'}}>
            <h1>404 - 페이지를 찾을 수 없습니다.</h1>
            {/*요청된 경로 표시 */}
            <p>요청하신 페이지 {location.pathname}가 존재하지 않습니다.</p>
            {/*홈으로 돌아가는 링크 */}
            <Link to='/' style={{color : 'blue', textDecoration:'underline'}}>
                홈으로 돌아가기
            </Link>
        </div>
    )
}

//10. 보호된 라우트 (로그인 체크 예제)
//인증이 필요한 페이지를 보호하는 패턴
const ProtectedRoute= ({children}) => {
    //인증여부 상태값
    const [isAuth, setIsAuth] = useState(false);
    //로딩처리 상태값
    const [isLoading, setIsLoading] = useState(true);

    useEffect (()=> {
        //실제 데이터가 있다면 해당 로그인 처리 후 전달받은 인증 토큰을 사용하게 된다.

        //임의로 진행
        const checkAuth = () => {
            setTimeout(()=>{
                //브라우저의 저장소 중 localStorage에 담겨있는 토큰 확인
                const token = localStorage.getItem('authToken'); //토큰 추출
                //token 변수에 논리부정을 하면 있을때 false처리가 된다. 토큰이 있다는것을 판별주기 위해 논리부정 두번 처리
                //토큰 여부를 위에 선언한 isAuth에 처리
                setIsAuth(!!token); //토큰이 있을때 true, 없으면 false처리됨. (헷갈리면 삼항연산자 쓰세용)
                setIsLoading(false); //로딩 상태값 false(로딩처리 그만)

            }, 1000); //1초 뒤에 수행시켜 실제 데이터를 조회하는듯한 처리 (시간차 인증)
        };
        checkAuth(); //위 구문 호출

    }, []); //해당 컴포넌트가 처음 마운트 되었을때 수행되는 구문

    
    //로딩중일때 표시할 컴포넌트
    if(isLoading){
        return <div style={{padding : '20px', textAlign : 'center'}}>⏳로딩중⌛</div>
    }

    //인증된 경우 자식 컴포넌트 렌더링, 아닌 경우 로그인 페이지로 리다이렉트 처리

    //replace 속성으로 현재 페이지 대체(리다이렉트 처리 후 url 정보)
    return isAuth ? children : <Navigate to='/login' replace/> 
}

/*
    localStorage, sessionStorage
    브라우저엣서 제공하는 저장소
    -localStorage
    사용자가 직접 데이터를 지우거나 자바스크립트 코드로 지우지 않는 한 영구적으로 남아있는 데이터 저장소
    컴퓨터를 재부팅하거나 브라우저를 닫아도 데이터가 유지된다. (실제 존재하는 데이터)
    -주요 용도
    - 자동 로그인 처리 : 로그인 토큰을 저장해서 사용자가 다시 방문했을 때 자동 로그인 처리
    -다크모드/라이트모드 : 사용자 테마 설정 유지
    -장바구니 : 비회원 장바구니처럼 사용자가 다시 방문해도 유지되는 정보 ...

    -sessionStorage
    현재 열려있는 창이 닫히면 사라지는 임시 저장소 (기존 HttpSession과 유사)
    각 탭 별로 sessionStorage를 가지게 된다.
    -주요 용도
    - 여러 단계의 입력폼일 경우 잠시 기존 입력값을 저장할 때
    - 오늘 하루 보지 않기와 같은 팝업 상태 저장 (상황에 따라 localStorage나 cookies 이용)

    사용법
    -데이터 저장시
    storage.setItem('키','값');
    -데이터 사용 (호출)
    storage.getItem('키');
    -데이터 삭제
    storage.removeItem('키');
    -모든 데이터 삭제
    storage.clear();


*/




//11. 로그인 페이지
//사용자 인증을 처리하는 페이지
const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    //로그인 처리 함수
    const handleLogin = () => {
        //실제 데이터 처리였다면 해당 요청을 보낸 후 그에 대한 결과로 로그인 처리
        //데모 토큰을 이용하여 검증해보기
        //브라우저의 localStorage 라는 영역에 토큰을 담아놓고 검증방식에 이용해보기
        localStorage.setItem('authToken', 'test-tokens'); //데모 토큰

        //로그인 후 원래 접근하려던 페이지로 이동하기
        const from = location.state?.from?.pathname || '/'; //전달된 이전 위치 정보와 경로가 있다면 반환. 없다면 '/'로 반환되어 메인페이지로 이동
        navigate(from,{replace : true}); //replace로 로그인 페이지를 히스토리에서 제거시킨다. (재이동방지)
    }

    return (
        <div style={{padding : '20px', textAlign : 'center'}}>
            <h1>로그인</h1>
            <p>보호된 페이지에 접근하려면 로그인이 필요합니다.</p>
            <button style={{padding : '10px 20px'}}
                    onClick = {handleLogin}>
                로그인
            </button>
        </div>
    );
};

//12. 로그인 후 확인할 수 있는 페이지 (보호된 라우트 예제)
//인증이 필요한 실제 보여질 페이지
const Admin = () => {
    const navigate = useNavigate();

    //로그아웃 처리 함수
    const handleLogOut = () => {
        localStorage.removeItem('authToken'); //데모토큰 제거
        navigate('/login'); //로그인 페이지로 이동
    };

    return (
        <div style={{padding : '20px'}}>
            <h1>관리자 페이지</h1>
            <p>이 페이지는 로그인 한 관리자만 볼 수 있는 페이지 입니다.</p>
            <button onClick={handleLogOut} style={{padding : '20px'}}>
                로그아웃
            </button>
        </div>
    )
}



//네비게이션 및 라우터 설정
//네비게이션 컴포넌트 (공통 메뉴)
const Navigation = () => {
    const navStyle = {
        backgroundColor : 'beige',
        padding : '15px',
        marginBottom : '20px',
        borderRadius : '5px',
    };

    //링크 기본 스타일 정의
    const linkStyle = {
        marginRight : '15px',
        textDecoration : 'none',
        padding : '8px 12px',
        borderRadius : '3px',
        display : 'inline-block'
    };

    return (
        <nav style = {navStyle}>
            {/*기존 jsp에서 사용하던 a태그와 같은 역할을 수행하는 Link 컴포넌트 이용해보기
               네비게이션바에선 활성화 스타일을 추가할 수 있는 NavLink를 이용한다.
               isActive : 활성화 되었는지 여부(boolean값)를 받아서 스타일에 활용가능 */}
            <NavLink to='/'
              style={({isActive})=>({
                    ...linkStyle,
                    backgroundColor : isActive ? 'pink' : 'beige',
                    color : isActive ? 'white' : 'black',
                    fontWeight : isActive ? 'bold' : 'normal'
                })}> 
                HOME 
            </NavLink>
            {/*NavLink 사용해보기 */}
            <NavLink to='/about'
              style={({isActive})=>({
                    ...linkStyle,
                    backgroundColor : isActive ? 'pink' : 'beige',
                    color : isActive ? 'white' : 'black',
                    fontWeight : isActive ? 'bold' : 'normal'
                })}> 
                ABOUT
            </NavLink>
            <NavLink to='/contact'
                style={({isActive})=>({
                    ...linkStyle,
                    backgroundColor : isActive ? 'gold' : 'beige',
                    color : isActive ? 'blue' : 'black',
                    fontWeight : isActive ? 'bold' : 'normal'
                })}> 
                CONTACT
            </NavLink>

            {/*동적 라우팅 예제 - 특정 사용자 ID로 링크 설정 */}
            {/*예제이니 데모데이터(user01)를 쓰겠습니다. */}
            <NavLink to='/user/user01'
                style={({isActive})=>({
                    ...linkStyle,
                    backgroundColor : isActive ? 'gold' : 'beige',
                    color : isActive ? 'blue' : 'black',
                    fontWeight : isActive ? 'bold' : 'normal'
                })}> 
                사용자 (ID : user01)
            </NavLink>

            {/*대시보드*/}
            <NavLink to='/dashboard'
              style={({isActive})=>({
                    ...linkStyle,
                    backgroundColor : isActive ? 'pink' : 'beige',
                    color : isActive ? 'white' : 'black',
                    fontWeight : isActive ? 'bold' : 'normal'
                })}> 
                대시보드
            </NavLink>

            {/*대시보드*/}
            <NavLink to='/search'
              style={({isActive})=>({
                    ...linkStyle,
                    backgroundColor : isActive ? 'pink' : 'beige',
                    color : isActive ? 'white' : 'black',
                    fontWeight : isActive ? 'bold' : 'normal'
                })}> 
                검색
            </NavLink>

            {/*로그인 */}
            <NavLink to='/login'
              style={({isActive})=>({
                    ...linkStyle,
                    backgroundColor : isActive ? 'pink' : 'beige',
                    color : isActive ? 'white' : 'black',
                    fontWeight : isActive ? 'bold' : 'normal'
                })}> 
                로그인
            </NavLink>

            {/*관리자 */}
            <NavLink to='/admin'
              style={({isActive})=>({
                    ...linkStyle,
                    backgroundColor : isActive ? 'pink' : 'beige',
                    color : isActive ? 'white' : 'black',
                    fontWeight : isActive ? 'bold' : 'normal'
                })}> 
                관리자
            </NavLink>
        </nav>
    );
};





//메인 컴포넌트
//전체 애플리케이션의 라우팅 구조를 정의하는 최상위 컴포넌트
const RouterComponent = () => {
    return (
        //라우팅 처리를 하기위해 (Route, Link 컴포넌트를 사용한다.) 
        //최상단에는 BrowerRouter 컴포넌트로 감싸줘야 한다.
        <Router>
            <>
                <h1 style={{textAlign : 'center', color : 'darkgray'}}>
                    React Router 예제
                </h1>

                {/*공통 네비게이션바 위치 */}
                <Navigation></Navigation>


                {/*Routes : 모든 Route 컴포넌트를 감싸주는 컴포넌트 */}
                <Routes>

                    {/*기본 컴포넌트 라우팅 */}
                    {/*요청일 경우 보여질 컴포넌트 설정 */}
                    {/* path : 요청경로, element : 보여줄 컴포넌트 */}
                    <Route path='/' element ={<Home></Home>}></Route>
                    <Route path='/about' element ={<About/>}></Route>
                    <Route path='/contact' element ={<Contact></Contact>}></Route>

                    {/*동적 라우팅 --URL 파라미터 사용 */}
                    {/*경로 : 키값 - 해당 위치에 들어오는 데이터를 키값에 담아서 전달하겠다.(파라미터 key=value) */}
                    <Route path='/user/:userId' element={<UserProfile></UserProfile>}></Route>
                    <Route path='/user/:userId/edit' element={<UserEdit></UserEdit>}></Route>

                    {/*중첩 라우팅 예제 */}
                    {/*부모 Route 안에 자식 Route들을 정의 */}
                    <Route path='/dashboard' element={<Dashboard></Dashboard>}>
                        {/*index Route : 부모 경로와 정확히 일치할때 보여주고자 하는 컴포넌트가 있다면 렌더링 처리 */}
                        {/*<Route index element={<Navigate to='overview' replace/>}/>*/}

                        <Route path='overview' element={<Overview/>}/>
                        <Route path='analytics' element={<Analytics/>}/>
                        <Route path='settings' element={<Settings/>}/>
                    </Route>

                    {/*검색 */}
                    <Route path='/search' element = {<Search/>}/>
                    
                    {/*만약 위에 있는 Route들에서 처리되지 않는 요청의 경우 에러페이지가 띄워질수 있도록 설정 */}
                    {/*404페이지 : 와일드 카드 경로 (모든 요청 '*') */}
                    <Route path='*' element={<NotFound/>}/>

                    {/*보호된 라우트 예제 */}
                    {/*로그인 페이지 */}
                    <Route path='/login' element={<Login/>}/>

                    {/*ProtectedRoute 컴포넌트로 Admin 컴포넌트를 감싸서 인증 체크하기 */}
                    <Route path='/admin' element={<ProtectedRoute>
                                                    <Admin></Admin>
                                                  </ProtectedRoute>}/>
                </Routes>
            </>
        </Router>
    );
};
export default RouterComponent;