FROM node:lts-buster

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

RUN yarn install

COPY . /app

EXPOSE 8080
ENTRYPOINT [ "./entrypoint.sh" ]