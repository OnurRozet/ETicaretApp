#1. Temel image
# FROM node:18 AS build
# #2. Çalışma dizini
# WORKDIR /app
# #3. Bağımlılıkların kopyalanması
# COPY package*.json ./
# #4. Bağımlılıkların yüklenmesi
# RUN npm install
# #5. Uygulama dosyalarının kopyalanması
# COPY . .
# RUN npm run build
# FROM nginx:alpine
# COPY --from=build /app/dist/frontend /usr/share/nginx/html
# EXPOSE 80
# #6. Uygulamanın başlatılması
# CMD ["nginx", "-g", "daemon off;"]

FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4200

CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]

