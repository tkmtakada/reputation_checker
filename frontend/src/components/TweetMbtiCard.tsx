import React from 'react'
import styled from 'styled-components';
import { MbtiResult } from 'components/MbtiResult';


type PropsType = {
	tweet: string,
	mbti: string
};

const StyledCard = styled.div`
	padding: 30px;
	margin: 24px;
  background-color: #f5f5f5;
	display: flex;
`;

const StyledTweet = styled.div`
	background-color: yellow;
	width : 300px;
  word-wrap: break-word;
`;

const StyledMbti = styled.div`
	margin-left: 32px;
	font-weight: 900;
`;


export const TweetMbtiCard = (props : PropsType) => {
	const {tweet, mbti} = props;
	return (
		<StyledCard>
			<StyledTweet>{tweet}</StyledTweet>
			<MbtiResult mbti={mbti} width="350px"/> 
		</StyledCard>
	);
};