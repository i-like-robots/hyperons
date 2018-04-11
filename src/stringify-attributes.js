import escapeString from './escape-string'
import stringifyStyles from './stringify-styles'

// <https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes>
const BOOLEAN = new Set([
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

const ALIASES = new Map([['htmlFor', 'for'], ['className', 'class'], ['defaultValue', 'value']])

const IGNORE = new Set(['key', 'ref', 'children', 'dangerouslySetInnerHTML'])

function boolean(name, value) {
  return value ? ` ${name}` : ''
}

function enumerable(name, value) {
  return ` ${name}="${escapeString(value)}"`
}

function styles(name, value) {
  return ` ${name}="${stringifyStyles(value)}"`
}

function stringifyAttributes(attributes) {
  let out = ''

  for (const item in attributes) {
    // ignore arbitrary framework properties
    if (IGNORE.has(item)) {
      continue
    }

    const name = ALIASES.get(item) || item.toLowerCase()
    const value = attributes[item]

    // don't attempt to stringify empty values or event listeners
    if (value == null || typeof value === 'function') {
      continue
    }

    if (name === 'style' && typeof value === 'object') {
      out += styles(name, value)
    } else if (BOOLEAN.has(name)) {
      out += boolean(name, value)
    } else {
      out += enumerable(name, value)
    }
  }

  return out
}

export default stringifyAttributes
