node --prof profile.js

node --prof-process --preprocess -j isolate-*.log | flamebearer

# clean up
find isolate-* | xargs rm;
