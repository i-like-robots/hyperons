# Hyperons

[![Build Status](https://travis-ci.org/i-like-robots/hyperons.svg?branch=master)](https://travis-ci.org/i-like-robots/hyperons) [![Coverage Status](https://coveralls.io/repos/github/i-like-robots/hyperons/badge.svg?branch=master)](https://coveralls.io/github/i-like-robots/hyperons) [![npm version](https://badge.fury.io/js/hyperons.svg)](https://badge.fury.io/js/hyperons)

> Renders JSX components to HTML strings without a framework.

## Installation

Hyperons is distributed as a [npm](https://www.npmjs.com/) package and can be installed with the npm CLI:

```sh
$ npm install -S hyperons
```

## Usage

This module provides a single function. If you've worked with [React][react] or React-like frameworks before then this function can be considered equivalent to `React.createElement` but it creates and returns strings of HTML markup instead of framework specific descriptions of elements. The function looks like this:

```
hyperons(element[, properties[, ...children])
```

Just like `React.createElement` it is a variadic function\* which supports the following arguments:

Argument     | Notes
-------------|-------------
`element`    | This can be the name of a HTML element or a function which renders another string of HTML (this is useful if you'd like to use [higher-order components][hoc].)
`properties` | An optional object of HTML element attributes. See the [properties documentation][#properties] for more information.
`children`   | An optional number of child elements. See the [children documentation](#children) for more information.

\* Variadic means that the function accepts a variable number of arguments. The `...` before the argument name is a rest parameter, this means it will collect "the rest" of the arguments.

[react]: https://reactjs.org/
[hoc]: https://reactjs.org/docs/higher-order-components.html
[hs]: https://github.com/hyperhype/hyperscript

### Writing components with vanilla JS

Example:

```js
import h from 'hyperons'

const html = h('div', { className: 'welcome' },
  h('h1', null, 'Hello World!'),
  h('p', null, 'This text was rendered with Hyperons'))
```

### Writing components with JSX

_Not familiar with JSX? Check out [WTF is JSX][wtf] and [JSX in Depth][depth] first._

If you're authoring your components with JSX syntax you will need to first transpile your code into plain JavaScript in order to run them. Depending on the toolchain you are using there will be different plugins available to do this, some popular tools to transpile JavaScript are:-

* [Babel](https://babeljs.io/) (with [the JSX plugin](https://babeljs.io/docs/plugins/transform-react-jsx/))
* [Bublé](https://github.com/Rich-Harris/buble) (with [JSX enabled](https://buble.surge.sh/guide/#jsx))

Whichever tool you use you will need to specify the JSX _pragma_ to use. When you author components with JSX you will need to import Hyperons for reference. The pragama is the name the variable you assign Hyperons to. In the following examples the pragma is `h`:

Input:

```jsx
// JSX input
import h from 'hyperons'

const html = <div className="welcome">
  <h1>Hello World!</h1>
  <p>This text was rendered with Hyperons</p>
</div>

// transpiled output
import h from 'hyperons'

const html = h('div', { className: 'welcome' },
  h('h1', null, 'Hello World!'),
  h('p', null, 'This text was rendered with Hyperons'))
```

[wtf]: https://jasonformat.com/wtf-is-jsx/
[depth]: https://reactjs.org/docs/jsx-in-depth.html

## Syntax

### Properties

[HTML attributes][attrs] may be written in camelCase or in lowercase. For example, the HTML attribute `tabindex` may be written as `tabIndex` or `tabindex`.

Attributes written in camelCase will be converted to lowercase but not hyphenated. Attributes requiring hyphens, such as `aria-*` and `data-*` should be written in lowercase with hyphens.

Since `class` and `for` are reserved words in JavaScript you may use `className` and `htmlFor` instead.

Boolean attributes, such as `hidden`, will only be rendered when assigned a truthy value. Enumerated attributes which accept the values `"true"` or `"false"`, such as `contenteditable`, will be rendered with the correct value.

Framework specific properties such as `key` and `ref` will not be rendered.

[attrs]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
[react-dom]: https://reactjs.org/docs/dom-elements.html

### Styles

CSS styles may be declared in an object which Hyperons will stringify. Style properties may be declared in camelCase or lowercase and hyphenated.

Properties may be assigned a number value. Hyperons will automatically add a pixel unit except in cases where properties expect a unitless value.

Input:

```js
const style = {
  display: 'flex',
  flexShrink: 1,
  marginBottom: 20,
  WebkitHyphens: 'auto',
}

<div style={style}></div>
```

Output:

```html
<div style="display:flex;flex-shrink:1;margin-bottom:20px;-webkit-hyphens:auto;>
```

### HTML entities

Hyperons will escape all strings, so if you need to display a HTML entity, you will run into double escaping issues. There are various ways to work-around this issue. The easiest one is to write unicode character directly in Javascript (you will need to save your source file with UTF-8 encoding) or you can find the unicode number for the required character:

```jsx
// incorrect, double escapes ambersand: <h1>Mac &amp;amp; Cheese</h1>
<h1>Mac &amp; Cheese</h1>
// correct, outputs: <h1>Mac &amp; Cheese</h1>
<h1>Mac & Cheese</h1>
// correct, outputs: <h1>Mac &amp; Cheese</h1>
<h1>{`Mac ${String.fromCharCode(38)} Cheese`}</h1>
```

### Children

Components may render any number of given children. This may be a plain text string, other components, or a combindation of both.

Functions provided to the first argument of Hyperons will inherit all of its parent properties but also receive any child elements as an extra `children` property. This allows you to re-use and compose components in useful ways.

```jsx
const Container = ({ children }) => <div>{children}</div>
const html = <Container>Hello</Container>
```

Please note that child elements or inner HTML will not be rendered for [void elements][void].

[void]: https://www.w3.org/TR/html/syntax.html#void-elements

### Inner HTML

Hyperons supports the `dangerouslySetInnerHTML` property to directly inject HTML code without first escaping it. This is potentially dangerous and should never be used for any user input.

```jsx
const html = { __html: '<i>Mac &amp; Cheese</i>' }
<div dangerouslySetInnerHTML={html}></div>
```

## Background

This module was inspired by the [vhtml][vhtml] package and also borrows from other JSX to string implementations:

* [Hyperapp Render][hyperapp] (style stringification)
* [React DOM][react-dom] (boolean attributes)

[vhtml]: https://github.com/developit/vhtml
[hyperapp]: https://github.com/hyperapp/render
[react-dom]: https://github.com/facebook/react/tree/master/packages/react-dom

## License

Hyperons is MIT licensed.
