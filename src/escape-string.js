// https://www.w3.org/International/questions/qa-escapes#use
const ESCAPE_TEST_REGEXP = /["'&<>]/

const ESCAPE_REGEXP = /["'&<>]/g

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
  if (!ESCAPE_TEST_REGEXP.test(value)) {
    return value
  }

  return String(value).replace(ESCAPE_REGEXP, escapeChar)
}

export default escapeString
