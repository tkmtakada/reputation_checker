import { Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { SearchBox } from './components/SearchBox';

const backgroundCSS = {
  background: 'linear-gradient(-225deg, #2CD8D5 0%, #C5C1FF 56%, #FFBAC3 100%)',
  height: '100vh',
}

const StyledHeader = styled.header`
  height: 100px;
  text-align: center;
  font-size: 50px;
  font-family: 'Cherry Swash', cursive;
  padding-top: 30px;
`;

const StyledContainer = styled.div`
  // background-color: white;
  width: 700px;
  margin: auto;
  height: 70px;
  text-align: center;
  font-size: 20px;
`; 

// const StyledFooter = styled.footer`
//   // height: 100px;
//   text-align: center;
//   font-size: 20px;
//   // padding-top: 30px;
// `; 

function App() {
  return (
    <div style={backgroundCSS}>
      <StyledHeader>
        Word Reputation Checker
      </StyledHeader>
      <StyledContainer>
        <Typography variant="h6">
          気になる単語を入力して、<br/>
          単語に対する世間からのリアルタイムな評判を見てみよう！
        </Typography>  
        <SearchBox />
      </StyledContainer>
      {/* <StyledFooter>
        by team Hampo
      </StyledFooter> */}
    </div>
  );
}

export default App;
