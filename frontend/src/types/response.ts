export type responseByKeyword = {
  image: string;
  tweets_list: string[];
  mbti_list: string[];
}

export type responseBySentence = {
  mbti: string;
  image?: string;
}

export type responseByTrend = {
  trend: string;
  tweet: string[];
  mbti: string[];
  image?: string;
}