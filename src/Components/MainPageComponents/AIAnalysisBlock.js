import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Block } from '../MainStyle';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';

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

const UploadedImage = styled.img`
  width: 100%;
  max-width: 250px;
  max-height: 150px;
  border-radius: 10px;
  object-fit: cover;
`;

const AIAnalysisBlock = ()=>{
    const { auth } = useContext(AuthContext);
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const navigate  = useNavigate();
    const handleImageUpload = (e) => {
        setImage(e.target.files[0]);
        setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    };

    const sendToServer = ()=>{
        if (!image){
            alert('이미지를 선택해 주세요.');
            return;
        }
        const formData = new FormData();
        console.log(auth.username);
        formData.append('patient', auth.username);
        formData.append('picture', image);
        axios.post('/analyzing-medicine/', formData)
            .then((response)=>{ 
                console.log(response.data);
         
                navigate('/analysis', 
                    {state: {
                        medication_list: response.data.medication_list, 
                        no_combination_list: response.data.no_combination_list,
                        image: response.data.image
                        }
                    });
            })
            .catch((err)=>{
                console.error(err);
            });
    };


    return (
        <AIAnalysisContainer>
            <h2 style={{fontSize: '30px'}}>AI 약물 정보 분석</h2>
            <p style={{fontSize: '30px'}}>사진을 끌어다 놓거나 업로드 하세요</p>
            <input style={{fontSize: '30px'}} type="file" accept="image/*" onChange={handleImageUpload} />
            {image && <UploadedImage src={previewUrl} alt="Uploaded" style={{ marginTop: '20px', width: '100%', maxWidth: '250px', borderRadius: '10px' }} />}
            <UploadButton onClick={sendToServer}>사진 올리기</UploadButton>
        </AIAnalysisContainer>
    );
}

export default AIAnalysisBlock;