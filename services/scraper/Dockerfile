FROM node:10.15.3

RUN mkdir -p /backend
WORKDIR /backend

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "start:prod"]
