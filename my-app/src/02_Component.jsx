import { Children } from "react";

//1. 함수형 컴포넌트 (가장 기본적인 형태)
function Welcome(){
    return <h2>환영합니다!</h2>
}

//2. 화살표 함수로 만든 컴포넌트
const Greeting = () => {
    return <p>안녕하세요. 이것은 화살표 함수 컴포넌트입니다.</p>;
}

//3. 매개변수를 받는 컴포넌트
function UserCard(props){
    return(
        <div style={{
            border : '1px solid black',
            padding : '16px',
            margin : '8px',
            borderRadius : '8px',
            backgroundColor : 'lightblue'
        }}>
            <h3>{props.name}</h3>
            <p>나이 : {props.age}세</p>
            <p>직업 : {props.job}</p>
        </div>
    )
}

//4. 구조 분해 할당을 사용한 컴포넌트 (전달받은 데이터 객체인 props에서 각 속성에 맞는 변수로 구조 분해 할당)
function ProductCard({name, price, category, inStock}){
     return (
        <div style={{
            border : '2px solid blue',
            padding : '16px',
            margin : '8px',
            borderRadius : '8px',
            backgroundColor : inStock ? 'blueviolet' : 'coral'
        }}>
            <h3>이름 : {name}</h3>
            <p>가격 : {price}원</p>
            <p>카테고리 : {category}</p>
            {/*재고 있다면 '있음' 없다면 '없음'*/}
            <p>재고 : {inStock? '있음':'없음'}</p>
        </div>
     )
}

//5. 기본 props 값을 가진 컴포넌트 (매개변수 위치에 값을 대입하는 형태로 기본값 설정가능)
function Button({text='클릭하세요', color='pink', onClick}){
    return(
        <button style={{
            backgroundColor : color,
            color : 'white',
            padding : '8px 16px',
            border : '2px',
            borderRadius : '4px',
            cursor : 'pointer',
            margin : '4px'
        }}
        onClick={onClick}
        //jsx에서 이벤트명 표기법은 낙타봉 표기법
        >
            {text}
        </button>
    )
}

//6. children을 사용하는 컴포넌트
function Card({children, title}){
    //컴포넌트 호출시 하위 태그를 전달하면 props의 children 속성으로 담기게 된다.
    return(
        <div style={{
            padding : '16px',
            border : '1px solid black',
            borderRadius : '8px',
            margin : '8px',
            boxShadow : '0px 2px 4px rgba(0,0,0,0.9)'
        }}>
            {title && <h3 style={{marginTop : 0}}>{title}</h3>}
            {children}
        </div>
    );
}



//최종적으로 내보낼(export) 컴포넌트
function Step2_Compenents(){

    //버튼 클릭시 이벤트 핸들러 작성
    const btnClick = (message) => {
        alert(message);
    };

    return (
        <div>
            <h1>2단계 : 리액트 컴포넌트 기본</h1>
            <h2>기본 : 컴포넌트들</h2>
            <Welcome></Welcome>
            {/*시작 태그 뒤에 /로 닫는 처리 표현 가능 */}
            <Greeting/>

            <h2>2. Props를 받는 컴포넌트</h2>
            {/*부모(상위) 컴포넌트에서 자식(하위) 컴포넌트에게 데이터를 전달하는 작업*/}
            {/*문자열이 아닌 javascript 값(숫자, 변수, 함수) 등을 넣을땐 {}로 표기해야함 문자열만 "" 처리 */}
            <UserCard name="김사원" age={20} job="학생"></UserCard>
            <UserCard name="박개발" age={25} job="개발자"></UserCard>

            <h2>3. 구조 분해 할당을 이용한 컴포넌트</h2>
            {/*위에서 작성한 ProductCard를 호출할때 데이터 4가지를 넣어 호출하기 */}
            {/*각 전달한 데이터는 자유 속성명은 name, price, category, inStock(논리값) */}
            {/*위 속성명에 맞춰서 데이터를 전달하고 해당 컴포넌트의 알맞은 위치에 값을 뽑아 출력해보기 */}
            <ProductCard name="아이폰17" 
                         price={1300000} 
                         category="핸드폰" 
                         inStock={true}>
            </ProductCard>

            <ProductCard name="아이스아메리카노" 
                         price={3500} 
                         category="음료" 
                         inStock={false}>
            </ProductCard>

            <h2>4. 기본값이 있는 버튼 컴포넌트</h2>
            <Button/>
            <Button text="빨간버튼" 
                    color="red" 
                    onClick={()=>btnClick("빨간 버튼이 클릭되었습니다.")}/>
                    <Button text="초록버튼" 
                    color="green" 
                    onClick={()=>btnClick("초록 버튼이 클릭되었습니다.")}/>

            <h2>5. children을 사용하는 Card 컴포넌트</h2>
            <Card title="일반 카드">
                <p>이것은 카드 안에 있는 p태그입니다.</p>
                <p>children prop을 통해 전달되었습니다.</p>
            </Card>
            <Card title="버튼이 들어있는 카드">
                <p>카드 컴포넌트 안에 다른 컴포넌트들도 추가 가능하다.</p>
                <Button text="카드 안에 버튼" onClick={()=>btnClick('카드 안에 있는 버튼 클릭됨!')}></Button>
            </Card>

            <br/>

            <div style={{backgroundColor : 'beige', padding : '16px', borderRadius:'8px'}}>
                <h3>컴포넌트 정리</h3>
                <ul>
                    <li>컴포넌트는 재사용 가능한 UI조각이다.</li>
                    <li>Props를 통해 부모에서 자식으로 데이터를 전달할 수 있다.</li>
                    <li>구조분해할당으로 Props를 더 쉽게 사용 가능하다.</li>
                    <li>기본값을 설정하여 Props가 없어도 동작하게 할 수 있다.</li>
                    <li>children을 사용하면 컴포넌트 사이에 내용을 넣을 수 있다.</li>
                </ul>
            </div>
        </div>
    )

}

export default Step2_Compenents;