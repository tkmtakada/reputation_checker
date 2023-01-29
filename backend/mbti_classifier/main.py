import torch 
import torch.nn as nn
import numpy as np 
import pandas as pd 


class CFG:
    n_epoch = 20
    

class CustomModel(nn.Module):
    def __init__(self):
        super(CustomModel, self).__init__()
        ...
    def forward(self, x):
        ...

def train_fn():
    ...

def valid_fn():
    ...


if __name__=="__main__":
    # load dataset 
    dataset = pd.read_csv("./mbti1.csv")

    train_fn()
    
