import React, { useState, useEffect } from "react"
import styled from 'styled-components';
import Header from './Header';
import { MainContainer, Block} from './MainStyle';

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

const NodeBlock = styled.div`
    background-color: #FFFCF5;
    width: 400px;
    height: 400px;
    flex: 1;
`

const DrugAnalysisPage = () => {
    var [analysises, setAnalysises] = useState([]);

    const pillInfos = [
        "아세론정",
        "아세트아미노펜"
    ];

    const numPills = [
        3,
        5
    ];

    useEffect(() => {
        var list = [];
        pillInfos.forEach((info, index) => {
            list.push(info + " " + numPills[index] + "정");
        });
        setAnalysises(list);
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
                    <ul>
                        {analysises.map((text, index) => (
                        <li key={index}>{text}</li>
                        ))}
                    </ul>
                    </NodeBlock>
                </SubBlock>
            </MainBlock>
        </MainContainer>
    );
}
export default DrugAnalysisPage;