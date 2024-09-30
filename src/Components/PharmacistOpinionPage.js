// 약사 화면. 약사 소견 작성, 수정 및 관리 화면.

import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f0f0f0;
    min-height: 100vh;
`;

const ContentContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 90%;
    max-width: 1600px;
    margin-top: 30px;
`;

const PatientListContainer = styled.div`
    width: 200px;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-right: 20px;
`;

const PatientTitle = styled.h2`
    font-size: 25px;
    margin-bottom: 20px;
`;

const PatientItem = styled.div`
    margin-bottom: 10px;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #e9e9e9;
    }
`;

const NoteContainer = styled.div`
    flex: 1;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    position: relative; /* NoteContainer 내에서 HomeButton의 위치를 조정하기 위해 relative로 설정 */
`;

const NoteTitle = styled.h2`
    font-size: 30px;
    margin-bottom: 20px;
`;

const NoteContent = styled.textarea`
    width: 100%;
    height: 300px;
    font-size: 16px;
    border-radius: 10px;
    border: 1px solid #ddd;
    outline: none;
    resize: none;
    background-color: ${(props) => (props.editable ? '#ffffff' : '#f0f0f0')};
    pointer-events: ${(props) => (props.editable ? 'auto' : 'none')};
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 10px;
    justify-content: flex-end;
`;

const EditButton = styled.button`
    font-size: 20px;
    padding: 10px 20px;
    background-color: #8365e6;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
`;

const SaveButton = styled.button`
    font-size: 20px;
    padding: 10px 20px;
    background-color: #c6b6fc;
    color: black;
    border: none;
    border-radius: 10px;
    cursor: pointer;
`;

const HomeButton = styled.img`
    width: 50px;
    height: 50px;
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
`;

const PharmacistOpinionPage = () => {
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [noteContent, setNoteContent] = useState('');
    const [isEditable, setIsEditable] = useState(false);
    const navigate = useNavigate();

    // 원래는 DB에서 가져와야 하지만 임시로 적어둠
    const patients = [
      '홍길동 님',
      '김철수 님',
      '이영희 님',
      '박지민 님',
    ];

    // 소견도 원래 DB에서 가져와야 함
    const notesFromDB = {
      '홍길동 님': '홍길동 님은 현재 약물 A, B, C를 복용 중입니다. 증상은 호전되고 있습니다.',
      '김철수 님': '김철수 님은 혈압약을 복용 중입니다. 복약 관리를 철저히 할 필요가 있습니다.',
      '이영희 님': '이영희 님은 진통제를 복용 중입니다. 추가 진단이 필요합니다.',
      '박지민 님': '박지민 님은 항생제를 복용 중이며, 경과를 지켜봐야 합니다.',
    };
  
    const handlePatientSelect = (patient) => {
        setSelectedPatient(patient);
        setNoteContent(notesFromDB[patient]);
        setIsEditable(false);
      };
    
      const handleNoteChange = (e) => {
        setNoteContent(e.target.value);
      };
    
      const handleEditClick = () => {
        setIsEditable(true);
      };
    
      const handleSaveClick = () => {
        // 여기에 DB 저장 로직 추가
        alert('소견이 저장되었습니다.');
        setIsEditable(false);
      };
    
      const goToHome = () => {
        navigate('/');
      };
    
    return (
    <MainContainer>
        <ContentContainer>
            <PatientListContainer>
                <PatientTitle>환자 관리</PatientTitle>
                {patients.map((patient) => (
                <PatientItem key={patient} onClick={() => handlePatientSelect(patient)}>
                    {patient}
                </PatientItem>
                ))}
            </PatientListContainer>
    
            <NoteContainer>
                <NoteTitle>{selectedPatient ? `${selectedPatient} 소견` : '환자를 선택하세요'}</NoteTitle>
                <NoteContent
                    value={noteContent}
                    onChange={handleNoteChange}
                    editable={isEditable}
                />
                <HomeButton
                    src="home.png"
                    alt="홈"
                    onClick={goToHome}
                />
            </NoteContainer>
        </ContentContainer>
        {selectedPatient && (
            <ButtonContainer>
            <EditButton onClick={handleEditClick}>
                약사 소견 입력
            </EditButton>
            {isEditable && (
                <SaveButton onClick={handleSaveClick}>
                소견 저장
                </SaveButton>
            )}
            </ButtonContainer>
        )}
        
    </MainContainer>
    );
};

export default PharmacistOpinionPage;
