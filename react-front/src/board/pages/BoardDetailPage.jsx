import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCallback, useEffect, useState } from "react";
import boardApi from "../../api/boardApi"
import Button from "../../components/commons/ui/Button";
import replyApi from "../../api/replyApi";
import styles from "./BoardDetailPage.module.css";
import Textarea from "../../components/commons/ui/Textarea";


function BoardDetailPage(){

    //전달값 받아오기(게시글번호)
    const {boardNo} = useParams();
    const navigate = useNavigate();
    const {user, isAuthenticated} = useAuth();

    //게시글 정보, 댓글 정보 등
    const [board, setBoard] = useState(null);
    const [replies, setReplies] = useState([]);
    const [replyContent, setReplyContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    //게시글 상세 조회
    useEffect(()=>{

        const fetchBoard = async()=> {
            try{
            const data = await boardApi.getDetail(boardNo);
            setBoard(data);
            }
        catch(error){
            console.error('게시글 조회 실패', error);
            alert('게시글을 조회할 수 없습니다.');
            navigate('/board');
        }finally{
            setIsLoading(false);
        }}
        fetchBoard();
    }, [boardNo, navigate]);

    
    //받아온 게시글 정보는 알맞는 위치에 출력하기


    //댓글 목록 조회 (replyApi.js 만들어서 댓글 목록 조회해와 만들어둔 replies에 상태 처리하고 목록 뽑아보기)
    const fetchReplies = useCallback(async()=> {
        try{
            const data = await replyApi.getList(boardNo);

            console.log(data);

            setReplies(data);

        }catch(error){

            console.error('댓글 조회 실패', error);

        }

    }, [boardNo]); //다른 게시글 정보로 처리될때 재생성

    useEffect(()=> {
        fetchReplies();
    }, [fetchReplies]); //해당 호출함수가 갱신될때마다 (boardNo 변결되어 다른 게시글 조회시)

    //게시글 수정

    


    //게시글 삭제
    

    //댓글 등록
    const handleReplySubmit = async () => {
        if (!replyContent.trim()) {
            alert("댓글 내용을 입력해주세요.");
            return;
        }

        try {
            // replyApi에 insert(등록) 요청을 보냅니다.
            await replyApi.insert({
                boardNo: boardNo,
                replyContent: replyContent,
                // 작성자 정보 등 추가 데이터
            });

            setReplyContent(""); // 입력창 초기화
            fetchReplies();      // 댓글 목록 새로고침
        } catch (error) {
            console.error("댓글 등록 실패", error);
        }
    };


    //목록으로
    const handleGoList=()=>{
        navigate("/board");
    }
    if(isLoading){
        return(
            <div className="container">
                <div className={styles.wrapper}>
                    <div className={styles.loading}>
                        로딩중...
                    </div>
                </div>

            </div>
        )
    }

    //작성자 확인
    const isAuthor = user ?.userId===board.boardWriter;

    return (
        <div className="container">
            <div className={styles.wrapper}>
                <h2 className={styles.title}>게시글 상세보기</h2>
                
                <div className={styles.action}>
                    <Button variant="secondary" onClick={handleGoList}>
                        목록으로
                    </Button>
                </div>
                <br/>

                <table className={styles.table}>
                    <tbody>
                        <tr>
                            <th>제목</th>
                            <td colSpan='3'>{board.boardTitle}</td>
                        </tr>
                        <tr>
                            <th>작성자</th>
                            <td>{board.boardWriter}</td>
                            <th>작성일</th>
                            <td>{board.createDate}</td>
                        </tr>
                        <tr>
                            <th>첨부파일</th>
                            <td colSpan='3'>
                                {/*있으면 a태그, 없으면 첨부파일이 없습니다. */}
                                {
                                    board.originName ? (
                                        <a href={board.changeName} className={styles.fileLink}>{board.originName}</a>
                                    ) : (
                                        '첨부파일이 없습니다.'
                                    )
                                }

                            </td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td colSpan='3'></td>
                        </tr>
                        <tr>
                            <td colSpan='4' className={styles.content}>

                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* 수정, 삭제 버튼 */}
                {
                    isAuthor && (
                        <div className={styles.authorActions}>
                            <Button variant="primary" onClick={handleEdit}>
                                수정하기
                            </Button>
                            <Button variant="danger" onClick={handleDelete}>
                                삭제하기
                            </Button>
                        </div>
                    )
                }

                {/*댓글 영역 */}
                <div className={styles.repleSection}>
                    <div className={styles.commentInputContainer}>
                        <div className={styles.replyWrapper}>
                            {isAuthenticated ? (
                                <Textarea
                                    value={replyContent}
                                    onChange={(e) => setReplyContent(e.target.value)}
                                    placeholder="따뜻한 댓글을 남겨주세요."
                                    fullWidth // 가로 너비 100% 확보
                                />
                            ) : (
                                <Textarea
                                    placeholder="로그인 후 이용 가능합니다."
                                    readOnly
                                    fullWidth
                                />
                            )}
                        </div>
                        
                        <Button 
                            variant="secondary" 
                            className={styles.submitButton}
                            onClick={() => {
                                
                                handleReplySubmit(replyContent); // 작성한 내용 전달
                                setReplyContent(''); // 제출 후 초기화
                            }} 
                            disabled={!isAuthenticated || !replyContent.trim()}
                        >
                            등록하기
                        </Button>
                    </div>

                    <div className={styles.replyContent}>
                        댓글 (<span></span>) 개
                    </div>

                    <div className={styles.replyList}>
                        {/* 1. length 오타 수정 및 데이터 존재 여부 확인 */}
                        {replies && replies.length === 0 ? (
                            <p className={styles.noReply}>
                                등록된 댓글이 없습니다.
                            </p>
                        ) : (
                            /* 2. map 함수를 사용하여 댓글 배열을 순회합니다. */
                            replies && replies.map((reply) => (
                                /* 3. key 속성에는 반드시 고유한 값(예: replyNo)을 넣어야 에러가 나지 않습니다. */
                                <div key={reply.replyNo} className={styles.replyItem}>
                                    <span className={styles.replyWriter}>{reply.replyWriter}</span>
                                    <span className={styles.replyContent}>{reply.replyContent}</span>
                                    <span className={styles.replyDate}>{reply.replyDate}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default BoardDetailPage;