import os
import json

import requests
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from mbti_classifier.mbti_classifier import *

# .envファイル内のaccess_tokenを読み込む
load_dotenv()

search_endpoint = "https://api.twitter.com/1.1/search/tweets.json"
trend_endpoint = "https://api.twitter.com/1.1/trends/place.json"

# GETリクエストに含めるヘッダー
headers = {
    "Authorization": f"Bearer {os.environ['ACCESS_TOKEN']}",
    "User-Agent": "api-demo",
}

# 訓練済みBertをロードする
if os.environ.get("USER") == 'takumi':
    model = MBTIClassifier()
else:
    model = lambda x : "INFP"  # 常にINFPを返すダミーモデル

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/search_tweet")
async def test(q="Twitter API 有料化"):
    res = get_tweet(q)
    return JSONResponse(res)


@app.get("/predict_mbti")
async def predict_mbti(text = "Hope!"):
    output = model(text)
    print("INPUT TEXT: ", text)
    print("PREDICTED MBTI: ", output)
    return model(text)

# ツイートを検索
def get_tweet(q):
    # endpointに付けるパラメータ
    params = {"q": q}

    # リクエストを送信し、応答を取得
    response = requests.request("GET", url=search_endpoint, params=params, headers=headers)
    if response.status_code != 200:
        raise Exception("Request returned an error: {} {}".format(response.status_code, response.text))
    return response.text


@app.get("/get_trend")
def get_trend():
    params = {"id": 23424856}

    response = requests.request("GET", url=trend_endpoint, params=params, headers=headers)
    if response.status_code != 200:
        raise Exception("Request returned an error: {} {}".format(response.status_code, response.text))
    res = json.loads(response.text)

    # トレンド単語を10個抽出
    for r in res:
        word = r["trends"][0]["name"]
        # トレンド単語に関するツイートを検索
        related_tweets = get_tweet(word)

    for t in related_tweets["statuses"]:
        print(t["text"])

    return related_tweets
