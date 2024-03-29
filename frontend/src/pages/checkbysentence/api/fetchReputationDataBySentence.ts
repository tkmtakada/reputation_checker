import axios from 'axios';
import { responseBySentence } from 'types/response';

const baseURL = process.env.REACT_APP_BACKEND_API_URL;
// const baseURL = "http://127.0.0.1:8000";

export const fetchReputationDataBySentence = (query: string, setPost: (post: responseBySentence) => void) => {
  axios
    .get(`${baseURL}/predict_mbti?text=${query}`)    
    .then((res) => {
      console.log(res);
      setPost(res.data);
    })
    .catch((err) => "");
};