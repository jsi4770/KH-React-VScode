import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import boardApi from "../../api/boardApi";
import styles from "./BoardListPage.module.css"; 

function HomePage() {
    //게시글 조회수 TOP5 목록 출력하기
    //기존에 작성한 BoardListPage를 참고하여 해보시오
    //클릭이벤트(상세보기)도 넣어주기
    //axios는 boardApi에 정의하고 진행하거나 해당위치에 바로 작성하여도 됨
    const navigate = useNavigate();
    const [topBoards, setTopBoards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // 1. 데이터 호출 로직
    useEffect(() => {
        const fetchTopBoards = async () => {
            try {
                // boardApi에 getTopList가 정의되어 있어야 합니다.
                const data = await boardApi.getTopList();
                // 서버 응답이 배열인지 확인 후 설정
                setTopBoards(Array.isArray(data) ? data : (data.list || [])); 
            } catch (error) {
                console.error("TOP 5 조회 실패:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTopBoards();
    }, []);

    // 2. 상세 페이지 이동 핸들러
    const handleBoardClick = (boardNo) => {
        navigate(`/board/${boardNo}`);
    };

    return (
        <div className="container">
            <div className={styles.wrapper}>
                <h2 className={styles.title}>인기 게시글 (TOP 5)</h2>
                
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>순위</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>조회수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr><td colSpan="4" className={styles.loading}>로딩 중...</td></tr>
                        ) : topBoards.length > 0 ? (
                            topBoards.map((board, index) => (
                                <tr 
                                    key={board.boardNo || index} 
                                    onClick={() => handleBoardClick(board.boardNo)}
                                    className={styles.row}
                                >
                                    <td>{index + 1}</td>
                                    <td className={styles.boardTitle}>{board.boardTitle}</td>
                                    <td>{board.boardWriter}</td>
                                    <td>{board.count}</td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="4" className={styles.empty}>조회된 인기 게시글이 없습니다.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default HomePage;