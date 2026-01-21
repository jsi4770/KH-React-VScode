import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from './MyPage.module.css';
import Input from "../../components/commons/ui/Input";
import authApi from "../../api/authApi"; // 1. authApi 임포트 누락 추가
import Button from "../../components/commons/ui/Button"; // 2. Button 임포트 누락 추가
import Modal from "../../components/commons/Modal";



function MyPage(){


    const navigate = useNavigate();
    const {user, updateUser,logout} = useAuth();
        const [formData, setFormData] = useState({
            userId : user?.userId ||'',
            userName : user?.userName||'',
            email : user?.email||'',
            age : user?.age||'',
            phone : user?.phone||'',
            address : user?.address ||'',
            gender : user?.gender || 'M',
        });

        const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
        const [isLoading, setIsLoading] = useState(false);
        const[deletePassword, setDeletePassword] = useState('');

        const handleChange = (e) => {
            const {name, value} = e.target;
            setFormData((prev)=> ({
                ...prev,
                [name] : value
            }));
            
        };

        //정보수정
        const handleSubmit = async (e) => {
            e.preventDefault();
            setIsLoading(true);

            try{
                const result = await authApi.updateMember(formData);

                updateUser(result);
                alert('정보가 수정되었습니다.');

            }catch(error){
                alert(error.response?.data?.message || '정보수정에 실패했습니다.');

            }finally{
                setIsLoading(false);
            }
        };

        //회원 탈퇴
        const handleDelete = async () => {
            if(!deletePassword){
                alert('비밀번호를 입력하세요.');
                return;
            }
            try{
                await authApi.deleteMember({
                    userId : user.userId,
                    userPwd : deletePassword
                });
                alert('회원 탈퇴가 완료되었습니다.');
                await logout();

                navigate('/');
            }catch(error){
                alert(error.response?.data?.message||'회원 탈퇴에 실패했습니다.');
            }
        };

        const handleIdCheck = async () => {
            // 마이페이지는 이미 가입된 정보를 수정하는 곳이므로 
            // 보통 아이디 중복체크를 하지 않거나, 아이디 필드가 readOnly입니다.
            // 만약 중복체크가 필요하다면 아래와 같이 작성합니다.
            
            if (!formData.userId) return;

            try {
                const isAvailable = await authApi.checkIdDuplicate(formData.userId);
                if (isAvailable) {
                    console.log("사용 가능한 아이디입니다.");
                } else {
                    alert("이미 사용 중인 아이디입니다.");
                }
            } catch (error) {
                console.error("중복 체크 실패:", error);
            }
        };

    return(
         <div className='container'>
                    <div className={styles.wrapper}>
                        <h2 className={styles.title}>마이페이지</h2>
        
                        <form onSubmit={handleSubmit} className={styles.form}>
                                <Input
                                    label="ID"
                                    type="text"
                                    name="userId"
                                    value={formData.userId}
                                    readOnly
                                    fullWidth
                                />
        
                                <Input
                                    label="Name"
                                    type="text"
                                    name="userName"
                                    value={formData.userName}
                                    onChange={handleChange}
                                    onBlur={handleIdCheck}
                                    palceholder="이름을 입력하세요"
                                    required
                                    fullWidth
                                />
        
                                <Input
                                    label="Email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleIdCheck}
                                    palceholder="이메일을 입력하세요"
        
                                    fullWidth
                                />
        
                                <Input
                                    label="Age"
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    onBlur={handleIdCheck}
                                    palceholder="나이를 입력하세요"
                                    fullWidth
                                />
        
                                <Input
                                    label="Phone"
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    onBlur={handleIdCheck}
                                    palceholder="전화번호를 입력하세요"
                                    fullWidth
                                />
        
                                <Input
                                    label="Address"
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    onBlur={handleIdCheck}
                                    palceholder="주소를 입력하세요"
                                    fullWidth
                                />
        
                                {/*성별 */}
                                <div className={styles.genderField}>
                                    <label className={styles.label}>Gender</label>
                                    <div className={styles.radioGroup}>
                                        <label className={styles.radioLabel}>
                                            <input type="radio"
                                                   name="gender"
                                                   value="M"
                                                   checked={formData.gender === 'M'}
                                                   onChange={handleChange}
                                            />
                                            남자
                                        </label>
        
                                        <label className={styles.radioLabel}>
                                            <input type="radio"
                                                   name="gender"
                                                   value="F"
                                                   checked={formData.gender === 'F'}
                                                   onChange={handleChange}
                                            />
                                            여자
                                        </label>
                                    </div>
                                </div>
        
                                <div className={styles.buttons}>
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        loading={isLoading}
                                    >
                                        수정하기
                                    </Button>
                                    <Button type="button"
                                            variant='danger' 
                                            onClick={()=>setIsDeleteModalOpen(true)}>
                                        회원탈퇴
                                    </Button>
                                </div>
                        </form>
                    </div>

                    {/*회원탈퇴 모달 */}
                    <Modal isOpen={isDeleteModalOpen}
                           onClose={()=>setIsDeleteModalOpen(false)}
                           title="회원탈퇴"
                           size="sm"
                    >
                        <div className={styles.deleteModal}>
                            <p className={styles.deleteWarning}>
                                탈퇴 후 복구가 불가능 합니다. <br></br>
                                정말로 탈퇴하시겠습니다?
                            </p>

                            <input
                                label="Password"
                                type="password"
                                value={deletePassword}
                                onChange={(e)=>setDeletePassword(e.target.value)}
                                placeholder="비밀번호를 입력하세요"
                                
                            />

                            <Button variant="danger" fullWidth onClick={handleDelete}>
                                탈퇴하기
                            </Button>
                        </div>
                    </Modal>
                </div>
    );
}
export default MyPage;