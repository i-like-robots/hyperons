import extend from './extend'
import Component from './component'
import SafeString from './safe-string'
import childElements from './child-elements'
import stringifyAttributes from './stringify-attributes'

// https://www.w3.org/TR/html/syntax.html#void-elements
const VOID_ELEMENTS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr'
])

const INNER_HTML = 'dangerouslySetInnerHTML'

/**
 * Hyperons
 * @param {String|Function|null} element
 * @param {Object|null} props
 * @param {...String} children
 * @returns {String}
 */
function hyperons(element, props, ...children) {
  let out = ''

  // support for higher-order components
  if (typeof element === 'function') {
    if (props && Array.isArray(props.children)) {
      children.push(props.children)
    }

    props = extend(props, { children })

    if (element.prototype && typeof element.prototype.render === 'function') {
      const instance = new element(props)
      return instance.render()
    }

    return element(props)
  }

  const voidElement = VOID_ELEMENTS.has(element)

  if (element) {
    out += `<${element}${props ? stringifyAttributes(props) : ''}${voidElement ? '/' : ''}>`
  }

  if (!voidElement) {
    if (props && props[INNER_HTML]) {
      out += props[INNER_HTML].__html
    } else {
      out += childElements(children)
    }

    if (element) {
      out += `</${element}>`
    }
  }

  return new SafeString(out)
}

/**
 * To primitive string
 * @param {String} str
 * @returns {String}
 */
function toPrimitiveString(str) {
  if (str === null) {
    return ''
  }
  
  if (str instanceof SafeString) {
    // <https://jsperf.com/string-literal-casting/1>
    return str.toString()
  }

  if (typeof str === 'string') {
    return str
  }

  throw TypeError('String must be of type string')
}

const Fragment = null

export {
  Fragment,
  Component,
  hyperons as h,
  hyperons as createElement,
  toPrimitiveString as render,
  toPrimitiveString as renderToString
}
