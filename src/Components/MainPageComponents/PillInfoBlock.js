import React, { useState } from 'react';
import styled from 'styled-components';
import { Block } from '../MainStyle';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DrugInfoBlock = styled(Block)`
  font-size: 18px;
  padding: 25px;
`;

const DrugList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
`;

const DrugItem = styled.li`
  margin-bottom: 10px;
  padding: 10px;
  background-color: #F7F9FC;
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const DrugIcon = styled.div`
  margin-right: 10px;
  font-size: 20px;
`;

const AskPharmacistButton = styled.button`
  background-color: #FF6F61;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s;
  width: 100%;
  &:hover {
    background-color: #FF4A3D;
 
`;

const PillInfoBlock = ({auth, unloginedEvent, drugInfo})=>{
    const navigate = useNavigate();
    const [opinionRequest, setOpinionRequest] = useState(['홍길동', '정윤성']);

    const sendPillInfoToServer = () => {
      axios.post('/add-medicine-info/', {
        patient: auth.username,
        medicine_name: '알약'
      })
      .then(response => {
        console.log(response.data);
        alert("성공적으로 요청 했습니다.\n7~14일 안에 소견을 확인할 수 있습니다.");
      });
    };

    if (auth.userType === '약사'){
      return (
        <Block>
          <h3>요청 소견 보기</h3>
          <p>소견 요청한 환자는 다음과 같습니다 :</p>
          <DrugList>
            {opinionRequest.map((patientName, index) => (
              <DrugItem key={index} onClick={()=>{
                navigate('/opinion?patientName=' + patientName)
              }}>
                <DrugIcon>🤕</DrugIcon>
                {patientName}
              </DrugItem>
            ))}
          </DrugList>
        </Block>
        );
    }else
      return (
      <DrugInfoBlock>
        <h3>약물 정보 보기</h3>
        <p>{auth.username}님은 현재 아래 약물을 복용 중입니다:</p>
        <DrugList>
          {drugInfo.map((drug, index) => (
            <DrugItem key={index}>
              <DrugIcon>💊</DrugIcon>
              {drug}
            </DrugItem>
          ))}
        </DrugList>
        <AskPharmacistButton onClick={()=>{
          if (auth.username === null)
            unloginedEvent(navigate);
          else 
            sendPillInfoToServer();
        }}>약사 소견 묻기</AskPharmacistButton>
      </DrugInfoBlock>);
  };
export default PillInfoBlock;