# 指定基礎映像
FROM node:19-alpine3.17

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝相依套件
RUN npm install

# 複製專案檔案
COPY . .

# 暴露容器的 3000 埠
EXPOSE 3000

# 先 build 後 run app
CMD ["sh","-c", "npm run build && npm run start"]
