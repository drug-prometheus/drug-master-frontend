// 약사 화면. 약사 소견 작성, 수정 및 관리 화면.

import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import { MainContainer, Block } from './MainStyle';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

const ContentContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 90%;
    max-width: 1600px;
    margin-top: 30px;
`;

const PatientListContainer = styled(Block)`
    width: 200px;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.2);
    margin-right: 20px;
`;

const PatientTitle = styled.h2`
    font-size: 25px;
    margin-bottom: 20px;
    color: #003366; 
`;

const PatientItem = styled.div`
    margin-bottom: 10px;
    padding: 10px;
    background-color: #E6F7FF; 
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #B3E0FF; 
    }
`;

const NoteContainer = styled(Block)`
    flex: 3.5;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.2);
    position: relative;
`;

const NoteTitle = styled.h2`
    font-size: 30px;
    margin-bottom: 20px;
    color: #003366; 
`;

const InfoContent = styled.div`
    text-align: center;
    flex: 1;
    width: 100%;
    height: 300px;
    font-size: 16px;
    border-radius: 10px;
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.2);
    background-color: #F7F9FC;
`

const NoteContent = styled.textarea`
    flex: 5;
    width: 100%;
    height: 280px;
    font-size: 16px;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.2);
    border: 1px solid #B3D9FF; 
    background-color: ${(props) => (props.editable ? '#E6F7FF' : '#E6F7FF')}; 
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
    background-color: #007BFF; 
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.2);
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
`;

const SaveButton = styled.button`
    font-size: 20px;
    padding: 10px 20px;
    background-color: #007BFF; 
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.2);
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
`;


const PharmacistOpinionPage = () => {
    const { auth } = useContext(AuthContext);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [noteContent, setNoteContent] = useState('');
    const [isEditable, setIsEditable] = useState(false);
    const location = useLocation();
    const [patients, setPatients] = useState(null);
    const [pillInfos, setPillInfos] = useState([]);

    const loadPatients = ()=>{
        axios.post('/pharmacist-with-patients/', {
            pharmacist: auth.username
        })
            .then((response)=>{
                const temp = [];
                console.log(response.data.patient_names);
                for (const element in response.data.patient_names){
                    temp.push(response.data.patient_names[element]);
                }
                setPatients(temp);
            });
    };

    if (!patients && auth.userType === '약사'){
        loadPatients();
    }

    const loadPillInfos = (patient_name)=>{
        axios.post('/see-medi-info/', {patient_name: patient_name})
            .then((response)=>{
                const temp = [];
                for (const item in response.data){
                    temp.push(response.data[item]);
                }
                setPillInfos(temp);
            })
    }

    const handlePatientSelect = (patient) => {
        setSelectedPatient(patient);
        setIsEditable(false);
        loadPillInfos(patient);
      };
    
      const handleNoteChange = (e) => {
        setNoteContent(e.target.value);
      };
    
      const handleEditClick = () => {
        setIsEditable(true);
      };
    
      const handleSaveClick = () => {
        axios.post('/save-pharmacist-opinion/', {
            patient: selectedPatient,
            opinion: noteContent
        })
        .then(()=>{
            alert('소견이 저장되었습니다.');
            setIsEditable(false);
        })
        .catch((err)=>{
            alert('내용을 확인해주세요.');
        });
      };
      const queryParams = new URLSearchParams(location.search);
    const patientName = queryParams.get('patientName');
      useEffect(() => {
        if (patientName != null){
            handlePatientSelect(patientName)
        }
      }, []);

    return (
    <MainContainer>
        <Header />
        <ContentContainer>
            <PatientListContainer>
                <PatientTitle>환자 관리</PatientTitle>
                {patients?.map((patient) => (
                <PatientItem key={patient} onClick={() => handlePatientSelect(patient)}>
                    {patient + '님'}
                </PatientItem>
                ))}
            </PatientListContainer>
    
            
            <NoteContainer>
                <NoteTitle>{selectedPatient ? `${selectedPatient}님 소견` : '환자를 선택하세요'}</NoteTitle>
                <div style={{display: 'flex', gap: '10px'}}>
                    <InfoContent>
                        <h3>
                            복용하는 약
                        </h3>
                        {
                            pillInfos?.map((pillInfo)=>(
                                <>
                                    {pillInfo.medication_name}
                                    <br/>
                                </>
                            ))
                        }
                    </InfoContent>
                    <NoteContent
                        value={noteContent}
                        onChange={handleNoteChange}
                        editable={isEditable}
                    />
                </div>
                
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
            </NoteContainer>
        </ContentContainer>

    </MainContainer>
    );
};

export default PharmacistOpinionPage;