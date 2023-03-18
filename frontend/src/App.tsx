import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CheckByKeyword } from 'pages/checkbykeyword/CheckByKeyword';
import { Button, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { CheckBySentence } from 'pages/checkbysentence/CheckBySentence';
import { CheckByTrend } from 'pages/checkbytrend/CheckByTrend';
// import raw_text from `${process.env.PUBLIC_URL}/hostname.text`;
// import { text} from "./getHostname";

type variantType = "text" | "contained" | "outlined" | undefined

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
  const [ hostname, setHostname] = useState("");

  const [ variantB1, setVariantB1 ] = useState<variantType>("contained");
  const [ variantB2, setVariantB2 ] = useState<variantType>("outlined");
  const [ variantB3, setVariantB3 ] = useState<variantType>("outlined");

  const getHostname = async () => {
    const reponse = await fetch(`${process.env.PUBLIC_URL}/hostname.txt`);
    const text = await reponse.text();
    setHostname(text);
    return text;
  };

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

  const handleClickB1 = () => {
    setMode(0)
    setVariantB1("contained")
    setVariantB2("outlined")
    setVariantB3("outlined")
  }

  const handleClickB2 = () => {
    setMode(1)
    setVariantB1("outlined")
    setVariantB2("contained")
    setVariantB3("outlined")
  }

  const handleClickB3 = () => {
    setMode(2)
    setVariantB1("outlined")
    setVariantB2("outlined")
    setVariantB3("contained")
  }

  useEffect(
    () => {
      getHostname();
    }, [hostname]
  );

  return (
    <div style={backgroundCSS}>
      <div>{`pod name : ${hostname}`}</div>
      <StyledHeader>
        世間の性格Checker
      </StyledHeader>
      <Typography  variant="h5" textAlign={'center'}>モードを選択</Typography>
      <ModeButtonContainer>
        <Stack spacing={2} direction="row">
          <Button variant={variantB1} color="info" sx={{width:'250px', height:'100px', borderRadius:'15px', fontSize:'20px'}} onClick={handleClickB1}>単語を含むツイートの<br/>性格を診断する</Button>
          <Button variant={variantB2} color="info" sx={{width:'250px', height:'100px', borderRadius:'15px', fontSize:'20px'}} onClick={handleClickB2}>今現在の世間の<br/>性格を診断する</Button>
          <Button variant={variantB3} color="info" sx={{width:'250px', height:'100px', borderRadius:'15px', fontSize:'20px'}} onClick={handleClickB3}>入力した文章から<br/>性格を診断する</Button>
        </Stack>
      </ModeButtonContainer>
      <Mode mode={mode}/>
    </div>
  );
}

export default App;
