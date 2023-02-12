import os

import requests
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.responses import JSONResponse

# .envファイル内のaccess_tokenを読み込む
load_dotenv()

endpoint = "https://api.twitter.com/1.1/search/tweets.json"
# GETリクエストに含めるヘッダー
headers = {
    "Authorization": f"Bearer {os.environ['ACCESS_TOKEN']}",
    "User-Agent": "api-demo",
}

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/search_tweet")
async def test(q="Twitter API 有料化"):
    res = get_tweet(q)
    return JSONResponse(res)


# ツイートを検索
def get_tweet(q):
    # endpointに付けるパラメータ
    params = {"q": q}

    # リクエストを送信し、応答を取得
    response = requests.request("GET", url=endpoint, params=params, headers=headers)
    if response.status_code != 200:
        raise Exception("Request returned an error: {} {}".format(response.status_code, response.text))
    return response.text
