import styled from 'styled-components';
import { Divider, Typography } from '@mui/material';
import { SearchBox } from "components/SearchBox"
import { useEffect, useState } from 'react';
import { fetchReputationDataByKeyword } from './api/fetchReputationDataByKeyword';
import { responseByKeyword } from 'types/response';
import { MbtiResult } from 'components/MbtiResult';
import React from 'react';
import { Stack } from '@mui/system';
import { TweetMbtiCard } from 'components/TweetMbtiCard';

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
const StyledSection = styled.div`
 font-weight: 899;
 font-size: 48px;
 // color:#1976d2;
 text-decoration: underline;
`;

const StyledWordcloudContainer = styled.div`
  margin: auto;
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
        単語を入力して、<br/>
        単語を含むリアルタイムのtweetの性格を診断してみよう！
      </Typography>  
      <SearchBox setQuery={setQuery} placeholder="単語を入力"/>
      {post ? (
        <StyledResult>
          <>
            <Typography variant="h6">
            「{query}」にまつわるワードクラウド
            </Typography>
            <br/>
            <StyledSection>Wordcloud</StyledSection>
            <StyledWordcloudContainer>
              <img src={`data:image/png;base64,${post.image}`} width="600px" alt="base64"/>
            </StyledWordcloudContainer>
            <br/>
            <StyledSection>Tweets</StyledSection>
            <Typography variant="h6">
              「{query}」を気になっている人たちのMBTI診断結果は...
            </Typography>
            <br/>
            {
              post.tweets_list
                .map((tweet, index) => {
                  return (
                    <TweetMbtiCard tweet={tweet} mbti={post.mbti_list[index]} />
                  )
                })
            }
          </>
        </StyledResult>
      ) : (
        <></>
      )}
    </StyledContainer>
  )
}