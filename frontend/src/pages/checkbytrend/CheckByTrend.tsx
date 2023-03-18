import { Button } from '@mui/material'
import styled from 'styled-components';
import { responseByTrend } from 'types/response';
import { useEffect, useState } from 'react';
import { fetchReputationDataByTrend } from './api/fetchReputationDataByTrend';
import { MbtiResult } from 'components/MbtiResult';
import { TweetMbtiCard } from 'components/TweetMbtiCard';


const StyledContainer = styled.div`
  width: 700px;
  margin: auto;
  height: 70px;
  text-align: center;
  font-size: 20px;
`; 



const StyledResult = styled.div`
  // margin: 'auto';
  // margin-top: 50px;
  width: 700px;
  margin: auto;
  height: 70px;  
  font-size: 20px;
`;

const StyledWordcloudContainer = styled.div`
  margin: auto;
`;

const StyledSection = styled.div`
 font-weight: 899;
 font-size: 48px;
 // color:#1976d2;
 text-decoration: underline;
`;

export const CheckByTrend = () => {
  const [ post, setPost ] = useState<responseByTrend>();
  const _post = {trend : ["a", "b", "c"],
                tweet : ["That's so great, I am so amazed how good yo are!! IF possible, can i join the netwrkd nexttime?",
                         "b", 
                         "c"],
                mbti: ["INFP", "INFP", "INFP"],
                mbti_all: "INFP",
                image: "image",
                tweet_index_toShow : [1,2,3]
              }

  const trend_table = (trend_words : string[]) => {
    // const trend_words = ["a", "b", "c"];
    return (
      <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">トレンド</th>
        </tr>
      </thead>
      <tbody>
        {trend_words.map((word, idx) => (
        <tr>
          <th scope="row">{idx + 1}</th>
          <td>{word}</td>
        </tr>
        ))}
    
      </tbody>
    </table>
    );
  }



  const result = (post : responseByTrend) => (

    <>
    <StyledSection>Trend</StyledSection>
    <StyledWordcloudContainer>
      <img src={`data:image/png;base64,${post.image}`} width="600px" alt="base64"/>            
    </StyledWordcloudContainer>
    { trend_table(post.trend) }


    <StyledSection>MBTI</StyledSection>
    <MbtiResult mbti={post.mbti_all} /> 

    <StyledSection>Tweets</StyledSection>
    {post.tweet_index_toShow.map((idx) => (
      <TweetMbtiCard tweet={post.tweet[idx]} mbti={post.mbti[idx]} />
    ))}
    {/*post.tweet.map((elt, idx) => (
      <TweetMbtiCard tweet={elt} mbti={post.mbti[idx]} />
    )) */}
    </>
  );

  console.log(post)
  return (
    <>
    {/* navigation part */}
    <StyledContainer>
      <Button variant='contained' size="large" onClick={() => fetchReputationDataByTrend(setPost)}>
        今のトレンドtweetの性格を診断
      </Button>
    </StyledContainer>

    {/* result */}
      <StyledResult>
        { post ? result(post) : null}

        {/* post? 
          <StyledWordcloudContainer>
            <img src={`data:image/png;base64,${post.image}`} width="350px" alt="base64"/>
          </StyledWordcloudContainer>
          : "" */}

      </StyledResult>
    </>



  )
}