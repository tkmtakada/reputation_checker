import styled from 'styled-components';
import { Typography } from '@mui/material';
import { SearchBox } from "components/SearchBox"
import { useEffect, useState } from 'react';
import { fetchReputationDataByKeyword } from './api/fetchReputationDataByKeyword';
import { responseByKeyword } from 'types/response';
import { MbtiResult } from 'components/MbtiResult';

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

export const CheckByKeyword = () => {
  const [ query, setQuery ] = useState("");
  const [ post, setPost ] = useState<responseByKeyword>();

  useEffect(() => {
    if (query) fetchReputationDataByKeyword(query, setPost);
  }, [query]);

  return (
    <StyledContainer>
      <Typography variant="h6">
        気になる単語を入力して、<br/>
        単語に対する世間からのリアルタイムな評判を見てみよう！
      </Typography>  
      <SearchBox setQuery={setQuery} placeholder="単語を入力"/>
      <StyledResult>
        {post ? `「${query}」にまつわるワードクラウド` : ""}
        <br/>
        {post ? `「${query}」を気になっている人たちのMBTI診断結果は...` : ""}
        <br/>
        {post ? <MbtiResult mbti={post.mbti} /> : ""}
      </StyledResult>
    </StyledContainer>
  )
}