import MyPage from "../features/Pages/MyPage";
import RegisterPage from "../features/Pages/RegisterPage";
import {Route, Routes} from "react-router-dom";



function AppRouter(){
    return
    <Routes>
        {/*메인*/}

        {/*인증*/}
        <Route path="/register" element={<RegisterPage/>}></Route>
        <Route path="/mypage" element={<MyPage/>}/>

    </Routes>

}

export default AppRouter;