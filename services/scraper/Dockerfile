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
ENV HOME=/home/scraper
ENV APP_HOME=/home/scraper/code

RUN \
    mkdir -p $HOME && \
    mkdir -p $APP_HOME && \
    mkdir -p $HOME/.ssh && \
    mkdir -p $HOME/.config && \
    useradd -u 10001 -r -g 0 -d $HOME -s /sbin/nologin -c "Docker image user" scraper && \
    chown -R 10001:0 $HOME

WORKDIR $APP_HOME

RUN \
    # So that the dynamic OpenShift user can access $HOME
    chgrp -R 0 $HOME && \
    # So that the dynamic OpenShift user can access $HOME
    chmod -R g=u $HOME && \
    # So that the run.sh script can add the dynamic OpenShift user _as a user_
    # Which is needed because ssh needs a proper user defined to work
    chmod g+w /etc/passwd && \
    # So that git doesn't yell about not having permissions to ~/.config
    chmod -R g+w $HOME/.config/

# Move in the project's dependencies and code
COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 5000
USER 10001

CMD ["sh", "./scripts/run.sh"]
