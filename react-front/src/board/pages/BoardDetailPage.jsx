import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import boardApi from "../../../api/boardApi"
import Button from "../../components/commons/ui/Button";


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




    if(isLoading){
        return (
            <div className="container">
                <div className={styles.wrapper}>
                    <p className={styles.loading}>
                        로딩중...
                    </p>

                </div>
            </div>
        );
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
                <table className={styles.table}>
                    <tbody>
                        <tr>
                            <th>제목</th>
                            <td colspan='3'></td>
                        </tr>
                        <tr>
                            <th>작성자</th>
                            <td></td>
                            <th>작성일</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th>첨부파일</th>
                            <td colspan='3'>
                                {/*있으면 a태그, 없으면 첨부파일이 없습니다. */}

                            </td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td colspan='3'></td>
                        </tr>
                        <tr>
                            <td colspan='4' className={styles.content}>

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
                    <div className={styles.replyForm}>
                        {
                            isAuthenticated ? (
                                <textarea
                                    //value={}
                                    //onChange={}
                                    placeholder="댓글을 입력하세요"
                                    className={styles.reply}    
                                />
                            ) : (
                                <textarea
                                    placeholder="로그인 후 이용 가능합니다."
                                    className={styles.replyInput}
                                    readOnly
                                />
                            )
                        }
                        <Button variant="secondary" onClicj={} disabled={!isAuthenticated}>
                            등록하기
                        </Button>
                    </div>

                    <div className={styles.replyContent}>
                        댓글 (<span></span>) 개
                    </div>

                    <div className={styles.replyList}>
                        {/* 댓글 0개일때 */}
                        {
                            replies.lengtj === 0 ?(
                                <p className={styles.noReply}>
                                    등록된 댓글이 없습니다.
                                </p>
                            ) : (
                                //댓글 목록
                                <div key={} className={styles.replyItem}>
                                    <span className={styles.replyWriter}></span>
                                    <span className={styles.replyCotent}></span>
                                    <span className={styles.replyDate}></span>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default BoardDetailPage;