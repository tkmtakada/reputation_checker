import os
import json

import requests
from dotenv import load_dotenv
from fastapi import FastAPI, Response
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.responses import FileResponse

from starlette.middleware.cors import CORSMiddleware # 追加

from wordcloud import WordCloud
import matplotlib.pyplot as plt
# from janome.tokenizer import Tokenizer
from io import BytesIO
import base64
# from pdb import set_trace as db


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
    # from mbti_classifier.mbti_classifier import *
    model = lambda x : "INFP"  # MBTIClassifier()
else:
    model = lambda x : "INFP"  # 常にINFPを返すダミーモデル

app = FastAPI()

# CORSを回避するために追加（今回の肝）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,   # 追記により追加
    allow_methods=["*"],      # 追記により追加
    allow_headers=["*"]       # 追記により追加
)

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/search_tweet")
async def test(q="Twitter API 有料化"):
    res = get_tweet(q)
    return JSONResponse(res)

@app.get("/get_wordcloud")
# send bytes data
# https://fastapi.tiangolo.com/ja/advanced/custom-response/
# https://qiita.com/honda28/items/85e653afccb9d387b522
async def get_wordcloud(text="桜　満開"):
    if os.environ.get("USER") == 'riki':        
        fpath='/Users/riki/Downloads/ipag00303/ipag.ttf'#日本語設定＃
    elif os.environ.get("USER") == 'takumi':
        fpath='/home/takumi/Downloads/ipag00303/ipag.ttf'#日本語設定＃
    wordcloud=WordCloud(
    height=600,
    width=900,
    background_color="white",
    max_words=6,
    min_font_size=40,
    max_font_size=200,
    collocations=False,
    font_path=fpath,
    ).generate(text)
    plt.figure(figsize=(15,12))
    plt.imshow(wordcloud)
    plt.axis("off")
    figfile = BytesIO()
    plt.savefig(figfile)
    bdata = figfile.getvalue()
    print(type(bdata))
    print("base64 string; ", base64.b64encode(bdata).decode())

    return JSONResponse({"image":base64.b64encode(bdata).decode()})
    # return Response(content=bdata, media_type="/image/png")  # ダウンロードされる
    # return Response(content=bdata)  # , media_type="/image/png")

    # https://github.com/yoheiMune/frontend-playground/tree/master/024-multipart-form-data#post-body-1
    # 参考
    # return Response(content=bdata, media_type="/multipart/form-data; boundary=----WebKitFormBoundaryO5quBRiT4G7Vm3R7")  # ダウンロードされる


@app.get("/predict_mbti")
async def predict_mbti(text = "Hope!"):
    output = model(text)
    print("INPUT TEXT: ", text)
    print("PREDICTED MBTI: ", output)
    return JSONResponse({"mbti": output})

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
    print("trend res: ", res)
    
    
    # トレンド単語を10個抽出
    related_tweets = []
    counter = 0
    for r in res[0]["trends"]:
        word = r["name"]
        # トレンド単語に関するツイートを検索
        print("trend word: ", word)
        related_tweets.append(get_tweet(word))
        counter += 1
        if counter >= 10: break

    print("related_tweets", json.loads(related_tweets[0]).keys())
    json_tweet = json.loads(related_tweets[0])
    print("related_tweets", json_tweet["statuses"][0]["text"])

    # db()

    tweets_list = []
    for str_tweet_list_per_keyword in related_tweets:
        tweet_list_per_keyword = json.loads(str_tweet_list_per_keyword)["statuses"]
        for tweet_info in tweet_list_per_keyword:
            tweet = tweet_info["text"]
            tweets_list.append(tweet)
            # print(t["statuses"]["text"])

    return tweets_list

@app.get("/fetch_reputation_data_by_keywords")
def fetch_reputation_data_by_keywords(keywords : str):
    """
    1 関連するツイートを取得
    2 ワードクラウドをつくる＆画像をかえす
    3 MBTIをかえす
    """
    print(keywords)
    res = get_wordcloud("a b c d ef f")

    # 
    if os.environ.get("USER") == 'riki':        
        fpath='/Users/riki/Downloads/ipag00303/ipag.ttf'#日本語設定＃
    elif os.environ.get("USER") == 'takumi':
        fpath='/home/takumi/Downloads/ipag00303/ipag.ttf'#日本語設定＃
    wordcloud=WordCloud(
    height=600,
    width=900,
    background_color="white",
    max_words=6,
    min_font_size=40,
    max_font_size=200,
    collocations=False,
    font_path=fpath,
    ).generate(" 桜　満開")
    plt.figure(figsize=(15,12))
    plt.imshow(wordcloud)
    plt.axis("off")
    figfile = BytesIO()
    plt.savefig(figfile)
    bdata = figfile.getvalue()
    print(type(bdata))
    print("base64 string; ", base64.b64encode(bdata).decode())

    b64str = base64.b64encode(bdata).decode()
    

    return JSONResponse({"mbti": "INFP",
                        "image": b64str })