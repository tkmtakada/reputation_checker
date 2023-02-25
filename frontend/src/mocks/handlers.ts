import { rest } from "msw";
import response_check_by_keyword from "./data/response_check_by_keyword.json";
import response_check_by_sentence from "./data/response_check_by_sentence.json";
import response_check_by_trend from "./data/response_check_by_trend.json";

const baseURL = process.env.REACT_APP_BACKEND_API_URL;

export const handlers = [
  rest.get(`${baseURL}/api/check-reputation-by-keyword`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(response_check_by_keyword));
  }),

  rest.get(`${baseURL}/api/check-reputation-by-sentence`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(response_check_by_sentence));
  }),

  rest.get(`${baseURL}/api/get-trend`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(response_check_by_trend));
  }),
]