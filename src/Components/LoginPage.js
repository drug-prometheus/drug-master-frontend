import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f0f0f0;
    min-height: 100vh;
    position: relative;
    padding: 20px;
`;

const FormContainer = styled.form`
    background-color: #ffffff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    width: 400px;
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
    border: 1px solid #ddd;
    outline: none;
`;

const Button = styled.button`
    padding: 10px;
    font-size: 20px;
    background-color: #8365e6;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;

    &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }
`;

const HomeButton = styled.img`
    width: 50px;
    height: 50px;
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
`;

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const isFormValid = () => {
        return email && password;
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            // 로그인 처리 로직 추가
            alert('로그인 성공!');
        } else {
            alert('이메일과 비밀번호를 입력해주세요.');
        }
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
            <FormContainer onSubmit={handleLogin}>
                <FormTitle>로그인</FormTitle>
                <Input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit" disabled={!isFormValid()}>
                    로그인
                </Button>
            </FormContainer>
        </MainContainer>
    );
};

export default LoginPage;
