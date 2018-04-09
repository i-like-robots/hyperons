// https://www.w3.org/International/questions/qa-escapes#use
const ESCAPE = /["'&<>]/g

const ESCAPE_MAP = new Map([
  ['"', '&quot;'],
  ["'", '&#x27;'],
  ['&', '&amp;'],
  ['<', '&lt;'],
  ['>', '&gt;']
])

function escapeChar(char) {
  return ESCAPE_MAP.get(char)
}

function escapeString(value) {
  if (typeof value === 'number') {
    // better performance for safe values
    return '' + value
  }

  return ('' + value).replace(ESCAPE, escapeChar)
}

export default escapeString
