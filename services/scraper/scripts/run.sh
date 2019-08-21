#!/bin/sh

if ! whoami &> /dev/null; then
    if [ -w /etc/passwd ]; then
        echo "${USER_NAME:-default}:x:$(id -u):0:${USER_NAME:-default} user:${HOME}:/sbin/nologin" >> /etc/passwd
    fi
fi

if [ -f /home/scraper/ssh2/bitbucket-known-hosts ]; then
    echo "Copying known hosts"
    cp /home/scraper/ssh2/bitbucket-known-hosts /home/scraper/.ssh/known_hosts
fi

if [ -f /home/scraper/ssh/bitbucket-ssh-key ]; then
    echo "Copying ssh key"
    cp /home/scraper/ssh/bitbucket-ssh-key /home/scraper/.ssh/id_rsa
    chmod 400 /home/scraper/.ssh/id_rsa
fi

npm run start:prod
