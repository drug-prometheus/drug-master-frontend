import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { MainContainer } from './\bGeneralStyle';
import Header from './Header';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

const FormContainer = styled.form`
    margin: 50px;
    background-color: #FFE6B8;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.2);
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
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.2);
    background-color: #FFFCF5;
    outline: none;
`;

const Button = styled.button`
    padding: 10px;
    font-size: 20px;
    font-weight: bold;
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.2);
    background-color: #FCAB16;
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

const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const isFormValid = () => {
        return email && password;
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            axios.post('/login', {
                username: email,
                password: password
            })
            login('정윤성', '약사');
            alert('로그인 성공!');
            navigate('/');
        } else {
            alert('이메일과 비밀번호를 입력해주세요.');
        }
    };

    return (
        <MainContainer>
            <Header/>
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
