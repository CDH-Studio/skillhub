#!/bin/sh

n=0

# Tries up to 5 times to perform the migrations
until [ $n -ge 5 ]
do
    timeout -t 5 npm run db:migrate && break
    ((n+=1))
    sleep 2
done
