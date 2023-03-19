import styled from 'styled-components';
import { Typography } from '@mui/material';
import { SearchBox } from "components/SearchBox"
import { useEffect, useState } from 'react';
import { fetchReputationDataByKeyword } from 'pages/checkbykeyword/api/fetchReputationDataByKeyword';
import { fetchReputationDataBySentence } from './api/fetchReputationDataBySentence';
import { MbtiResult } from 'components/MbtiResult';
import { responseBySentence } from 'types/response';

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
  const [ post, setPost ] = useState<responseBySentence>();

  useEffect(() => {
    if (query) fetchReputationDataBySentence(query, setPost);
  }, [query]);
  
  return (
    <StyledContainer>
      <Typography variant="h6">
        入力した文章をMBTI診断してみよう！
      </Typography>  
      <SearchBox setQuery={setQuery} placeholder="文章を入力" width="650px" />
      <StyledResult>
        {post ? `「${query}」` : ""}
        <br/>
        {post ? `のMBTI診断結果は...` : ""}
        <br/>
        {post ? <MbtiResult mbti={post.mbti} /> : ""}
      </StyledResult>
    </StyledContainer>
  )
}