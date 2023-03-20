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

# Huggingface multilingual Bert 
# https://huggingface.co/bert-base-multilingual-uncased
# uncasedは、小文字大文字を区別しないという意味。

# mBART can be installed from HuggingFace repository
# https://github.com/huggingface/transformers
# https://huggingface.co/docs/transformers/model_doc/mbart
# mBART, M2M, XLM-RoBERTa-XL, XGLM, MT5, mLUKE, 

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
    train_dataset = tokenized_datasets["train"].shuffle(seed=42)  # .select(range(100))
    eval_dataset = tokenized_datasets["test"].shuffle(seed=42)  # .select(range(100))

    # --- load the model ---
    model = BertForSequenceClassification.from_pretrained("bert-base-multilingual-uncased", num_labels=16)
    
    # --- preparation for training ---
    # training_args = TrainingArguments(output_dir="test_trainer")
    metric = evaluate.load("accuracy")

    training_args = TrainingArguments(
        # output_dir="./output_{}".format(datetime.datetime.now()), 
        output_dir="./output",
        evaluation_strategy="epoch",
        num_train_epochs=10,
        per_device_train_batch_size=4,  # 本当は32とか
        per_device_eval_batch_size=4,
        gradient_accumulation_steps=4,
        eval_accumulation_steps=2,
        save_strategy='epoch',
        load_best_model_at_end=True,
        )

    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=train_dataset,
        eval_dataset=eval_dataset,
        compute_metrics=compute_metrics,
    )

    trainer.train()
    print("The program has been successfully finished")