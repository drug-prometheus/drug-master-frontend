import styled from 'styled-components';

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #FFFCF5;
    min-height: 100vh;
    position: relative;
    padding: 20px;
`;

export const MainBlock = styled.div`
  padding: 0px 0px 50px 50px;
`

export const SearchBar = styled.div`
  width: 90%;
  max-width: 1400px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #FFE6B8;
  border-radius: 20px;
  margin-bottom: 20px;
  margin-top: 20px;
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.2);
`;

export const SearchInput = styled.input`
  width: 90%;
  background-color: #FFE6B8;
  padding: 10px;
  border: none;
  border-radius: 10px;
  font-size: 30px;
  outline: none;
`;

export const SearchButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 30px;
`;