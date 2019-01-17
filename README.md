<p align="center">
  <img alt="Hyperons" src="https://cdn.rawgit.com/i-like-robots/hyperons/4b788429/assets/hyperons.svg" width="400">
</p>

<div align="center">

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/i-like-robots/hyperons/blob/master/LICENSE) [![Build Status](https://travis-ci.org/i-like-robots/hyperons.svg?branch=master)](https://travis-ci.org/i-like-robots/hyperons) [![Coverage Status](https://coveralls.io/repos/github/i-like-robots/hyperons/badge.svg?branch=master)](https://coveralls.io/github/i-like-robots/hyperons) [![npm version](https://img.shields.io/npm/v/hyperons.svg?style=flat)](https://www.npmjs.com/package/hyperons) [![Greenkeeper badge](https://badges.greenkeeper.io/i-like-robots/hyperons.svg)](https://greenkeeper.io/)
</div>

Renders JSX components to static HTML on the server and in the browser.

## Installation

This is a [Node.js][node] module available through the [npm][npm] registry. Before installing, download and install Node.js. Node.js 6 or higher is required.

Installation is done using the [npm install][install] command:

```sh
$ npm install -S hyperons
```

[node]: https://nodejs.org/en/
[npm]: https://www.npmjs.com/
[install]: https://docs.npmjs.com/getting-started/installing-npm-packages-locally

## Features

* Share code between your React single-page apps and plain HTML pages
* Render your components on the server and in the browser
* Blazing fast and tiny code size (1.2kb gzipped)
* Support for CSS stringification, boolean attributes, void elements, fragments, and more
* Render class components or stateless functional components

## Usage

This module provides two functions to create elements and render them. If you've worked with [React][react] before then they're the equivalent to `React.createElement()` and `ReactDOM.renderToString()`.

The example below shows how to render a simple component using Hyperons using vanilla JS syntax:

[react]: https://reactjs.org/

```js
import { h, render } from 'hyperons'

const Welcome = () => (
  h('div', { class: 'welcome-banner' },
    h('h1', null, 'Hello World!'),
    h('p', null, 'This component was rendered with Hyperons'))
)

render(Welcome())
```

Although you can use Hyperons without any complex build pipelines or compilation steps, I'd recommend using [JSX](#jsx) to more succinctly describe your markup. Here is the same component as before but rewritten to use JSX syntax:

```jsx
import { h, render } from 'hyperons'

const Welcome = () => (
  <div class="welcome-banner">
    <h1>Hyperons</h1>
    <p>This component was rendered with Hyperons</p>
  </div>
)

render(<Welcome />)
```

_Please Note_ that the JSX syntax will need to be transpiled to vanilla JS. If you do not wish to implement a build step for your server-side code I recommend checking out [Sucrase] which includes functionality to enable on-the-fly transpilation for `.jsx` files.

[Sucrase]: https://github.com/alangpierce/sucrase

## API

### `h(element[, properties][, ...children])`

The `h()` function accepts the following arguments:

* `element` This can be the name of a HTML element, a function, or a component class
* `properties` An optional object of HTML element attributes. See the [properties documentation](#properties) for more information.
* `...children` An optional number of child elements. See the [children documentation](#children) for more information.

It returns a simple representation of the element.

This method can also be accessed as `createElement(element[, properties][, ...children])`.

### `render(element)`

The `render()` function transforms the output of the `h()` method.

It returns a string of HTML.

This method can also be accessed as `renderToString(element[, properties][, ...children])`.

## Syntax

### Properties

Properties are declared as an object containing [HTML attribute names][attrs] and values. Attribute names will not be transformed so attributes requiring hyphens, such as `aria-*` and `data-*`, should be provided with hyphens.

Since `class` and `for` are [reserved words][words] in JavaScript you may use the aliases `className` and `htmlFor` instead.

Boolean attributes, such as `hidden` or `checked`, will only be rendered if assigned a [truthy][truthy] value. Enumerated attributes which accept the values `"true"` or `"false"`, such as `contenteditable`, will be rendered with their assigned value as a string.

Any framework specific properties such as `key` and `ref` will not be rendered.

[attrs]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
[words]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords
[truthy]: https://developer.mozilla.org/en-US/docs/Glossary/Truthy

### Styles

The `style` attribute accepts a JavaScript object containing CSS properties and values.

Properties may be written in camelCase for consistency with accessing the properties with JavsScript in the browser (e.g. `element.style.marginBottom`). Vendor prefixes other than `ms` should always begin with a capital letter, such as `WebkitHyphens`.

Hyperons will automatically append a `px` suffix to number values, but certain properties will remain unitless (e.g. `z-index` or `order`). If you want to use units other than `px`, you should specify the value as a string including the desired unit. For example:

```jsx
// Input:
const styles = {
  display: 'flex',
  order: 2,
  width: '50%',
  marginBottom: 20,
  WebkitHyphens: 'auto',
}

<div style={styles}></div>

// Output:
<div style="display:flex;order:2;width:50%;margin-bottom:20px;-webkit-hyphens:auto;></div>
```

### HTML entities

Hyperons will escape all strings so if you need to output a HTML entity you may run into issues with double escaping. The simplesy way to work-around this issu is to write the unicode character directly in your code (and use UTF-8 encoding for you source files). Otherwise, you can find the [unicode number][charcode] for the required character. For example:

```jsx
// Incorrect. Outputs: <h1>Mac &amp;amp; Cheese</h1>
<h1>Mac &amp; Cheese</h1>
// Correct. Outputs: <h1>Mac &amp; Cheese</h1>
<h1>Mac & Cheese</h1>
// Correct. Outputs: <h1>Mac &amp; Cheese</h1>
<h1>{`Mac ${String.fromCharCode(38)} Cheese`}</h1>
```

[charcode]: https://www.fileformat.info/info/charset/UTF-8/list.htm

### Children

Components may render any number of child elements. Children can be strings, other components, or a combination of both.

Functions provided to the first argument of Hyperons will have any children appended as an extra `children` property. This functionality allows you to compose components in useful ways.

_Please note_ that child elements will not be rendered for [void elements][void].

```jsx
const Container = ({ children }) => <p>{children}</p>
const html = <Container>{'Hello'}</Container> // Outputs: <p>Hello</p>
```

[void]: https://www.w3.org/TR/html/syntax.html#void-elements

### Class components

Class components are usually used to create components which maintain state or add extra functionality using methods. Hyperons renders static HTML so there is no state nor component lifecycle methods. If you do need to use class components Hyperons does provide a base `Component` class to extend.

```jsx
import { h, Component } from 'hyperons'

class MyComponent extends Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

### Fragments

In React and React-like frameworks components must always return a single enclosing element. But sometimes it is required to return a list of elements, either because you don't need the extra elements or the extra elements would create invalid HTML output. For example, when rendering a description list the title and detail (`<dt>` and `<dd>`) elements are usually grouped in pairs:

```jsx
import { h } from 'hyperons'

function DescriptionList(props) {
  return (
    <dl>
      {props.definitions.map((item) => (
        <dt>{item.title}</dt>
        <dd>{item.description}</dd>
      ))}
    </dl>
  )
}
```

However, most tools will throw an error when evaluating the code above because the title and description elements are not wrapped in an enclosing element. However, wrapping them with an element would result in invalid HTML.

To solve this [React 16.2][react-16] introduced the concept of [fragments][fragments] which enable you to wrap a list of elements without rendering any extra elements. To use fragments in your JSX code Hyperons includes a `Fragment` component:

```jsx
import { h, Fragment } from 'hyperons'

function DescriptionList(props) {
  return (
    <dl>
      {props.definitions.map((item) => (
        <Fragment>
          <dt>{item.title}</dt>
          <dd>{item.description}</dd>
        </Fragment>
      ))}
    </dl>
  )
}
```

[react-16]:  https://reactjs.org/blog/2017/11/28/react-v16.2.0-fragment-support.html
[fragments]: https://reactjs.org/docs/fragments.html

### Inner HTML

Hyperons supports the `dangerouslySetInnerHTML` property to inject unescaped HTML code. This is potentially dangerous and should never be used around any user input, but it can be useful as a last resort.

```jsx
const html = { __html: '<i>Mac &amp; Cheese</i>' }
<div dangerouslySetInnerHTML={html}></div> // Outputs: <div><i>Mac &amp; Cheese</i></div>
```

### JSX

_Not familiar with JSX? Check out [WTF is JSX][wtf] and [JSX in Depth][in-depth] first._

If you're authoring your components with JSX syntax you will need to transpile your code into plain JavaScript in order to run them. Depending on the toolchain you're using there will be different plugins available. Some popular tools to transpile JavaScript are [Babel][babel] (with [the JSX plugin][babel-jsx]) and [Bublé][buble] (with [JSX enabled][buble-jsx]).

Whichever tool you use, you will need to specify the JSX _pragma_ for the transpiler to target. The pragma is the name of the variable you assign Hyperons to. For example, in the code below the pragma is `h`:

[wtf]: https://jasonformat.com/wtf-is-jsx/
[in-depth]: https://reactjs.org/docs/jsx-in-depth.html
[babel]: https://babeljs.io/
[babel-jsx]: https://babeljs.io/docs/plugins/transform-react-jsx/
[buble]: https://github.com/Rich-Harris/buble
[buble-jsx]: https://buble.surge.sh/guide/#jsx

## Project information

### Development

The source code for this module is written in ES6 code and bundled for distribution using [Rollup][rollup]. Tests are written using [Mocha][mocha] as the test runner and [Chai][chai] for assertions. Tests are run in both a Node.js environment and in a browser using [Puppeteer][puppeteer].

[rollup]: https://rollupjs.org/guide/en
[mocha]: https://mochajs.org/
[chai]: http://www.chaijs.com/
[puppeteer]: https://github.com/GoogleChrome/puppeteer

### Benchmarks

This repository contains benchmarking and profiling tools in the `/benchmark` directory. The current results for server-side rendering are below:

```
Benchmark run on Wed 16 Jan 2019 17:47:28 GMT with Node v10.13.0

Using:
 - hyperapp@1.2.9
 - hyperons@0.5.1
 - inferno@7.0.5
 - nervjs@1.3.9
 - preact@8.4.2
 - rax@0.6.7
 - react@16.7.0
 - vdo@4.2.0

Results:
 - Hyperapp x 7,577 ops/sec ±1.72% (92 runs sampled)
 - Hyperons x 11,917 ops/sec ±1.89% (92 runs sampled)
 - Inferno x 9,375 ops/sec ±0.67% (91 runs sampled)
 - Nerv x 4,872 ops/sec ±0.73% (93 runs sampled)
 - Preact x 4,332 ops/sec ±1.12% (96 runs sampled)
 - Rax x 9,519 ops/sec ±1.15% (94 runs sampled)
 - React x 5,020 ops/sec ±1.14% (92 runs sampled)
 - vdo x 6,135 ops/sec ±0.62% (93 runs sampled)

The fastest is: [ 'Hyperons' ]
```

### Name

> In particle physics, a hyperon is any baryon containing one or more strange quarks, but no charm

— [Wikipedia](https://simple.wikipedia.org/wiki/Hyperon)

In keeping with React and the wider ecosystem I wanted to give this project a science-related name but also something that implies being small and light. Thus, Hyperons.

### Prior art

This module was originally inspired by the [vhtml] package and also borrows from a few other JSX to string implementations:

* [Hyperapp Render][hyperapp] (style stringification)
* [React DOM][react-dom] (boolean attributes)
* [Rax] (performance improvements)

[vhtml]: https://github.com/developit/vhtml
[Hyperapp Render]: https://github.com/hyperapp/render
[React DOM]: https://github.com/facebook/react/tree/master/packages/react-dom
[Rax]: https://github.com/alibaba/rax

### License

Hyperons is MIT licensed.
