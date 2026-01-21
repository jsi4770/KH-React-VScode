import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './RegisterPage.module.css';
import Input from "../../components/commons/ui/Input";
import Button from "../../components/commons/ui/Button";
import authApi from "../../api/authApi";

function RegisterPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userId : '',
        userPwd : '',
        checkPwd : '',
        userName : '',
        email : '',
        age : '',
        phone : '',
        address : '',
        gender : 'M',
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    
    // 1. 중복체크 관련 상태 통합 (객체로 관리하여 JSX와 동기화)
    const [idCheckResult, setIdCheckResult] = useState({
        valid: false,
        message: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev)=> ({ ...prev, [name] : value }));
        
        if(name === 'userId'){
            setIdCheckResult({ valid: false, message: '' });
        }
        
        if(errors[name]){
            setErrors((prev) => ({ ...prev, [name] : '' }));
        }
    };

    // 아이디 중복 체크
    const handleIdCheck = async () => {
    if (!formData.userId) return;

    try {
        const result = await authApi.checkIdDuplicate(formData.userId);
        if (result === "NNNNY") {
            // 객체 형태로 업데이트하여 일관성을 유지합니다.
            setIdCheckResult({ valid: true, message: "사용 가능한 아이디입니다." });
        } else {
            setIdCheckResult({ valid: false, message: "이미 사용 중인 아이디입니다." });
        }
    } catch (error) {
        setIdCheckResult({ valid: false, message: "중복 확인에 실패했습니다." });
    }
};

    // 유효성 검사 로직 수정
    const validate = () => {
        const newErrors = {};

        if(!formData.userId){
            newErrors.userId = '아이디를 입력하세요';
        }else if(formData.userId.length < 5){
            newErrors.userId = '아이디는 5글자 이상이어야 합니다.';
        }

        // 2. 중복체크 여부 검사 수정
        if(!idCheckResult.valid){
            newErrors.userId = '아이디 중복 확인을 해주세요.';
        }

        if(!formData.userPwd){
            newErrors.userPwd = '비밀번호를 입력하세요';
        }

        // 3. 비밀번호 비교 연산자 수정
        if(formData.userPwd !== formData.checkPwd){
            newErrors.checkPwd = '비밀번호가 일치하지 않습니다.';
        }

        if(!formData.userName){
            newErrors.userName = '이름을 입력하세요.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!validate()) return;
        setIsLoading(true);

        try{
            const {checkPwd, ...submitData} = formData;
            await authApi.register(submitData);
            alert('회원가입이 완료되었습니다.');
            navigate('/');
        }catch(error){
            alert(error.response?.data?.message || '회원가입에 실패했습니다.');
        }finally{
            setIsLoading(false);
        }
    };

    

    return (
        <div className='container'>
            <div className={styles.wrapper}>
                <h2 className={styles.title}>회원가입</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.idField}>
                        <Input
                            label="ID"
                            type="text"
                            name="userId"
                            value={formData.userId}
                            onChange={handleChange}
                            onBlur={handleIdCheck} // ID 필드에만 유지
                            placeholder="아이디를 입력하세요"
                            error={errors.userId}
                            required
                            fullWidth
                        />
                        {idCheckResult.message && (
                            <p className={`${styles.idCheckResult} ${idCheckResult.valid ? styles.valid : styles.invalid}`}
                               style={{ color: idCheckResult.valid ? 'green' : 'red', fontSize: '12px' }}>
                                {idCheckResult.message}
                            </p>
                        )}
                        
                        <Input
                            label="Password"
                            type="password"
                            name="userPwd"
                            value={formData.userPwd}
                            onChange={handleChange}
                            placeholder="비밀번호를 입력하세요"
                            error={errors.userPwd}
                            required
                            fullWidth
                        />

                        <Input
                            label="Password Check"
                            type="password"
                            name="checkPwd"
                            value={formData.checkPwd}
                            onChange={handleChange}
                            placeholder="비밀번호를 다시 입력하세요"
                            error={errors.checkPwd}
                            required
                            fullWidth
                        />

                        <Input
                            label="Name"
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            placeholder="이름을 입력하세요"
                            error={errors.userName}
                            required
                            fullWidth
                        />

                        {/* 나머지 필드는 placeholder 오타 수정 및 onBlur 제거 */}
                        <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="이메일을 입력하세요" fullWidth />
                        <Input label="Age" type="number" name="age" value={formData.age} onChange={handleChange} placeholder="나이를 입력하세요" fullWidth />
                        <Input label="Phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="전화번호를 입력하세요" fullWidth />
                        <Input label="Address" type="text" name="address" value={formData.address} onChange={handleChange} placeholder="주소를 입력하세요" fullWidth />

                        <div className={styles.genderField}>
                            <label className={styles.label}>Gender</label>
                            <div className={styles.radioGroup}>
                                <label className={styles.radioLabel}>
                                    <input type="radio" name="gender" value="M" checked={formData.gender === 'M'} onChange={handleChange} /> 남자
                                </label>
                                <label className={styles.radioLabel}>
                                    <input type="radio" name="gender" value="F" checked={formData.gender === 'F'} onChange={handleChange} /> 여자
                                </label>
                            </div>
                        </div>

                        <div className={styles.buttons}>
                            <Button type="submit" variant="primary" loading={isLoading} disabled={!idCheckResult.valid}>
                                회원가입
                            </Button>
                            <Button type="reset" variant='danger' onClick={() => setFormData({userId:'', userPwd:'', checkPwd:'', userName:'', email:'', age:'', phone:'', address:'', gender:'M'})}>
                                초기화
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;