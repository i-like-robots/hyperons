# Server-side rendering benchmark

This is an application used to benchmark compatible JSX rendering engines. It comprises of a Node.js Web server based upon [Fastify][1] and a script using [Apache Bench][2] to load test and record the results. There is also a script to quickly profile and view a flame graph for Hyperons.

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

### Running the benchmark

Before running the benchmark please ensure that any changes made to the Hyperons source code have been bundled. To run the benchmark, execute the benchmark commands in the scripts folder. This will write the result to a text file:

```sh
$ sh scripts/benchmark.sh
```

### Diagnosing performance issues

With Flamebearer installed you can run a load test for a module with Node profiling enabled. This will automatically generate an interactive flame chart once complete. To profile Hyperons you can run the profile commands in the scripts folder:

```sh
$ sh scripts/profile.sh
```

### Benchmarking changes in development

```sh
$ node development.js
```

## Modules

### Currently tested packages

- hyperapp<sup>\*</sup>
- hyperons
- inferno
- nerv
- preact
- rax
- react
- vdo

\* Usage of Hyperapp depends on a small modification to compositional components to accept children as a second argument rather than receiving them appended to props.

### Incompatible or non-operable packages

The following packages have been investigated but are incomptible or are unable to render the test components correctly without requiring significant changes:

- `anujs`, rewrites globals and causes other modules to error
- `domvm`, does not support compositional components
- `hyperdom`, does not support compositional components
- `hyperscript`, does not support compositional components
- `qreact`, errors
- `vhtml`, does not support mapping of attributes or setting of inner HTML
