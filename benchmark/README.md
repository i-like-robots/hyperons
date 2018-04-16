# Server-side rendering benchmark

This is an application used to benchmark various JSX compatible rendering engines. It comprises of a Node.js Web server based upon [Fastify][1] and a script using [Apache Bench][2] to load test and record results.

[1]: https://github.com/fastify/fastify
[2]: https://httpd.apache.org/docs/2.4/programs/ab.html

## Setup

```sh
# install application depdendencies
$ npm install

# run benchmark
$ sh benchmark.sh
```

## Other tools

To help diagnose performance bottlenecks it is recommended to use [Node Clinic][3] and/or [Flamebearer][4].

[3]: https://github.com/nearform/node-clinic
[4]: https://github.com/mapbox/flamebearer
