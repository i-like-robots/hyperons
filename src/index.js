import escapeString from './escape-string'
import stringifyStyles from './stringify-styles'

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

const IGNORE_ATTRS = new Set(['key', 'ref', 'children', 'dangerouslySetInnerHTML'])

const ALIAS_ATTRS = new Map([['htmlFor', 'for'], ['className', 'class']])

// best guess if a child element was rendered by this module
function fragment(node) {
  return /^</.test(node) && />$/.test(node)
}

function vhtml(element, attributes = {}, ...children) {
  if (element === null) {
    return ''
  }

  // support for higher-order components
  if (typeof element === 'function') {
    return element({ ...attributes, children })
  }

  let out = `<${element}`

  if (attributes) {
    const keys = Object.keys(attributes)

    for (let i = 0; i < keys.length; i++) {
      const name = keys[i]
      let value = attributes[name]

      // don't attempt to stringify internal props or event listeners
      if (IGNORE_ATTRS.has(name) || typeof value === 'function') {
        continue
      }

      if (name === 'style' && value && typeof value === 'object') {
        value = stringifyStyles(value)
      }

      if (value !== false && value != null) {
        out += ' ' + (ALIAS_ATTRS.has(name) ? ALIAS_ATTRS.get(name) : name)

        // don't output a value for boolean attributes
        // TODO: enumerated attributes where true/false is valid e.g. draggable, contenteditable, spellcheck
        if (value !== true) {
          out += `="${escapeString(value)}"`
        }
      }
    }
  }

  // if a self-closing void element has children then
  if (VOID_ELEMENTS.has(element)) {
    out += '/>'
  } else {
    out += '>'

    if (attributes && attributes[INNER_HTML] && attributes[INNER_HTML].__html) {
      out += attributes[INNER_HTML].__html
    } else {
      while (children.length) {
        const child = children.shift()

        if (child) {
          // handle nested arrays of children
          if (Array.isArray(child)) {
            children = child.concat(children)
          } else {
            // don't double escape any markup output by this element
            out += fragment(child) ? child : escapeString(child)
          }
        }
      }
    }

    out += `</${element}>`
  }

  return out
}

export default vhtml
