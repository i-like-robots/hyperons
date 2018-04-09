import escapeString from './escape-string'

const START = /^</

const END = />$/

// without being able to define props on strings this is a best guess heuristic
function isFragment(node) {
  return START.test(node) && END.test(node)
}

function childElements(children) {
  let out = ''

  for (let i = 0, len = children.length; i < len; i++) {
    const child = children[i]

    if (child) {
      if (Array.isArray(child)) {
        out += childElements(child)
      } else {
        // don't double escape any markup output by this element
        out += isFragment(child) ? child : escapeString(child)
      }
    }
  }

  return out
}

export default childElements
