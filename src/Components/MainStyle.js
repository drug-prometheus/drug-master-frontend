import styled from 'styled-components';

export const MainContainer = styled.div`
  background-color: #FFFFFF; // 흰색 배경
  overflow: hidden;
    align-items: center; /* 중앙 정렬 */
    justify-content: center; /* 수평 중앙 정렬 */
`;

export const MainBlock = styled.div`
  padding: 30px 0px 50px 50px;
`

export const Block = styled.div`
  background-color: #F7F9FC; /* 부드러운 색상 */
  margin: 20px;
    padding: 20px; /* 패딩 조정 */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 */
    border-radius: 10px; /* 둥근 모서리 */
    
    transition: transform 0.2s, box-shadow 0.2s;
    flex: 1; /* 블럭들 간의 균일한 크기 유지 */
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* 호버 시 강조 */
  }
`;