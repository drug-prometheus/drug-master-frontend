import React, { useState, useEffect } from "react"
import styled from 'styled-components';
import Header from './Header';
import { MainContainer, Block} from './MainStyle';
import axios from 'axios';

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

    const pillInfos = [
        "아세론정",
        "아세트아미노펜",
        "아세론정",
        "아세트아미노펜",
        "아세론정",
        "아세트아미노펜"
    ];

    const renderPillInfos = (pillInfos) => {
        if (pillInfos.length) {
          return (
            <DrugInfoContainer>
                {pillInfos.map((drug) => (
                  <DrugCard key={drug} onClick={async ()=>{
                      setSelectedDrug(drug);
                      try{
                        var response =  await axios.post('/search-medicine/', {medication_name: drug});
                        console.log(response.data);
                      } catch {
                        setNonMixturePills(null);
                      }
    
                      setIsOpen(true);
                    }}>
                    <DrugImage src='pills_image.png' alt={drug} />
                    <DrugInfo>
                      <DrugName>{drug}</DrugName>
                      <DrugDescription>{drug}</DrugDescription>
                    </DrugInfo>
                  </DrugCard>
                ))}
            </DrugInfoContainer>
          );
        }
    };

    // useEffect(() => {
    //     var list = [];
    //     pillInfos.forEach((info, index) => {
    //         list.push(info + " " + numPills[index] + "정");
    //     });
    //     setAnalysises(list);
    //   }, []);

    return (
        <MainContainer>
            <Header />
            <MainBlock>
                <h2>약물 분석 결과</h2>
                <SubBlock>
                    <ImgBlock src="pills_image.png">
                    </ImgBlock>
                    {
                        renderPillInfos(pillInfos)
                    }
                    {/* <ul>
                        {analysises.map((text, index) => (
                        <li key={index}>{text}</li>
                        ))}
                    </ul> */}
                </SubBlock>
            </MainBlock>
        </MainContainer>
    );
}
export default DrugAnalysisPage;