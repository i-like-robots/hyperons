const UPPERCASE = /([A-Z])/g

const MS = /^ms-/

const UNITLESS = new Set([
  'columns',
  'columnCount',
  'flex',
  'flexGrow',
  'flexShrink',
  'fontWeight',
  'gridColumn',
  'gridColumnEnd',
  'gridColumnGap',
  'gridColumnStart',
  'gridRow',
  'gridRowEnd',
  'gridRowGap',
  'gridRowStart',
  'lineClamp',
  'lineHeight',
  'opacity',
  'order',
  'orphans',
  'widows',
  'zIndex',
  'zoom'
])

function hyphenate(property) {
  return property
    .replace(UPPERCASE, '-$1')
    .replace(MS, '-ms-')
    .toLowerCase()
}

function stringifyStyles(styles) {
  let out = ''
  const keys = Object.keys(styles)

  for (let i = 0; i < keys.length; i++) {
    const name = keys[i]
    let value = styles[name]

    if (typeof value === 'number' && value !== 0 && !UNITLESS.has(name)) {
      value += 'px'
    }

    if (value !== null && value !== undefined) {
      out += `${hyphenate(name)}:${value};`
    }
  }

  return out || null
}

export default stringifyStyles
