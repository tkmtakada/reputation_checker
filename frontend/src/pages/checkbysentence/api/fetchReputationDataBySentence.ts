import axios from 'axios';
import { responseBySentence } from 'types/response';

const baseURL = process.env.REACT_APP_BACKEND_API_URL;

export const fetchReputationDataBySentence = (query: string, setPost: (post: responseBySentence) => void) => {
  axios
    .get(`${baseURL}/api/check-reputation-by-sentence?text=${query}`)
    .then((res) => {
      setPost(res.data);
    })
    .catch((err) => "");
};