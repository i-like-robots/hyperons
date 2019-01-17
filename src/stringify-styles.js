const UPPERCASE = /([A-Z])/g

const MS = /^ms-/

const UNITLESS_PROPS = new Set([
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

const CACHE = {}

function hyphenateChar(char) {
  return '-' + char.toLowerCase()
}

function hyphenateString(prop) {
  return prop.replace(UPPERCASE, hyphenateChar).replace(MS, '-ms-')
}

function stringifyStyles(styles) {
  let out = ''

  for (let prop in styles) {
    const value = styles[prop]

    if (value != null) {
      const unit = typeof value === 'number' && value !== 0 && !UNITLESS_PROPS.has(prop) ? 'px' : ''

      prop = CACHE[prop] || (CACHE[prop] = hyphenateString(prop))

      out += `${prop}:${value}${unit};`
    }
  }

  return out
}

export default stringifyStyles
