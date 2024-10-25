import React, { useState } from 'react';
import styled from 'styled-components';
import { Block } from '../MainStyle';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UploadButton = styled.button`
    background-color: #FF6F61;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px 24px;
    cursor: pointer;
    font-size: 18px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #FF4A3D;
    }
`;

const DrugInputContainer = styled(Block)`
    text-align: center;
`;

const DrugInputField = styled.input`
    width: 80%;
    padding: 10px;
    margin-top: 10px; 
    border-radius: 5px;
    border: 2px solid #eaeaea;
    outline: none;
    font-size: 16px; 
`;

const DrugInfoBlock = ({auth, unloginedEvent, drugInfo , setDrugInfo})=>{
    const [newDrug, setNewDrug] = useState('');
    const navigate = useNavigate();
    const handleDrugChange = (e) => {
        setNewDrug(e.target.value);
    };

    const handleAddDrug = () => {
        if (newDrug) {
            setDrugInfo([...drugInfo, newDrug]);
            setNewDrug('');
        }
    };

    return (
        <DrugInputContainer>
            <h3>약물 정보를 입력해주세요</h3>
            <DrugInputField 
                value={newDrug} 
                onChange={handleDrugChange} 
                placeholder="새 약물 입력" 
                />
            <UploadButton onClick={()=>{
                if (auth.username === null)
                    unloginedEvent(navigate);
                else
                    handleAddDrug();
                }}>추가</UploadButton>
        </DrugInputContainer>
    );
}
export default DrugInfoBlock;