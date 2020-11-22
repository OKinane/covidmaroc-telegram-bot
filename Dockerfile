FROM node:12-alpine
ENV NODE_ENV production
WORKDIR /usr/app
COPY ["package.json", "yarn.lock", "tsconfig.json","./"]

RUN yarn install
COPY . .

RUN yarn build

CMD [ "yarn", "start" ]