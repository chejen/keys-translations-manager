FROM node:alpine

WORKDIR /app

COPY . /app
RUN apk update
RUN apk add nano
RUN yarn
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
