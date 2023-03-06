export type responseByKeyword = {
  mbti: string;
  image?: string;
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