

//인증 관련 API
import api from "./axios";

export const authApi = {
    //로그인
    login : async (credentials) => {
        const response = await api.post('/', credentials);
        return response.data;
    },
    //로그아웃
    logout : async () => {
        const response = await api.post('/member/logout');
        return response.data;
    }
    //회원가입

    //아이디 중복체크

    //회원정보 수정

    //회원 탈퇴
};

export default authApi;