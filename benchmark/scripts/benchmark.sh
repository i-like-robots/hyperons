#!/bin/sh

count=10000
concurrency=20
server=http://127.0.0.1:3000

export NODE_ENV=production;

npm start & echo $! > benchmark.pid;
sleep 5;

# Create an empty file
date > results.txt;

for endpoint in "hyperapp" "hyperons" "nerv" "preact" "rax" "react"; do
  echo "${endpoint}" >> results.txt;
  ab -k -n "$count" -c "$concurrency" $server/$endpoint | grep "Requests per second:" >> results.txt;
  sleep 5;
done

kill $(cat benchmark.pid) && rm benchmark.pid;

unset NODE_ENV;
