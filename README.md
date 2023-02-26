# Reputation CheckerのREADME

## Git運用ルール
フロントチームは`front`、
バックエンド担当は`back`というブランチを切って、そこで開発してください。
完成したら、プルリクエストをお願いします。マージします。



## Frontend　サーバの立ち上げ方

以下のコマンドを打って、ディレクトリを移動します。
```
cd frontend/react-ts-app
```
以下のコマンドを打ちます。
```
npm install
npm start
```

すると、Reactのサーバーが立ち上がります。（npm installで、必要なライブラリを自分のパソコンにダウンロードしています。npm startは、サーバーを起動するコマンドです。）



# MBTI推定器について
Huggingfaceライブラリを用いてmulti-lingual BERTを使っています。今回のタスク用に訓練した後のモデルのcheckpointsはここからダウンロードしてください。
- [checkpoint-best](https://drive.google.com/drive/folders/1EX2AvN2uCNq10e94tbycQ57_TTgsuZot?usp=share_link)

ダウンロードしたフォルダは以下のようになるように置きます。
`backend/mbti_classifier/output/checkpoint-best`
