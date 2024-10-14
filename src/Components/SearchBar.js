import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SearchContainer = styled.div`
  width: 90%;
  max-width: 1400px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #F4F6F8;
  border-radius: 20px;
  margin-bottom: 20px;
  margin-top: 20px;
  margin: auto;
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.2);
    &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* 호버 시 강조 */
  }
`;

const SearchInput = styled.input`
  width: 90%;
  background-color: #F4F6F8;
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

const suggestions = [
    ('아세트아미노펜',
    '효능: 발열 및 두통, 신경통, 근육통, 월경통, 염좌통 등에 사용.'),
    ('이부프로펜',
    '효능: 소염 및 진통 효과로 관절염, 치통, 생리통, 근육통, 염좌 통증 등에 사용.'),
    ('로페라미드',
    '효능: 급성 및 만성 설사 증상 완화, 과민성 대장 증후군의 설사 증상 완화에 사용.'),
    ('비타민 C 정',
    '효능: 비타민 C 결핍 예방, 피로 회복, 면역력 강화, 감기 예방 및 항산화 효과.'),
    ('타이레놀',
    '효능: 발열, 두통, 근육통, 신경통 및 감기 증상 완화에 사용.'),
    ('아스피린',
    '효능: 해열, 진통, 소염 작용 및 혈전 예방. 심혈관 질환 예방 및 고혈압 환자의 뇌졸중 예방에 사용.'),
    ('판콜에이',
    '효능: 감기 증상 완화, 코막힘, 기침, 두통 및 발열 완화.'),
    ('글루코사민 정',
    "효능: 관절염, 연골 건강 개선 및 관절 통증 완화에 사용."),
    ('오메가-3 캡슐',
    '효능: 혈중 콜레스테롤 감소, 혈액 순환 개선, 심혈관 질환 예방에 도움.'),
    ('종합비타민',
    '효능: 비타민 결핍 예방, 신체 기능 유지, 면역력 증진, 피로 회복 및 영양 보충에 도움.')
];  

function SearchBar({ queryInput, setQueryInput, handleSearch, handleQueryChange}) {
    const navigate = useNavigate();      

      const searchDrug = () => {
        console.log("button down");
        navigate(((queryInput=='')? '/search' : '/search?query=' + queryInput));
      };

    return (
        <SearchContainer>
            <SearchInput value={queryInput} onChange={(e)=>{ setQueryInput(e.target.value); handleQueryChange(e);}} 
                     placeholder="약 이름을 검색하세요" />
            <SearchButton onClick={()=>{searchDrug(); handleSearch();}}>🔍</SearchButton>
            
        </SearchContainer>
      );
}

export default SearchBar;