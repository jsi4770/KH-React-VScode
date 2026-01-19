// AxiosPractice.jsx - 실습 문제 (확장판)
import axios from "axios";
import { useState } from "react";

const AxiosPractice = () => {
    // 상태 관리
    const [posts, setPosts] = useState([]); //포스트 목록
    const [selectedPost, setSelectedPost] = useState(null); //선택된 포스트
    const [loading, setLoading] = useState(false);//로딩정보
    
    // 입력 폼 상태
    const [formData, setFormData] = useState({
        title: '',
        body: ''
    });

    // 기본 URL 설정
    const BASE_URL = "https://jsonplaceholder.typicode.com";

    // ========== GET: 전체 게시글 조회 ==========
    const fetchPosts = async () => {
        //로딩처리
        setLoading(true);

        try {
            //  axios를 사용하여 GET 요청을 보내세요
            // 요청 URL: `${BASE_URL}/posts`
            const response = await axios.get(`${BASE_URL}/posts`);
            
            
            //  응답 데이터에서 처음 10개만 posts 상태에 저장하세요
            // Hint: response 객체에서 데이터를 추출하고 slice 메소드 사용
            /* __________________ */;
            setPosts(response.data.slice(0,10));
            
            
        } catch (error) {
            console.error("조회 실패:", error);
            //  조회 실패 시 "게시글 조회에 실패했습니다." 메시지를 alert으로 표시하세요
            /* __________________ */;
            alert("게시글 조회에 실패하였습니다.")
        } finally{
            //로딩 끝 처리
            setLoading(false);
        }
    };

    // ========== GET: 특정 게시글 조회 ==========
    const fetchPostById = async (id) => {
        try {
            //  axios를 사용하여 특정 id의 게시글을 조회하세요
            // 요청 URL: `${BASE_URL}/posts/${id}`
            const response = await axios.get(`${BASE_URL}/posts/${id}`);
            //  응답 데이터를 selectedPost 상태에 저장하세요
            /* __________________ ; */
            setSelectedPost (response.data);
            alert(`상세 정보 로드 완료 : ${response.data.title}`);
           
        } catch (error) {
            console.error("상세 조회 실패:", error);
        }
    };

    // ========== POST: 게시글 작성 ==========
    const createPost = async () => {
        //  formData.title 또는 formData.body가 비어있는지 확인하고,
        // 비어있다면 "제목과 내용을 입력하세요." 메시지를 alert으로 표시 후 함수 종료
        if(!formData.title || !formData.body){
            alert("제목과 내용을 입력하세요");
            return;
        }
        /* __________________ */

        try {
            //  axios를 사용하여 POST 요청을 보내세요
            // 요청 URL: `${BASE_URL}/posts`
            // 전송할 데이터: { title: formData.title, body: formData.body, userId: 1 }
            const response = await axios.post(`${BASE_URL}/posts`, {
                title : formData.title,
                body : formData.body,
                userId : 1
            });
            
            
            //  작성 완료 메시지를 alert으로 표시하세요
            // 표시 내용: `게시글 작성 완료! (ID: ${response.data.id})`
            // Hint: 템플릿 리터럴 사용
            /* __________________ */;
            alert(`게시글 작성 완료! (ID : ${response.data.id} )`);
            
            //  폼 데이터를 초기화하세요 (title과 body를 빈 문자열로)
            /* __________________ */;
            setFormData({title : '', body : ''});
            
            // T 새로 작성된 게시글을 posts 배열의 맨 앞에 추가하세요
            // Hint: 스프레드 연산자 사용
            /* __________________ */;
            setPosts([response.data, ...posts]); 
            
        } catch (error) {
            console.error("작성 실패:", error);
        }
    };

    // ========== PUT: 게시글 전체 수정 ==========
    const updatePost = async () => {
        // T selectedPost가 없는 경우 "먼저 게시글을 선택하세요." 메시지를 
        // alert으로 표시 후 함수 종료
        if(!selectedPost){
            alert("먼저 게시글을 선택하세요.");
            return;
        }
        

        try {
            // T axios를 사용하여 PUT 요청을 보내세요
            // 요청 URL: `${BASE_URL}/posts/${selectedPost.id}`
            // 전송할 데이터: { id, title, body, userId } - formData 값이 있으면 사용, 없으면 selectedPost 값 사용
            const response = await axios.put(`${BASE_URL}/posts/${selectedPost.id}`,{
                id : selectedPost.id,
                title : selectedPost.title,
                body : selectedPost.body,
                userId : selectedPost.userId
            });
            
           
            // T "게시글 수정 완료!" 메시지를 alert으로 표시하세요
            alert('게시글 수정 완료!');
            
            
            // T posts 배열에서 수정된 게시글을 업데이트하세요
            // Hint: map 메소드를 사용하여 해당 id의 게시글만 교체
            setPosts(posts.map(p => p.id === selectedPost.id ? response.data : p));
           
            
        } catch (error) {
            console.error("수정 실패:", error);
        }
    };

    // ========== PATCH: 게시글 부분 수정 ==========
    const patchPostTitle = async () => {
        // T selectedPost가 없는 경우 "먼저 게시글을 선택하세요." 메시지를 
        // alert으로 표시 후 함수 종료
        if(!selectedPost){
            alert('먼저 게시글을 선택하세요.');
            return;
        }
       

        try {
            // T axios를 사용하여 PATCH 요청을 보내세요
            // 요청 URL: `${BASE_URL}/posts/${selectedPost.id}`
            // 전송할 데이터: title만 수정 (formData.title이 있으면 사용, 없으면 "수정된 제목")
            const response = await axios.patch(`${BASE_URL}/posts/${selectedPost.id}`, {
                title : formData.title || '수정된 제목'
            });
            
           
            // T "제목 수정 완료!" 메시지를 alert으로 표시하세요
            alert('제목 수정 완료!');
           

            // T posts 배열에서 해당 게시글의 title만 업데이트하세요
            // Hint: map과 스프레드 연산자를 사용하여 title 속성만 변경
            setPosts(posts.map(p => p.id ===selectedPost.id ? {...p, title : response.data.title} : p));
           
            
        } catch (error) {
            console.error("부분 수정 실패:", error);
        }
    };

     // ========== DELETE: 게시글 삭제 ==========
    const deletePost = async (id) => {
        // T window.confirm으로 "정말 삭제하시겠습니까?" 확인창을 표시하고
        // 취소를 누르면 함수를 종료하세요
        // Hint: confirm은 취소 시 false 반환
        /* __________________ */
        if(!window.confirm("정말 삭제하시겠습니까?")) return;

        try {
            // T axios를 사용하여 DELETE 요청을 보내세요
            // 요청 URL: `${BASE_URL}/posts/${id}`
            /* __________________ */;
            await axios.delete(`${BASE_URL}/posts/${id}`);
            
            console.log("삭제 완료");
            // T "게시글 삭제 완료!" 메시지를 alert으로 표시하세요
            /* __________________ */;
            alert('게시글 삭제 완료');
            
            // T posts 배열에서 삭제된 게시글을 제거하세요
            // Hint: filter 메소드 사용
            /* __________________ */;
            setPosts(posts.filter(p => p.id !== id));
            
            // T 선택된 게시글이 삭제된 경우 selectedPost를 null로 초기화하세요
            // Hint: 조건문과 옵셔널 체이닝(?.) 사용
            /* __________________ */;
            if(selectedPost?.id === id) setSelectedPost(null);
            
        } catch (error) {
            console.error("삭제 실패:", error);
        }
    };

    // ========== 입력 핸들러 ==========
    const handleChange = (e) => {
        // T e.target에서 name과 value를 구조분해 할당으로 추출하세요
        const { name, value } = e.target;
        
        // T formData 상태를 업데이트하세요
        // Hint: 스프레드 연산자와 계산된 속성명 사용
        /* __________________ */;
        setFormData({
            ...formData,
            [name] : value
        });
    };

    // ========== 게시글 선택 핸들러 ==========
    const handleSelect = (post) => {
        // T 선택된 게시글을 selectedPost 상태에 저장하세요
        /* __________________ */;
        setSelectedPost(post);
        setFormData({
            // T 선택된 게시글의 title과 body를 formData에 저장하세요
            /* __________________ */
            title : post.title,
            body : post.body
        });
        
    };

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
            <h2>📝 Axios CRUD 실습</h2>
            
            {/* 입력 폼 */}
            <div style={{ marginBottom: "20px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
                <h4>게시글 작성/수정</h4>
                {/* T input에 value와 onChange 속성을 설정하세요
                    - value: formData.title
                    - onChange: handleChange 함수 연결 */}
                <input
                    type="text"
                    name="title"
                    placeholder="제목"
                    value={formData.title}
                    onChange={handleChange}
                    style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                />
                {/* TODO 29: textarea에 value와 onChange 속성을 설정하세요
                    - value: formData.body
                    - onChange: handleChange 함수 연결 */}
                <textarea
                    name="body"
                    placeholder="내용"
                    value={formData.body}
                    onChange={handleChange}
                    style={{ width: "100%", padding: "8px", height: "80px" }}
                />
                <div style={{ marginTop: "10px" }}>
                    {/* T 각 버튼에 onClick 이벤트를 연결하세요 */}
                    <button onClick={createPost} style={btnStyle}>POST (작성)</button>
                    <button onClick={updatePost} style={btnStyle}>PUT (전체수정)</button>
                    <button onClick={patchPostTitle} style={btnStyle}>PATCH (제목만)</button>
                </div>
            </div>

            {/* T 조회 버튼에 onClick 이벤트로 fetchPosts 함수를 연결하세요 */}
            <button onClick={fetchPosts} style={{ ...btnStyle, backgroundColor: "#4CAF50" }}>
                {/* TODO 32: 삼항연산자를 사용하여 loading이 true면 "로딩중...", false면 "GET (목록 조회)" 표시 */}
                {loading ? "로딩중...⏳" : "GET (목록 조회)"}
            </button>

            {/* T 조건부 렌더링 - selectedPost가 있을 때만 아래 div를 표시하세요 */}
            {selectedPost && (
                <div style={{ margin: "15px 0", padding: "10px", backgroundColor: "#e3f2fd", borderRadius: "8px" }}>
                    <strong>선택된 게시글:</strong> [{selectedPost.id}] {selectedPost.title}
                </div>
            )}

            {/* 게시글 목록 */}
            <div style={{ marginTop: "20px" }}>
                <h4>게시글 목록</h4>
                {/* T 조건부 렌더링 - posts.length가 0인지 확인하여 
                    0이면 안내 메시지를, 아니면 목록을 표시하세요 */}
                {posts.length === 0 ? (
                    <p>게시글이 없습니다. "GET (목록 조회)" 버튼을 클릭하세요.</p>
                ) : (
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {posts.map(post => (
                            <li key={post.id} style={listItemStyle}>


                                {/* 포스트 클릭 핸들러 */}
                                <span 
                                    onClick={()=> handleSelect(post)}
                                    style={{ cursor: "pointer", flex: 1 }}
                                >
                                    <strong>[{post.id}]</strong> {post.title.substring(0, 30)}...
                                </span>
                                
                                <button 
                                    onClick={()=> fetchPostById(post.id)}
                                    style={{ ...btnStyle, padding: "4px 8px", fontSize: "12px" }}
                                >
                                    상세
                                </button>

                                <button 
                                    onClick={()=> deletePost(post.id)}
                                    style={{ ...btnStyle, padding: "4px 8px", fontSize: "12px", backgroundColor: "#f44336" }}
                                >
                                    삭제
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

// 스타일
const btnStyle = {
    padding: "8px 16px",
    margin: "5px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#2196F3",
    color: "white",
    cursor: "pointer"
};

const listItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px",
    borderBottom: "1px solid #eee"
};

export default AxiosPractice;