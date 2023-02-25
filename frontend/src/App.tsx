import React, { useState } from 'react';
import styled from 'styled-components';
import { CheckByKeyword } from 'pages/checkbykeyword/CheckByKeyword';
import { Button, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { CheckBySentence } from 'pages/checkbysentence/CheckBySentence';
import { CheckByTrend } from 'pages/checkbytrend/CheckByTrend';

const backgroundCSS = {
  // background: 'linear-gradient(-225deg, #2CD8D5 0%, #C5C1FF 56%, #FFBAC3 100%)',
  height: '100vh',
  width: '800px',
  margin: 'auto'
}

const StyledHeader = styled.header`
  height: 100px;
  text-align: center;
  margin: auto;
  font-size: 50px;
  font-family: 'Cherry Swash', cursive;
  padding-top: 30px;
`;

const ModeButtonContainer = styled.div`
  height: 150px;
  width: 785px;
  margin: auto;
  // background-color: gray;
  display: flex;
`;

function App() {
  const [ mode, setMode ] = useState(0);

  const Mode = ({mode}: {mode: number}) => {
    switch(mode) {
      case 0:
        return <CheckByKeyword />;
      case 1:
        return <CheckByTrend />;
      case 2:
        return <CheckBySentence />;
    }
    return null;
  }

  return (
    <div style={backgroundCSS}>
      <StyledHeader>
        世間の性格Checker
      </StyledHeader>
      <Typography  variant="h5" textAlign={'center'}>モードを選択</Typography>
      <ModeButtonContainer>
        <Stack spacing={2} direction="row">
          <Button variant="outlined" sx={{width:'250px', height:'100px', borderRadius:'15px', fontSize:'20px'}} onClick={() => setMode(0)}>単語を含むツイートの<br/>性格を診断する</Button>
          <Button variant="outlined" sx={{width:'250px', height:'100px', borderRadius:'15px', fontSize:'20px'}} onClick={() => setMode(1)}>今現在の世間の<br/>性格を診断する</Button>
          <Button variant="outlined" sx={{width:'250px', height:'100px', borderRadius:'15px', fontSize:'20px'}} onClick={() => setMode(2)}>入力した文章から<br/>性格を診断する</Button>
        </Stack>
      </ModeButtonContainer>
      <Mode mode={mode}/>
    </div>
  );
}

export default App;
