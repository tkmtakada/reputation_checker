import { rest } from "msw";
import response from "./data/response.json";

const baseURL = process.env.REACT_APP_BACKEND_API_URL;

export const handlers = [
  rest.get(`${baseURL}/api/check-reputation-by-keyword`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(response));
  }),
]