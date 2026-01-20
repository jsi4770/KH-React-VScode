//댓글 관련 api
import api from "./axios";

export const replyApi = {
    getList : async(boardNo) => {
        const response = await api.get('/board/replyList',{
            params:{refBno : boardNo}
            }
        );
        return response.data;
    }

}

export default replyApi;