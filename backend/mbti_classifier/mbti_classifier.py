import datasets
from datasets import load_dataset
import pandas as pd 
from transformers import AutoTokenizer, DataCollatorWithPadding
from transformers import AutoModelForSequenceClassification, AutoModel, BertForSequenceClassification
from transformers import TrainingArguments
import numpy as np
import evaluate
from transformers import TrainingArguments, Trainer
import datetime
import torch
import torch.nn as nn

class MBTIClassifier(nn.Module):
    def __init__(self):
        super(MBTIClassifier, self).__init__()
        self.tokenizer = AutoTokenizer.from_pretrained("bert-base-multilingual-uncased")
        self.model = BertForSequenceClassification.from_pretrained("./output/checkpoint-2165")

    def forward(self, text_ja):
        encoded_input = self.tokenizer(text_ja, return_tensors='pt')
        output = self.model(**encoded_input)
        predicted_label = nn.Softmax(dim=1)(output.logits)
        predicted_type = self.label2type(torch.argmax(predicted_label).item())
        return predicted_type

    def label2type(self, label):
        label_to_type = {
            0 : 'INFJ',
            1: 'ENTP', 
            2: 'INTP', 
            3: 'INTJ', 
            4: 'ENTJ', 
            5: 'ENFJ', 
            6: 'INFP', 
            7: 'ENFP',
            8: 'ISFP', 
            9: 'ISTP', 
            10: 'ISFJ', 
            11: 'ISTJ', 
            12: 'ESTP', 
            13: 'ESFP', 
            14: 'ESTJ', 
            15: 'ESFJ',
        }
        return label_to_type[label]


if __name__=="__main__":
    model = MBTIClassifier()
    text_ja = "楽しいこと大好き" #  "友達は必要ない"  # "未来、最高！未来、最高！未来、最高！"
    output = model(text_ja)
    print(output)