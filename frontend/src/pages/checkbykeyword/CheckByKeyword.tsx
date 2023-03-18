import styled from 'styled-components';
import { Divider, Typography } from '@mui/material';
import { SearchBox } from "components/SearchBox"
import { useEffect, useState } from 'react';
import { fetchReputationDataByKeyword } from './api/fetchReputationDataByKeyword';
import { responseByKeyword } from 'types/response';
import { MbtiResult } from 'components/MbtiResult';
import React from 'react';
import { Stack } from '@mui/system';

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
            <StyledWordcloudContainer>
              <img src={`data:image/png;base64,${post.image}`} width="350px" alt="base64"/>
            </StyledWordcloudContainer>
            <br/>
            <Typography variant="h6">
              「{query}」を気になっている人たちのMBTI診断結果は...
            </Typography>
            <br/>
            {
              post.tweets_list
                .map((tweet, index) => {
                  return (
                    <React.Fragment key={index}>
                      <Stack
                        direction={'row'}
                        spacing={2}
                        justifyContent="center"
                        alignItems="center"
                      > 
                        <Typography variant="h6">
                          {tweet}
                        </Typography>
                        <br/>
                        <MbtiResult mbti={post.mbti_list[index]} />
                        <br/>
                      </Stack>
                    </React.Fragment>
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