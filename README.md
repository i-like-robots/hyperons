<p align="center">
  <img alt="Hyperons" src="https://cdn.rawgit.com/i-like-robots/hyperons/4b788429/assets/hyperons.svg" width="400">
</p>

<div align="center">

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/i-like-robots/hyperons/blob/master/LICENSE) [![Build Status](https://travis-ci.org/i-like-robots/hyperons.svg?branch=master)](https://travis-ci.org/i-like-robots/hyperons) [![Coverage Status](https://coveralls.io/repos/github/i-like-robots/hyperons/badge.svg?branch=master)](https://coveralls.io/github/i-like-robots/hyperons) [![npm version](https://img.shields.io/npm/v/hyperons.svg?style=flat)](https://www.npmjs.com/package/hyperons)
</div>

Renders JSX components to static HTML on the server and in the browser.


## Installation

This is a [Node.js][node] module available through the [npm][npm] registry. Before installing, download and install Node.js. Node.js 8 or higher is required.

Installation is done using the [npm install][install] command:

```sh
$ npm install -S hyperons
```

[node]: https://nodejs.org/en/
[npm]: https://www.npmjs.com/
[install]: https://docs.npmjs.com/getting-started/installing-npm-packages-locally


## Features

* Share code between React single-page apps and plain HTML pages
* Render components on the server and in the browser
* [Superfast](#benchmarks) and tiny code size (1.2kb gzipped)
* Support for CSS stringification, boolean attributes, void elements, fragments, and more
* Render class components and functional components


## Usage

This module provides two functions; one to create elements and one to render them. If you've worked with [React][react] or React-like libraries before then they're the equivalent to `React.createElement()` and `ReactDOM.renderToString()`.

The example below shows how to render a simple component using Hyperons:

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

Although you can use Hyperons without a compilation step, I'd recommend using [JSX](#jsx) to more succinctly describe your markup. Here is the same component as before but rewritten to use JSX syntax:

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

_Please Note_ that the JSX syntax will need to be transformed to regular JavaScript. If you do not wish to implement a build step for your server-side code I recommend using [Sucrase] which can enable on-the-fly transformations for `.jsx` files.

[Sucrase]: https://github.com/alangpierce/sucrase


## API

### `Hyperons.h()` / `Hyperons.createElement()`

```js
Hyperons.h(type[, props][, ...children])
```

Returns an element with the given `props`. It accepts the following arguments:

* `type` The type of element to create which can be the name of an HTML element (such as `"div"`), a [component](#components), or a [fragment](#fragments).
* `props` An object containing data to pass to a component or HTML attributes to render. See the [props documentation](#props) for more information.
* `...children` Any number of child elements which may be simple values or other elements. See the [children documentation](#children) for more information.

### `Hyperons.render()` / `Hyperons.renderToString()`

```js
Hyperons.render(element)
```

Returns the rendered `element` as a string. It accepts the following arguments:

* `element` An element created with `Hyperons.h()`


### `Hyperons.Component`

Components can be defined as classes or functions. Components written as classes should extend `Hyperons.Component`:

```jsx
class Welcome extends Hyperons.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

The only method you must define for a class component is `render()`. See the [component syntax](#components) documentation for more information.


### `Hyperons.Fragment`

A `Fragment` is a special component which enables multiple elements to be rendered without a wrapper. See the [using fragments](#fragments) documentation for more information.

```jsx
<dl>
  {props.definitions.map((item) => (
    <Hyperons.Fragment>
      <dt>{item.title}</dt>
      <dd>{item.description}</dd>
    </Hyperons.Fragment>
  ))}
</dl>
```


## Syntax

### Components

Components are reusable pieces of UI which can be composed in useful ways. There are two types of components supported by Hyperons:

- Class components, which are ES6 classes extending `Hyperons.Component` and have a `render()` method which returns elements.
- Functional components which are functions that accept `props` and return elements.

Here is an example showing the same component written using a class and as a function:

```jsx
// Class component
class SubmitButton extends Hyperons.Component {
  render() {
    return (
      <button type="submit">{this.props.text}</button>
    )
  }
}

// Functional component
const SubmitButton = (props) => (
  <button type="submit">{props.text}</button>
)
```

When using React or React-like libraries class components are usually used to add extra functionality such as hooking into lifecycle methods and maintain state. Hyperons renders static HTML so there is no state nor lifecycle methods.


### Props

Props are objects either containing data to share with components or [HTML attributes](#html-attributes) for a HTML element. A component should never modify the props it receives.

```js
// Pass data to a component as props
h(SubmitButton, { text: 'Submit' })

// Render props as HTML attributes
h('button', { type: 'submit' })
```

Default prop values can be defined on component or functional components by adding a `defaultProps` property. These will be combined with any props received by the component:

```jsx
// Class component
class SubmitButton extends Component {
  // ...

  static get defaultProps() {
    return {
      text: 'Submit'
    }
  }
}

// Functional component
const SubmitButton = (props) => {
  // ...
}

SubmitButton.defaultProps = {
  text: 'Submit'
}
```


### HTML Attributes

When props are used to render [attributes] some property names and values will be treated differently by Hyperons:

- Because `class` and `for` are [reserved words][words] in JavaScript you may use the aliases `className` and `htmlFor` instead.

- Boolean attributes, such as `hidden` or `checked`, will only be rendered if assigned a [truthy][truthy] value.

- Enumerated attributes which accept the values `"true"` or `"false"`, such as `contenteditable`, will be rendered with their assigned value.

- Any attributes requiring hyphens, such as `aria-*` and `data-*` should be written with hyphens.

- Framework specific props such as `key` and `ref` will not be rendered.

[attributes]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
[words]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords
[truthy]: https://developer.mozilla.org/en-US/docs/Glossary/Truthy


### Styles

The `style` attribute accepts a JavaScript object containing CSS properties and values.

CSS Properties may be written in camelCase for consistency with accessing the properties with JavaScript in the browser (e.g. `element.style.marginBottom`). Vendor prefixes other than `ms` should always begin with a capital letter (e.g. `WebkitHyphens`).

Hyperons will automatically append a `px` suffix to number values but certain properties will remain unitless (e.g. `z-index` and `order`). If you want to use units other than `px`, you should specify the value as a string with the desired unit. For example:

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

Hyperons will escape all string values so if you need to output a HTML entity you can run into issues with double escaping. The simplest way to work-around this issue is to write the unicode character directly in your code (and use UTF-8 encoding for you source files). Otherwise, you can find the [unicode number][charcode] for the required character. For example:

```jsx
// Incorrect. Outputs: <h1>Mac &amp;amp; Cheese</h1>
<h1>Mac &amp; Cheese</h1>
// Correct. Outputs: <h1>Mac &amp; Cheese</h1>
<h1>Mac & Cheese</h1>
// Correct. Outputs: <h1>Mac &amp; Cheese</h1>
<h1>{`Mac ${String.fromCharCode(38)} Cheese`}</h1>
```

[charcode]: https://www.fileformat.info/info/charset/UTF-8/list.htm


### Inner HTML

Hyperons supports the `dangerouslySetInnerHTML` property to inject unescaped HTML code. This is potentially dangerous and should never be used around any user input, but it can be useful as a last resort.

```jsx
const html = { __html: '<i>Mac &amp; Cheese</i>' }
<div dangerouslySetInnerHTML={html}></div> // Outputs: <div><i>Mac &amp; Cheese</i></div>
```


### Children

Components can render any number of child elements. Children can be strings, numbers, or other components. Components will receive references to any children via a `children` prop which enables components to be composed in useful ways.

```jsx
const Wrapper = (props) => <p>{props.children}</p>
const html = <Wrapper>Hello</Wrapper> // Outputs: <p>Hello</p>
```

_Please note_ that child elements will not be rendered for [void elements][void].

[void]: https://www.w3.org/TR/html/syntax.html#void-elements


### Fragments

In React and React-like frameworks components must always return a single enclosing element. But sometimes it is required to return a list of elements, either because you don't need the extra elements or the extra elements would create invalid HTML output. For example, when rendering a description list the title and detail (`<dt>` and `<dd>`) elements are usually grouped in pairs:

```jsx
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

However, several tools will throw an error when evaluating the code above because the title and description elements are not wrapped in an enclosing element but wrapping them with an element would result in invalid HTML.

To solve this [React 16.2][react-16] introduced the concept of [fragments] which enable a list of elements to be wrapped with an enclosing element without rendering anything extra. To use fragments in your JSX code Hyperons provides a special `Fragment` component:

```jsx
function DescriptionList(props) {
  return (
    <dl>
      {props.definitions.map((item) => (
        <Hyperons.Fragment>
          <dt>{item.title}</dt>
          <dd>{item.description}</dd>
        </Hyperons.Fragment>
      ))}
    </dl>
  )
}
```

[react-16]:  https://reactjs.org/blog/2017/11/28/react-v16.2.0-fragment-support.html
[fragments]: https://reactjs.org/docs/fragments.html


### JSX

_Not familiar with JSX? Check out [WTF is JSX][wtf] and [JSX in Depth][in-depth] first._

If you're authoring your components with JSX syntax you will need to transpile your code into plain JavaScript in order to run them. Depending on the toolchain you're using there will be different plugins available. Some popular tools to transpile JavaScript are [Babel][babel] (with [the JSX plugin][babel-jsx]), [Bublé][buble] (with [JSX enabled][buble-jsx]) and [Sucrase].

[wtf]: https://jasonformat.com/wtf-is-jsx/
[in-depth]: https://reactjs.org/docs/jsx-in-depth.html
[babel]: https://babeljs.io/
[babel-jsx]: https://babeljs.io/docs/plugins/transform-react-jsx/
[buble]: https://github.com/Rich-Harris/buble
[buble-jsx]: https://buble.surge.sh/guide/#jsx
[Sucrase]: https://github.com/alangpierce/sucrase


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
Benchmark run on Sat  2 May 2020 10:57:27 BST with Node v12.16.0

Using:
 - hyperapp@2.0.4
 - hyperons@1.0.0-beta.2
 - inferno@7.4.2
 - nervjs@1.5.6
 - preact@10.4.1
 - rax@1.1.1
 - react@16.13.1
 - vdo@4.2.0

Results:
 - Hyperapp x 6,845 ops/sec ±1.99% (88 runs sampled)
 - Hyperons x 11,377 ops/sec ±0.65% (94 runs sampled)
 - Inferno x 9,020 ops/sec ±0.76% (93 runs sampled)
 - Nerv x 5,343 ops/sec ±0.70% (94 runs sampled)
 - Preact x 3,560 ops/sec ±1.57% (95 runs sampled)
 - Rax x 5,805 ops/sec ±1.15% (92 runs sampled)
 - React x 4,609 ops/sec ±0.74% (94 runs sampled)
 - vdo x 6,608 ops/sec ±0.73% (93 runs sampled)

The fastest is: [ 'Hyperons' ]
```

### Name

> In particle physics, a hyperon is any baryon containing one or more strange quarks, but no charm

— [Wikipedia](https://simple.wikipedia.org/wiki/Hyperon)

In keeping with React and the wider ecosystem I wanted to give this project a science-related name but also something that implies being small and light. Thus, Hyperons.

### Prior art

This module was originally inspired by the [vhtml] package and also borrows from a few other JSX to string implementations:

* [Hyperapp Render] (style stringification)
* [React DOM] (boolean attributes)
* [Rax] (performance improvements)

[vhtml]: https://github.com/developit/vhtml
[Hyperapp Render]: https://github.com/hyperapp/render
[React DOM]: https://github.com/facebook/react/tree/master/packages/react-dom
[Rax]: https://github.com/alibaba/rax

### License

Hyperons is MIT licensed.
