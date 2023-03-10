import axios from 'axios';
import { responseByTrend } from 'types/response';

const baseURL = process.env.REACT_APP_BACKEND_API_URL;

export const fetchReputationDataByTrend = (setPost: (post: responseByTrend) => void) => {
  axios
    .get(`${baseURL}/api/get-trend`)
    .then((res) => {
      setPost(res.data);
    })
    .catch((err) => "");
};