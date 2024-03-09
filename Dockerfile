FROM node:alpine

RUN npm i -g @nestjs/cli

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/main.js" ]