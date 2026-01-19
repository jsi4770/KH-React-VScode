/*

    React 성능 최적화를 위한 도구들
    -불필요한 리랜더링을 방지하여 성능 향상
    -복잡한 계산을 캐싱하여 빠른 응답
    -메모리 효율적인 코드 작성

    -최적화 도구들
    -React.memo : 컴초넌트 메모이제이션
    -useMemo : 값 메모이제이션
    -useCallback : 함수 메모이제이션
    -useRef : 리렌더링 없이 값 저장

*/

import React, { useCallback, useMemo, useState } from "react";

//1. React.memo - 컴포넌트 메모이제이션
//props가 변경되지 않으면 리랜더링 하지 않음 (순수 컴포넌트를 만들 때 사용)

const ChildWithoutMemo = ({name, age})=> {
    console.log("ChildWithoutMemo 렌더링");

    return (
        <div style={{padding : '10px', border : '1px solid blue', margin : '10px'}}>
            <p>이름 : {name}</p>
            <p>나이 : {age}</p>
        </div>
    )
}

//최적화 후 : 전달받은 Props가 같으면 리랜더링 하지 않음
const ChildWithMemo = React.memo(({name, age}) => {
    console.log("ChildWithMemo 랜더링");

    return (
        <div style={{padding : '10px', border : '1px solid blue', margin : '10px'}}>
            <p>이름 : {name}</p>
            <p>나이 : {age}</p>
        </div>
    )
});


const MemoExample = () => {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('김유저');
    const [age, setAge] = useState(25);

    return (
        <div style={{padding : '20px'}}>
            <h2>React.memo 예제</h2>
            <button onClick={()=>setCount(count+1)}>
                카운트 증가 ({count})
            </button>

            <div style={{marginTop : '20px'}}>
                <h3>최적화 전 (항상 리렌더링)</h3>
                <ChildWithoutMemo name={name} age={age}/>

                <h3>최적화 후 (Props 변경시에만 리랜더링)</h3>
                <ChildWithMemo name={name} age={age}/>

                <div style={{marginTop : '20px'}}>
                    <button onClick={()=>setName('김변경')}>이름 변경</button>
                    <button onClick={()=>setAge(30)}>나이 변경</button>
                </div>
            </div>

        </div>
    )
}

//2. useMemo - 값 메모이제이션
/*
    복잡한 계산 결과를 캐싱
    의존성 배열이 변경될 때만 재계산
*/

const UseMemoExample = () => {
    const [count, setCount] = useState(0);
    const [items, setItems] = useState([1,2,3,4,5]);

    //최적화 전 : 매 랜더링마다 계산
    const CalWithoutMemo = () => {
        console.log('최적화 전 계산');
        let result = 0;
        for(let i=0; i<9999999; i++){
            result += i;
        }
        return result;
    }

    //최적화 후 : items가 변경될때만 계산
    const CalWithMemo = useMemo(() => {
        console.log('최적화 후 계산')
        let result = 0;
        for(let i=0; i<9999999; i++){
            result += i;
        }
        return result;
    },[items]); //items가 변경될때만 재계산

    //배열 필터링 적용
    const filteredItems = useMemo(()=>{
        console.log('필터링 실행');

        return items.filter(item => item %2 ===0);
    },[items]);

    return (
        <div style={{padding : '20px'}}>
            <h2>useMemo 예제</h2>
            <button onClick={()=>setCount(count+1)}>
                카운트 증가({count})
            </button>

            <button onClick={()=>setItems([...items, items.length+1])}>
                아이템 추가
            </button>

            <div style={{marginTop : '20px'}}>
                <p>전제 아이템 : {items.join(", ")}</p>
                <p>짝수 아이템 : {filteredItems.join(', ')}</p>

                <p>최적화 전 계산 결과 : {CalWithoutMemo()}</p>
                <p>최적화 후 계산 결과 : {CalWithMemo}</p>
            </div>

        </div>
    )
}

//3. useCallback - 함수 메모이제이션
/*
    함수를 메모이제이션하여 동일한 참조 유지
    자식 컴포넌트에 함수를 props로 전달할 때 필수


    *최적화 전 카운트 버튼 클릭시
    부모 리랜더링되며 handleRemove 새로 생성 (새 참조값 받음)
    때문에 ListItem의 props가 변경됨
    props가 변경되니 React.memo로 처리됐음에도 모든 ListItem 리랜더링 처리됨

    *최적화 후 카운트 버튼 클릭시
    부모 리랜더링 되어도 handleRemove는 동일한 참조를 유지한다. (함수 재생성 안되고 기존 함수 참조)
    때문에 ListItem의 props가 변경되지 않아 ListItem이 리랜더링 되지 않는다.

    **useCallback을 사용할땐 React.memo를 이용하여 감싸주어야 알맞게 리랜더링 처리를 할 수 있음
*/

const ListItem = React.memo(({item,onRemove})=> {
    console.log(`ListItem ${item.id} 랜더링`);
    return(
        <div style={{
             padding : '10px',
             border : '1px solid gray',
             margin : '5px',
             display : 'flex',
             justifyContent : 'space-between'
        }}>
            <span>{item.name}</span>
            <button onClick={()=>onRemove(item.id)}>삭제</button>
        </div>
    )

});

const UseCallbackExample = () => {
    const [items, setItems] = useState([
        {id : 1, name : '아이템1'},
        {id : 2, name : '아이템2'},
        {id : 3, name : '아이템3'},
    ]);
    
    const [count, setCount] = useState(0);

    //최적화 전 : 매 랜더링마다 새 함수 생성
    const handleRemoveWithout = (id) => {
        setItems(items.filter(item => item.id!==id));
    }

    //최적화 후 : 함수를 메모이제이션
    const handleRemoveWith = useCallback((id)=> {
        setItems(prev => prev.filter(item=>item.id !== id));
    },[]); //의존성 없음 (빈 배열시 함수 재생성 되지 않음)

    //아이템 추가
    const handleAdd = useCallback(()=> {
        const newId = items.length > 0? Math.max(...items.map(i=>i.id))+1 : 1;
        setItems(prev=>[...prev,{id : newId, name : `아이템 ${newId}`}]);
    })

    return (
        <div style={{padding : '20px'}}>
            <h2>useCallback 예제</h2>

            <button onClick={()=> setCount(count+1)}>
                카운트 증가 ({count})
            </button>

            <button onClick={handleAdd}>
                아이템 추가
            </button>

            <div style={{marginTop : '20px'}}>
                <h3>최적화 전 리스트</h3>
                {items.map((item)=>(
                    <ListItem key={item.id} item={item} onRemove={handleRemoveWithout}/>
                ))}

                {/* <h3>최적화 후 리스트</h3>
                {items.map(item=>(
                    <ListItem key={item.id} item={item} onRemove={handleRemoveWith}/>
                ))} */}




            </div>
        </div>

    )
}


//4. 게시판 목록 최적화 해보기

//게시글 아이템 컴포넌트 준비 (메모아제이션)
const BoardItem = React.memo(({board, onClick, onLike}) => {
    console.log(`BoardItem ${board.boardNo} 렌더링`);

    return (
        <div style={{
             padding : '15px',
             border : '1px solid gray',
             marginBottom : '10px',
             cursor : 'pointer'
        }}
            onClick={()=>onClick(board.boardNo)}
        >
            <h3>{board.boardTitle}</h3>
            <p>{board.boardWriter} | {board.createDate}</p>
            <button onClick={(e)=>{
                    e.stopPropagation(); //클릭 이벤트 버블링 방지(상위로 전달되는 것 방지)
                    onLike(board.boardNo)
            }}
            >
                💗{board.likes}
            </button>
        </div>
    );
});

const BoardList = () => {
    const [boards, setBoards] = useState([
        {boardNo : 1, boardTitle : '첫번째 게시글', boardWriter : '김유저', createDate : '2025-01-15', likes : 5},
        {boardNo : 2, boardTitle : '두번째 게시글', boardWriter : '이유저', createDate : '2025-01-14', likes : 99},
        {boardNo : 3, boardTitle : '세번째 게시글', boardWriter : '박유저', createDate : '2025-01-13', likes : 12}
    ]);

    const [searchKeyword, setSearchKeyword] = useState('');
    const [count, setCount] = useState(0);

    //검색 결과 메모이제이션
    const filterBoards = useMemo(()=>{
        console.log(`검색 필터링 진행`);
        return boards.filter(board =>
            board.boardTitle.includes(searchKeyword) || board.boardWriter.includes(searchKeyword)
        );
    },[boards, searchKeyword]);

    //게시글 클릭 핸들러 (메모이제이션)
    const handleBoardClick = useCallback((boardNo)=> {
        console.log(`게시글 ${boardNo} 클릭`);
        alert(`게시글 ${boardNo} 클릭`);
    },[]);

    //좋아요 핸들러 (메모이제이션)
    const handleLike = useCallback((boardNo)=>{
        setBoards(prev => prev.map(board=>
            board.boardNo === boardNo ? {...board, likes:board.likes+1} : board
        ));
    },[]);

    return (
        <div style={{padding : '20px', maxWidth:'800px', margin : '0px auto'}}>
            <h2>최적화된 게시판 목록</h2>

            {/*리랜더링 테스트용 카운트 증가버튼 */}
            <button onClick={()=>setCount(count+1)}>카운트 증가 {count}</button>

            {/*검색 */}
            <input type="text"
                   value={searchKeyword}
                   onChange={(e)=> setSearchKeyword(e.target.value)}
                   placeholder="검색어 입력"
                   style={{width : '100%',
                           padding : '10px',
                           marginTop : '10px',
                           marginBottom : '20px'
                   }} />

            {/*게시글 목록 */}
            <div>
                {filterBoards.map(board=> (
                    <BoardItem
                        key={board.boardNo}
                        board={board}
                        onClick={handleBoardClick}
                        onLike={handleLike}    
                    />
                ))}
            </div>
            {/*카운트를 눌러도 게시글이 랜더링되지 않음을 확인하기
               검색어 입력시 필터링 처리 확인 */}

        </div>
    )

}


//4. 게시판 목록 최적화 해보기

//게시글 아이템 컴포넌트 준비 (메모아제이션)
const BoardItemWithOut = ({board, onClick, onLike}) => {
    console.log(`BoardItem ${board.boardNo} 렌더링`);

    return (
        <div style={{
             padding : '15px',
             border : '1px solid gray',
             marginBottom : '10px',
             cursor : 'pointer'
        }}
            onClick={()=>onClick(board.boardNo)}
        >
            <h3>{board.boardTitle}</h3>
            <p>{board.boardWriter} | {board.createDate}</p>
            <button onClick={(e)=>{
                    e.stopPropagation(); //클릭 이벤트 버블링 방지(상위로 전달되는 것 방지)
                    onLike(board.boardNo)
            }}
            >
                💗{board.likes}
            </button>
        </div>
    );
};

const BoardListWithOut = () => {
    const [boards, setBoards] = useState([
        {boardNo : 1, boardTitle : '첫번째 게시글', boardWriter : '김유저', createDate : '2025-01-15', likes : 5},
        {boardNo : 2, boardTitle : '두번째 게시글', boardWriter : '이유저', createDate : '2025-01-14', likes : 99},
        {boardNo : 3, boardTitle : '세번째 게시글', boardWriter : '박유저', createDate : '2025-01-13', likes : 12}
    ]);

    const [searchKeyword, setSearchKeyword] = useState('');
    const [count, setCount] = useState(0);

    //검색 결과 메모이제이션
    const filterBoards = ()=>{
        console.log(`검색 필터링 진행`);
        return boards.filter(board =>
            board.boardTitle.includes(searchKeyword) || board.boardWriter.includes(searchKeyword)
        );
    };

    //게시글 클릭 핸들러 (메모이제이션)
    const handleBoardClick = (boardNo)=> {
        console.log(`게시글 ${boardNo} 클릭`);
        alert(`게시글 ${boardNo} 클릭`);
    };

    //좋아요 핸들러 (메모이제이션)
    const handleLike = (boardNo)=>{
        setBoards(prev => prev.map(board=>
            board.boardNo === boardNo ? {...board, likes:board.likes+1} : board
        ));
    };

    return (
        <div style={{padding : '20px', maxWidth:'800px', margin : '0px auto'}}>
            <h2>최적화된 게시판 목록</h2>

            {/*리랜더링 테스트용 카운트 증가버튼 */}
            <button onClick={()=>setCount(count+1)}>카운트 증가 {count}</button>

            {/*검색 */}
            <input type="text"
                   value={searchKeyword}
                   onChange={(e)=> setSearchKeyword(e.target.value)}
                   placeholder="검색어 입력"
                   style={{width : '100%',
                           padding : '10px',
                           marginTop : '10px',
                           marginBottom : '20px'
                   }} />

            {/*게시글 목록 */}
            <div>
                {filterBoards().map(board=> (
                    <BoardItem
                        key={board.boardNo}
                        board={board}
                        onClick={handleBoardClick}
                        onLike={handleLike}    
                    />
                ))}
            </div>
            {/*카운트를 눌러도 게시글이 랜더링되지 않음을 확인하기
               검색어 입력시 필터링 처리 확인 */}

        </div>
    )

}





export {MemoExample, UseMemoExample, UseCallbackExample, BoardList, BoardListWithOut};