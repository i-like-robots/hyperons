# Server-side rendering benchmark

This is an application used to benchmark various JSX compatible rendering engines. It comprises of a Node.js Web server based upon [Fastify][1] and a script using [Apache Bench][2] to load test and record results. There is also a script to quickly profile and view a flame graph for Hyperons.

[1]: https://github.com/fastify/fastify
[2]: https://httpd.apache.org/docs/2.4/programs/ab.html

## Installation

```sh
$ git clone git@github.com:i-like-robots/hyperons.git
$ cd hyperons/benchmark
$ npm install
```

To help diagnose performance bottlenecks it is also recommended to install [Flamebearer][3] which must be done globally:

```sh
$ npm install -g flamebearer
```

[3]: https://github.com/mapbox/flamebearer

## Usage

To run the benchmark execute the bash script. Before running the benchmark please ensure that any changes made to the Hyperons source code have been bundled.

```sh
$ sh scripts/benchmark.sh
```

If the benchmark gets stuck or errors for any reason the server can be stopped by finding the process ID. This is usually stored as `benchmark.pid`:

```sh
$ kill $(cat benchmark.pid)
```

## Diagnosing performance issues

With Flamebearer installed you can run load test Hyperons alone with Node profiling enabled. This will generate an interactive flame chart:

```js
$ sh scripts/profile.sh
```
