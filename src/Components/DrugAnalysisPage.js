import React, { useState } from "react"
import styled from 'styled-components';
import Header from './Header';
import { MainContainer, Block} from './MainStyle';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import DrugInfoModel from "./DrugInfoModal";

const MainBlock = styled(Block)`
    width: 80%;
    height: 500px;
    justify-content: space-between;
    margin: 30px auto;
    padding: 20px;
    border-radius: 20px;
    margin-bottom: 20px;
`;
const SubBlock = styled.div`
    width: 100%;
    heigth: 100%;
    display: flex;
`

const ImgBlock = styled.img`
    background-color: #FFFCF5;
    width: 400px;
    height: 400px;
    margin-right: 20px;
`

const DrugInfoContainer = styled.div`
background-color: #FFFCF5;
flex: 1; 
 width: 400px;
    height: 400px;
  overflow-y: auto;
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

const NoMixureDrugCard = styled(DrugCard)`
  border: 1px solid red;
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



const DrugAnalysisPage = () => {
    var [analysises, setAnalysises] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDrug, setSelectedDrug] = useState(Object);
    const [nonMixturePills, setNonMixturePills] = useState(null);
    const [pillInfos, setPillInfos] = useState(null);
    
    const location = useLocation();
    // const medication_list =[
    //   '발트렙정160밀리그램(발사르탄)',
    //   '가스디알정50밀리그램(디메크로틴산마그네슘)',
    //   '졸뎀속붕정(졸피뎀타르타르산염)'
    // ];
    const medication_list = location.state?.medication_list;
    // const no_combination_list = [
    //   '발트렙정160밀리그램(발사르탄)'
    // ];
    const no_combination_list = location.state?.no_combination_list;
    const bbox_img = location.state?.image;

    const loadPillInfos = async ()=>{
      const result = await axios.get('/search-medicine/');
      const pillInfos = [];
      result.data.forEach(element => {
        pillInfos.push(element);
      });
      setPillInfos(pillInfos);
    }
    if (!pillInfos){
      loadPillInfos();
    }


    const renderPillInfos = (medication_list) => {
      if (medication_list?.length) {
        return (
          <DrugInfoContainer>
              {medication_list?.map((drug) => { 
                let pill;
                for (const pillInfo in pillInfos){
                  if (pillInfos[pillInfo]?.medication_name === drug){
                    pill = pillInfos[pillInfo];
                    break;
                  }
                }
                console.log(pill);
                return (
                !(no_combination_list.includes(drug))
                ?
                <DrugCard key={drug} onClick={async ()=>{
                    setSelectedDrug(pill);
                    try{
                      var response =  await axios.post('/search-medicine/', {medication_name: drug});
                      console.log(response.data);
                    } catch {
                      setNonMixturePills(null);
                    }
                    try{
                      setIsOpen(true);
                    } catch {
                      alert('정보가 없습니다.');
                    }
                    
                  }}>
                  <DrugImage src='pills_image.png' alt={drug} />
                  <DrugInfo>
                    <DrugName>{drug}</DrugName>
                    <DrugDescription>{pill?.medical_properties || '정보 없음'}</DrugDescription>
                  </DrugInfo>
                </DrugCard>
                :
                <NoMixureDrugCard key={drug} onClick={async ()=>{
                  setSelectedDrug(pill);
                  try{
                    var response =  await axios.post('/search-medicine/', {medication_name: drug});
                    console.log(response.data);
                  } catch {
                    setNonMixturePills(null);
                  }
                  try{
                    setIsOpen(true);
                  } catch{
                    alert('정보가 없습니다.');
                  }
                  
                }}>
                  <DrugImage src='pills_image.png' alt={drug} />
                  <DrugInfo>
                    <DrugName>{drug}</DrugName>
                    <DrugDescription>{pill?.medical_properties || '정보 없음'}</DrugDescription>
                  </DrugInfo>
                </NoMixureDrugCard>
              )})}
          </DrugInfoContainer>
        );
      }
    };

    return (
        <MainContainer>
          <DrugInfoModel isOpen={isOpen} setIsOpen={setIsOpen} drugInfo={selectedDrug} nonMixturePills={nonMixturePills} setNonMixturePills={setNonMixturePills}/>
            <Header />
            <MainBlock>
                <h2>약물 분석 결과</h2>
                <SubBlock>
                    <ImgBlock src={`data:image/jpeg;base64,${bbox_img}`}>
                    </ImgBlock>
                    {
                      renderPillInfos(medication_list)
                    }
                </SubBlock>
            </MainBlock>
        </MainContainer>
    );
}
export default DrugAnalysisPage;