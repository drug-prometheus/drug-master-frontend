// 메인 페이지. 웹 사이트 홈 화면

import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Header from './Header';
import SearchBar from './SearchBar';
import { MainContainer, MainBlock, Block } from './MainStyle';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../AuthContext';


// 전체 메인 페이지 스타일 조정
const MainPageContainer = styled(MainContainer)`
  max-width: 1200px; /* 최대 너비 설정 */
  margin: 0 auto; /* 중앙 정렬 */
  overflow: hidden; /* 내용이 넘치지 않도록 설정 */
`;

// 내용 컨테이너
const ContentContainer = styled.div`
  padding: 10px;
    display: flex; /* 두 개의 섹션을 나란히 배치 */
    margin-top: 20px; /* 위쪽 여백 */
`;

// 왼쪽 섹션
const LeftSection = styled.div`
  flex: 2;
  margin-right: 20px; // 마진 조정
`;

// 오른쪽 섹션
const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;



const AIAnalysisBlock = styled(Block)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 450px;
`;

const UploadButton = styled.button`
  background-color: #FF6F61; // 산호색 버튼
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #FF4A3D; // 호버 색상
  }
`;

const DrugInputBlock = styled(Block)`
  text-align: center;
`;

const DrugInputField = styled.input`
  width: 80%;
    padding: 10px; /* 패딩 조정 */
    margin-top: 10px; /* 위 여백 조정 */
    border-radius: 5px; /* 둥근 모서리 */
    border: 2px solid #eaeaea;
    outline: none;
    font-size: 16px; /* 폰트 크기 조정 */
`;

const WelcomeBlock = styled(Block)`
  text-align: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 22px;
`;

const ButtonGroup = styled.div`
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
`;

const DrugIcon = styled.div`
  margin-right: 10px;
  font-size: 20px;
`;

const AskPharmacistButton = styled(UploadButton)`
  background-color: #FF6F61; // 일관된 버튼 색상
  width: 100%;
`;


const loginedPatient = (auth, logout) => {
  return (
    <WelcomeBlock>
            <p><strong>{auth.username}</strong> 님</p>
            <p>환영합니다.</p>
            <InfoButton onClick={logout}>로그아웃</InfoButton>
    </WelcomeBlock>
  );
}

const loginedPharmacist = (auth, logout) => {
  return (
    <WelcomeBlock>
            <p><strong>{auth.username}</strong> 약사님</p>
            <p>환영합니다.</p>
            <InfoButton onClick={logout}>로그아웃</InfoButton>
    </WelcomeBlock>
  );
}

const unlogined = (navigate) => {
  return (
    <WelcomeBlock>
            <p>로그인이 필요합니다. </p>
            <InfoButton onClick={()=>navigate('/login')}>로그인</InfoButton>
    </WelcomeBlock>
  );
}

const unloginedEvent = (navigate) => {
  alert("로그인 후 이용하실 수 있습니다.");
  navigate('/login');
}

const MainPage = () => {
  const { auth, logout } = useContext(AuthContext);
  const [queryInput, setQueryInput] = useState('');
  const [drugInfo, setDrugInfo] = useState(['A 약물', 'B 약물', 'C 약물']);
  const [opinionRequest, setOpinionRequest] = useState(['홍길동', '정윤성']);
  const [newDrug, setNewDrug] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleDrugChange = (e) => {
    setNewDrug(e.target.value);
  };

  const handleAddDrug = () => {
    if (newDrug) {
      setDrugInfo([...drugInfo, newDrug]);
      setNewDrug('');
    }
  };

  const handleImageUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const sendPillInfoToServer = () => {
    axios.post('/add-medicine-info/', {
      patient: auth.username,
      medicine_name: '알약'
    })
    .then(response => {
      console.log(response.data);
      alert("성공적으로 요청 했습니다.\n7~14일 안에 소견을 확인할 수 있습니다.");
    });
    }

  const pillInfoBlock = ()=>{
    if (auth.userType == '약사'){
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
          if (auth.username == null)
            unloginedEvent(navigate);
          else 
            sendPillInfoToServer();
        }}>약사 소견 묻기</AskPharmacistButton>
      </DrugInfoBlock>);
  };

  const buttonGroup = ()=>{
    if (auth.userType == '약사'){
      return (
        <ButtonGroup>
          <InfoButton onClick={()=>{
            navigate("/opinion");
          }}>소견 작성</InfoButton>
        </ButtonGroup>
      )
    } else {
      return (
        <ButtonGroup>
        <InfoButton onClick={()=>{
          if (auth.username == null)
            unloginedEvent(navigate);
          else
            navigate("/opinionUser");}}>약사 소견 보기</InfoButton>
         <InfoButton onClick={()=>{
          if (auth.username == null)
            unloginedEvent(navigate);
          else
            navigate("/analysis");}}>약물 분석 확인</InfoButton>
        </ButtonGroup>
      );
    }
   
  }

  return (
    <MainPageContainer>
    <Header />
      <MainBlock>
      <SearchBar queryInput={queryInput} setQueryInput={setQueryInput} handleSearch={()=>{}} handleQueryChange={()=>{}} style={{width: "100%"}}/>
      <ContentContainer>
        <LeftSection>
          <AIAnalysisBlock>
            <h2 style={{fontSize: '30px'}}>AI 약물 정보 분석</h2>
            <p style={{fontSize: '30px'}}>사진을 끌어다 놓거나 업로드 하세요</p>
            <input style={{fontSize: '30px'}} type="file" accept="image/*" onChange={handleImageUpload} />
            {image && <img src={image} alt="Uploaded" style={{ marginTop: '20px', width: '100%', maxWidth: '250px', borderRadius: '10px' }} />}
            <UploadButton>사진 올리기</UploadButton>
          </AIAnalysisBlock>
          <DrugInputBlock>
            <h3>약물 정보를 입력해주세요</h3>
            <DrugInputField 
              value={newDrug} 
              onChange={handleDrugChange} 
              placeholder="새 약물 입력" 
            />
            <UploadButton onClick={()=>{
              if (auth.username == null)
                unloginedEvent(navigate);
              else
              handleAddDrug();
              }}>추가</UploadButton>
          </DrugInputBlock>
        </LeftSection>
        <RightSection>
          {
            auth.userType == null ? 
            (unlogined(navigate)):
            (
              auth.userType == '약사' ?
              loginedPharmacist(auth, logout):
              loginedPatient(auth, logout)
            )
          }
          {buttonGroup()}
          {pillInfoBlock()}
        </RightSection>
      </ContentContainer>
      </MainBlock>
    </MainPageContainer>
  );
};

export default MainPage;
