FROM node:13.7.0-alpine3.11

WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn && yarn cache clean && apk add nano

COPY . /app
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
