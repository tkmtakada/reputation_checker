import axios from 'axios';
import { responseByKeyword } from 'types/response';

const baseURL = process.env.REACT_APP_BACKEND_API_URL;

export const fetchReputationDataByKeyword = (query: string, setPost: (post: responseByKeyword) => void) => {
  // response...ワードクラウドの写真、性格文字列、ツイート文字列
  axios
    // .get(`${baseURL}/api/check-reputation-by-keyword?word=${query}`)
    .get(`http://127.0.0.1:8000/fetch_reputation_data_by_keywords?keywords=${query}`)
    .then((res) => {
      setPost(res.data);
    })
    .catch((err) => "");
};