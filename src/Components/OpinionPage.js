// 유저 화면, 

import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './Header';
import { MainContainer, Block } from './MainStyle';

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
    background-color: #E3F2FD; /* 연한 파란색 */
    border-radius: 10px;
    padding: 20px;
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.2);
    margin-right: 20px;
    overflow-y: auto;
`;

const DateTitle = styled.h2`
    font-size: 25px;
    margin-bottom: 20px;
    color: #1E88E5; /* 진한 파란색 */
`;

const DateItem = styled.div`
    margin-bottom: 10px;
    padding: 10px;
    background-color: #E3F2FD; /* 연한 파란색 */
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #BBDEFB; /* 중간 파란색으로 변경 */
    }
`;

const NoteContainer = styled(Block)`
    flex: 3;
    background-color: #BBDEFB; /* 중간 파란색 */
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
    background-color: #FFFCF5; /* 기존 색상 유지 */
    pointer-events: none; /* 수정 불가 */
`;


const OpinionPage = () => {
    const [noteContent, setNoteContent] = useState('');

    // 원래는 DB에서 가져와야 하지만 임시로 적어둠
    const dates = [
      new Date("2024-09-10"),
      new Date("2024-09-17"),
      new Date("2024-09-24"),
      new Date("2024-10-03"),
    ];

    // 소견도 원래 DB에서 가져와야 함
    const notesFromDB = {
        "9/10/2024": '홍길동 님은 현재 약물 A, B, C를 복용 중입니다. 증상은 호전되고 있습니다.',
        "9/17/2024": '홍길동 님은 혈압약을 복용 중입니다. 복약 관리를 철저히 할 필요가 있습니다.',
        "9/24/2024": '홍길동 님은 진통제를 복용 중입니다. 추가 진단이 필요합니다.',
        "10/3/2024": '홍길동 님은 항생제를 복용 중이며, 경과를 지켜봐야 합니다.',
    };
  
    const handleDateSelect = (date) => {
        console.log(date.toLocaleDateString());
        setNoteContent(notesFromDB[date.toLocaleDateString()]);
      };

    return (
    <MainContainer>
        <Header />
        <ContentContainer>
            <DateListContainer>
                <DateTitle>날짜 선택</DateTitle>
                {dates.map((date) => (
                <DateItem key={date.toString()} onClick={() => handleDateSelect(date)}>
                    {date.toLocaleDateString()}
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
