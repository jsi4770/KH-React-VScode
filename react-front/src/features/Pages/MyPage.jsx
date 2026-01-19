import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from './MyPage.module.css';


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
                alert(error.response?.data?.mesage || '정보수정에 실패했습니다.');

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
                                value={deletePasssword}
                                onChange={(e)=>setDeletePassword(e.target.value)}
                                placeholder="비밀번호를 입력하세요"
                                fullWidth
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