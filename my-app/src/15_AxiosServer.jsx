import axios from "axios";
import { useEffect, useState } from "react";

const AxiosServer = () => {
    // 1. 상태 선언
    const [list, setList] = useState([]); 
    const [formData, setFormData] = useState({ title: '', content: '', writer: '' }); // writer 추가
    const [member, setMember] = useState(null); // 조회된 사용자 정보를 담을 상태

    // 목록 조회 함수 (fetchBoardList로 명칭 통일)
    const fetchBoardList = async () => {
        try {
            const response = await axios.get('/api/list');
            setList(response.data);
        } catch (err) {
            console.error("데이터 로드 실패", err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // 게시글 등록
    const insertBoard = async () => {
        try {
            const response = await axios.post('/api/insert', {
                boardWriter: formData.writer,
                boardTitle: formData.title,
                boardContent: formData.content
            });

            if (response.data > 0) {
                alert("서버 전송 완료!");
                fetchBoardList(); // 목록 새로고침
                setFormData({ title: '', writer: '', content: '' }); // 폼 초기화
            } else {
                alert('등록 실패');
            }
        } catch (err) {
            console.error("등록 중 오류 발생", err);
        }
    };

    // 사용자 정보 조회 (완성된 부분)
    const selectMember = async () => {
        if (!formData.writer) {
            alert("작성자 란에 아이디를 입력해주세요.");
            return;
        }

        try {
            const response = await axios.get(`/api/selectMember?userId=${formData.writer}`);
            if (response.data) {
                setMember(response.data); // 서버에서 받은 객체를 member 상태에 저장
            } else {
                alert("해당 사용자를 찾을 수 없습니다.");
                setMember(null);
            }
        } catch (err) {
            console.error("사용자 조회 실패", err);
            alert("조회 중 오류가 발생했습니다.");
        }
    };

    useEffect(() => {
        fetchBoardList();
    }, []);

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
            <h2>Axios Server 통신 연습</h2>

            {/* 게시글 작성 폼 */}
            <div style={{ marginBottom: "20px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
                <h4>게시글 작성 / 사용자 조회</h4>
                <input
                    type="text"
                    name="title"
                    placeholder="제목"
                    value={formData.title}
                    onChange={handleChange}
                    style={inputStyle}
                />
                <input
                    type="text"
                    name="writer"
                    placeholder="작성자(조회할 ID)"
                    value={formData.writer}
                    onChange={handleChange}
                    style={inputStyle}
                />
                <textarea
                    name="content"
                    placeholder="내용"
                    value={formData.content}
                    onChange={handleChange}
                    style={{ ...inputStyle, height: "80px" }}
                />
                <div style={{ marginTop: "10px" }}>
                    <button onClick={insertBoard} style={btnStyle}>POST(글 등록)</button>
                    <button onClick={selectMember} style={{ ...btnStyle, backgroundColor: "#4CAF50", marginLeft: "10px" }}>
                        GET(사용자 정보 조회)
                    </button>
                </div>
            </div>

            {/* 사용자 프로필 출력 (member 정보가 있을 때만 렌더링) */}
            {member && (
                <div style={profileCardStyle}>
                    <h4>👤 사용자 프로필</h4>
                    <img src='https://img.freepik.com/premium-vector/cartoon-style-emoji-character-boy-profile-photo-icon-man-portraits-user-photo_750364-564.jpg'
                         style={{witdh : '100px', height : '100px', borderRadius : '50px', objectFit : 'cover'}}/>
                    <p><strong>이름:</strong> {member.userName}</p>
                    <p><strong>이메일:</strong> {member.email}</p>
                    <p><strong>전화번호:</strong> {member.phone}</p>
                    <p><strong>주소:</strong> {member.address}</p>
                    <button onClick={() => setMember(null)} style={{fontSize: '12px'}}>닫기</button>
                </div>
            )}

            {/* 게시글 목록 */}
            <div style={{ marginTop: "20px" }}>
                <h4>게시글 목록</h4>
                {list.length === 0 ? (
                    <p>게시글이 없습니다.</p>
                ) : (
                    <ul style={{ paddingLeft: "20px" }}>
                        {list.map(board => (
                            <li key={board.boardNo} style={{ marginBottom: "5px" }}>
                                <strong>[{board.boardNo}]</strong> {board.boardTitle} (작성자: {board.boardWriter})
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

// 스타일 객체들
const inputStyle = { width: "100%", padding: "8px", marginBottom: "10px", boxSizing: "border-box" };
const btnStyle = { padding: "8px 16px", backgroundColor: "#2196F3", color: "white", border: "none", cursor: "pointer", borderRadius: "4px" };
const profileCardStyle = {
    padding: "15px",
    backgroundColor: "beige",
    border: "2px solid blue",
    borderRadius: "8px",
    marginTop: "20px"
};

export default AxiosServer;