const UPPERCASE = /([A-Z])/g

const MS = /^ms-/

const UNITLESS = new Set([
  'animationIterationCount',
  'columns',
  'columnCount',
  'flex',
  'flexGrow',
  'flexShrink',
  'fontWeight',
  'gridColumn',
  'gridColumnEnd',
  'gridColumnStart',
  'gridRow',
  'gridRowEnd',
  'gridRowStart',
  'lineHeight',
  'opacity',
  'order',
  'orphans',
  'tabSize',
  'widows',
  'zIndex',
  'zoom'
])

const cache = {}

function hyphenateChar(char) {
  return '-' + char.toLowerCase()
}

function hyphenateString(prop) {
  return cache[prop] || (cache[prop] = prop.replace(UPPERCASE, hyphenateChar).replace(MS, '-ms-'))
}

function stringifyStyles(styles) {
  let out = ''

  for (const prop in styles) {
    const value = styles[prop]

    if (value == null) {
      continue
    }

    out += `${hyphenateString(prop)}:${value}`

    if (typeof value === 'number' && value !== 0 && !UNITLESS.has(prop)) {
      out += 'px'
    }

    out += ';'
  }

  return out
}

export default stringifyStyles
