import styled from 'styled-components';
import { Typography } from '@mui/material';
import { SearchBox } from "components/SearchBox"
import { useEffect, useState } from 'react';

const StyledContainer = styled.div`
  width: 700px;
  margin: auto;
  height: 70px;
  text-align: center;
  font-size: 20px;
`; 

const StyledResult = styled.div`
  margin: 'auto';
  margin-top: 50px;
`;

export const CheckBySentence = () => {
  const [ query, setQuery ] = useState("");
  const [ post, setPost ] = useState("");

  useEffect(() => {}, []);

  return (
    <StyledContainer>
      <Typography variant="h6">
        入力した文章をMBTI診断してみよう！      </Typography>  
      <SearchBox setQuery={setQuery}/>
      <StyledResult>
        {post ? `「${query}」にまつわるワードクラウド` : ""}
        <br/>
        {post ? `「${query}」を気になっている人たちのMBTI診断結果は...` : ""}
      </StyledResult>
    </StyledContainer>
  )
}