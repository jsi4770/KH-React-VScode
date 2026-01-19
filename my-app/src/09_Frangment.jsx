import React from 'react';
//Fragment 예저 - 불필요한 html 태그를 추가하지 않고 여러 요소를 묶어 반환하기

//화살표 함수로 컴포넌트 정의
const FragmentExample = () => {

    const BadExample = () => {
        return (
            <div>
                <h3>불필요한 div가 추가된다.</h3>
                <p>만약 해당 BadExample 컴포넌트가 위치하는 곳이 div가 들어가선 안되는 곳이라면 형식오류 발생 가능</p>
            </div>
        )
    };
    //올바른 방법1 : React.Fragment를 사용하여 불필요한 태그 줄이기
    const GoodExample = () => {
        return (
            <React.Fragment>
                <h3>올바른 방법1 (React.Fragment)</h3>
                <p>Fragment를 사용하면 불필요한 DOM 요소가 생성되지 않는다. (형식유지 가능)</p>
            </React.Fragment>
        )
    }

    //방법 2 : 단축 문법 <> 사용 (보편적인 방법)
    const GoodExample2 = () => {
        return (
            <>
                <h3>올바른 방법2 (&lt;&gt; &lt;/&gt;)</h3>
                <p>빈 태그 &lt;&gt; &lt;/&gt;를 사용하는것이 가장 간단하고 보편적인 방법이다.</p>
            </>
        )
    }

    //Fragment에 key가 필요한 경우 (Fragment를 map에 사용해야하는 경우)
    const items = [
        {id:1, title:'첫번째', desc : '첫번째 설명'},
        {id:2, title:'두번째', desc : '두번째 설명'},
        {id:3, title:'세번째', desc : '세번째 설명'}
    ];

    const ListWithFragment = () => {
        return (
            <>
                <h3>Fragment와 key 사용 예제</h3>
                {
                    items.map(item => 
                    (
                        //만약 해당 fragment에 key속성을 추가하려면 React.Fragment를 명시해야한다. <>만으로는 불가능
                        <React.Fragment key={item.id}>
                            <h4>{item.title}</h4>
                            <p>{item.desc}</p>
                            <hr/>
                        </React.Fragment>
                    ))
                }

            </>
        )
    }


    return (
        <div>
            <h1>Fragment 예제</h1>
            <div style={{border : '1px solid red', margin : '10px 0', padding : '15px'}}>
                <BadExample></BadExample>
            </div>
            <div style={{border : '1px solid blue', margin : '10px 0', padding : '15px'}}>
                <GoodExample></GoodExample>
            </div>
            <div style={{border : '1px solid green', margin : '10px 0', padding : '15px'}}>
                <GoodExample2></GoodExample2>
            </div>
            <div style={{border : '1px solid gold', margin : '10px 0', padding : '15px'}}>
                <ListWithFragment></ListWithFragment>
            </div>
            <div style={{border : '1px solid purple', margin : '10px 0', padding : '15px'}}>
                <h3>Fragment 정리</h3>
                <ul>
                    <li>Fragment는 불필요한 DOM 요소 생성없이 여러 요소를 그룹화 하는 도구</li>
                    <li>&lt; React.Fragment &gt; : 명시적 Fragment 사용</li>
                    <li>&lt;&gt; &lt;/&gt; : 단축 문법(보편적 사용)</li>
                    <li>Fragment를 map을 이용하여 반복해야할 경우 React.Fragment를 명시적으로 입력 후 key 추가</li>
                </ul>
            </div>
        </div>
    )

}
export default FragmentExample;