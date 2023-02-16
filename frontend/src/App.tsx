import React, { useState } from 'react';
import styled from 'styled-components';
import { CheckByKeyword } from 'pages/checkbykeyword/CheckByKeyword';

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

const ModeButtonContainer = styled.div`
  height: 200px;
  width: 800px;
  margin: auto;
  // background-color: gray;
  display: flex;
`;

const ModeButton = styled.div`
  height: 100px;
  width: 200px;
  margin: 50px 30px 50px 30px;
  background-color: gray;
  border: solid;
  border-radius: 15px;
  display: flex;
`;

// const StyledFooter = styled.footer`
//   // height: 100px;
//   text-align: center;
//   font-size: 20px;
//   // padding-top: 30px;
// `; 

function App() {
  const [ mode, setMode ] = useState(0);

  return (
    // <div style={backgroundCSS}>
    <div>
      <StyledHeader>
        世間の性格Checker
      </StyledHeader>
      <ModeButtonContainer>
        <ModeButton onClick={() => setMode(0)}>単語を入力する</ModeButton>
        <ModeButton onClick={() => setMode(1)}>世間の性格を調べる</ModeButton>
        <ModeButton onClick={() => setMode(2)}>文章から性格を調べる</ModeButton>
      </ModeButtonContainer>
      <CheckByKeyword mode={mode}/>
      {/* <StyledFooter>
        by team Hampo
      </StyledFooter> */}
    </div>
  );
}

export default App;
