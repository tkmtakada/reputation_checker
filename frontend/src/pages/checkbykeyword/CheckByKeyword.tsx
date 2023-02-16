import styled from 'styled-components';
import { Typography } from '@mui/material';
import { SearchBox } from "components/SearchBox"
import { useEffect, useState } from 'react';
import { fetchReputationDataByKeyword } from './api/fetchReputationDataByKeyword';
import { responseByKeyword } from 'types/response';
import ENFJ from "images/mbti/ENFJ.png"
import ENFP from "images/mbti/ENFP.png"
import ENTJ from "images/mbti/ENTJ.png"
import ENTP from "images/mbti/ENTP.png"
import ESFJ from "images/mbti/ESFJ.png"
import ESFP from "images/mbti/ESFP.png"
import ESTJ from "images/mbti/ESTJ.png"
import ESTP from "images/mbti/ESTP.png"
import INFJ from "images/mbti/INFJ.png"
import INFP from "images/mbti/INFP.png"
import INTJ from "images/mbti/INTJ.png"
import INTP from "images/mbti/INTP.png"
import ISFP from "images/mbti/ISFP.png"
import ISFJ from "images/mbti/ISFJ.png"
import ISTJ from "images/mbti/ISTJ.png"
import ISTP from "images/mbti/ISTP.png"

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

export const CheckByKeyword = (props: {mode: number}) => {
  const [ query, setQuery ] = useState("");
  const [ post, setPost ] = useState<responseByKeyword>();

  const {mode} = props;

  useEffect(() => {
    if (query) fetchReputationDataByKeyword(query, setPost);
  }, [query]);

  const ResultMbti = ({ mbti }: { mbti: string }) => {
    switch(mbti) {
      case 'ENFJ': return <img src={ENFJ} />
      case 'ENFP': return <img src={ENFP} />
      case 'ENTJ': return <img src={ENTJ} />
      case 'ENTP': return <img src={ENTP} />
      case 'ESFJ': return <img src={ESFJ} />
      case 'ESFP': return <img src={ESFP} />
      case 'ESTJ': return <img src={ESTJ} />
      case 'ESTP': return <img src={ESTP} />
      case 'INFJ': return <img src={INFJ} />
      case 'INFP': return <img src={INFP} />
      case 'INTJ': return <img src={INTJ} />
      case 'INTP': return <img src={INTP} />
      case 'ISFP': return <img src={ISFP} />
      case 'ISFJ': return <img src={ISFJ} />
      case 'ISTJ': return <img src={ISTJ} />
      case 'ISTP': return <img src={ISTP} />
    }
    return null;
  }

  return (
    <StyledContainer>
      <Typography variant="h6">
        気になる単語を入力して、<br/>
        単語に対する世間からのリアルタイムな評判を見てみよう！
      </Typography>  
      <SearchBox setQuery={setQuery}/>
      <StyledResult>
        {post ? `「${query}」にまつわるワードクラウド` : ""}
        <br/>
        {post ? `「${query}」を気になっている人たちのMBTI診断結果は...` : ""}
        <br/>
        {post ? <ResultMbti mbti={post.mbti} /> : ""}
      </StyledResult>
      {mode}
    </StyledContainer>
  )
}