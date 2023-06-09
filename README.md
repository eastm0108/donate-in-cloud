# donate-in-cloud Nuxt 3 專案

## Setup

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

開啟後面前只有兩個頁面
抖內專案說明頁面

```
http://localhost:3000/project?？p={專案 ID}&t={token}
```

抖內專案頁面

```
http://localhost:3000/donation？p={專案 ID}&t={token}
```

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

## use dockerfile

此命令將 Dockerfile 中定義的映像建立為名為 donate 的 tag 為 dev 的映像。

```
docker build -t donate:dev .
```

將名為 donate:dev 的本地鏡像打上一個新標籤 eastm0108/donate:dev

```
docker tag donate:dev eastm0108/donate:dev
```

將本地的鏡像推送到 Docker 鏡像倉庫的命令。
eastm0108/donate:dev 是你要推送的鏡像的標識符，其中 eastm0108 是鏡像倉庫的名稱，donate 是鏡像的名稱，dev 是鏡像的標籤。

```
docker push eastm0108/donate:dev
```

此命令將 nuxt-app 映像運行為一個容器，並將容器的 3000 埠映射到主機的 3000 埠。現在，他們可以在瀏覽器中訪問 http://localhost:3000，以測試 Nuxt 3 專案。

```
docker run -p 3000:3000 nuxt-app
```

## use docker compose

在應用程式目錄中運行以下命令來啟動應用程式

```
docker-compose up
```

## 使用 ssh 測試工具

test：預設指定網址

```
ssh -R test:80:localhost:8080 serveo.net
```
