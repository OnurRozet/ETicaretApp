# 1. Temel image
FROM node:18

# 2. Çalışma dizini
WORKDIR /app

# 4. package.json kopyalanır
COPY package*.json ./

ENV NODE_ENV=development

# 5. Yerel bağımlılıklar yüklenir
RUN npm install

# 6. Uygulama dosyaları kopyalanır
COPY . .

EXPOSE 3000

# 7. Node ile çalıştır
CMD ["node", "index.js"]
