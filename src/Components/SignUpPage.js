import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #FFFCF5;
    min-height: 100vh;
    position: relative;
    padding: 20px;
`;

const FormContainer = styled.form`
    background-color: #FFE6B8;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    width: 500px;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const FormTitle = styled.h2`
    font-size: 35px;
    margin-bottom: 20px;
    text-align: center;
`;

const Input = styled.input`
    padding: 10px;
    font-size: 25px;
    border-radius: 5px;
    background-color: #FFFCF5;
    border: 1px solid #ddd;
    outline: none;
`;

const RadioGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const RadioLabel = styled.label`
    font-size: 20px;
`;

const Button = styled.button`
    padding: 10px;
    font-size: 25px;
    background-color: #8365e6;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;

    &:disabled {
        background-color: #FFFCF5;
        color: #000000;
        cursor: not-allowed;
    }
`;

const HomeButton = styled.img`
    width: 50px;
    height: 50px;
    cursor: pointer;
    filter: opacity(0.5) drop-shadow(0 0 0 #FCAB16);
    position: absolute;
    top: 20px;
    right: 20px;
`;

const SignUpPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isStudent, setIsStudent] = useState(false);
    const [studentId, setStudentId] = useState('');
    const navigate = useNavigate();

    const isFormValid = () => {
        if (!name || !email || !password || !confirmPassword) return false;
        if (password !== confirmPassword) return false;
        if (isStudent && !studentId) return false;
        return true;
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            // 회원가입 처리 로직 추가
            alert('회원가입이 완료되었습니다.');
        } else {
            alert('모든 필수 항목을 입력해주세요.');
        }
    };

    const handleRadioChange = () => {
        setIsStudent(!isStudent);
        setStudentId(''); // 라디오 버튼 해제 시 학번 필드를 초기화
    };

    const goToHome = () => {
        navigate('/');
    };

    return (
        <MainContainer>
            <HomeButton
                src="home.png"
                alt="홈"
                onClick={goToHome}
            />
            <FormContainer onSubmit={handleSignUp}>
                <FormTitle>회원가입</FormTitle>
                <Input
                    type="text"
                    placeholder="이름 *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <Input
                    type="email"
                    placeholder="이메일 *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="비밀번호 *"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="비밀번호 확인 *"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <RadioGroup>
                    <RadioLabel>
                        <Input
                            type="checkbox"
                            checked={isStudent}
                            onChange={handleRadioChange}
                        />
                        학생인가요?
                    </RadioLabel>
                    {isStudent && (
                        <Input
                            type="text"
                            placeholder="학번 *"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            required={isStudent}
                        />
                    )}
                </RadioGroup>
                <Button type="submit" disabled={!isFormValid()}>
                    회원가입
                </Button>
            </FormContainer>
        </MainContainer>
    );
};

export default SignUpPage;
