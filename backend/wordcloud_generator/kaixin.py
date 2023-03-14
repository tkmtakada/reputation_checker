from wordcloud import WordCloud
import matplotlib.pyplot as plt
from janome.tokenizer import Tokenizer
from io import BytesIO
from pdb import set_trace as db

fpath='/Users/riki/Downloads/ipag00303/ipag.ttf'#日本語設定＃
 
text ='簡単 こんにちは 好き 桜 月 太陽 優しい マルチサブネット ユーカリ'
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
plt.savefig("text.png")
figfile = BytesIO()
plt.savefig(figfile)
# plt.show() 
db()