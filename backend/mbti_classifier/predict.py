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

def label2type(label):
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

def tokenize_function(examples):
    return tokenizer(examples["text"], padding="max_length", truncation=True)

def compute_metrics(eval_pred):
    logits, labels = eval_pred
    predictions = np.argmax(logits, axis=-1)
    return metric.compute(predictions=predictions, references=labels)

if __name__=="__main__":
    # --- load the dataset ---
    dataset = datasets.load_dataset('./dataset', data_files={'train': 'mbti_train.csv', 'test': 'mbti_test.csv'})
    tokenizer = AutoTokenizer.from_pretrained("bert-base-multilingual-uncased")    
    tokenized_datasets = dataset.map(tokenize_function, batched=True)

    # --- use small dataset ---
    small_train_dataset = tokenized_datasets["train"].shuffle(seed=42).select(range(100))
    small_eval_dataset = tokenized_datasets["test"].shuffle(seed=42).select(range(100))

    # --- load the model ---
    # --- you can load the model with the code below 
    model = BertForSequenceClassification.from_pretrained("./output/checkpoint-2165")

    text_en = "Replace me by any text you'd like."
    text_ja = "信じられない、本当にできるのか？"
    encoded_input = tokenizer(text_ja, return_tensors='pt')
    output = model(**encoded_input)
    print("logits output is :", output)

    # logits to softmax
    pred = nn.Softmax(dim=1)(output.logits)
    print("prediction probabitily: ", pred)
    print("argmax", torch.argmax(pred))
    print("MBTI type is : ", label2type(torch.argmax(pred).item()))

    """
        # --- preparation for training ---
    # training_args = TrainingArguments(output_dir="test_trainer")
    metric = evaluate.load("accuracy")

    training_args = TrainingArguments(
        # output_dir="./output_{}".format(datetime.datetime.now()), 
        output_dir="./output",
        evaluation_strategy="epoch",
        num_train_epochs=1,
        per_device_train_batch_size=4,  # 本当は32とか
        per_device_eval_batch_size=4,
        gradient_accumulation_steps=4,
        eval_accumulation_steps=2,
        save_strategy='no'        
        )

    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=small_train_dataset,
        eval_dataset=small_eval_dataset,
        compute_metrics=compute_metrics,
    )

    trainer.train()

    # After training, access the path of the best checkpoint like this
    best_ckpt_path = trainer.state.best_model_checkpoint

    print("The program has been successfully finished")
    """
