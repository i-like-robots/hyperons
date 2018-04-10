# Hyperons

[![Build Status](https://travis-ci.org/i-like-robots/hyperons.svg?branch=master)](https://travis-ci.org/i-like-robots/hyperons) [![Coverage Status](https://coveralls.io/repos/github/i-like-robots/hyperons/badge.svg?branch=master)](https://coveralls.io/github/i-like-robots/hyperons) [![npm version](https://badge.fury.io/js/hyperons.svg)](https://badge.fury.io/js/hyperons)

Renders components written in JSX to HTML without a framework, on the server or in the browser.

## Installation

This is a [Node.js][node] module available through the [npm][npm] registry. Before installing, download and install Node.js. Node.js 6 or higher is required.

Installation is done using the [npm install][install] command:

```sh
$ npm install -S hyperons
```

[node]: https://nodejs.org/en/
[npm]: https://www.npmjs.com/
[install]: https://docs.npmjs.com/getting-started/installing-npm-packages-locally

## Usage

This module provides a single function. If you've worked with [React][react] before then this function can be considered equivalent to `React.createElement` but instead of returning framework specific code it creates and returns strings of HTML markup.

```
hyperons(element, [properties], [...children])
```

Just like `React.createElement` it accepts the following arguments:

* `element` This can be the name of a HTML element or a function which renders another string of HTML (this is useful if you'd like to use [higher-order components][hoc].)
* `properties` An optional object of HTML element attributes. See the [properties documentation](#properties) for more information.
* `...children`\* An optional number of child elements. See the [children documentation](#children) for more information.

\* The `...` before the argument name makes this a [rest parameter][rest], this means it will collect "the rest" of the arguments up in an array.

[react]: https://reactjs.org/
[hoc]: https://reactjs.org/docs/higher-order-components.html
[rest]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters

### Vanilla JS

You can use Hyperons as-is without any complex build pipelines or compilation steps, but I'd recommend using [JSX](#jsx) to more clearly describe your markup.

```js
import h from 'hyperons'

const html = h('div', { className: 'welcome' },
  h('h1', null, 'Hello World!'),
  h('p', null, 'This text was rendered with Hyperons'))
```

### JSX

_Not familiar with JSX? Check out [WTF is JSX][wtf] and [JSX in Depth][in-depth] first._

If you're authoring your components with JSX syntax you will need to transpile your code into plain JavaScript in order to run them. Depending on the toolchain you are using there will be different plugins available to do this, some popular tools to transpile JavaScript are [Babel][babel] (with [the JSX plugin][babel-jsx]) and [Bublé][buble] (with [JSX enabled][buble-jsx]).

Whichever tool you use you will need to specify the JSX _pragma_ for the transpiler to target. The pragma is the name of the variable you assign Hyperons to. For example, in the code below the pragma is `h`:

```jsx
import h from 'hyperons'

const html = <div className="welcome">
  <h1>Hello World!</h1>
  <p>This text was rendered with Hyperons</p>
</div>
```

[wtf]: https://jasonformat.com/wtf-is-jsx/
[in-depth]: https://reactjs.org/docs/jsx-in-depth.html
[babel]: https://babeljs.io/
[babel-jsx]: https://babeljs.io/docs/plugins/transform-react-jsx/
[buble]: https://github.com/Rich-Harris/buble
[buble-jsx]: https://buble.surge.sh/guide/#jsx

## Overview

### Properties

Properties are an object containing [HTML attributes][attrs] and values. Attribute names may be written in camelCase or in lowercase. For example, the attribute `tabindex` may be written as `tabIndex`. Any HTML attributes written in camelCase will be converted to lowercase but they will not be hyphenated. Attributes requiring hyphens, such as `aria-*` and `data-*`, should be written with hyphens.

Since `class` and `for` are [reserved words][words] in JavaScript you may use the aliases `className` and `htmlFor` instead.

Boolean attributes, such as `hidden` or `checked`, will only be rendered if assigned a truthy value. Enumerated attributes which accept the values `"true"` or `"false"`, such as `contenteditable`, will be rendered with their assigned value.

Any framework specific properties such as `key` and `ref` will not be rendered.

[attrs]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
[words]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords

### Styles

Styles may be declared as an object with CSS properties and values. Any CSS properties written in camelCase will be converted to lowercase and hyphenated. For example, the property `white-space` may be written as `whiteSpace`.

Pixel units will be automatically added to numbers unless the property expects a unitless value.

Example styles input:

```js
const style = {
  display: 'flex',
  flexShrink: 1,
  marginBottom: 20,
  WebkitHyphens: 'auto',
}

<div style={style}></div>
```

Example styles output:

```html
<div style="display:flex;flex-shrink:1;margin-bottom:20px;-webkit-hyphens:auto;>
```

### HTML entities

Hyperons will escape all strings, so if you need to display a HTML entity, you will run into double escaping issues. There are various ways to work-around this issue, the easiest of which is to write the unicode character directly in your code (you will need to save your source file with UTF-8 encoding) or you can find the [unicode number][charcode] for the required character:

```jsx
// incorrect, double escapes ambersand: <h1>Mac &amp;amp; Cheese</h1>
<h1>Mac &amp; Cheese</h1>
// correct, outputs: <h1>Mac &amp; Cheese</h1>
<h1>Mac & Cheese</h1>
// correct, outputs: <h1>Mac &amp; Cheese</h1>
<h1>{`Mac ${String.fromCharCode(38)} Cheese`}</h1>
```

[charcode]: https://www.fileformat.info/info/charset/UTF-8/list.htm

### Children

Components may render any number of child elements. Children can be strings, other components, or a combination of both.

Functions provided to the first argument of Hyperons will have any children appended as an extra `children` property. This functionality allows you to re-use and compose components in useful ways.

Please note that child elements will not be rendered for [void elements][void].

```jsx
const Container = ({ children }) => <p>{children}</p>
const html = <Container>{'Hello'}</Container> // will output <p>Hello</p>
```

[void]: https://www.w3.org/TR/html/syntax.html#void-elements

### Inner HTML

Hyperons supports the `dangerouslySetInnerHTML` property to inject unescaped HTML code. This is potentially dangerous and should never be used around any user input, but it can be useful as a last resort.

```jsx
const html = { __html: '<i>Mac &amp; Cheese</i>' }
<div dangerouslySetInnerHTML={html}></div>
```

## Development

The source code for this module is written in ES6 code and bundled into single files for distribution using [Rollup][rollup]. Tests are written using [Mocha][mocha] as the test runner and [Chai][chai] for assertions. Tests are run in both a Node.js environment and in a browser using [Puppeteer][puppeteer].

[rollup]: https://rollupjs.org/guide/en
[mocha]: https://mochajs.org/
[chai]: http://www.chaijs.com/
[puppeteer]: https://github.com/GoogleChrome/puppeteer

## Background

### Name

> In particle physics, a hyperon is any baryon containing one or more strange quarks, but no charm

— [Wikipedia](https://simple.wikipedia.org/wiki/Hyperon)

In keeping with React and the wider ecosystem we wanted to give this project a science-related name but also something that implies being small and light. Thus, Hyperons.

### Prior art

This module was inspired by the [vhtml][vhtml] package and also borrows from a few other JSX to string implementations:

* [Hyperapp Render][hyperapp] (style stringification)
* [React DOM][react-dom] (boolean attributes)

[vhtml]: https://github.com/developit/vhtml
[hyperapp]: https://github.com/hyperapp/render
[react-dom]: https://github.com/facebook/react/tree/master/packages/react-dom

## License

Hyperons is MIT licensed.
