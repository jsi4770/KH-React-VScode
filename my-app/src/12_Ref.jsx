

//React Ref 사용법 - DOM 요소에 직접 접근하기
//useRef 훅을 이용하여 DOM 조작이나 값 저장
//실시간 상태관리가 필요없는 요소 접근시 이용 (ex) input file 데이터

import { useRef, useState } from "react";

const RefComponent = () => {
    //1. DOM 요소 참조를 위한 ref
    const inputRef = useRef(null); //input 요소를 참조할 ref생성, 초기값은 null

    //2. input file에서 파일 데이터 접근 및 해당 이미지 미리보기 처리
    const inputFile = useRef(null);
    //미리보기 데이터 넣을 상태
    const [preview,setPreview] = useState(null);

    //입력 필드에 포커스 주기
    const focusInput = () => {
      //  console.log(inputRef);
        inputRef.current.focus();
    };
    //입력 필드 초기화 시키기
    const removeInput = () => {
        inputRef.current.value='';
        inputRef.current.focus();
    }


    //입력한 값 받아서 alert으로 출력해보기
    const getValue=()=>{
        let str = inputRef.current.value;

        alert(str);
    }

    //파일 데이터 변경되었을때 해당 파일 정보 읽어서 읽은 파일 정보 임의의 url경로 생성 처리
    const handleFileChange = (e) => { //이벤트 객체 받아와서

        //FileReader 객체를 이용하여 해당 파일정보를 읽고 읽혀진다면 해당 파일의 임의 url을 생성시킨다.
        const file = e.target.files[0];

        if(file){ //파일이 있다면
            const reader = new FileReader();
            
            reader.onload = () => {
                //console.log(reader.result);
                setPreview(reader.result); //미리보기 경로 상태값에 넣어주기

            }

            reader.readAsDataURL(file); //해당 파일을 읽어서 읽힌 파일의 임의 url을 생성
        }
    }

    return (
        <div style={{padding : '20px', maxWidth : '800px'}}>
            <h1>React Ref 사용법</h1>

            {/*1. DOM 요소 직접 조작 */}
            <div style={{marginBottom : '30px', padding : '15px', backgroundColor : 'beige'}}>
                <h3>1. DOM 요소 직접 조작</h3>
                <div style={{marginBottom : '10px'}}>
                    <input type="text"
                           ref={inputRef}
                           placeholder="이곳에 텍스트를 입력하세요"
                           style={{padding : '8px', width : '300px', marginRight : '10px'}}
                    />
                </div>
                <button onClick={focusInput} style={{marginRight : '10px', padding : '5px 10px'}}>
                    포커스 (선택)  
                </button>

                <button onClick={removeInput} style={{marginRight : '10px', padding : '5px 10px'}}>
                    초기화
                </button>

                <button onClick={getValue} style={{marginRight : '10px', padding : '5px 10px'}}>
                    값 가져오기
                </button>

                <div>
                    <input type="file"
                           ref={inputFile}
                           accept = 'image/*'
                           onChange={handleFileChange}
                           style={{display:'none'}} 
                    >

                    </input>

                    <button onClick={()=>inputFile.current.click()}> 
                        이미지선택
                    </button>

                    {/*미리보기 경로 있으면 보여주고 없으면 안보여주기 */}
                    {preview && <img src={preview} width='200' height='200'></img>}
                </div>




            </div>

        </div>
    )

}

export default RefComponent;