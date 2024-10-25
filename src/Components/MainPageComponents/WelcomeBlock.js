import React from 'react';
import styled from 'styled-components';
import { Block } from '../MainStyle';
import { useNavigate } from 'react-router-dom';

const InfoButton = styled.button`
  flex: 1;
  padding: 12px;
  background-color: #FF6F61;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin: 0 10px;
  font-size: 18px;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.2s;
  
  &:hover {
    background-color: #FF4A3D;
    transform: scale(1.05);
  }
`;

const WelcomeContainer = styled(Block)`
  text-align: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 22px;
`;

const WelcomeBlock = ({auth, logout})=>{
    const navigate = useNavigate();
    const loginedPatient = (auth, logout) => {
        return (
        <WelcomeContainer>
                <p><strong>{auth.username}</strong> 님</p>
                <p>환영합니다.</p>
                <InfoButton onClick={logout}>로그아웃</InfoButton>
        </WelcomeContainer>
        );
    };

    const loginedPharmacist = (auth, logout) => {
        return (
        <WelcomeContainer>
                <p><strong>{auth.username}</strong> 약사님</p>
                <p>환영합니다.</p>
                <InfoButton onClick={logout}>로그아웃</InfoButton>
        </WelcomeContainer>
        );
    };

    const unlogined = () => {
        return (
        <WelcomeContainer>
                <p>로그인이 필요합니다. </p>
                <InfoButton onClick={()=>navigate('/login')}>로그인</InfoButton>
        </WelcomeContainer>
        );
    };
    return (
        <div>
            {auth.userType !== '약사' && auth.userType !== '환자' ? 
            (unlogined(navigate)):
            (
            auth.userType === '약사' ?
            loginedPharmacist(auth, logout):
            loginedPatient(auth, logout)
            )}
        </div>
    );
}

export default WelcomeBlock;