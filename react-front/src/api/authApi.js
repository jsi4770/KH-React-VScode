

//인증 관련 API
import api from "./axios";

export const authApi = {
    //로그인
    login : async (credentials) => {
        const response = await api.post('/member/login', credentials);
        return response.data;
    },
    //로그아웃
    logout : async () => {
        const response = await api.post('/member/logout');
        return response.data;
    },
    //회원가입

    //회원가입도 처리하기 성공시 201번 상태값과 함께 회원가입이 완료되었습니다. 메시지 응답
    //실패시 500번 상태값과 함께 회원가입에 실패했습니다. 메시지 응답
    //요청 주소 : /member/register

    register : async (submitData) => {
        const response = await api.post('/member/register', submitData);
        return response.data;
    },

    //아이디 중복체크
    checkIdDuplicate : async (userId)=> {
        //아이디 중복 체크 처리하기
        //아아디 중복인지 확인하여 사용가능하면 성공 상태와 함께 NNNNY
        //사용 불가능하면 NNNNN 반환해보기
        //요청경로는 /member/checkId/아이디

        const response = await api.get(`/member/checkId/${userId}`); 
        return response.data;
    },

    //회원정보 수정
    // /member/update - put 매핑으로 하기
    updateMember : async (formData)=> {
        const response = await api.put('/member/update', formData);
        return response.data;
    },

    //회원 탈퇴
    // /member/delete -delete매핑으로 하기
    deleteMember : async (user) => {
        const response = await api.delete('/member/delete', {

            //delete 요청시 식별자만 전달하고자 할땐 PathVariable 형태로 처리
            //delete 요청시 여러 데이터 보낼땐 param에 담아 보내기
            //간단하게 하고자 한다면 post 요청으로 객체 보내기
            params : {
                userId : user.userId,
                userPwd : user.userPwd
            }
        });
        return response.data;
    }

};

export default authApi;