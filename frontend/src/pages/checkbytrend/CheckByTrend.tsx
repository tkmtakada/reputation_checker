import { Button } from '@mui/material'
import styled from 'styled-components';
import { responseByTrend } from 'types/response';
import { useEffect, useState } from 'react';
import { fetchReputationDataByTrend } from './api/fetchReputationDataByTrend';

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

const StyledWordcloudContainer = styled.div`
  margin: auto;
`;

export const CheckByTrend = () => {
  const [ post, setPost ] = useState<responseByTrend>();



  console.log(post)
  return (
    <StyledContainer>
      <Button variant='contained' size="large" onClick={() => fetchReputationDataByTrend(setPost)}>
        今のトレンドtweetの性格を診断
      </Button>
      <StyledResult>
        {post ? `「${post.trend}」にまつわるワードクラウド` : ""}
      </StyledResult>
      {/* wordcloud */}
      {post? 
        <StyledWordcloudContainer>
          <img src={`data:image/png;base64,${post.image}`} width="350px" alt="base64"/>
        </StyledWordcloudContainer>
         : ""}
    </StyledContainer>
  )
}