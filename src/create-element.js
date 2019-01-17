function createElement(type, props, ...children) {
  props = props || {}

  props.children =
    Array.isArray(props.children) && children.length === 0 ? props.children : children

  // TODO: support default props
  return { type, props }
}

export default createElement
