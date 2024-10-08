import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { MainBlock, MainContainer } from './\bGeneralStyle';
import Header from './Header';
import './IntroductionPage.css';

const IntroductionPage = () => {
  return (
    <MainContainer>
        
      {/* 헤더 섹션 */}
      <Header />
                    
      {/* 사업 소개 섹션 */}
      <Section className="oddSection" title="사업 소개">
        <SubTitle title="다제약물 관리사업" />
        <DescriptionBlock />
      </Section>

      {/* 주체 섹션 */}
      <Section className="evenSection" title="주체">
        <div className='subjectContainer'>
          <div className='subjectItem'>
            <img src='국민건강보험.png' style={{ width: '300px', height: '150px', background: '#FFFFFF', borderStyle: 'solid', borderColor: '#000000', borderWidth: '2px'}}/>
            <div>국민건강보험공단</div>
          </div>
          <div className='subjectItem'>
            <img src='대한약사회.png' style={{ width: '300px', height: '150px', background: '#FFFFFF', borderStyle: 'solid', borderColor: '#000000', borderWidth: '0.5px'}}/>
            <div>대한약사회</div>
          </div>
        </div>
      </Section>

      {/* 대상 섹션 */}
      <Section className="oddSection" title="대상">
        <TargetSection />
      </Section>

      {/* 방식 섹션 */}
      <Section className="evenSection" title="방식">
        <MethodSection />
      </Section>

      {/* 특징 섹션 */}
      <Section className="oddSection" title="특징">
        <Features />
      </Section>
    </MainContainer>
  );
};

// Section 컴포넌트 (공통 섹션 레이아웃)
const Section = ({ className, title, children }) => (
  <div className={className}>
    <h2>{title}</h2>
    {children}
  </div>
);

// SubTitle 컴포넌트
const SubTitle = ({ title }) => (
  <h3 className='subTitle'>{title}</h3>
);

// DescriptionBlock 컴포넌트 (사업 소개 설명)
const DescriptionBlock = () => (
  <div className='descriptionBlock'>
    <div className='descriptionItem'>
      <div className='numberCircle'>1</div>
      <p>
        65세 이상 어르신에게는 치매고위험군에서 중기, 복약 순응도가
        낮은 경우의 약물 조정
      </p>
    </div>
    <div className='descriptionItem'>
      <div className='numberCircle'>2</div>
      <p>
        부작용을 감소하고 약물 문제를 감소하여 주된 건강 관리 목표 달성에
        도움
      </p>
    </div>
    <div className='descriptionItem'>
      <div className='numberCircle'>3</div>
      <p>
        총 4회에 걸쳐 약사와 가정 방문 상담과 약물 교육을 통한
        우울증, 불면증 등의 약물 조정
      </p>
    </div>
  </div>
);

// TargetSection 컴포넌트 (대상 섹션)
const TargetSection = () => (
  <div className='targetSection'>
    <div className='targetItem'>건강보험 가입자</div>
    <div className='arrow'>&rarr;</div>
    <div className='targetItem'>13개 만성질환 중 1개 이상 질환 보유</div>
    <div className='arrow'>&rarr;</div>
    <div className='targetItem'>10개 이상 약물 복용</div>
  </div>
);

// MethodSection 컴포넌트 (방식 섹션)
const MethodSection = () => (
  <div className='methodSection'>
    <div className='methodItem'>
      <img src="method1.png" alt="1차 방문상담" />
      <p>1차 방문상담</p>
    </div>
    <div className='methodItem'>
      <img src="method2.png" alt="2차 유선상담" />
      <p>2차 유선상담</p>
    </div>
    <div className='methodItem'>
      <img src="method3.png" alt="3차 유선상담" />
      <p>3차 유선상담</p>
    </div>
    <div className='methodItem'>
      <img src="method4.png" alt="4차 방문상담" />
      <p>4차 방문상담</p>
    </div>
  </div>
);

// Features 컴포넌트 (특징 섹션)
const Features = () => (
  <div className='featureSection'>
    <div className='featureItem'>
      <div className='numberCircle'>1</div>
      <p>건강보험공단의 데이터를 이용하여 상담</p>
    </div>
    <div className='featureItem'>
      <div className='numberCircle'>2</div>
      <p>약물 교육을 통한 우울증, 약물 조정</p>
    </div>
  </div>
);


export default IntroductionPage;
