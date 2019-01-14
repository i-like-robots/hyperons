import stringifyStyles from './stringify-styles'
import escapeString from './escape-string'
import Fragment from './fragment'

const EMPTY_OBJECT = {}

const ATTR_ALIASES = {
  htmlFor: 'for',
  className: 'class',
  defaultValue: 'value',
  defaultChecked: 'checked'
}

// <https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes>
const BOOLEAN_ATTRS = new Set([
  'async',
  'allowfullscreen',
  'allowpaymentrequest',
  'autofocus',
  'autoplay',
  'checked',
  'controls',
  'default',
  'defer',
  'disabled',
  'formnovalidate',
  'hidden',
  'ismap',
  'multiple',
  'muted',
  'novalidate',
  'nowrap',
  'open',
  'readonly',
  'required',
  'reversed',
  'selected'
])

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

function renderToString(element) {
  const elementType = typeof element

  if (elementType === 'string') {
    return escapeString(element)
  } else if (elementType === 'number') {
    return String(element)
  } else if (elementType === 'boolean' || element == null) {
    return ''
  } else if (Array.isArray(element)) {
    let html = ''

    for (let i = 0, len = element.length; i < len; i++) {
      html += renderToString(element[i])
    }

    return html
  }

  const type = element.type

  if (type) {
    const props = element.props || EMPTY_OBJECT

    if (type.prototype && type.prototype.render) {
      const instance = new type(props)
      return renderToString(instance.render())
    } else if (typeof type === 'function') {
      return renderToString(type(props))
    } else if (type === Fragment) {
      return renderToString(props.children)
    } else if (typeof type === 'string') {
      let html = `<${type}`

      let innerHTML

      for (const prop in props) {
        const value = props[prop]

        if (prop === 'children' || prop === 'key' || prop === 'ref') {
          // Why not use a continue statement? It's slower ¯\_(ツ)_/¯
        } else if (prop === 'style') {
          html += ` style="${stringifyStyles(value)}"`
        } else if (prop === 'class' || prop === 'className') {
          html += ` class="${escapeString(value)}"`
        } else if (prop === 'dangerouslySetInnerHTML') {
          innerHTML = value.__html
        } else {
          const valueType = typeof value
          const name = ATTR_ALIASES[prop] || prop

          if (BOOLEAN_ATTRS.has(name)) {
            html += value ? ` ${name}` : ''
          } else if (valueType === 'string') {
            html += ` ${name}="${escapeString(value)}"`
          } else if (valueType === 'number') {
            html += ` ${name}="${String(value)}"`
          } else if (valueType === 'boolean') {
            html += ` ${name}="${value}"`
          }
        }
      }

      if (VOID_ELEMENTS.has(type)) {
        html += '/>'
      } else {
        html += '>'

        if (innerHTML) {
          html += innerHTML
        } else {
          html += renderToString(props.children)
        }

        html += `</${type}>`
      }

      return html
    }
  }
}

export default renderToString
