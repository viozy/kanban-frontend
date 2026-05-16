# === STAGE 1: Build ===
# Compila o React em arquivos estáticos (HTML/CSS/JS)
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# === STAGE 2: Serve ===
# Usa Nginx pra servir os arquivos estáticos (leve e rápido)
FROM nginx:alpine

# Copia os arquivos compilados pro Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Config customizada do Nginx (pra SPA funcionar + proxy pra API)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
