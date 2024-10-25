import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

Modal.setAppElement('#root');

const BlackModal = styled(Modal)`
    background-color: #F7F9FC;
    margin: 40px auto;
    width: 80%;
    height: 80%;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    border-color: #F7F9FC;
    transition: transform 0.2s, box-shadow 0.2s;
    overflow-y: auto;
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
`

const Title = styled.h2`
    margin-bottom: 15px;
`;

const Property = styled.div`
    margin: 5px 0;
    font-size: 16px;
`;

const DrugInfoModel = ({isOpen, setIsOpen, drugInfo}) => {

    return (
        <BlackModal
            isOpen={isOpen} 
            onRequestClose={()=>{setIsOpen(false)}} 
            contentLabel="Drug Info Model"
        >
            <Title>{drugInfo.medication_name ?? '해당 없음'}</Title>
            <Property><strong>분류</strong>
            <ReactMarkdown>{drugInfo.properties_classification ?? '해당 없음'}</ReactMarkdown> </Property>
            <Property><strong>증상 치료</strong> 
            <ReactMarkdown>{drugInfo.medical_properties ?? '해당 없음'}</ReactMarkdown></Property>
            <Property><strong>사용 용량</strong> 
            <ReactMarkdown>{drugInfo.usage_capacity ?? '해당 없음'}</ReactMarkdown></Property>
            <Property><strong>부작용</strong> 
            <ReactMarkdown>{drugInfo.side_effects ?? '해당 없음'}</ReactMarkdown></Property>
            <Property><strong>사용 금지</strong> 
            <ReactMarkdown>{drugInfo.prohibition ?? '해당 없음'}</ReactMarkdown></Property>
        </BlackModal>
    );
};

export default DrugInfoModel;
