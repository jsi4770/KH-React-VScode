import BoardDetailPage from "../board/pages/BoardDetailPage";
import BoardListPage from "../board/pages/BoardListPage";
import MyPage from "../features/Pages/MyPage";
import RegisterPage from "../features/Pages/RegisterPage";
import {Route, Routes} from "react-router-dom";
import HomePage from "../board/pages/HomePage";
import PrivateRouter from "./PrivateRouter";



// AppRouter.jsx 수정
function AppRouter() {
    return ( // 1. return 바로 옆에 소괄호를 시작해야 합니다!
        <Routes>
            {/* 메인 페이지가 비어있다면 홈 이동이 안 될 수 있으니 추가를 권장합니다 */}
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<></>}></Route>
            

            {/* 인증 */}
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/mypage" element={<PrivateRouter>
                                                <MyPage />
                                           </PrivateRouter>} />

            {/* 자유게시판 */}
            <Route path="/board" element={<BoardListPage />} />
            <Route path="/board/:boardNo" element={<BoardDetailPage/>}></Route>
        </Routes>
    ); // 소괄호를 닫아줍니다.
}

export default AppRouter;