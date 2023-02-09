import numpy as np
import pandas as pd 
from sklearn.model_selection import train_test_split

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

d = pd.read_csv("./dataset/mbti_1.csv")
d = d.rename(columns={"posts":"text", "type":"label"})
d.label = d.label.apply(type2label)

print(d)
mbti_train, mbti_test = train_test_split(d, test_size=0.2)
mbti_train.to_csv("./dataset/mbti_train.csv")
mbti_test.to_csv("./dataset/mbti_test.csv")