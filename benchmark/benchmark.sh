#!/bin/sh

count=10000
concurrency=20
server=http://127.0.0.1:3000

npm start & echo $! > app.pid; sleep 5 ;

date > results.txt

echo "hyperapp" >> results.txt ;
ab -k -n "$count" -c "$concurrency" $server/hyperapp | grep "Requests per second:" >> results.txt ;
sleep 5 ;

echo "hyperons" >> results.txt ;
ab -k -n "$count" -c "$concurrency" $server/hyperons | grep "Requests per second:" >> results.txt ;
sleep 5 ;

echo "nerv" >> results.txt ;
ab -k -n "$count" -c "$concurrency" $server/nerv | grep "Requests per second:" >> results.txt ;
sleep 5 ;

echo "preact" >> results.txt ;
ab -k -n "$count" -c "$concurrency" $server/preact | grep "Requests per second:" >> results.txt ;
sleep 5 ;

echo "rax" >> results.txt ;
ab -k -n "$count" -c "$concurrency" $server/rax | grep "Requests per second:" >> results.txt ;
sleep 5 ;

echo "react" >> results.txt ;
ab -k -n "$count" -c "$concurrency" $server/react | grep "Requests per second:" >> results.txt ;
sleep 5 ;

kill $(cat app.pid) && rm app.pid
