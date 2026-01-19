

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
    const [idCheckResult, setIdCheckResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev)=> ({
            ...prev,
            [name] : value
        }));
        //아이디 상태 변경시 중복체크 결과 초기화
        if(name === 'userId'){
            setIdCheckResult(null);
        }
        
        //해당 필드 에러 초기화
        if(errors[name]){
            setErrors((prev) => ({
                ...prev,
                [name] : '',
            }))
        }

        //아이디 중복 체크
        const handleIdCheck = async () => {
            const {userId} = formData;

            if(userId.length<5){
                setIdCheckResult({
                    valid : false,
                    message : '아이디는 5글자 이상 입력하세요.'
                });
                return;
            }
            try{
                const result = await authApi.checkIdDuplicate(userId);
                if(result === 'NNNNY'){

                }else{

                }
            }
        }
    };

}