import axios from 'axios';
import { responseByKeyword } from 'types/response';

const baseURL = process.env.REACT_APP_BACKEND_API_URL;

export const fetchReputationDataByKeyword = (query: string, setPost: (post: responseByKeyword) => void) => {
  // response...ワードクラウドの写真、性格文字列、ツイート文字列
  axios
    .get(`${baseURL}/api/check-reputation-by-keyword?word=${query}`)
    .then((res) => {
      setPost(res.data);
    })
    .catch((err) => "");
};