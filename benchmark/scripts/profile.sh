count=10000
concurrency=20
server=http://127.0.0.1:3000

node --prof app.js & echo $! > profile.pid;
sleep 2;

ab -k -n "$count" -c "$concurrency" $server/hyperons;

kill $(cat profile.pid) && rm profile.pid;

node --prof-process --preprocess -j isolate-*.log | flamebearer

# clean up
find isolate-* | xargs rm;
