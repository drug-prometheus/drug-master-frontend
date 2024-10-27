// 약물 검색 페이지
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import SearchBar from './SearchBar';
import { MainContainer, Block } from './MainStyle';
import axios from 'axios';
import DrugInfoModel from './DrugInfoModal';

const DrugInfoContainer = styled.div`
  width: 100%;
  max-width: 1600px;
  margin-top: 20px;
`;

const DrugCard = styled(Block)`
  display: flex;
  background-color: #F7F9FC;
  width: 90%;
  padding: 15px;
  margin: auto;
  border-radius: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  cursor: pointer;
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
  color: #003366;
`;

const DrugDescription = styled.p`
  margin: 5px 0 0 0;
  font-size: 14px;
  color: #555;
`;

const SearchDrugPage = () => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [queryInput, setQueryInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDrug, setSelectedDrug] = useState(Object);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');



  const handleQueryChange = async (query) => {
    const result = await axios.get('/search-medicine/');
    const pillInfos = [];
    result.data.forEach(element => {
      console.log(element);
      pillInfos.push(element);
    });

    const filtered = pillInfos.filter(
        (pillInfo) => (pillInfo.medication_name.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        pillInfo.medical_properties.toLowerCase().indexOf(query.toLowerCase()) > -1)
      );
    if (filtered.length <= 0){
      setFilteredSuggestions(pillInfos);
    }else {
      setFilteredSuggestions(filtered);
    }
  };
    
  
  const renderSuggestions = () => {
      if (filteredSuggestions.length) {
        return (
          <DrugInfoContainer>
              {filteredSuggestions.map((drug) => (
                <DrugCard key={drug.id} onClick={async ()=>{
                    setSelectedDrug(drug);
                    var response =  await axios.post('/search-medicine/', {medication_name: drug.medication_name});
                    console.log(response.data);
                    setIsOpen(true);
                  }}>
                  <DrugImage src='pills_image.png' alt={drug.medication_name} />
                  <DrugInfo>
                    <DrugName>{drug.medication_name}</DrugName>
                    <DrugDescription>{drug.medical_properties}</DrugDescription>
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
    <DrugInfoModel isOpen={isOpen} setIsOpen={setIsOpen} drugInfo={selectedDrug}
    />
    <SearchBar queryInput={queryInput} setQueryInput={setQueryInput} handleQueryChange={(e)=>handleQueryChange(e.target.value)} style={{width: "100%"}}/>
      {renderSuggestions()}
    </MainContainer>
  );
};

export default SearchDrugPage;
