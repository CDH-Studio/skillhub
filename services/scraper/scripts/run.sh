#!/bin/sh

if ! whoami &> /dev/null; then
    if [ -w /etc/passwd ]; then
        echo "${USER_NAME:-default}:x:$(id -u):0:${USER_NAME:-default} user:${HOME}:/sbin/nologin" >> /etc/passwd
    fi
fi

if [ -w /home/scraper/ssh2/bitbucket-known-hosts ]; then
    cp /home/scraper/ssh2/bitbucket-known-hosts /home/scraper/.ssh/known_hosts
fi

if [ -w /home/scraper/ssh/bitbucket-ssh-key ]; then
    cp /home/scraper/ssh/bitbucket-ssh-key /home/scraper/.ssh/id_rsa
    chmod 400 /home/scraper/.ssh/id_rsa
fi

npm run start:prod
