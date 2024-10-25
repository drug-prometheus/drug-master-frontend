// 메인 페이지. 웹 사이트 홈 화면

import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Header from './Header';
import SearchBar from './SearchBar';
import { MainContainer, MainBlock } from './MainStyle';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import ButtonGroup from './MainPageComponents/ButtonGroup';
import WelcomeBlock from './MainPageComponents/WelcomeBlock';
import PillInfoBlock from './MainPageComponents/PillInfoBlock';
import AIAnalysisBlock from './MainPageComponents/AIAnalysisBlock';
import DrugInputBlock from './MainPageComponents/DrugInputBlock'
import axios from 'axios';

const MainPageContainer = styled(MainContainer)`
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  padding: 10px;
    display: flex;
    margin-top: 20px;
`;

const LeftSection = styled.div`
  flex: 2;
  margin-right: 20px;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;



const MainPage = () => {
  const { auth, logout } = useContext(AuthContext);
  const [queryInput, setQueryInput] = useState('');
  const [drugInfo, setDrugInfo] = useState(null);

  const getDrugInfo = () =>{
    const formData = new FormData();
    formData.append('patient_name', auth.username);
    axios.post('/see-medi-info/', formData)
      .then((response)=>{
        const data = [];
        response.data.forEach(element => {
          data.push(element.medication_name);
        });
        setDrugInfo(data);
        console.log(response.data);
      });
  };
  
  if (!drugInfo && auth.userType === '환자'){
    getDrugInfo();
  }

  const navigate = useNavigate();

  const unloginedEvent = () => {
    alert("로그인 후 이용하실 수 있습니다.");
    navigate('/login');
  }

  return (
    <MainPageContainer>
    <Header />
      <MainBlock>
      <SearchBar queryInput={queryInput} setQueryInput={setQueryInput} handleSearch={()=>{}} handleQueryChange={()=>{}} style={{width: "100%"}}/>
      <ContentContainer>
        <LeftSection>
          <AIAnalysisBlock auth={auth}></AIAnalysisBlock>
          <DrugInputBlock auth={auth} unloginedEvent={unloginedEvent} drugInfo={drugInfo} setDrugInfo={setDrugInfo}></DrugInputBlock>
        </LeftSection>
        <RightSection>
          <WelcomeBlock auth={auth} logout={logout}></WelcomeBlock>
          <ButtonGroup unloginedEvent={unloginedEvent} auth={auth}></ButtonGroup>
          <PillInfoBlock auth={auth} unloginedEvent={unloginedEvent} drugInfo={drugInfo}></PillInfoBlock>
        </RightSection>
      </ContentContainer>
      </MainBlock>
    </MainPageContainer>
  );
};

export default MainPage;