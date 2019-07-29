FROM node:10.15.3

# Install ruby et al to install the github-linguist gem
RUN \
    apt-get update && \
    apt-get install -y cmake pkg-config libicu-dev zlib1g-dev libcurl4-openssl-dev libssl-dev ruby ruby-dev && \
    gem install github-linguist

RUN mkdir -p /backend
WORKDIR /backend

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "start:prod"]
