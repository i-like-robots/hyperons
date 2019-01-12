#!/bin/sh

export NODE_ENV=production;

# Create an empty file
echo "Benchmark run on $(date) with Node $(node -v)" > results.txt;

echo "\nUsing:" >> results.txt

for module in "hyperapp" "hyperons" "inferno" "nervjs" "preact" "rax" "react" "vdo"; do
  echo " - ${module}@$(npm info $module version)" >> results.txt;
done

echo "\nResults:" >> results.txt

node benchmark.js >> results.txt

unset NODE_ENV;

cat results.txt;
