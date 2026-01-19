import { useEffect } from "react";

const FetchComponent = () => {
    useEffect(() => {
        // 1. 내부에서 비동기 함수 정의 (async 사용 가능)
        const fetchTest = async () => {
            try {
                const response2 = await fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    },
                    body: JSON.stringify({
                        userID: 10,
                        title: 'Second title',
                        body: '두번째 본문입니다.'
                    })
                });

                const data = await response2.json();
             //   console.log(data);
            } catch (error) {
             //   console.error("데이터 요청 실패:", error.message);
            }
        };

        // 2. 함수 선언 후 호출 (순서 중요)
        fetchTest();

    }, []); // 빈 배열: 컴포넌트 마운트 시 1회 실행

    return null; // 컴포넌트는 JSX를 반환해야 하므로 임시 추가
};

export default FetchComponent;