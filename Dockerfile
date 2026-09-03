FROM node:22-alpine AS base

WORKDIR /app

FROM base AS installer

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:1.30.0 AS static

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx/security-headers.conf /etc/nginx/security-headers.conf
COPY --from=installer /app/dist /usr/share/nginx/html
