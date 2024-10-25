import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { MainContainer, Block } from './MainStyle';
import Header from './Header';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

const LoginMainContainer = styled(MainContainer)`
        align-items: center; /* 중앙 정렬 */
    justify-content: center; /* 수평 중앙 정렬 */
    height: 100vh; /* 전체 화면 높이를 차지 */
`

const LoginBlock = styled(Block)`
    margin: 50px auto;
    width: 50%; /* 블록 너비를 100%로 설정 */
    align-items: center; /* 중앙 정렬 */
    justify-content: center; /* 수평 중앙 정렬 */

`;

const FormContainer = styled.form`
    margin: 50px;
    padding: 30px;
    border-radius: 10px;
    width: 400px;
    display: flex;
        align-items: center; /* 중앙 정렬 */
    justify-content: center; /* 수평 중앙 정렬 */
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
    background-color: #4A90E2; // 메인 페이지 버튼 색상
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;

    &:disabled {
        background-color: #FFFCF5; // 비활성화 상태 색상
        color: #000000;
        cursor: not-allowed;
    }
    &:hover {
        
        transform: translateY(-2px); /* 호버 시 약간의 상승 효과 */
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
        // if (isFormValid()) {
            // axios.post('/login', {
            //     username: email,
            //     password: password
            // });
            let type = '';

            if (email.charAt(0) == 'p'){
                type = '환자';
            } else {    
                type = '약사';
            }
            login('박'+type, type);
            // alert(type + ' 로그인 성공!');
            navigate('/');
        // } else {
        //     alert('이메일과 비밀번호를 입력해주세요.');
        // }
    };

    return (
        <LoginMainContainer>
            <Header/>
            <LoginBlock>
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
            </LoginBlock>
        </LoginMainContainer>
    );
};

export default LoginPage;
