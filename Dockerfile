FROM node:alpine

WORKDIR /app

COPY . /app
RUN apk update
RUN apk add nano
RUN yarn
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
