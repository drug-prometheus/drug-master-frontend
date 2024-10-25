import React from 'react';
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

function SearchBar({ queryInput, setQueryInput, handleSearch, handleQueryChange}) {
    const navigate = useNavigate();      

      const searchDrug = () => {
        console.log("button down");
        navigate(((queryInput==='')? '/search' : '/search?query=' + queryInput));
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