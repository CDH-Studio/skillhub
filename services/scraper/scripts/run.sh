#!/bin/sh

if ! whoami &> /dev/null; then
    if [ -w /etc/passwd ]; then
        echo "${USER_NAME:-default}:x:$(id -u):0:${USER_NAME:-default} user:${HOME}:/sbin/nologin" >> /etc/passwd
    fi
fi

if [ -w ~/ssh/bitbucket-known-hosts ]; then
    cp ~/ssh/bitbucket-known-hosts ~/.ssh/known_hosts
fi

if [ -w ~/ssh/bitbucket-ssh-key ]; then
    cp ~/ssh/bitbucket-ssh-key ~/.ssh/id_rsa
    chmod 400 ~/.ssh/id_rsa
fi

npm run start:prod
