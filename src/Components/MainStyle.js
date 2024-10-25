import styled from 'styled-components';

export const MainContainer = styled.div`
  background-color: #FFFFFF;
  overflow: hidden;
    align-items: center;
    justify-content: center;
`;

export const MainBlock = styled.div`
  padding: 30px 0px 50px 50px;
`

export const Block = styled.div`
  background-color: #F7F9FC;
  margin: 20px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  
  transition: transform 0.2s, box-shadow 0.2s;
  flex: 1;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;