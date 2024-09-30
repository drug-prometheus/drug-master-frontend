// 메인 페이지. 웹 사이트 홈 화면

import React, { useState } from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f0f0;
  min-height: 100vh;
`;

const SearchBar = styled.div`
  width: 90%;
  max-width: 1400px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 20px;
  margin-bottom: 20px;
  margin-top: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  width: 90%;
  padding: 10px;
  border: none;
  border-radius: 10px;
  font-size: 30px;
  outline: none;
`;

const SearchButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 30px;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  max-width: 1600px;
`;

const LeftSection = styled.div`
  flex: 2;
  margin-right: 20px;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Block = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const AIAnalysisBlock = styled(Block)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 400px;
`;

const UploadButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #8365e6;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
`;

const DrugInputBlock = styled(Block)`
  text-align: center;
  font-size: 30px;
`;

const DrugInputField = styled.input`
  width: 80%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid #ddd;
  outline: none;
  margin-right: 10px;
  font-size: 20px;
`;

const WelcomeBlock = styled(Block)`
  text-align: center;
  font-size: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
`;

const InfoButton = styled.button`
  flex: 1;
  padding: 10px;
  background-color: #c6b6fc;
  border: 1px solid #ddd;
  border-radius: 10px;
  cursor: pointer;
  margin: 0 10px;
  font-size: 25px;
  font-weight: bold;
`;

const DrugInfoBlock = styled(Block)`
  flex: 1;
  margin-top: 20px;
  font-size: 20px;
`;

const DrugList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
`;

const DrugItem = styled.li`
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 10px;
  display: flex;
  align-items: center;
`;

const DrugIcon = styled.div`
  margin-right: 10px;
  font-size: 20px;
`;

const AskPharmacistButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #8365e6;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
  font-size: 20px;
  font-weight: bold;
`;

const MainPage = () => {
  const [drugInfo, setDrugInfo] = useState(['A 약물', 'B 약물', 'C 약물']);
  const [newDrug, setNewDrug] = useState('');
  const [image, setImage] = useState(null);

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

  return (
    <MainContainer>
      <SearchBar>
        <SearchInput placeholder="약 이름을 검색하세요" />
        <SearchButton>🔍</SearchButton>
      </SearchBar>
      <ContentContainer>
        <LeftSection>
          <AIAnalysisBlock>
            <p style={{fontSize: '40px', marginBottom: '0px'}}><strong>AI 약물 정보 분석</strong></p>
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
            <UploadButton onClick={handleAddDrug}>추가</UploadButton>
          </DrugInputBlock>
        </LeftSection>
        <RightSection>
          <WelcomeBlock>
            <p><strong>홍길동</strong> 님</p>
            <p>환영합니다.</p>
          </WelcomeBlock>
          <ButtonGroup>
            <InfoButton>약사 소견 보기</InfoButton>
            <InfoButton>약물 분석 확인</InfoButton>
          </ButtonGroup>
          <DrugInfoBlock>
            <h3>약물 정보 보기</h3>
            <p>홍길동님은 현재 아래 약물을 복용 중입니다:</p>
            <DrugList>
              {drugInfo.map((drug, index) => (
                <DrugItem key={index}>
                  <DrugIcon>💊</DrugIcon>
                  {drug}
                </DrugItem>
              ))}
            </DrugList>
            <AskPharmacistButton>약사 소견 묻기</AskPharmacistButton>
          </DrugInfoBlock>
        </RightSection>
      </ContentContainer>
    </MainContainer>
  );
};

export default MainPage;
