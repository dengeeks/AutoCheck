FROM node:17-alpine as builder
WORKDIR /react
COPY package.json package-lock.json ./
RUN npm install -legacy-peer-deps
COPY . .
CMD ["npm","run", "build"]
