import { useEffect, useState } from "react";

//Hooks : useState, useEffect 등 리액트에서 상태값과 관련하여 처리하거나, 컴포넌트의 생명주기를 관리하는 기능
function Step5_Hooks(){
    const [seconds, setSeconds] = useState(0); //초 정보를 담을 상태값
    const [isRunning, setIsRunning] = useState(false); //실행중인지 판별할 논리 상태값
    //상태값, 상태관리함수에서 상태관리 함수에 함수를 전달하면 해당 인자값에는 현재 상태값이 전달된다.
    /* 기존 함수 형태
        setSeconds(function(seconds){
            return seconds+1;
        })
    */

    //useEffect를 활용하여 타이머 기능 구현해보기
    //useEffect : 컴포넌트의 생명주기를 관리하는 클래스형 메소드들을 하나로 통합한 도구
    //useEffect의 패턴 3가지
    //1. 마운트 시 1번만 실행 - useEffect(()=>{},[]); 빈 배열 
    //2. 특정값이 바뀔때마다 실행 - useEffect(()=>{},[value]) - 해당값(value)이 변경되면 수행
    //3. 매 랜더링 마다 실행 - useEffect(()=>{});

    //타이머를 1초 단위로 동작시킬 수 있는 useEffect 구문 설정
    useEffect(()=> {
        let interval = null; //타이머 인터벌 함수 null로 준비

        if(isRunning){ //타이머가 실행중이라면 (버튼이 눌려서 isRunning값이 true 전환되었을때)
            interval = setInterval(()=>{
                setSeconds(seconds=>seconds+1); //이전 상태값을 받아서 +1 시키기
            },1000);
        }else if(!isRunning&&seconds !== 0){ //동작중이 아니고 seconds의 값이 0이 아닌 경우
            clearInterval(interval); //기존에 만들어준 인터벌 함수 삭제 함수
        }

        //선택사항(언마운트시 사용하고자 하는 구문이 있다면 처리)
        return()=> clearInterval(interval); //언마운트시에 기존 인터벌 함수 삭제
    },[isRunning, seconds]); //해당값들이 변경될때마다 useEffect 구문 수행시키기

    //컴포넌트가 마운트 되었을때 실행되는 함수
    //마운트는 해당 컴포넌트가 화면에 추가되어 처음 나타나는것을 의미한다.
    useEffect(()=>{
        console.log("Hooks 컴포넌트가 마운트 되었습니다.");

        //언마운트 되었을때 처리
        return()=>{
            console.log("Hooks 컴포넌트가 언마운트 되었습니다.");
        }
    },[]); //두번째 인자값이 []빈배열이면 마운트 되었을때 실행


    const styles = {
        container : {padding : '20px', maxWidth : '600px', margin : '0px auto'},
        section : {marginBottom : '30px', padding : '20px', border : '1px solid black', borderRadius : '8px'},
        button : {padding : '10px 20px', margin : '5px', backgroundColor : 'beige', color : 'red', border : 'none', cursor : 'pointer'},
        stopButton : {padding : '10px 20px', margin : '5px', backgroundColor : 'red', color : 'white', border : 'none', cursor : 'pointer'},
        timer : {fontSize : '36px', fontWeight : 'bold', textAlign : 'center', margin : '20px 0', color : 'hotpink'}
    };


    return(
        <div style={styles.container}>
            <h1>React Hooks</h1>
            <p>Hooks는 함수형 컴포넌트에서 상태와 생명주기를 사용할수 있게 해주는 도구이다.</p>

            <div style={styles.section}>
                <h2>타이머 (useEffect활용하기)</h2>
                <div style={styles.timer}>{seconds}초</div>
                {/*동작 버튼*/}
                <button style={isRunning? styles.stopButton:styles.button}
                        onClick={()=>setIsRunning(!isRunning)}>
                    {isRunning? '정지':'시작'}
                </button>

                {/*초기화 버튼*/}
                <button style={styles.button}
                        onClick={()=>{
                            setSeconds(0);
                            setIsRunning(false);
                            
                        }}>
                    리셋
                </button>

            </div>


        </div>
    )


}
export default Step5_Hooks;