import React, { useState, useContext } from 'react';
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


const AIAnalysisContainer = styled(Block)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 450px;
`;

const AIAnalysisBlock = ()=>{
    const [image, setImage] = useState(null);

    const handleImageUpload = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
    };


    return (
        <AIAnalysisContainer>
            <h2 style={{fontSize: '30px'}}>AI 약물 정보 분석</h2>
            <p style={{fontSize: '30px'}}>사진을 끌어다 놓거나 업로드 하세요</p>
            <input style={{fontSize: '30px'}} type="file" accept="image/*" onChange={handleImageUpload} />
            {image && <img src={image} alt="Uploaded" style={{ marginTop: '20px', width: '100%', maxWidth: '250px', borderRadius: '10px' }} />}
            <UploadButton>사진 올리기</UploadButton>
        </AIAnalysisContainer>
    );
}

export default AIAnalysisBlock;