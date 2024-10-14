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
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');

  const pillInfos = [
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
    {
      id: 3,
      name: '로페라미드',
      description: '효능: 급성 및 만성 설사 증상 완화, 과민성 대장 증후군의 설사 증상 완화에 사용.',
      imageUrl: 'https://via.placeholder.com/80',
    },
    {
      id: 4,
      name: '비타민 C 정',
      description: '효능: 비타민 C 결핍 예방, 피로 회복, 면역력 강화, 감기 예방 및 항산화 효과.',
      imageUrl: 'https://via.placeholder.com/80',
    },
    {
      id: 5,
      name: '타이레놀',
      description: '효능: 발열, 두통, 근육통, 신경통 및 감기 증상 완화에 사용.',
      imageUrl: 'https://via.placeholder.com/80',
    },
    {
      id: 6,
      name: '아스피린',
      description: '효능: 해열, 진통, 소염 작용 및 혈전 예방. 심혈관 질환 예방 및 고혈압 환자의 뇌졸중 예방에 사용.',
      imageUrl: 'https://via.placeholder.com/80',
    },
    {
      id: 7,
      name: '판콜에이',
      description: '효능: 감기 증상 완화, 코막힘, 기침, 두통 및 발열 완화.',
      imageUrl: 'https://via.placeholder.com/80',
    },
    {
      id: 8,
      name: '글루코사민 정',
      description: '효능: 관절염, 연골 건강 개선 및 관절 통증 완화에 사용.',
      imageUrl: 'https://via.placeholder.com/80',
    },
    {
      id: 9,
      name: '오메가-3 캡슐',
      description: '효능: 혈중 콜레스테롤 감소, 혈액 순환 개선, 심혈관 질환 예방에 도움.',
      imageUrl: 'https://via.placeholder.com/80',
    },
    {
      id: 10,
      name: '종합비타민',
      description: '효능: 비타민 결핍 예방, 신체 기능 유지, 면역력 증진, 피로 회복 및 영양 보충에 도움.',
      imageUrl: 'https://via.placeholder.com/80',
    },
  ];

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

  useEffect(() => {
    if (query != null){
      setQueryInput(query);
      handleQueryChange(query)
      // handleSearch();
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
