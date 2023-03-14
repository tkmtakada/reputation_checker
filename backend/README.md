# ハッカソン バックエンドサーバー
- [x] Twitter API呼び出し
- [ ] Twitter API経由でのツイート検索
- [ ] WordCloudとMBTIの結果を返すエンドポイント

## 使用ライブラリ
- Poetry
- FastAPI
- Hypercorn
- requests
詳細は[pyproject.toml](pyproject.toml)を参照

## 使い方
以上のライブラリをインストールできたら、以下を実行
`hypercorn main.py`

もしhypercornがうまく動かなかったらuvicorn デモ可能。
