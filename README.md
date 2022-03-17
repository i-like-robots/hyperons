<p align="center">
  <img alt="Hyperons" src="https://cdn.rawgit.com/i-like-robots/hyperons/4b788429/assets/hyperons.svg" width="400">
</p>

<div align="center">

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/i-like-robots/hyperons/blob/main/LICENSE) ![build status](https://github.com/i-like-robots/hyperons/actions/workflows/test.yml/badge.svg?branch=main) [![Coverage Status](https://coveralls.io/repos/github/i-like-robots/hyperons/badge.svg?branch=main)](https://coveralls.io/github/i-like-robots/hyperons) [![npm version](https://img.shields.io/npm/v/hyperons.svg?style=flat)](https://www.npmjs.com/package/hyperons)

</div>

The fastest and smallest JSX to string renderer on the server and in the browser.

## Installation

This is a [Node.js][node] module available through the [npm][npm] registry. Before installing, download and install Node.js. Node.js 14 or higher is required.

Installation is done using the [npm install][install] command:

```sh
$ npm install -S hyperons
```

[node]: https://nodejs.org/en/
[npm]: https://www.npmjs.com/
[install]: https://docs.npmjs.com/getting-started/installing-npm-packages-locally

## Features

- [The fastest](#benchmarks) JSX to string renderer and tiny code size (1.2kb gzipped)
- Render components on the server and in the browser
- Works with class components and functional components, even ones that use [hooks](#hooks)
- Support for context, CSS stringification, boolean attributes, void elements, fragments, and more

## Usage

This module provides two functions; one to create elements and one to render them. If you've worked with [React][react] or React-like libraries before then they're the equivalent to `React.createElement()` and `ReactDOM.renderToString()`.

The example below shows how to render a simple component using Hyperons:

[react]: https://reactjs.org/

```js
import { h, render } from 'hyperons'

const Welcome = () =>
  h(
    'div',
    { class: 'welcome-banner' },
    h('h1', null, 'Hello World!'),
    h('p', null, 'This component was rendered with Hyperons')
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

[sucrase]: https://github.com/alangpierce/sucrase

## API

### `Hyperons.h()` / `Hyperons.createElement()`

```js
Hyperons.h(type[, props][, ...children])
```

Returns an element with the given `props`. It accepts the following arguments:

- `type` The type of element to create which can be the name of an HTML element (such as `"div"`), a [component](#components), or a [fragment](#fragments).
- `props` An object containing data to pass to a component or HTML attributes to render. See the [props documentation](#props) for more information.
- `...children` Any number of child elements which may be simple values or other elements. See the [children documentation](#children) for more information.

### `Hyperons.render()` / `Hyperons.renderToString()`

```js
Hyperons.render(element)
```

Returns the rendered `element` as a string. It accepts the following arguments:

- `element` An element created with `Hyperons.h()`

### `Hyperons.Component`

Components can be defined as classes or functions. Components written as classes should extend `Hyperons.Component`:

```jsx
class Welcome extends Hyperons.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>
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

### `Hyperons.createContext`

Creates a new [context](#context) object. Components which subscribe to this context will read the current context value from the closest matching context provider above it in the tree. Hyperons largely supports the same [context API](https://reactjs.org/docs/context.html) as React including accessing context via the `Class.contextType` property and `useContext()` [hook](#hooks).

```jsx
const Context = Hyperons.createContext()

const Component = () => (
  <Context.Provider value={{ text: 'Hello, World!' }}>
    <Context.Consumer>{(ctx) => <p>{ctx.text}</p>}</Context.Consumer>
  </Context.Provider>
)
```

## Syntax

### Components

Components are reusable pieces of UI which can be composed in useful ways. There are two types of components supported by Hyperons:

- Functional components which are functions that accept `props` and return elements.
- Class components, which are ES6 classes extending `Hyperons.Component` and have a `render()` method which returns elements.

Here is an example showing the same component written using a function and as a class:

```jsx
// Functional component
const SubmitButton = (props) => <button type="submit">{props.text}</button>

// Class component
class SubmitButton extends Hyperons.Component {
  render() {
    return <button type="submit">{this.props.text}</button>
  }
}
```

When using React or React-like libraries class components are usually used to add extra functionality such as hooking into lifecycle methods and maintain state. Hyperons renders static HTML so there is no state nor lifecycle methods.

### Props

Props are objects either containing data to share with components or [HTML attributes](#html-attributes) for a HTML element. A component should never modify the props it receives.

```js
// Pass data to a component as props
Hyperons.createElement(SubmitButton, { text: 'Submit' })

// Render props as HTML attributes
Hyperons.createElement('button', { type: 'submit' })
```

Default prop values can be defined on components by adding a `defaultProps` property. These will be combined with any props received by the component:

```jsx
// Functional component
const SubmitButton = (props) => {
  // ...
}

SubmitButton.defaultProps = {
  text: 'Submit'
}

// Class component
class SubmitButton extends Hyperons.Component {
  // ...

  static get defaultProps() {
    return {
      text: 'Submit'
    }
  }
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
;<div dangerouslySetInnerHTML={html}></div> // Outputs: <div><i>Mac &amp; Cheese</i></div>
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

[react-16]: https://reactjs.org/blog/2017/11/28/react-v16.2.0-fragment-support.html
[fragments]: https://reactjs.org/docs/fragments.html

### Context

In React and React-like frameworks context provides a way to share values between components without using props to pass it down through every level of the component tree. Hyperons largely supports the same [context API](https://reactjs.org/docs/context.html) as React - contexts can be created with a default value, values updated with a `Context.Provider`, and context consumed via `Class.contextType`, `Context.Consumer`, or `useContext` [hook](#hooks).

```jsx
const Context = Hyperons.createContext({ text: 'Default value' })

// Functional component using a consumer
const WithConsumer = () => {
  return <Context.Consumer>{(ctx) => <p>{ctx.text}</p>}</Context.Consumer>
}

// Functional component using a hook
const WithHook = () => {
  const ctx = Hyperons.useContext(Context)
  return <p>{ctx.text}</p>
}

// Class component subscribing by contextType
class WithContextType extends Hyperons.Component {
  render() {
    return <p>{this.context.text}</p>
  }
}

ComponentClass.contextType = Context

// Replacing the default value with a provider
const WithProvider = () => (
  <Context.Provider value={{ text: 'Updated value' }}>
    <Context.Consumer>{(ctx) => <p>{ctx.text}</p>}</Context.Consumer>
  </Context.Provider>
)
```

### Hooks

React v16.8 introduced hooks which enable developers to add state, persistent data, and hook into lifecycle events from functional components. Hyperons renders static HTML so there is no state nor lifecycle methods but shims for the following hooks are currently supported:

| Hook            | Behavior                                                             |
| --------------- | -------------------------------------------------------------------- |
| useCallback     | Returns the given function                                           |
| useContext      | Fully functional, see [context](#context)                            |
| useEffect       | No op                                                                |
| useLayoutEffect | No op                                                                |
| useMemo         | Returns the given value                                              |
| useReducer      | Returns the given value and a no op function, calls init if provided |
| useRef          | Returns the given value wrapped in an object                         |
| useState        | Returns the given value and a no op function                         |

### JSX

_Not familiar with JSX? Check out [WTF is JSX][wtf] and [JSX in Depth][in-depth] first._

If you're authoring your components with JSX syntax you will need to transpile your code into plain JavaScript in order to run them. Depending on the toolchain you're using there will be different plugins available. Some popular tools to transpile JavaScript are [Babel] (with [the React preset][babel-react]), [ESBuild] and [Sucrase].

[wtf]: https://jasonformat.com/wtf-is-jsx/
[in-depth]: https://reactjs.org/docs/jsx-in-depth.html
[babel]: https://babeljs.io/
[babel-react]: https://babeljs.io/docs/en/babel-preset-react
[esbuild]: https://esbuild.github.io/
[sucrase]: https://github.com/alangpierce/sucrase

## Project information

### Development

This project is written using ES2020 syntax, [Prettier] for code formatting, [ESLint] for static analysis, is tested with [Vitest], and bundled using [Vite].

[prettier]: https://prettier.io/
[eslint]: https://eslint.org/
[vitest]: https://vitest.dev/
[vite]: https://vite.dev

### Benchmarks

This repository contains benchmarking and profiling tools in the `/benchmark` directory. The current results for server-side rendering are below:

```
Benchmark run on Thu 17 Mar 2022 18:50:02 GMT with Node v16.13.2

Using:
 - hyperapp@2.0.21
 - hyperons@1.0.0
 - inferno@7.4.11
 - nervjs@1.5.7
 - preact@10.6.6
 - rax@1.2.2
 - react@17.0.2
 - vdo@4.2.0

Results:
 - Hyperapp x 14,026 ops/sec ±0.45% (96 runs sampled)
 - Hyperons x 22,423 ops/sec ±0.73% (98 runs sampled)
 - Inferno x 18,085 ops/sec ±0.10% (99 runs sampled)
 - Nerv x 11,034 ops/sec ±0.18% (98 runs sampled)
 - Preact x 11,096 ops/sec ±0.16% (99 runs sampled)
 - Rax x 12,305 ops/sec ±0.53% (96 runs sampled)
 - React x 10,116 ops/sec ±0.05% (100 runs sampled)
 - vdo x 13,140 ops/sec ±0.05% (101 runs sampled)

The fastest is: [ 'Hyperons' ]
```

### Name

> In particle physics, a hyperon is any baryon containing one or more strange quarks, but no charm

— [Wikipedia](https://simple.wikipedia.org/wiki/Hyperon)

In keeping with React and the wider ecosystem I wanted to give this project a science-related name but also something that implies being small and light. Thus, Hyperons.

### Prior art

This module was originally inspired by the [vhtml] package and also borrows from a few other JSX to string implementations:

- [Hyperapp Render] (style stringification)
- [React DOM] (boolean attributes)
- [Rax] (performance improvements)

[vhtml]: https://github.com/developit/vhtml
[hyperapp render]: https://github.com/hyperapp/render
[react dom]: https://github.com/facebook/react/tree/main/packages/react-dom
[rax]: https://github.com/alibaba/rax

### License

Hyperons is MIT licensed.
