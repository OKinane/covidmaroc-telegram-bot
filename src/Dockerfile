FROM node:12-alpine
ENV NODE_ENV production
WORKDIR /usr/app/src
COPY ["package.json", "package-lock.json", "./"]
RUN npm ci --only=production && mv node_modules ../
COPY . .

CMD [ "node", "app.js" ]