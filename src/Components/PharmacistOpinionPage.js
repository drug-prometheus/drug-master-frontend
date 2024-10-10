// 약사 화면. 약사 소견 작성, 수정 및 관리 화면.

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import { MainContainer } from './\bGeneralStyle';

const ContentContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 90%;
    max-width: 1600px;
    margin-top: 30px;
`;

const PatientListContainer = styled.div`
    width: 200px;
    background-color: #FFFCF5;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.2);
    margin-right: 20px;
`;

const PatientTitle = styled.h2`
    font-size: 25px;
    margin-bottom: 20px;
`;

const PatientItem = styled.div`
    margin-bottom: 10px;
    padding: 10px;
    background-color: #FFFCF5;
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #e9e9e9;
    }
`;

const NoteContainer = styled.div`
    flex: 1;
    background-color: #FFE6B8;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.2);
    position: relative;
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
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.2);
    border: 1px solid #ddd;
    outline: none;
    resize: none;
    background-color: ${(props) => (props.editable ? '#FFFCF5' : '#FFFCF5')};
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
    background-color: #FCAB16;
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.2);
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
`;

const SaveButton = styled.button`
    font-size: 20px;
    padding: 10px 20px;
    background-color: #FCAB16;
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.2);
    color: black;
    border: none;
    border-radius: 10px;
    cursor: pointer;
`;

const PharmacistOpinionPage = () => {
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [noteContent, setNoteContent] = useState('');
    const [isEditable, setIsEditable] = useState(false);
    const location = useLocation();
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
      const queryParams = new URLSearchParams(location.search);
    const patientName = queryParams.get('patientName');
      useEffect(() => {
        if (patientName != null){
            handlePatientSelect(patientName + " 님")
        }
      }, []);

    return (
    <MainContainer>
        <Header />
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
