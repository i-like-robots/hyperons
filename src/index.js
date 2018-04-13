import extend from './extend'
import SafeString from './safe-string'
import escapeString from './escape-string'
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
 * @param {String|Function} element
 * @param {Object|null} props
 * @param {...String} children
 * @returns {String|SafeString}
 */
function hyperons(element, props, ...children) {
  if (element == null) {
    return ''
  }

  // support for higher-order components
  if (typeof element === 'function') {
    return element(extend(props, { children }))
  }

  let out = `<${element}`

  if (props) {
    out += stringifyAttributes(props)
  }

  // if a self-closing void element has children then
  if (VOID_ELEMENTS.has(element)) {
    out += '/>'
  } else {
    out += '>'

    if (props && props[INNER_HTML]) {
      out += props[INNER_HTML].__html
    } else {
      out += childElements(children)
    }

    out += `</${element}>`
  }

  return new SafeString(out)
}

/**
 * To primitive string
 * @param {String} str
 * @returns {String}
 */
function toPrimitiveString(str) {
  if (str instanceof String) {
    // <https://jsperf.com/string-literal-casting/1>
    return str.toString()
  }

  if (typeof str === 'string') {
    return str
  }

  return String(str)
}

export const h = hyperons
export const createElement = hyperons

export const render = toPrimitiveString
export const renderToString = toPrimitiveString
