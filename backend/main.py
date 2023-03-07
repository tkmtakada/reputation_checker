import os
import re
import json
import emoji
import base64
import requests
from io import BytesIO
from dotenv import load_dotenv
from wordcloud import WordCloud
import matplotlib.pyplot as plt
from fastapi import FastAPI, Response
from fastapi.responses import JSONResponse
from fastapi.responses import FileResponse
from fastapi.encoders import jsonable_encoder
from starlette.middleware.cors import CORSMiddleware # 追加
# from janome.tokenizer import Tokenizer
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
    print("!!! NOW DEGUB MODE. MAKE SURE TO LOAD MBTI BERT MODEL FOR PROD MODE. !!!")
    model = lambda x : "INFP"  # MBTIClassifier()
else:
    model = lambda x : "INFP"  # 常にINFPを返すダミーモデル

app = FastAPI()

# CORSを回避するために追加
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True, 
    allow_methods=["*"],    
    allow_headers=["*"]     
)

# ===========================
#    DEFINE UTILITY FUNCTION
# ===========================
# ツイートを検索
def get_tweet(q):
    # endpointに付けるパラメータ
    params = {"q": q}

    # リクエストを送信し、応答を取得
    response = requests.request("GET", url=search_endpoint, params=params, headers=headers)
    if response.status_code != 200:
        raise Exception("Request returned an error: {} {}".format(response.status_code, response.text))
    return response.text



def get_tweets_about_trend():
    params = {"id": 23424856}

    response = requests.request("GET", url=trend_endpoint, params=params, headers=headers)
    if response.status_code != 200:
        raise Exception("Request returned an error: {} {}".format(response.status_code, response.text))
    res = json.loads(response.text)
    print("trend res: ", res)
    
    
    # トレンド単語を10個抽出
    related_tweets = []
    counter = 0
    trend_word_list = []
    for r in res[0]["trends"]:
        word = r["name"]
        # トレンド単語に関するツイートを検索
        print("trend word: ", word)
        related_tweets.append(get_tweet(word))
        trend_word_list.append(word)
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
            # --- 文章中のURL を除去 ---
            tweet = re.sub(r"(https?|ftp)(:\/\/[-_\.!~*\'()a-zA-Z0-9;\/?:\@&=\+\$,%#]+)", "" ,tweet)
            # --- remove emoji ---
            tweet = emoji.replace_emoji(tweet)
            # メンション除去 
            tweet = re.sub(r"@(\w+) ", "", tweet)
            #リツイートを消す
            tweet = re.sub(r"(^RT.*)", "", tweet, flags=re.MULTILINE | re.DOTALL)
            # 不要記号削除
            pattern = '[!"#$%&\'\\\\()*+,-./:;<=>?@[\\]^_`{|}~「」〔〕“”◇ᴗ●↓→♪★⊂⊃※△□◎〈〉『』【】＆＊・（）＄＃＠。、？！｀＋￥％]' 
            tweet = re.sub(pattern, ' ', tweet)
            
            tweets_list.append(tweet)
            # print(t["statuses"]["text"])

    return tweets_list, trend_word_list



# sentence --> byte data of PNG word cloud image
def generate_wordcloud(sentence_list):
    if os.environ.get("USER") == 'riki':        
        fpath='/Users/riki/Downloads/ipag00303/ipag.ttf'#日本語設定＃
    elif os.environ.get("USER") == 'takumi':
        fpath='/home/takumi/Downloads/ipag00303/ipag.ttf'#日本語設定＃
    text = "".join(sentence_list)
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
    byteData = figfile.getvalue()
    base64data = base64.b64encode(byteData).decode()
    print("base64 string; ", base64data)
    return base64data

    # return JSONResponse({"image":base64.b64encode(bdata).decode()})


# ===========================
#    DEFINE CONTROLLOERS
# ===========================
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
            # --- 文章中のURL を除去 ---
            tweet = re.sub(r"(https?|ftp)(:\/\/[-_\.!~*\'()a-zA-Z0-9;\/?:\@&=\+\$,%#]+)", "" ,tweet)
            # --- remove emoji ---
            tweet = emoji.replace_emoji(string)
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
    tweets_info_list = json.loads(get_tweet(keywords))
    tweets_list = []
    for tweet_info in tweets_info_list["statuses"]:
        # print(len(tweets_info_list["statuses"]))
        # print(tweets_info_list["statuses"][0]["text"])
        tweet = tweet_info["text"]
        # --- 文章中のURL を除去 ---
        tweet = re.sub(r"(https?|ftp)(:\/\/[-_\.!~*\'()a-zA-Z0-9;\/?:\@&=\+\$,%#]+)", "" ,tweet)
        # --- remove emoji ---
        tweet = emoji.replace_emoji(tweet)
        # メンション除去 
        tweet = re.sub(r"@(\w+) ", "", tweet)
        #リツイートを消す
        tweet = re.sub(r"(^RT.*)", "", tweet, flags=re.MULTILINE | re.DOTALL)
        # 不要記号削除
        pattern = '[!"#$%&\'\\\\()*+,-./:;<=>?@[\\]^_`{|}~「」〔〕“”◇ᴗ●↓→♪★⊂⊃※△□◎〈〉『』【】＆＊・（）＄＃＠。、？！｀＋￥％]' 
        tweet = re.sub(pattern, ' ', tweet)
        tweets_list.append(tweet)
    
    wordcloud_image = generate_wordcloud(tweets_list)
    mbti_list = [model(tweet) for tweet in tweets_list]
    return JSONResponse({"image": wordcloud_image,
                         "tweets_list": tweets_list,
                         "mbti_list": mbti_list})
    
    
    # #######################
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
    """


@app.get("/fetch_reputation_data_by_sentence")
def fetch_reputation_data_by_sentence(sentence: str):
    # word_cloud, mbti
    wordcloud_image = generate_wordcloud([sentence])
    mbti = model(sentence)
    return JSONResponse({"image": wordcloud_image,
                         "mbti": mbti})

@app.get("/fetch_reputation_data_by_trend")
def fetch_reputation_data_by_trend():
    tweets_list, trend_word_list = get_tweets_about_trend()
    wordcloud_image = generate_wordcloud(tweets_list)
    mbti_list = [model(tweet) for tweet in tweets_list]
    mbti_all = model("".join(tweets_list))
    return JSONResponse({"image": wordcloud_image,
                         "tweet":tweets_list,
                         "mbti":mbti_list,
                         "mbti_all": mbti_all})