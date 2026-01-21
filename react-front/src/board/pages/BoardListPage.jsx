import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from './BoardListPage.module.css';
import Pagination from "@/components/commons/ui/pagination";
import Button from "@/components/commons/ui/Button";
import boardApi from "../../api/boardApi";

function BoardListPage(){
    const navigate = useNavigate();
    const [searchParams, setSearchParams ] = useSearchParams();
    const {isAuthenticated} = useAuth();

    const [boards, setBoards] = useState([]);
    const [pageInfo, setPageInfo] = useState({
        currentPage : 1,
        totalPages : 1,
        totalCount : 0
    });

    const [isLoading, setIsLoading] = useState(true);
    const [searchCondition, setSearchCondition] = useState('writer');
    const [searchKeyword, setSearchKeyword] = useState('');

    //URL 파라미터에서 초기값 설정
    useEffect(()=> {
        const page = parseInt(searchParams.get('page')) || 1;
        const condition = searchParams.get('condition') || 'writer';
        const keyword = searchParams.get('keyword') || '';

        setSearchCondition(condition);
        setSearchKeyword(keyword);

        //게시글 목록 조회 함수 수행
        fetchBoards(page, condition, keyword);

    },[searchParams]);

    //게시글 목록 조회
    const fetchBoards = async(page, condition, keyword) => {
        setIsLoading(true);

        try{
            const response = await boardApi.getList({
                page,
                size : 10,
                condition : keyword ? condition : undefined,
                keyword : keyword || undefined
            });

            setBoards(response.list || []); //목록이 조회되었다면 상태값 갱신, 아니라면 빈배열 처리
            setPageInfo({
                currentPage : response?.pi?.currentPage || page,
                totalPages : response?.pi?.maxPage || 1,
                totalCount : response?.pi?.listCount || 0,
            });
        } catch(error) {
            console.error('게시글 목록 조회 실패', error);
        } finally{
            setIsLoading(false);
        }
    };
    
    //페이지 변경
    const handlePageChange = (page) => {
        const params = new URLSearchParams(searchParams); //현재 url 정보를 이용하여 객체 생성 후 수정 처리할수 있도록 준비
        params.set("page", page); //파라미터 세딩 (page=값)
        setSearchParams(params); //useSearchParams를 이용하기 위해 준비
    }

    //검색
    const handleSearch = (e) => {
        e.preventDefault(); //기본 이벤트 막기
        const params = new URLSearchParams(); //searchParams 객체 생성
        params.set('page','1'); //페이지 1 설정
        if(searchKeyword){ //만약 검색어가 있다면
            params.set('condition', searchCondition); //카테고리 세팅
            params.set('keyword', searchKeyword); //검색어 세팅
        }
        setSearchParams(params); //page, condition, keyword가 세팅괸 searchparams객체로 상태변경
    }

    //게시글 클릭(상세보기)
    const handleBoardClick = (boardNo) => {
        //board/detail/3 이런식으로 처리하기
        navigate(`/board/${boardNo}`);
    };

    //글쓰기 (페이지이동)
    const handleWrite =() => {
        navigate('/board/write');

    };

    return(
        <div className='container'>
            <div className={styles.wrapper}>
                <div className={styles.header}> 
                    <h2 className={styles.title}>
                        게시판
                    </h2>
                    {isAuthenticated && (
                        <Button variant="secondary" onClick={handleWrite}>
                            글쓰기
                        </Button>
                    )}
                </div>
                {/*게시글 목록 영역 */}
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.colNo}>글번호</th>
                            <th className={styles.colTitle}>제목</th>
                            <th className={styles.colWriter}>작성자</th>
                            <th className={styles.colCount}>조회수</th>
                            <th className={styles.colDate}>작성일</th>
                            <th className={styles.colFile}>첨부파일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ? (
                                <tr>
                                    <td colSpan='6' className={styles.empty}>
                                        로딩중...
                                    </td>
                                </tr>
                            ) : boards.length === 0 ? (
                                <tr>
                                    <td colSpan='6' className={styles.empty}>
                                        조회된 게시글이 없습니다.
                                    </td>
                                </tr>
                            ) : (
                                boards.map((board) => (
                                    <tr key={board.boardNo}
                                        onClick={()=>handleBoardClick(board.boardNo)}
                                        className={styles.row}
                                    >
                                        <td>{board.boardNo}</td>
                                        <td className={styles.titleCall}>{board.boardTitle}</td>
                                        <td>{board.boardWriter}</td>
                                        <td>{board.count}</td>
                                        <td>{board.createDate}</td>
                                        <td>{board.originName ? '📁' : ''}</td>
                                    </tr>
                                ))
                            )
                        }
                    </tbody>
                </table>

                {/*페이징바 위치 */}
                <Pagination
                    currentPage={pageInfo.currentPage}
                    totalPages={pageInfo.totalPages}
                    onPageChange={handlePageChange}/>

                {/*검색창 위치 */}
                <form onSubmit={handleSearch} className={styles.searchForm}>
                    <select
                        value={searchCondition}
                        onChange={(e) => setSearchCondition(e.target.value)}
                        className={styles.select}
                    >
                            <option value="writer">작성자</option>
                            <option value="title">제목</option>
                            <option value="content">내용</option>
                    </select>
                    <input
                        type="text"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        placeholder="검색어를 입력하세요"
                        className={styles.input}
                    />
                    <Button type="submit" variant="secondary">
                        검색
                    </Button>
                    
                </form>

            </div>

        </div>
    )

}

export default BoardListPage;