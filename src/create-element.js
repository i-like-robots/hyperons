function createElement(type, props, ...children) {
  props = props || {}

  props.children = children || []

  // TODO: support default props
  return { type, props }
}

export default createElement
