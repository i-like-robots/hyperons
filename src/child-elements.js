import { FLAG } from './safe-string'
import escapeString from './escape-string'

function childElements(children) {
  let out = ''

  for (let i = 0, len = children.length; i < len; i++) {
    const child = children[i]

    if (child) {
      if (Array.isArray(child)) {
        out += childElements(child)
      } else {
        // don't double escape any markup output by this element
        out += child.hasOwnProperty(FLAG) ? child : escapeString(child)
      }
    }
  }

  return out
}

export default childElements
