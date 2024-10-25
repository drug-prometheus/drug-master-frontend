import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ButtonGroupContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 10px;
`;

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

const ButtonGroup = ({unloginedEvent, auth})=>{
    const navigate = useNavigate();

    if (auth.userType === '약사'){
      return (
        <ButtonGroupContainer>
          <InfoButton onClick={()=>{
            navigate("/opinion");
          }}>소견 작성</InfoButton>
        </ButtonGroupContainer>
      )
    } else {
      return (
        <ButtonGroupContainer>
          <InfoButton onClick={()=>{
            if (auth.username === null)
              unloginedEvent(navigate);
            else
              navigate("/opinionUser");}}>약사 소견 보기</InfoButton>
         <InfoButton onClick={()=>{
            if (auth.username === null)
              unloginedEvent(navigate);
            else
              navigate("/analysis");}}>약물 분석 확인</InfoButton>
        </ButtonGroupContainer>
      );
    }
  };

  export default ButtonGroup;