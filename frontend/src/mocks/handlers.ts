import { rest } from "msw";
import response from "./data/response.json";

export const handlers = [
  rest.get('http://localhost:8080/api/search', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(response));
  }),
]