# 指定基礎映像
FROM node:14

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝相依套件
RUN npm install
RUN npm install esbuild

# 複製專案檔案
COPY . .

# 暴露容器的 3000 埠
EXPOSE 3000

# 運行應用程式
CMD [ "npm", "run", "dev" ]
