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
hyperons(element, [properties], [...children])
```

Just like `React.createElement` it is a variadic function\* which supports the following arguments:

* `element`, This can be the name of a HTML element or a function which renders another string of HTML (this is useful if you'd like to use [higher-order components][hoc].)
* `properties`, An optional object of HTML element attributes. See the [properties documentation][#properties] for more information.
* `...children`, An optional number of child elements. See the [children documentation](#children) for more information.

\* Variadic means that the function accepts a variable number of arguments. The `...` before the last arguments name is a rest parameter, this means it will collect "the rest" of the arguments.

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

_Not familiar with JSX? Check out [WTF is JSX][wtf] and [JSX in Depth][in-depth] first._

If you're authoring your components with JSX syntax you will need to first transpile your code into plain JavaScript in order to run them. Depending on the toolchain you are using there will be different plugins available to do this, some popular tools to transpile JavaScript are:-

* [Babel](https://babeljs.io/) (with [the JSX plugin](https://babeljs.io/docs/plugins/transform-react-jsx/))
* [Bublé](https://github.com/Rich-Harris/buble) (with [JSX enabled](https://buble.surge.sh/guide/#jsx))

Whichever tool you use you will need to specify the JSX _pragma_ to use. The pragma is the name of the variable you assign Hyperons to. In the following example the pragma is `h`:

Input:

```jsx
import h from 'hyperons'

const html = <div className="welcome">
  <h1>Hello World!</h1>
  <p>This text was rendered with Hyperons</p>
</div>
```

[wtf]: https://jasonformat.com/wtf-is-jsx/
[in-depth]: https://reactjs.org/docs/jsx-in-depth.html

## Syntax

### Properties

[HTML attributes][attrs] may be written in camelCase or in lowercase. For example, the HTML attribute `tabindex` may be written as `tabIndex` or `tabindex`.

Attributes written in camelCase will be converted to lowercase but not hyphenated. Attributes requiring hyphens, such as `aria-*` and `data-*`, should therefore be written in lowercase with hyphens.

Since `class` and `for` are [reserved words][words] in JavaScript you may use the aliases `className` and `htmlFor` instead.

Boolean attributes, such as `hidden` or `checked`, will only be rendered if assigned a truthy value. Enumerated attributes which accept the values `"true"` or `"false"`, such as `contenteditable`, will be rendered with their assigned value.

Any framework specific properties such as `key` and `ref` will not be rendered.

[attrs]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
[words]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords

### Styles

CSS styles may be declared in an object which Hyperons will stringify. Style properties may be declared in camelCase, in which case they will be lowercased and hyphenated.

Properties may be assigned a number value to which a pixel unit will be automatically added, except for properties which expect a unitless value.

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

Hyperons will escape all strings, so if you need to display a HTML entity, you will run into double escaping issues. There are various ways to work-around this issue. The easiest one is to write the unicode character directly in Javascript (you will need to save your source file with UTF-8 encoding) or you can find the [unicode number][charcode] for the required character:

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

Components may render any number of child elements. CHildren can be a text string, other components, or a combination of both.

Functions provided to the first argument of Hyperons will have any children appended as an extra `children` property. This functionality allows you to re-use and compose components in useful ways.

```jsx
const Container = ({ children }) => <p>{children}</p>
const html = h(Container, null, 'Hello') // will output <p>Hello</p>
```

Please note that child elements will not be rendered for [void elements][void].

[void]: https://www.w3.org/TR/html/syntax.html#void-elements

### Inner HTML

Hyperons supports the `dangerouslySetInnerHTML` property to directly inject unescaped HTML code. This is potentially dangerous and should never be used for any user input, but it can be useful as a last resort.

```jsx
const html = { __html: '<i>Mac &amp; Cheese</i>' }
<div dangerouslySetInnerHTML={html}></div>
```

## Background

### Name

> In particle physics, a hyperon is any baryon containing one or more strange quarks, but no charm

In keeping with React and the wider ecosystem I wanted to use a physics-sounding name but something small and light. Given the number of packages on the npm repository this is all I could find.

### Prior art

This module was inspired by the [vhtml][vhtml] package and also borrows from other JSX to string implementations:

* [Hyperapp Render][hyperapp] (style stringification)
* [React DOM][react-dom] (boolean attributes)

[vhtml]: https://github.com/developit/vhtml
[hyperapp]: https://github.com/hyperapp/render
[react-dom]: https://github.com/facebook/react/tree/master/packages/react-dom

## License

Hyperons is MIT licensed.
