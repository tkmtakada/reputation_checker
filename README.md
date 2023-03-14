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

# Frontend/Dockerfileについて
kubernetes使いたかったので追加しました。
[これ](https://zenn.dev/ysmtegsr/articles/258a2ac221a036e18d6b)参考にしてます。

もうすでにDocker Hubにはimageをuploadしておきました。tkmtakada/reputation-checker-reactです。
Docker build の仕方
```
docker build --tag tkmtakada/reputation-checker-react:latest --no-cache . 
docker run --name reputation-checker-react --rm --publish 3000:80 tkmtakada/reputation-checker-react:latest
docker push tkmtakada/reputation-checker-react:latest 
```


```
minikube start
kubectl apply --filename ./deployment-service-react.yaml
minikube service reputation-checker-react
```
で、アプリのデプロイとアドレスの公開までできます

終える時は、
```
kubectl delete --filename ./deployment-service-react.yaml  # stop deployment and service
minikube stop  # stop cluster
minikube delete  # delete cluster
```