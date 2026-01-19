function Step1_JSX(){
    //JSX에서 javascript 변수 사용하기
    const name = '리액트';
    const age = 10;
    const isT = true;

    //JSX에서 배열
    const fruits = ['수박','메론','참외'];

    //JSX에서 객체 사용 (스타일용 객체)
    const titleStyle={
        color:'blue',
        fontSize : '20px',
        fontWeight : 'bold'
    };

    //컴포넌트를 호출했을때 랜더링될 요소 반환 구문

    return (
        <div>
            <h1 style={titleStyle}>1단계 : JSX 기본 문법</h1>

            {/* JSX형식 주석은 이와같이 표현 (ctrl+/) */}
            <p>안녕하세요! {name} 입니다.</p>
            <p>{name}의 나이는 {age}살 입니다.</p>
            <p>{name}는 {isT ? '남자입니다.':'여자입니다.'}</p>

            <h2>JSX에서 HTML 속성 사용하기</h2>
            {/* className : 기존 속성 class*/}
            <div className="highlight">
                <p>JSX에선 class 대신 className을 사용한다.</p>
            </div>
            {/*인라인 스타일 사용*/}
            <p style={{color:'red', backgroundColor : 'lightblue'}}>
                인라인 스타일은 객체 형태로 작성해야 한다.
            </p>
            <h2>JSX에서 배열 랜더링</h2>
            <ul>
                {/*리스트에 각 항목을 구별하기 위한 식별자를 key 속성에 추가한다.*/}
                {/*각 요소를 리엑트에서 구분할 수 있도록 하는 식별자이기 때문에 배열 랜더링시 필수요소 */}
                {fruits.map((fruit, index)=> (
                    <li key={index}>{fruit}</li>
                ))}

            </ul>

            <h2>JSX규칙들</h2>
            <ol>
                <li>모든 태그는 닫혀야한다. &lt;bt/&gt; &lt;img&gt;-기존 단일 태그도 닫혀야한다. </li>
                <li>하나의 부모 요소로 감싸야한다. (태그 또는 fragment &lt;&gt; 사용가능)</li>
                <li>JavaScript 표현식은 {} 중괄호안에 작성한다.</li>
                <li>class 대신 className 속성명을 사용한다.</li>
            </ol>

            {/*조선부 랜더링 */}
            <h2>조건부 랜더링</h2>
            {isT && <p>리액트를 배워보자.</p>}
            {
                age >= 20 ?
                (<p>성인입니다.</p>)
                :
                (<p>미성년입니다.</p>)
            }

            {/*단일태그도 /로 닫아줘야한다. */}
            <hr/>
        </div>

    )


}

//외부 컴포넌트에서 import하기 위해 export하기
export default Step1_JSX;
