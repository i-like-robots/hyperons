import dispatcher from './dispatcher'

const NO_OP = function () {}

export function useCallback(fn) {
  return fn
}

export function useContext(instance) {
  return instance.getChildContext(dispatcher.context)
}

export function useEffect() {}

export function useLayoutEffect() {}

export function useMemo(fn) {
  return fn()
}

export function useReducer(_, value, init) {
  if (typeof init === 'function') {
    value = init(value)
  }

  return [value, NO_OP]
}

export function useRef(value) {
  return { current: value }
}

export function useState(value) {
  return [value, NO_OP]
}
