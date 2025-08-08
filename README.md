シンプル動画配信サーバー  
リポジトリルートのvideosディレクトリにmp4を設置すると、`http://localhost:3000/videos/[動画ファイル名]` にて配信されます  

```
npm install
npm run dev

# ポート指定の場合
npm run dev -- -p 3001
npm run start -- -p 3001

# ブラウザで開く http://localhost:3000
```

