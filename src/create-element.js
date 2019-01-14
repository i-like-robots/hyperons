function flattenArray(array, result = []) {
  for (let i = 0, len = array.length; i < len; i++) {
    const value = array[i]

    if (Array.isArray(value)) {
      flattenArray(value, result)
    } else {
      result.push(value)
    }
  }

  return result
}

function createElement(type, props, ...children) {
  props = props || {}

  props.children = flattenArray(children)

  // TODO: support default props
  return { type, props }
}

export default createElement
