#!/bin/sh

count=10000
concurrency=20
server=http://127.0.0.1:3000

export NODE_ENV=production;

npm start & echo $! > app.pid; sleep 5;

date > results.txt

echo "\nHyperapp" >> results.txt;
ab -k -n "$count" -c "$concurrency" $server/hyperapp | grep "Requests per second:" >> results.txt;
sleep 5;

echo "\nHyperons" >> results.txt;
ab -k -n "$count" -c "$concurrency" $server/hyperons | grep "Requests per second:" >> results.txt;
sleep 5;

echo "\nNerv" >> results.txt;
ab -k -n "$count" -c "$concurrency" $server/nerv | grep "Requests per second:" >> results.txt;
sleep 5;

echo "\nPreact" >> results.txt;
ab -k -n "$count" -c "$concurrency" $server/preact | grep "Requests per second:" >> results.txt;
sleep 5;

echo "\nRax" >> results.txt;
ab -k -n "$count" -c "$concurrency" $server/rax | grep "Requests per second:" >> results.txt;
sleep 5;

echo "\nReact" >> results.txt;
ab -k -n "$count" -c "$concurrency" $server/react | grep "Requests per second:" >> results.txt;
sleep 5;

kill $(cat app.pid) && rm app.pid

unset NODE_ENV;
