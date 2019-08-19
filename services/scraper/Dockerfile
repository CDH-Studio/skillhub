# Have to use 19.04 since the latest version of the deb packaged github-linguist
# depends on some other packages that are only available in the 19.04 repositories
FROM ubuntu:19.04

# Copy in the latest deb packaged version of github-linguist
COPY ./vendor/ruby-github-linguist_6.4.0-2_amd64.deb /tmp/

# Install ruby and the github-linguist package
RUN \
    apt-get update && \
    apt-get install -y ruby ruby-dev curl git && \
    apt-get install -y -f /tmp/ruby-github-linguist_6.4.0-2_amd64.deb

# Install node and npm
RUN \
    curl -sL https://deb.nodesource.com/setup_10.x | bash && \
    apt-get install -y nodejs

RUN mkdir -p /backend

WORKDIR /backend

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "start:prod"]
