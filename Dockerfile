FROM node:14.11.0-alpine3.12

WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn && yarn cache clean && apk add nano

COPY . /app
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
