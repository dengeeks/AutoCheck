FROM node:17-alpine as builder
WORKDIR /react
COPY package.json yarn.lock ./
RUN yarn global add yarn@latest
COPY . .
CMD ["yarn", "build"]