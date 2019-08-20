#!/bin/sh

if ! whoami &> /dev/null; then
    if [ -w /etc/passwd ]; then
        echo "${USER_NAME:-default}:x:$(id -u):0:${USER_NAME:-default} user:${HOME}:/sbin/nologin" >> /etc/passwd
    fi
fi

if [ -w ~/ssh/bitbucket-ssh-key ]; then
    eval $(ssh-agent -s)
    ssh-add ~/ssh/bitbucket-ssh-key
fi

npm run start:prod
