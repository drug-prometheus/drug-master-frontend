// 약물 검색 페이지

import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { MainContainer } from './\bGeneralStyle';

const SearchBarContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #FFE6B8;
  border-radius: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  flex: 1;
  background-color: #FFE6B8;
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

const HomeButton = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
  margin-right: 20px;
  margin-left: 10px;
`;

const DrugInfoContainer = styled.div`
  width: 100%;
  max-width: 1600px;
  margin-top: 20px;
`;

const DrugCard = styled.div`
  display: flex;
  background-color: #FFE6B8;
  padding: 15px;
  border-radius: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
`;

const DrugImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 20px;
`;

const DrugInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const DrugName = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const DrugDescription = styled.p`
  margin: 5px 0 0 0;
  font-size: 14px;
  color: #555;
`;

const SearchDrugPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = () => {
    // 여기에 실제 검색 로직을 추가하세요
    // 검색 결과는 임시로 예시 데이터를 사용합니다
    const results = [
      {
        id: 1,
        name: '아세트아미노펜',
        description: '효능: 발열 및 두통, 신경통, 근육통, 월경통, 염좌통 등에 사용.',
        imageUrl: 'https://via.placeholder.com/80',
      },
      {
        id: 2,
        name: '이부프로펜',
        description: '효능: 소염 및 진통 효과로 관절염, 치통, 생리통 등에 사용.',
        imageUrl: 'https://via.placeholder.com/80',
      },
    ];
    setSearchResults(results);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <MainContainer>        
    <Header />
    <SearchBarContainer>
    <HomeButton src="home.png" alt="홈" onClick={goToHome}/>
        <SearchInput 
        placeholder="약 이름을 검색하세요" 
        value={searchTerm}
        onChange={handleInputChange}
        />
        <SearchButton onClick={handleSearch}>🔍</SearchButton>
    </SearchBarContainer>
      <DrugInfoContainer>
        {searchResults.map(drug => (
          <DrugCard key={drug.id}>
            <DrugImage src={drug.imageUrl} alt={drug.name} />
            <DrugInfo>
              <DrugName>{drug.name}</DrugName>
              <DrugDescription>{drug.description}</DrugDescription>
            </DrugInfo>
          </DrugCard>
        ))}
      </DrugInfoContainer>
    </MainContainer>
  );
};

export default SearchDrugPage;
