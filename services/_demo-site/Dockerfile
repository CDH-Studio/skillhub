FROM node:10.15.3-alpine

RUN mkdir -p /demo
WORKDIR /demo

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "start"]
