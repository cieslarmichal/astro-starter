FROM node:26.8.1-alpine AS base

# libc6-compat: sharp (Astro's image service, used by astro:assets at build
# time) ships glibc-linked prebuilt binaries that need this shim on Alpine's musl.
RUN apk update && apk add --no-cache libc6-compat

WORKDIR /app

FROM base AS installer

# production only when explicitly passed (see fly-production.toml); every other
# build - local, CI, staging - stays on staging. Mirrors src/config.ts.
ARG BUILD_ENV=staging
ENV BUILD_ENV=$BUILD_ENV

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:1.31.5 AS static

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx/security-headers.conf /etc/nginx/security-headers.conf
COPY --from=installer /app/dist /usr/share/nginx/html
