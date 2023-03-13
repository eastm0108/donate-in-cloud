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
http://localhost:3000/project/{專案 ID}
```

抖內專案頁面

```
http://localhost:3000/donate/{專案 ID}
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

此命令將 Dockerfile 中定義的映像建立為名為 nuxt-app 的映像。

```
docker build -t nuxt-app .
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
