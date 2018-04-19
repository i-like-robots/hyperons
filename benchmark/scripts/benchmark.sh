#!/bin/sh

count=10000;
concurrency=20;
server=http://127.0.0.1:3000;

export NODE_ENV=production;

npm start & echo $! > benchmark.pid;
sleep 5;

# Create an empty file
echo "Benchmark run on $(date) with Node $(node -v)" > results.txt;

for module in "hyperapp" "hyperons" "inferno" "nerv" "preact" "rax" "react"; do
  echo "\n${module}@$(npm info $module version)" >> results.txt;
  ab -k -n "$count" -c "$concurrency" $server/$module | grep "Requests per second:" >> results.txt;
  sleep 5;
done

kill $(cat benchmark.pid) && rm benchmark.pid;

unset NODE_ENV;

cat results.txt;
