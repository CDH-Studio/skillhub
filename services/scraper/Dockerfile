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

# Setup a non-root user
RUN \
    mkdir -p /home/scraper && \
    groupadd -r scraper && \
    useradd -r -g scraper -d /home/scraper -s /sbin/nologin -c "Docker image user" scraper

ENV HOME=/home/scraper
ENV APP_HOME=/home/scraper/code

RUN mkdir $APP_HOME && mkdir $HOME/.ssh
WORKDIR $APP_HOME

# Copy in the SSH config
COPY ./vendor/ssh-config $HOME/.ssh/

# Move in the project's dependencies and code
COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 5000
USER scraper

CMD ["npm", "run", "start:prod"]
