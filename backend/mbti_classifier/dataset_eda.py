import numpy as np
import pandas as pd 
import emoji

import re
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
import seaborn as sns
import random

def type2label(type_name):
    type_label = {
        'INFJ':0,
        'ENTP':1, 
        'INTP':2, 
        'INTJ':3, 
        'ENTJ':4, 
        'ENFJ':5, 
        'INFP':6, 
        'ENFP':7,
        'ISFP':8, 
        'ISTP':9, 
        'ISFJ':10, 
        'ISTJ':11, 
        'ESTP':12, 
        'ESFP':13, 
        'ESTJ':14, 
        'ESFJ':15
    }
    return type_label[type_name]

def text_preprocess(tweet):
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

    return tweet


d = pd.read_csv("./dataset/mbti_1.csv")



# --- process ---
# 各カテゴリのバランスを均一にする
types = ['INFJ',
        'ENTP',
        'INTP',
        'INTJ',
        'ENTJ',
        'ENFJ',
        'INFP',
        'ENFP',
        'ISFP',
        'ISTP',
        'ISFJ',
        'ISTJ',
        'ESTP',
        'ESFP',
        'ESTJ',
        'ESFJ',]
target_types = ['INFP', 'INFJ', 'INTP', 'INTJ']
# target_types = ['INFP', 'INFJ', 'INTP', 'INTJ', 'ENTP', 'ENFP']
indices = []
for t in types:
    idx = (d.type == t)
    idx_lst = d[idx].index.tolist()
    if t in target_types:
        idx_lst = random.sample(idx_lst, 1000)
    indices.extend(idx_lst)

d = d.loc[indices, :]
cnt_srs = d['type'].value_counts()



# ----------------

d = d.rename(columns={"posts":"text", "type":"label"})
d.label = d.label.apply(type2label)
# d.text = d.text.apply(text_preprocess)

print(d)


mbti_train, mbti_test = train_test_split(d, test_size=0.2)
mbti_train.to_csv("./dataset/mbti_train.csv")
mbti_test.to_csv("./dataset/mbti_test.csv")