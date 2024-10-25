// 약물 검색 페이지
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import SearchBar from './SearchBar';
import { MainContainer, Block } from './MainStyle';

const DrugInfoContainer = styled.div`
  width: 100%;
  max-width: 1600px;
  margin-top: 20px;
`;

const DrugCard = styled(Block)`
  display: flex;
  background-color: #F7F9FC; /* 연한 파란색 */
  width: 90%;
  padding: 15px;
  margin: auto;
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
  color: #003366; /* 진한 파란색 */
`;

const DrugDescription = styled.p`
  margin: 5px 0 0 0;
  font-size: 14px;
  color: #555;
`;

const SearchDrugPage = () => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [queryInput, setQueryInput] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');


      const handleQueryChange = (query) => {
        const filtered = pillInfos.filter(
            (pillInfo) => (pillInfo['name'].toLowerCase().indexOf(query.toLowerCase()) > -1 ||
            pillInfo['description'].toLowerCase().indexOf(query.toLowerCase()) > -1)
          );
      
          // 추천 목록 상태 업데이트 및 목록 표시
          setFilteredSuggestions(filtered);
      };
    
  
  const renderSuggestions = () => {

    // if (showSuggestions && queryInput) {
      if (filteredSuggestions.length) {
        return (
          <DrugInfoContainer>

              {filteredSuggestions.map((drug) => (
                <DrugCard key={drug.id}>
                  <DrugImage src={drug.imageUrl} alt={drug.name} />
                  <DrugInfo>
                    <DrugName>{drug.name}</DrugName>
                    <DrugDescription>{drug.description}</DrugDescription>
                  </DrugInfo>
                </DrugCard>
              ))}
          </DrugInfoContainer>
        );
      }
  };

  useEffect(() => {
    if (query != null){
      setQueryInput(query);
      handleQueryChange(query)
    }
  }, []);

  return (
    <MainContainer>        
    <Header />
    <SearchBar queryInput={queryInput} setQueryInput={setQueryInput} handleQueryChange={(e)=>handleQueryChange(e.target.value)} style={{width: "100%"}}/>
      {renderSuggestions()}
    </MainContainer>
  );
};

export default SearchDrugPage;
