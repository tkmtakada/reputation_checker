import axios from 'axios';
import { responseByTrend } from 'types/response';

// const baseURL = process.env.REACT_APP_BACKEND_API_URL;
const baseURL = "http://127.0.0.1:8000";

export const fetchReputationDataByTrend = (setPost: (post: responseByTrend) => void) => {
  axios
    .get(`http://127.0.0.1:8000/fetch_reputation_data_by_trend`)
    .then((res) => {
      setPost(res.data);
    })
    .catch((err) => "");
};