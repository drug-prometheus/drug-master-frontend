import React, { useState, useEffect } from "react"
import styled from 'styled-components';
import Header from './Header';
import { MainContainer, SearchBar, SearchInput, SearchButton } from './\bGeneralStyle';
import { useNavigate } from 'react-router-dom';

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  max-width: 1600px;
`;

const MainBlock = styled.div`
    width: 80%;
    height: 500px;
    background-color: #FFE6B8;
    justify-content: space-between;
    margin: 30px;
    padding: 20px;
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.2);
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

const NodeBlock = styled.div`
    background-color: #FFFCF5;
    width: 400px;
    height: 400px;
    flex: 1;
`

const DrugAnalysisPage = () => {
    var [analysisText, setAnalysisText] = useState(null);

    

    useEffect(() => {
        setAnalysisText("아세론정 3정\n 아세트아미노펜 5정");
      }, []);

    return (
        <MainContainer>
            <Header />
            <MainBlock>
                <h2>약물 분석 결과</h2>
                <SubBlock>
                    <ImgBlock src="pills_image.png">
                    </ImgBlock>
                    <NodeBlock >
                        {analysisText}
                    </NodeBlock>
                </SubBlock>
            </MainBlock>
        </MainContainer>
    );
}
export default DrugAnalysisPage;
