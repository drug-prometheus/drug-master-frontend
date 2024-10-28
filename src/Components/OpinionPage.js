// 유저 화면, 

import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Header from './Header';
import { MainContainer, Block } from './MainStyle';
import { AuthContext } from '../AuthContext';
import axios from 'axios';

const ContentContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 90%;
    max-width: 1600px;
    margin-top: 30px;
`;

const DateListContainer = styled(Block)`
    width: 200px;
    height: 300px; 
    flex: 1;
    background-color: #E3F2FD; 
    border-radius: 10px;
    padding: 20px;
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.2);
    margin-right: 20px;
    overflow-y: auto;
`;

const DateTitle = styled.h2`
    font-size: 25px;
    margin-bottom: 20px;
    color: #1E88E5; 
`;

const DateItem = styled.div`
    margin-bottom: 10px;
    padding: 10px;
    background-color: #E3F2FD; 
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #BBDEFB; 
    }
`;

const NoteContainer = styled(Block)`
    flex: 3;
    background-color: #BBDEFB; 
    border-radius: 10px;
    padding: 20px;
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.2);
    position: relative;
`;

const NoteContent = styled.textarea`
    width: 100%;
    height: 300px;
    font-size: 16px;
    border-radius: 10px;
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.2);
    border: 1px solid #ddd;
    outline: none;
    resize: none;
    background-color: #FFFCF5; 
    pointer-events: none; 
`;


const OpinionPage = () => {
    const [noteContent, setNoteContent] = useState('');
    const { auth } = useContext(AuthContext);
    const [opinions, setOpinions] = useState(null);

    const loadOpinions = ()=>{
        axios.post('/pharmacist-opinion/', {
            patient: auth.username
            })
            .then((response)=>{
                response.data.note.reverse()
                setOpinions(response.data.note);
                handleDateSelect(response.data.note[0]);
            });
    }

    if (!opinions && auth.userType === '환자'){
        loadOpinions();
    }
  
    const handleDateSelect = (opinion) => {
        console.log(opinion);
        setNoteContent(opinion.note);
      };

    return (
    <MainContainer>
        <Header />
        <ContentContainer>
            <DateListContainer>
                <DateTitle>날짜 선택</DateTitle>
                {opinions?.map((opinion) => (
                <DateItem key={opinion.created_at} onClick={() => handleDateSelect(opinion)}>
                    {opinion.created_at.split('T')[0]}
                </DateItem>
                ))}
            </DateListContainer>
    
            <NoteContainer>
                <NoteContent
                    value={noteContent}
                    onChange={()=>{}}
                />
            </NoteContainer>
        </ContentContainer>
    </MainContainer>
    );
};

export default OpinionPage;
