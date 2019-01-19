function createElement(type, props, ...children) {
  props = props || {}

  props.children =
    Array.isArray(props.children) && children.length === 0 ? props.children : children

  if (type && type.defaultProps) {
    for (const prop in type.defaultProps) {
      if (props[prop] === undefined) {
        props[prop] = type.defaultProps[prop]
      }
    }
  }

  return { type, props }
}

export default createElement
