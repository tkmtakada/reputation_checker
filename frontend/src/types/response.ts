export type responseByKeyword = {
  mbti: string;
  image?: string;
}

export type responseBySentence = {
  mbti: string;
  image?: string;
}

export type responseByTrend = {
  trend: string[];
  tweet: string[];
  mbti: string[];
  mbti_all: string;
  image?: string;
  tweet_index_toShow: number[];
}